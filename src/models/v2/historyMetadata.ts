import { HistoryMetadataParticipant } from "./historyMetadataParticipant";

export interface HistoryMetadata {
    type: string;
    description: string;
    descriptionKey: string;
    activityDescription: string;
    activityDescriptionKey: string;
    emailDescription: string;
    emailDescriptionKey: string;
    actor: HistoryMetadataParticipant[];
    generator: HistoryMetadataParticipant[];
    cause: HistoryMetadataParticipant[];
    extraData: {
        [key: string]: unknown;
    };
    [key: string]: unknown;
}