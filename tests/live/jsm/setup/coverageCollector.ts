import { afterAll } from 'vitest';
import { flushRecordedCalls } from '../../setup/recordCalls';

afterAll(flushRecordedCalls);
