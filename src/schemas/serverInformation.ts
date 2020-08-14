export interface Serverinformation {
    baseUrl: string;
    version: string;
    versionNumbers: any[];
    deploymentType: string;
    buildNumber: number;
    buildDate: string;
    serverTime: string;
    scmInfo: string;
    serverTitle: string;
    healthChecks: any[];
}
