import process from 'node:process';
import { Readable } from 'node:stream';
import { describe, expect, it } from 'vitest';
import { createCloudClient } from '../../src/createCloudClient';

type MemorySample = {
  timestampMs: number;
  rss: number;
  heapUsed: number;
  external: number;
  arrayBuffers: number;
};

type SourceStats = {
  chunksRequested: number;
  bytesGenerated: number;
  firstChunkRequestedAtMs: number | null;
  lastChunkRequestedAtMs: number | null;
  readCalls: number;
  pauses: number;
  resumes: number;
};

type HarnessConfig = {
  issueIdOrKey?: string;
  logicalSizeBytes: number;
  chunkSizeBytes: number;
  chunkThrottleMs: number;
  logIntervalMs: number;
  progressStepPercent: number;
  highWaterMarkBytes: number;
  memoryCeilingRssBytes: number;
  filename: string;
  autoPrepare: boolean;
  autoCleanup: boolean;
};

type HarnessOutcome = {
  startedAtMs: number;
  completedAtMs: number;
  durationMs: number;
  totalUploadedBytes: number;
  throughputBytesPerSec: number;
  memoryStart: MemorySample;
  memoryEnd: MemorySample;
  memoryPeak: MemorySample;
  sourceStats: SourceStats;
  firstFetchCallAtMs: number | null;
  firstBodyPullAtMs: number | null;
  memoryCeilingTripped: boolean;
};

function toBytes(raw: string | undefined, fallback: number): number {
  if (!raw) return fallback;

  const trimmed = raw.trim().toLowerCase();
  const match = /^(\d+(?:\.\d+)?)(b|kb|mb|gb)?$/.exec(trimmed);

  if (!match) return fallback;

  const value = Number(match[1]);
  const unit = match[2] ?? 'b';
  const multiplier = unit === 'gb' ? 1024 ** 3 : unit === 'mb' ? 1024 ** 2 : unit === 'kb' ? 1024 : 1;

  return Math.floor(value * multiplier);
}

function readConfig(): HarnessConfig {
  const issueIdOrKey = process.env.JIRA_STRESS_ISSUE_ID_OR_KEY;
  const logicalSizeBytes = toBytes(process.env.JIRA_STRESS_LOGICAL_SIZE, 2 * 1024 ** 3);
  const chunkSizeBytes = toBytes(process.env.JIRA_STRESS_CHUNK_SIZE, 1024 * 1024);
  const chunkThrottleMs = Number(process.env.JIRA_STRESS_CHUNK_THROTTLE_MS ?? '0');
  const logIntervalMs = Number(process.env.JIRA_STRESS_LOG_INTERVAL_MS ?? '2000');
  const progressStepPercent = Number(process.env.JIRA_STRESS_PROGRESS_STEP_PERCENT ?? '5');
  const highWaterMarkBytes = toBytes(process.env.JIRA_STRESS_HIGH_WATER_MARK, 1024 * 1024);
  const memoryCeilingRssBytes = toBytes(process.env.JIRA_STRESS_MEMORY_CEILING_RSS, 2 * 1024 ** 3);
  const filename = process.env.JIRA_STRESS_FILENAME ?? `manual-stream-${Date.now()}.bin`;
  const autoPrepare = process.env.JIRA_STRESS_AUTO_PREPARE !== '0';
  const autoCleanup = process.env.JIRA_STRESS_AUTO_CLEANUP !== '0';

  return {
    issueIdOrKey,
    logicalSizeBytes,
    chunkSizeBytes,
    chunkThrottleMs,
    logIntervalMs,
    progressStepPercent,
    highWaterMarkBytes,
    memoryCeilingRssBytes,
    filename,
    autoPrepare,
    autoCleanup,
  };
}

function memoryNow(startedAtMs: number): MemorySample {
  const usage = process.memoryUsage();

  return {
    timestampMs: Date.now() - startedAtMs,
    rss: usage.rss,
    heapUsed: usage.heapUsed,
    external: usage.external,
    arrayBuffers: usage.arrayBuffers,
  };
}

