import { describe, expect, it } from 'vitest';
import { z } from 'zod';
import { IssueMatchesForJQLSchema } from '../../src/models/issueMatchesForJQL';
import { IssueSchema } from '../../src/models/issue';
import { SearchAndReconcileResultsSchema } from '../../src/models/searchAndReconcileResults';
import { TaskProgressSchema } from '../../src/models/taskProgress';
import { TransitionSchema } from '../../src/models/transition';
import { WorklogSchema } from '../../src/models/worklog';

// Canonical minimal fixtures — normalized for stability.
// Unstable values (real IDs, real timestamps, real URLs) are replaced with stable test anchors.
// These are "known-good" representations of what real Jira responses look like.
// If parsing these ever fails, the schema has drifted from the real API.

const CANONICAL_TRANSITION = {
  description: 'Move issue to In Progress',
  from: ['10001'],
  id: '21',
  name: 'Start Progress',
  to: 'In Progress',
  type: 'global' as const,
};

const CANONICAL_TASK_PROGRESS = {
  elapsedRuntime: 1234,
  id: 'task-1',
  lastUpdate: '2026-01-01T10:00:00.000Z',
  progress: 50,
  self: 'https://example.atlassian.net/rest/api/3/task/1',
  status: 'RUNNING' as const,
  submittedBy: 123456,
};

const CANONICAL_SEARCH_RESULT = {
  isLast: true,
  issues: [],
};

const CANONICAL_ISSUE = {
  id: '123456',
  key: 'PROJ-1',
  self: 'https://example.atlassian.net/rest/api/3/issue/123456',
  fields: { summary: 'Test issue' },
};

const CANONICAL_WORKLOG = {
  id: '100',
  timeSpentSeconds: 3600,
  started: '2026-01-01T10:00:00.000+0000',
};

const CANONICAL_ISSUE_MATCH = {
  errors: [],
  matchedIssues: [123456],
};

// ─── TransitionSchema ───────────────────────────────────────────────────────

describe('TransitionSchema — drift conformance', () => {
  it('parses canonical minimal Transition payload', () => {
    expect(() => TransitionSchema.parse(CANONICAL_TRANSITION)).not.toThrow();
  });

  it('output has expected field types', () => {
    const result = TransitionSchema.parse(CANONICAL_TRANSITION);

    expect(typeof result.id).toBe('string');
    expect(typeof result.name).toBe('string');
    expect(typeof result.to).toBe('string');
    expect(typeof result.description).toBe('string');
    expect(Array.isArray(result.from)).toBe(true);
  });

  it('SAFE: tolerates unknown fields added by upstream', () => {
    const result = TransitionSchema.parse({ ...CANONICAL_TRANSITION, futureField: 'new-value' });

    expect(result.id).toBe('21');
    expect('futureField' in result).toBe(false);
  });

  it('BREAKS: required enum type rejects unknown transition type', () => {
    // Atlassian may add new transition types (e.g. 'automatic').
    // Any response with an unrecognized type will throw ZodError.
    expect(() =>
      TransitionSchema.parse({ ...CANONICAL_TRANSITION, type: 'automatic' }),
    ).toThrow(z.ZodError);
  });

  it('BREAKS: throws ZodError when required field id is missing', () => {
    const { id: _id, ...withoutId } = CANONICAL_TRANSITION;

    expect(() => TransitionSchema.parse(withoutId)).toThrow(z.ZodError);
  });

  it('BREAKS: throws ZodError when required field name is missing', () => {
    const { name: _name, ...withoutName } = CANONICAL_TRANSITION;

    expect(() => TransitionSchema.parse(withoutName)).toThrow(z.ZodError);
  });

  it('BREAKS: throws ZodError when required string field to is null', () => {
    expect(() => TransitionSchema.parse({ ...CANONICAL_TRANSITION, to: null })).toThrow(z.ZodError);
  });
});

// ─── TaskProgressSchema ──────────────────────────────────────────────────────

