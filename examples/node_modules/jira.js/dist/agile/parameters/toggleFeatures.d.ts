export interface ToggleFeatures {
    boardId: number;
    body?: {
        boardId?: number;
        feature?: string;
        enabling?: boolean;
    };
}
