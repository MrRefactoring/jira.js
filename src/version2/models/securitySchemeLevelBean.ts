import { SecuritySchemeLevelMemberBean } from './securitySchemeLevelMemberBean';

export interface SecuritySchemeLevelBean {
  /** The description of the issue security scheme level. */
  description?: string;
  /** Specifies whether the level is the default level. False by default. */
  isDefault?: boolean;
  /** The list of level members which should be added to the issue security scheme level. */
  members?: SecuritySchemeLevelMemberBean[];
  /** The name of the issue security scheme level. Must be unique. */
  name: string;
}