describe('TaskProgressSchema — drift conformance (highest-brittleness schema)', () => {
  it('parses canonical minimal TaskProgress payload', () => {
    expect(() => TaskProgressSchema.parse(CANONICAL_TASK_PROGRESS)).not.toThrow();
  });

  it('output date fields are Date instances', () => {
    const result = TaskProgressSchema.parse(CANONICAL_TASK_PROGRESS);

    expect(result.lastUpdate).toBeInstanceOf(Date);
    expect(Number.isNaN(result.lastUpdate.getTime())).toBe(false);
  });

  it('SAFE: tolerates unknown fields', () => {
    expect(() =>
      TaskProgressSchema.parse({ ...CANONICAL_TASK_PROGRESS, newMonitoringField: 'details' }),
    ).not.toThrow();
  });

  it('BREAKS: required status enum rejects unknown status value', () => {
    // If Atlassian adds 'RETRYING' to the task status enum, this breaks.
    expect(() =>
      TaskProgressSchema.parse({ ...CANONICAL_TASK_PROGRESS, status: 'RETRYING' }),
    ).toThrow(z.ZodError);
  });

  it('BREAKS: throws ZodError when required z.url() field self is a relative URL', () => {
    // z.url() requires absolute URLs. Relative paths from Atlassian would break.
    expect(() =>
      TaskProgressSchema.parse({ ...CANONICAL_TASK_PROGRESS, self: '/rest/api/3/task/1' }),
    ).toThrow(z.ZodError);
  });

  it('BREAKS: throws ZodError when required numeric field elapsedRuntime is missing', () => {
    const { elapsedRuntime: _, ...withoutRuntime } = CANONICAL_TASK_PROGRESS;

    expect(() => TaskProgressSchema.parse(withoutRuntime)).toThrow(z.ZodError);
  });

  it('SILENT CORRUPTION: invalid date string in lastUpdate produces Invalid Date without throwing', () => {
    // If Atlassian changes date format to non-parseable string, new Date() returns Invalid Date.
    // The schema does not validate transform output, so this silently corrupts consumer data.
    const result = TaskProgressSchema.parse({ ...CANONICAL_TASK_PROGRESS, lastUpdate: 'not-a-date' });

    expect(result.lastUpdate).toBeInstanceOf(Date);
    expect(Number.isNaN(result.lastUpdate.getTime())).toBe(true);
  });

  it('BREAKS: throws ZodError when lastUpdate changes from ISO string to number', () => {
    expect(() =>
      TaskProgressSchema.parse({ ...CANONICAL_TASK_PROGRESS, lastUpdate: 1735689600000 }),
    ).toThrow(z.ZodError);
  });
});

// ─── SearchAndReconcileResultsSchema ────────────────────────────────────────

describe('SearchAndReconcileResultsSchema — drift conformance', () => {
  it('parses canonical minimal search result payload', () => {
    expect(() => SearchAndReconcileResultsSchema.parse(CANONICAL_SEARCH_RESULT)).not.toThrow();
  });

  it('SAFE: all fields optional — empty object parses successfully', () => {
    expect(() => SearchAndReconcileResultsSchema.parse({})).not.toThrow();
  });

  it('SAFE: tolerates unknown pagination fields from upstream', () => {
    expect(() =>
      SearchAndReconcileResultsSchema.parse({
        ...CANONICAL_SEARCH_RESULT,
        totalCount: 42,
        cursor: 'abc',
      }),
    ).not.toThrow();
  });

  it('isLast field parses as boolean when present', () => {
    const result = SearchAndReconcileResultsSchema.parse({ isLast: false, issues: [] });

    expect(result.isLast).toBe(false);
  });

  it('nextPageToken parses as string when present', () => {
    const result = SearchAndReconcileResultsSchema.parse({
      isLast: false,
      nextPageToken: 'cursor_abc123',
    });

    expect(result.nextPageToken).toBe('cursor_abc123');
  });

  it('SearchAndReconcileResultsSchema is resilient — all fields optional reduces required-field risk to zero', () => {
    // This schema has no required fields. It will never throw from field removal drift.
    // This is the safest possible schema shape for a paginated response.
    const requiredFieldCount = Object.values(
      SearchAndReconcileResultsSchema.shape,
    ).filter(v => !(v as z.ZodTypeAny).isOptional()).length;

    expect(requiredFieldCount).toBe(0);
  });
});

// ─── IssueSchema ──────────────────────────────────────────────────────────

describe('IssueSchema — drift conformance', () => {
  it('parses canonical minimal Issue payload', () => {
    expect(() => IssueSchema.parse(CANONICAL_ISSUE)).not.toThrow();
  });

  it('SAFE: all top-level IssueSchema fields are optional — extremely resilient', () => {
    expect(() => IssueSchema.parse({})).not.toThrow();
  });

  it('SAFE: Issue.fields uses z.record(z.string(), z.any()) — fully permissive for new field values', () => {
    const result = IssueSchema.parse({
      ...CANONICAL_ISSUE,
      fields: {
        summary: 'Hello',
        newCustomField: { id: '99', value: 'something' },
        anotherFutureField: [1, 2, 3],
      },
    });

    expect(result.fields?.['newCustomField']).toEqual({ id: '99', value: 'something' });
  });

  it('SAFE: tolerates unknown root-level fields', () => {
    const result = IssueSchema.parse({ ...CANONICAL_ISSUE, futureField: 'newValue' });

    expect(result.id).toBe('123456');
    expect('futureField' in result).toBe(false);
  });
});

// ─── WorklogSchema ──────────────────────────────────────────────────────────

