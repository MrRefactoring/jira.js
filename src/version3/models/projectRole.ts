/**Details about the roles in a project.*/
export interface ProjectRole {
    /**The URL the project role details.*/
    self?: string;
    /**The name of the project role.*/
    name?: string;
    /**The ID of the project role.*/
    id?: number;
    /**The description of the project role.*/
    description?: string;
    /**The list of users who act in this role.*/
    actors?: RoleActor[];
    /**The scope of the role. Indicated for roles associated with [next-gen projects](https://confluence.atlassian.com/x/loMyO).*/
    scope?: Scope[];
    /**The translated name of the project role.*/
    translatedName?: string;
    /**Whether the calling user is part of this role.*/
    currentUserRole?: boolean;
    /**Whether this role is the admin role for the project.*/
    admin?: boolean;
    /**Whether the roles are configurable for this project.*/
    roleConfigurable?: boolean;
    /**Whether this role is the default role for the project*/
    default?: boolean;
}