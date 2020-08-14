export interface Applicationrole {
    key: string;
    groups: any[];
    name: string;
    defaultGroups: any[];
    selectedByDefault: boolean;
    defined: boolean;
    numberOfSeats: number;
    remainingSeats: number;
    userCount: number;
    userCountDescription: string;
    hasUnlimitedSeats: boolean;
    platform: boolean;
}
