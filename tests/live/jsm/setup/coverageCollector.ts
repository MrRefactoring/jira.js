/**
 * Flushes the recorded calls after each test file.
 *
 * Split from the recording itself because the recorder is also used by the global setup, which builds the fixtures in
 * the main process, where `afterAll` does not exist.
 */
import { afterAll } from 'vitest';
import { flushRecordedCalls } from '../../setup/recordCalls';

afterAll(flushRecordedCalls);
