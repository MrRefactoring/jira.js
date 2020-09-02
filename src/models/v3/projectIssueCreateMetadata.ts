import { AvatarUrlsBean } from "./avatarUrlsBean";
import { IssueTypeIssueCreateMetadata } from "./issueTypeIssueCreateMetadata";

export interface ProjectIssueCreateMetadata {
    expand: string;
    self: string;
    id: string;
    key: string;
    name: string;
    avatarUrls: AvatarUrlsBean[];
    issuetypes: IssueTypeIssueCreateMetadata[];
}