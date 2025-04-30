/** Details of a project feature. */
export interface ProjectFeature {
    /** The ID of the project. */
    projectId?: number;
    /**
     * The state of the feature. When updating the state of a feature, only ENABLED and DISABLED are supported. Responses
     * can contain all values
     */
    state?: string;
    /** Whether the state of the feature can be updated. */
    toggleLocked?: boolean;
    /** The key of the feature. */
    feature?: string;
    /** List of keys of the features required to enable the feature. */
    prerequisites?: string[];
    /** Localized display name for the feature. */
    localisedName?: string;
    /** Localized display description for the feature. */
    localisedDescription?: string;
    /** URI for the image representing the feature. */
    imageUri?: string;
}
