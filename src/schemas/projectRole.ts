export interface Projectrole {
    self: string;
    name: string;
    id: number;
    description: string;
    actors: any[];
    scope: any;
    translatedName: string;
    currentUserRole: boolean;
    admin: boolean;
    roleConfigurable: boolean;
    default: boolean;
}
