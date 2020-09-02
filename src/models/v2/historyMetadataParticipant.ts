export interface HistoryMetadataParticipant {
    id: string;
    displayName: string;
    displayNameKey: string;
    type: string;
    avatarUrl: string;
    url: string;
    [key: string]: unknown;
}