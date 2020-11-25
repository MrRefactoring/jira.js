/**Details of the projects the option is available in.*/
export interface IssueFieldOptionConfiguration {
    /**Defines the projects that the option is available in. If the scope is not defined, then the option is available in all projects.*/
    scope?: IssueFieldOptionScopeBean[];
    /**DEPRECATED*/
    attributes?: string[];
}