function formatBytes(bytes: number): string {
  const units = ['B', 'KiB', 'MiB', 'GiB', 'TiB'];
  let value = bytes;
  let index = 0;
  while (value >= 1024 && index < units.length - 1) {
    value /= 1024;
    index += 1;
  }

  return `${value.toFixed(2)} ${units[index]}`;
}

function runtimeDiagnostics(): Record<string, string> {
  const fetchImpl = globalThis.fetch ? globalThis.fetch.toString().slice(0, 80).replace(/\s+/g, ' ') : 'undefined';
  const formDataImpl =
    typeof FormData === 'undefined' ? 'undefined' : FormData.toString().slice(0, 80).replace(/\s+/g, ' ');

  return {
    nodeVersion: process.version,
    platform: `${process.platform}/${process.arch}`,
    fetchImplementation: fetchImpl,
    formDataImplementation: formDataImpl,
    runtime: typeof window === 'undefined' ? 'node' : 'browser-like',
    execArgv: process.execArgv.join(' '),
  };
}

async function sleep(ms: number): Promise<void> {
  await new Promise(resolve => setTimeout(resolve, ms));
}

function basicAuthHeader(email: string, apiToken: string): string {
  const raw = `${email}:${apiToken}`;
  const encoded = Buffer.from(raw, 'utf8').toString('base64');

  return `Basic ${encoded}`;
}

