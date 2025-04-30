/** Container for a request to toggle the state of the feature to ENABLED or DISABLED. */
export interface ProjectFeatureToggleRequest {
    /** The new state for the feature */
    state?: 'ENABLED' | 'DISABLED' | 'COMING_SOON';
}
