export interface ProjectRoleActorsUpdateBean {
    id: number;
    categorisedActors: {
        [key: string]: unknown;
    };
}