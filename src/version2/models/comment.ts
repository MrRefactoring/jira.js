/**A comment.*/
export interface Comment {
    [key: string]: any;
    /**The URL of the comment.*/
    self?: string;
    /**The ID of the comment.*/
    id?: string;
    /**The ID of the user who created the comment.*/
    author?: UserDetails[];
    /**The comment text.*/
    body?: string;
    /**The rendered version of the comment.*/
    renderedBody?: string;
    /**The ID of the user who updated the comment last.*/
    updateAuthor?: UserDetails[];
    /**The date and time at which the comment was created.*/
    created?: string;
    /**The date and time at which the comment was updated last.*/
    updated?: string;
    /**The group or role to which this comment is visible. Optional on create and update.*/
    visibility?: Visibility[];
    /**Whether the comment is visible in Jira Service Desk. Defaults to true when comments are created in the Jira Cloud Platform. This includes when the site doesn't use Jira Service Desk or the project isn't a Jira Service Desk project and, therefore, there is no Jira Service Desk for the issue to be visible on. To create a comment with its visibility in Jira Service Desk set to false, use the Jira Service Desk REST API [Create request comment](https://developer.atlassian.com/cloud/jira/service-desk/rest/#api-rest-servicedeskapi-request-issueIdOrKey-comment-post) operation.*/
    jsdPublic?: boolean;
    /**A list of comment properties. Optional on create and update.*/
    properties?: EntityProperty[];
}