describe('WorklogSchema — drift conformance', () => {
  it('parses canonical minimal Worklog payload', () => {
    expect(() => WorklogSchema.parse(CANONICAL_WORKLOG)).not.toThrow();
  });

  it('SAFE: all WorklogSchema fields are optional — fully resilient to field removal', () => {
    expect(() => WorklogSchema.parse({})).not.toThrow();
  });

  it('timeSpentSeconds parses as number when present', () => {
    const result = WorklogSchema.parse(CANONICAL_WORKLOG);

    expect(result.timeSpentSeconds).toBe(3600);
  });

  it('started field transforms to a Date instance when present', () => {
    const result = WorklogSchema.parse(CANONICAL_WORKLOG);

    expect(result.started).toBeInstanceOf(Date);
  });

  it('SILENT CORRUPTION: non-parseable started string produces Invalid Date without throwing', () => {
    const result = WorklogSchema.parse({ ...CANONICAL_WORKLOG, started: 'not-a-date' });

    expect(result.started).toBeInstanceOf(Date);
    expect(Number.isNaN(result.started!.getTime())).toBe(true);
  });

  it('SAFE: tolerates unknown worklog fields from upstream', () => {
    expect(() =>
      WorklogSchema.parse({ ...CANONICAL_WORKLOG, issueId: 'PROJ-1', newAuditField: true }),
    ).not.toThrow();
  });
});

// ─── IssueMatchesForJQLSchema ────────────────────────────────────────────────

describe('IssueMatchesForJQLSchema — drift conformance', () => {
  it('parses canonical minimal IssueMatchesForJQL payload', () => {
    expect(() => IssueMatchesForJQLSchema.parse(CANONICAL_ISSUE_MATCH)).not.toThrow();
  });

  it('BREAKS: throws ZodError when required errors array is missing', () => {
    // errors and matchedIssues are BOTH required (not optional).
    // If Atlassian removes either, all matchIssues calls fail.
    const { errors: _, ...withoutErrors } = CANONICAL_ISSUE_MATCH;

    expect(() => IssueMatchesForJQLSchema.parse(withoutErrors)).toThrow(z.ZodError);
  });

  it('BREAKS: throws ZodError when required matchedIssues array is missing', () => {
    const { matchedIssues: _, ...withoutMatches } = CANONICAL_ISSUE_MATCH;

    expect(() => IssueMatchesForJQLSchema.parse(withoutMatches)).toThrow(z.ZodError);
  });

  it('SAFE: tolerates unknown fields alongside required arrays', () => {
    expect(() =>
      IssueMatchesForJQLSchema.parse({ ...CANONICAL_ISSUE_MATCH, queryKey: 'jql-0' }),
    ).not.toThrow();
  });

  it('BREAKS: throws ZodError when matchedIssues contains strings instead of numbers', () => {
    // IDs are typed as number[]. If Atlassian switches to string IDs, this breaks.
    expect(() =>
      IssueMatchesForJQLSchema.parse({ errors: [], matchedIssues: ['123456'] }),
    ).toThrow(z.ZodError);
  });
});

// ─── Schema Resilience Scoring ────────────────────────────────────────────────

describe('schema resilience audit — field optionality', () => {
  it('SearchAndReconcileResultsSchema has zero required fields (most resilient)', () => {
    const required = Object.values(SearchAndReconcileResultsSchema.shape).filter(
      v => !(v as z.ZodTypeAny).isOptional(),
    );

    expect(required.length).toBe(0);
  });

  it('IssueSchema has zero required fields (most resilient)', () => {
    const required = Object.values(IssueSchema.shape).filter(
      v => !(v as z.ZodTypeAny).isOptional(),
    );

    expect(required.length).toBe(0);
  });

  it('WorklogSchema has zero required fields (most resilient)', () => {
    const required = Object.values(WorklogSchema.shape).filter(
      v => !(v as z.ZodTypeAny).isOptional(),
    );

    expect(required.length).toBe(0);
  });

  it('IssueMatchesForJQLSchema has exactly 2 required fields (medium risk)', () => {
    const required = Object.values(IssueMatchesForJQLSchema.shape).filter(
      v => !(v as z.ZodTypeAny).isOptional(),
    );

    expect(required.length).toBe(2);
  });

  it('TransitionSchema has 6 required fields including a required enum (high risk)', () => {
    const required = Object.values(TransitionSchema.shape).filter(
      v => !(v as z.ZodTypeAny).isOptional(),
    );

    // description, from, id, name, to, type
    expect(required.length).toBe(6);
  });

  it('TaskProgressSchema has 7+ required fields including a required enum and required z.url() (highest risk)', () => {
    const required = Object.values(TaskProgressSchema.shape).filter(
      v => !(v as z.ZodTypeAny).isOptional(),
    );

    // elapsedRuntime, id, lastUpdate, progress, self, status, submittedBy
    expect(required.length).toBeGreaterThanOrEqual(7);
  });
});