async function getCurrentAccountId(baseUrl: string, email: string, apiToken: string): Promise<string> {
  const response = await fetch(`${baseUrl.replace(/\/$/, '')}/rest/api/3/myself`, {
    method: 'GET',
    headers: {
      Authorization: basicAuthHeader(email, apiToken),
      Accept: 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error(`Failed to resolve current user for auto-prepare: ${response.status} ${response.statusText}`);
  }

  const payload = (await response.json()) as { accountId?: string };

  if (!payload.accountId) {
    throw new Error('Auto-prepare failed: accountId missing in /myself response');
  }

  return payload.accountId;
}

class LazyHugeReadable extends Readable {
  private readonly totalBytes: number;
  private readonly chunkSize: number;
  private readonly chunkThrottleMs: number;
  private readonly sourceStats: SourceStats;
  private readonly startedAtMs: number;
  private readonly shouldAbort: () => boolean;
  private generatedBytes = 0;
  private generationIndex = 0;

  public constructor(
    totalBytes: number,
    chunkSize: number,
    chunkThrottleMs: number,
    highWaterMarkBytes: number,
    sourceStats: SourceStats,
    startedAtMs: number,
    shouldAbort: () => boolean,
  ) {
    super({ highWaterMark: highWaterMarkBytes });
    this.totalBytes = totalBytes;
    this.chunkSize = chunkSize;
    this.chunkThrottleMs = chunkThrottleMs;
    this.sourceStats = sourceStats;
    this.startedAtMs = startedAtMs;
    this.shouldAbort = shouldAbort;
    this.on('pause', () => {
      this.sourceStats.pauses += 1;
    });
    this.on('resume', () => {
      this.sourceStats.resumes += 1;
    });
  }

  public override _read(): void {
    this.sourceStats.readCalls += 1;
    void this.emitChunk();
  }

  private async emitChunk(): Promise<void> {
    if (this.generatedBytes >= this.totalBytes) {
      this.push(null);

      return;
    }

    if (this.shouldAbort()) {
      this.destroy(new Error('Memory ceiling reached, source aborting upload'));

      return;
    }

    const remaining = this.totalBytes - this.generatedBytes;
    const size = Math.min(this.chunkSize, remaining);
    const chunk = new Uint8Array(size);
    this.generationIndex += 1;
    chunk.fill(this.generationIndex % 251);

    if (this.chunkThrottleMs > 0) {
      await sleep(this.chunkThrottleMs);
    }

    this.generatedBytes += size;
    this.sourceStats.chunksRequested += 1;
    this.sourceStats.bytesGenerated += size;
    const atMs = Date.now() - this.startedAtMs;

    if (this.sourceStats.firstChunkRequestedAtMs === null) {
      this.sourceStats.firstChunkRequestedAtMs = atMs;
      console.log(`[stream] first chunk generated at ${atMs}ms`);
    }

    this.sourceStats.lastChunkRequestedAtMs = atMs;
    this.push(chunk);
  }
}

async function runHarness(config: HarnessConfig): Promise<HarnessOutcome> {
  const envBaseUrl = process.env.JIRA_BASE_URL;
  const envEmail = process.env.JIRA_EMAIL;
  const envApiToken = process.env.JIRA_API_TOKEN;

  if (!envBaseUrl || !envEmail || !envApiToken) {
    throw new Error('Missing JIRA_BASE_URL/JIRA_EMAIL/JIRA_API_TOKEN');
  }

  const startedAtMs = Date.now();
  const memoryStart = memoryNow(startedAtMs);
  let memoryPeak = memoryStart;
  let memoryCeilingTripped = false;
  const sourceStats: SourceStats = {
    chunksRequested: 0,
    bytesGenerated: 0,
    firstChunkRequestedAtMs: null,
    lastChunkRequestedAtMs: null,
    readCalls: 0,
    pauses: 0,
    resumes: 0,
  };

  const diagnostics = runtimeDiagnostics();
  console.log('[diagnostics]', diagnostics);
  console.log('[config]', {
    issueIdOrKey: config.issueIdOrKey,
    logicalSizeBytes: config.logicalSizeBytes,
    chunkSizeBytes: config.chunkSizeBytes,
    chunkThrottleMs: config.chunkThrottleMs,
    logIntervalMs: config.logIntervalMs,
    progressStepPercent: config.progressStepPercent,
    highWaterMarkBytes: config.highWaterMarkBytes,
    memoryCeilingRssBytes: config.memoryCeilingRssBytes,
    filename: config.filename,
  });

  const originalFetch = globalThis.fetch;
  let firstFetchCallAtMs: number | null = null;
  let firstBodyPullAtMs: number | null = null;
  globalThis.fetch = (async (input: RequestInfo | URL, init?: RequestInit): Promise<Response> => {
    if (firstFetchCallAtMs === null) {
      firstFetchCallAtMs = Date.now() - startedAtMs;
      console.log(`[lifecycle] fetch called at ${firstFetchCallAtMs}ms`);
    }

    const body = init?.body as unknown;

    if (body && typeof (body as { [Symbol.asyncIterator]?: unknown })[Symbol.asyncIterator] === 'function') {
      const originalIteratorFactory = (body as AsyncIterable<Uint8Array>)[Symbol.asyncIterator].bind(body);
      const wrappedBody: AsyncIterable<Uint8Array> = {
        async *[Symbol.asyncIterator](): AsyncIterableIterator<Uint8Array> {
          const iterator = originalIteratorFactory();
          while (true) {
            const next = await iterator.next();

            if (next.done) return;

            if (firstBodyPullAtMs === null) {
              firstBodyPullAtMs = Date.now() - startedAtMs;
              console.log(`[lifecycle] first downstream body pull at ${firstBodyPullAtMs}ms`);
            }

            yield next.value as Uint8Array;
          }
        },
      };
      const nextInit: RequestInit = { ...init, body: wrappedBody as BodyInit };

      return originalFetch(input, nextInit);
    }

    return originalFetch(input, init);
  }) as typeof fetch;

  const shouldAbortByMemory = (): boolean => memoryCeilingTripped;
  const source = new LazyHugeReadable(
    config.logicalSizeBytes,
    config.chunkSizeBytes,
    config.chunkThrottleMs,
    config.highWaterMarkBytes,
    sourceStats,
    startedAtMs,
    shouldAbortByMemory,
  );

  const progressStepBytes = Math.max(1, Math.floor(config.logicalSizeBytes * (config.progressStepPercent / 100)));
  let nextProgressMark = progressStepBytes;
  const memorySamples: MemorySample[] = [memoryStart];
  const monitor = setInterval(
    () => {
      const sample = memoryNow(startedAtMs);
      memorySamples.push(sample);

      if (sample.rss > memoryPeak.rss) memoryPeak = sample;

      if (sample.rss >= config.memoryCeilingRssBytes) {
        memoryCeilingTripped = true;
      }

      const pct = ((sourceStats.bytesGenerated / config.logicalSizeBytes) * 100).toFixed(2);
      const elapsedSec = Math.max(0.001, sample.timestampMs / 1000);
      const throughput = sourceStats.bytesGenerated / elapsedSec;
      console.log(
        `[memory] t=${sample.timestampMs}ms rss=${formatBytes(sample.rss)} heap=${formatBytes(sample.heapUsed)} ext=${formatBytes(sample.external)} ab=${formatBytes(sample.arrayBuffers)} generated=${formatBytes(sourceStats.bytesGenerated)} (${pct}%) throughput=${formatBytes(throughput)}/s`,
      );
      while (sourceStats.bytesGenerated >= nextProgressMark) {
        const markPct = ((nextProgressMark / config.logicalSizeBytes) * 100).toFixed(2);
        console.log(`[progress] reached ${markPct}% generated`);
        nextProgressMark += progressStepBytes;
      }
    },
    Math.max(250, config.logIntervalMs),
  );

  const client = createCloudClient({
    host: envBaseUrl,
    auth: {
      type: 'basic',
      email: envEmail,
      apiToken: envApiToken,
    },
  });

  let effectiveIssueIdOrKey = config.issueIdOrKey;
  let createdProjectId: string | undefined;
  let createdIssueId: string | undefined;
  let createdIssueKey: string | undefined;

  if (!effectiveIssueIdOrKey && config.autoPrepare) {
    const accountId = await getCurrentAccountId(envBaseUrl, envEmail, envApiToken);
    const keyAlphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const randomKey = Array.from({ length: 5 }, () => keyAlphabet[Math.floor(Math.random() * keyAlphabet.length)]).join(
      '',
    );
    const suffix = `${Date.now()}`.slice(-8);
    const project = await client.projects.createProject({
      key: randomKey,
      name: `sdk-streaming-stress-${suffix}`,
      projectTypeKey: 'software',
      projectTemplateKey: 'com.pyxis.greenhopper.jira:gh-simplified-scrum-classic',
      leadAccountId: accountId,
    });
    createdProjectId = String(project.id);
    const issue = await client.issues.createIssue({
      fields: {
        project: { key: project.key },
        issuetype: { name: 'Story' },
        summary: `manual-streaming-stress-${suffix}`,
      },
    });
    createdIssueId = issue.id;
    createdIssueKey = issue.key;
    effectiveIssueIdOrKey = issue.key;
    console.log('[lifecycle] auto-prepared issue', {
      projectKey: project.key,
      projectId: createdProjectId,
      issueId: createdIssueId,
      issueKey: createdIssueKey,
    });
  }

  if (!effectiveIssueIdOrKey) {
    throw new Error('Missing issue target: set JIRA_STRESS_ISSUE_ID_OR_KEY or enable auto-prepare');
  }

  let uploadError: unknown = undefined;
  console.log('[lifecycle] upload start');
  try {
    await client.issueAttachments.addAttachment({
      issueIdOrKey: effectiveIssueIdOrKey,
      attachments: { filename: config.filename, content: source },
    });
    console.log('[lifecycle] upload completed');
  } catch (error) {
    uploadError = error;
    console.log('[lifecycle] upload failed', error instanceof Error ? error.message : String(error));
  } finally {
    clearInterval(monitor);
    globalThis.fetch = originalFetch;

    if (config.autoCleanup && createdIssueId) {
      await client.issues.deleteIssue({ issueIdOrKey: createdIssueId }).catch(() => {});
    }

    if (config.autoCleanup && createdProjectId) {
      await client.projects.deleteProject({ projectIdOrKey: createdProjectId }).catch(() => {});
    }
  }

  const completedAtMs = Date.now();
  const memoryEnd = memoryNow(startedAtMs);
  memorySamples.push(memoryEnd);

  if (memoryEnd.rss > memoryPeak.rss) memoryPeak = memoryEnd;

  const durationMs = completedAtMs - startedAtMs;
  const throughputBytesPerSec = sourceStats.bytesGenerated / Math.max(0.001, durationMs / 1000);
  const outcome: HarnessOutcome = {
    startedAtMs,
    completedAtMs,
    durationMs,
    totalUploadedBytes: sourceStats.bytesGenerated,
    throughputBytesPerSec,
    memoryStart,
    memoryEnd,
    memoryPeak,
    sourceStats,
    firstFetchCallAtMs,
    firstBodyPullAtMs,
    memoryCeilingTripped,
  };

  console.log('[analysis] result', {
    durationMs: outcome.durationMs,
    totalUploadedBytes: outcome.totalUploadedBytes,
    throughput: `${formatBytes(outcome.throughputBytesPerSec)}/s`,
    peakRss: formatBytes(outcome.memoryPeak.rss),
    peakHeapUsed: formatBytes(outcome.memoryPeak.heapUsed),
    peakExternal: formatBytes(outcome.memoryPeak.external),
    peakArrayBuffers: formatBytes(outcome.memoryPeak.arrayBuffers),
    fetchCallAtMs: outcome.firstFetchCallAtMs,
    firstBodyPullAtMs: outcome.firstBodyPullAtMs,
    firstChunkAtMs: outcome.sourceStats.firstChunkRequestedAtMs,
    readCalls: outcome.sourceStats.readCalls,
    pauses: outcome.sourceStats.pauses,
    resumes: outcome.sourceStats.resumes,
    memoryCeilingTripped: outcome.memoryCeilingTripped,
    uploadError: uploadError instanceof Error ? uploadError.message : uploadError ? String(uploadError) : null,
  });

  const rssGrowth = outcome.memoryPeak.rss - outcome.memoryStart.rss;
  const logicalSize = config.logicalSizeBytes;
  const appearsBuffered = rssGrowth > Math.floor(logicalSize * 0.5);
  const appearsStreamed =
    outcome.sourceStats.firstChunkRequestedAtMs !== null &&
    outcome.firstFetchCallAtMs !== null &&
    outcome.sourceStats.firstChunkRequestedAtMs < Math.max(30_000, outcome.durationMs) &&
    !appearsBuffered;

  console.log('[analysis] verdict', {
    appearsStreamed,
    appearsBuffered,
    suspectedBufferingLocations: appearsBuffered
      ? ['runtime fetch implementation', 'multipart encoding layer', 'network backpressure mismatch']
      : ['no dominant full-payload buffering observed'],
    recommendation: appearsBuffered
      ? 'Treat multi-GB uploads as high risk in current runtime; investigate fetch/runtime buffering further'
      : 'Behavior looks progressively streamed; validate on target production host and limits',
  });

  if (uploadError) {
    throw uploadError;
  }

  return outcome;
}

const isManualMode = process.env.MANUAL_STREAMING_STRESS === '1';
const isCi = process.env.CI === 'true' || process.env.CI === '1';
const shouldRun = isManualMode && !isCi;

describe.skipIf(!shouldRun)('manual issueAttachments 8GB streaming stress harness', () => {
  it(
    'runs a manual large logical upload probe',
    async () => {
      const config = readConfig();
      const outcome = await runHarness(config);
      expect(outcome.totalUploadedBytes).toBe(config.logicalSizeBytes);
      expect(outcome.sourceStats.chunksRequested).toBeGreaterThan(0);
      expect(outcome.sourceStats.firstChunkRequestedAtMs).not.toBeNull();
      expect(outcome.firstFetchCallAtMs).not.toBeNull();
      expect(outcome.memoryCeilingTripped).toBe(false);
    },
    1000 * 60 * 60 * 2,
  );
});
