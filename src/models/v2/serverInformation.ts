import { HealthCheckResult } from "./healthCheckResult";

export interface ServerInformation {
    baseUrl: string;
    version: string;
    versionNumbers: number[];
    deploymentType: string;
    buildNumber: number;
    buildDate: string;
    serverTime: string;
    scmInfo: string;
    serverTitle: string;
    healthChecks: HealthCheckResult[];
}