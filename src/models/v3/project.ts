import { AvatarUrlsBean } from "./avatarUrlsBean";
import { Component } from "./component";
import { Hierarchy } from "./hierarchy";
import { IssueTypeDetails } from "./issueTypeDetails";
import { ProjectCategory } from "./projectCategory";
import { ProjectInsight } from "./projectInsight";
import { ProjectPermissions } from "./projectPermissions";
import { User } from "./user";
import { Version } from "./version";

export interface Project {
    expand: string;
    self: string;
    id: string;
    key: string;
    description: string;
    lead: User[];
    components: Component[];
    issueTypes: IssueTypeDetails[];
    url: string;
    email: string;
    assigneeType: string;
    versions: Version[];
    name: string;
    roles: {
        [key: string]: unknown;
    };
    avatarUrls: AvatarUrlsBean[];
    projectCategory: ProjectCategory[];
    projectTypeKey: string;
    simplified: boolean;
    style: string;
    favourite: boolean;
    isPrivate: boolean;
    issueTypeHierarchy: Hierarchy[];
    permissions: ProjectPermissions[];
    properties: {
        [key: string]: unknown;
    };
    uuid: string;
    insight: ProjectInsight[];
    deleted: boolean;
    retentionTillDate: string;
    deletedDate: string;
    deletedBy: User[];
    archived: boolean;
    archivedDate: string;
    archivedBy: User[];
}