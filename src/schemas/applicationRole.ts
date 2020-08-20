export interface ApplicationRole {
    key: string;
    groups: string[];
    name: string;
    defaultGroups: string[];
    selectedByDefault: boolean;
    defined: boolean;
    numberOfSeats: number;
    remainingSeats: number;
    userCount: number;
    userCountDescription: string;
    hasUnlimitedSeats: boolean;
    platform: boolean;
}
