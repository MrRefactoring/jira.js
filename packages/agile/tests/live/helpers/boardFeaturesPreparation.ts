import type { Feature } from '#/models/feature';

export const NO_REVERSIBLE_TOGGLE_FEATURE_MESSAGE = 'No reversible toggle feature found on board';

export interface TogglePreparation {
  feature: string;
  state: 'ENABLED' | 'DISABLED';
}

export function isNoReversibleTogglePreparationFailure(error: unknown): boolean {
  if (!(error instanceof Error)) {
    return false;
  }

  return error.message.includes(NO_REVERSIBLE_TOGGLE_FEATURE_MESSAGE);
}

export function getToggleCandidates(features: Feature[] | undefined): TogglePreparation[] {
  return (features ?? [])
    .filter(feature => !feature.toggleLocked && (feature.state === 'ENABLED' || feature.state === 'DISABLED'))
    .map(feature => ({
      feature: feature.boardFeature ?? feature.featureId,
      state: feature.state,
    }))
    .filter((feature): feature is TogglePreparation => !!feature.feature);
}

export function getTogglePreparation(features: Feature[] | undefined): TogglePreparation | undefined {
  return getToggleCandidates(features)[0];
}
