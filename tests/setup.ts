import * as dotenv from 'dotenv';
import { TelemetryClient } from 'telemetry.jira.js';

dotenv.config();

TelemetryClient.prototype.sendTelemetry = () => Promise.resolve();
