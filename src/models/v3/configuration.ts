import { TimeTrackingConfiguration } from "./timeTrackingConfiguration";

export interface Configuration {
    votingEnabled: boolean;
    watchingEnabled: boolean;
    unassignedIssuesAllowed: boolean;
    subTasksEnabled: boolean;
    issueLinkingEnabled: boolean;
    timeTrackingEnabled: boolean;
    attachmentsEnabled: boolean;
    timeTrackingConfiguration: TimeTrackingConfiguration[];
}