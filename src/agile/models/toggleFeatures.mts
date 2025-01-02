export interface ToggleFeatures {
  features?: {
    boardFeature?:
      | 'SIMPLE_ROADMAP'
      | 'BACKLOG'
      | 'SPRINTS'
      | 'CALENDAR'
      | 'DEVTOOLS'
      | 'REPORTS'
      | 'ESTIMATION'
      | 'PAGES'
      | 'CODE'
      | 'SECURITY'
      | 'REQUESTS'
      | 'INCIDENTS'
      | 'RELEASES'
      | 'DEPLOYMENTS'
      | 'ISSUE_NAVIGATOR'
      | 'ON_CALL_SCHEDULE'
      | 'BOARD'
      | 'GOALS'
      | 'LIST_VIEW'
      | string;
    boardId?: number;
    featureId?: string;
    featureType?: 'BASIC' | 'ESTIMATION' | string;
    imageUri?: string;
    learnMoreArticleId?: string;
    learnMoreLink?: string;
    localisedDescription?: string;
    localisedGroup?: string;
    localisedName?: string;
    permissibleEstimationTypes?: {
      localisedDescription?: string;
      localisedName?: string;
      value?: 'STORY_POINTS' | 'ORIGINAL_ESTIMATE' | string;
    }[];
    state?: 'ENABLED' | 'DISABLED' | 'COMING_SOON' | string;
    toggleLocked?: boolean;
  }[];
}
