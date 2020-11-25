/**Details of the issue creation metadata for a project.*/
export interface ProjectIssueCreateMetadata {
    /**Expand options that include additional project issue create metadata details in the response.*/
    expand?: string;
    /**The URL of the project.*/
    self?: string;
    /**The ID of the project.*/
    id?: string;
    /**The key of the project.*/
    key?: string;
    /**The name of the project.*/
    name?: string;
    /**List of the project's avatars, returning the avatar size and associated URL.*/
    avatarUrls?: AvatarUrlsBean[];
    /**List of the issue types supported by the project.*/
    issuetypes?: IssueTypeIssueCreateMetadata[];
}