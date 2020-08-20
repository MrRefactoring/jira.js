import { SecurityLevel } from './securityLevel';

export interface SecurityScheme {
    self: string;
    id: number;
    name: string;
    description: string;
    defaultSecurityLevelId: number;
    levels: SecurityLevel[];
}
