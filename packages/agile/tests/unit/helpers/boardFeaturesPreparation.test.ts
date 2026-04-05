import { describe, expect, it } from 'vitest';
import type { Feature } from '#/models/feature';
import {
  getToggleCandidates,
  getTogglePreparation,
  isNoReversibleTogglePreparationFailure,
  NO_REVERSIBLE_TOGGLE_FEATURE_MESSAGE,
} from '../../live/helpers/boardFeaturesPreparation';

describe('getTogglePreparation', () => {
  it('returns first unlocked ENABLED or DISABLED feature with boardFeature', () => {
    const features: Feature[] = [
      { boardFeature: 'BACKLOG', state: 'COMING_SOON', toggleLocked: false },
      { state: 'ENABLED', toggleLocked: false },
      { boardFeature: 'SPRINTS', state: 'ENABLED', toggleLocked: true },
      { boardFeature: 'REPORTS', state: 'DISABLED', toggleLocked: false },
    ];

    const result = getTogglePreparation(features);

    expect(result).toEqual({
      feature: 'REPORTS',
      state: 'DISABLED',
    });
  });

  it('returns undefined when no toggleable feature exists', () => {
    const features: Feature[] = [
      { boardFeature: 'BACKLOG', state: 'COMING_SOON', toggleLocked: false },
      { boardFeature: 'SPRINTS', state: 'ENABLED', toggleLocked: true },
      { boardFeature: 'REPORTS', state: 'DISABLED', toggleLocked: true },
    ];

    const result = getTogglePreparation(features);

    expect(result).toBeUndefined();
  });
});

describe('isNoReversibleTogglePreparationFailure', () => {
  it('returns true when message contains the no-reversible marker', () => {
    expect(isNoReversibleTogglePreparationFailure(new Error(NO_REVERSIBLE_TOGGLE_FEATURE_MESSAGE))).toBe(true);
    expect(
      isNoReversibleTogglePreparationFailure(
        new Error(
          `Unable to prepare board for toggleFeatures after 5 attempts. Last error: ${NO_REVERSIBLE_TOGGLE_FEATURE_MESSAGE}`,
        ),
      ),
    ).toBe(true);
  });

  it('returns false for unrelated errors', () => {
    expect(isNoReversibleTogglePreparationFailure(new Error('network'))).toBe(false);
    expect(isNoReversibleTogglePreparationFailure(null)).toBe(false);
  });
});

describe('getToggleCandidates', () => {
  it('returns candidates with boardFeature first and unlocked reversible state', () => {
    const features: Feature[] = [
      { boardFeature: 'BACKLOG', state: 'COMING_SOON', toggleLocked: false },
      { boardFeature: 'SPRINTS', state: 'ENABLED', toggleLocked: true },
      { boardFeature: 'REPORTS', state: 'DISABLED', toggleLocked: false },
      { boardFeature: 'GOALS', state: 'ENABLED', toggleLocked: false },
    ];

    const result = getToggleCandidates(features);

    expect(result).toEqual([
      { feature: 'REPORTS', state: 'DISABLED' },
      { feature: 'GOALS', state: 'ENABLED' },
    ]);
  });

  it('falls back to featureId when boardFeature is missing', () => {
    const features: Feature[] = [{ featureId: 'custom-feature', state: 'ENABLED', toggleLocked: false }];

    const result = getToggleCandidates(features);

    expect(result).toEqual([{ feature: 'custom-feature', state: 'ENABLED' }]);
  });

  it('prefers boardFeature over featureId when both present', () => {
    const features: Feature[] = [
      { boardFeature: 'BACKLOG', featureId: 'custom-id', state: 'DISABLED', toggleLocked: false },
    ];

    const result = getToggleCandidates(features);

    expect(result).toEqual([{ feature: 'BACKLOG', state: 'DISABLED' }]);
  });
});
