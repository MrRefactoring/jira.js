import { AvatarUrlsBean } from "./avatarUrlsBean";
import { UpdatedProjectCategory } from "./updatedProjectCategory";

export interface ProjectForScope {
    self: string;
    id: string;
    key: string;
    name: string;
    projectTypeKey: string;
    simplified: boolean;
    avatarUrls: AvatarUrlsBean[];
    projectCategory: UpdatedProjectCategory[];
}