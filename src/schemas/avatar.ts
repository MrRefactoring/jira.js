export interface Avatar {
    id: string;
    owner: string;
    isSystemAvatar: boolean;
    isSelected: boolean;
    isDeletable: boolean;
    fileName: string;
    urls: any;
}
