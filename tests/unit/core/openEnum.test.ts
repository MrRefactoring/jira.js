import { afterEach, describe, expect, it } from 'vitest';
import { z } from 'zod';
import { openEnum } from '#/core/openEnum';
import { ProjectSchema, type Project } from '#/cloud/models/project';
import { WorkflowCompoundConditionSchema } from '#/cloud/models/workflowCompoundCondition';

/**
 * The audit run is the one place the schemas are held to the letter of the specification. The switch is read when a
 * schema is built rather than when the module loads, so setting the variable around the call is all it takes.
 */
function underAudit<T>(build: () => T): T {
  process.env.AUDIT_SCHEMAS = 'true';

  try {
    return build();
  } finally {
    delete process.env.AUDIT_SCHEMAS;
  }
}

describe('openEnum', () => {
  afterEach(() => {
    delete process.env.AUDIT_SCHEMAS;
  });

  it('accepts a documented value', () => {
    expect(openEnum(['software', 'service_desk']).parse('software')).toBe('software');
  });

  it('accepts a value the specification never mentioned', () => {
    expect(openEnum(['software', 'service_desk']).parse('product_discovery')).toBe('product_discovery');
  });

  it('still rejects something that is not a string', () => {
    const parsed = openEnum(['software']).safeParse(42);

    expect(parsed.success).toBe(false);
    expect(parsed.error?.issues[0].message).toBe("one of 'software', or another string");
  });

  it('survives the wrappers the generated schemas put around it', () => {
    expect(openEnum(['a']).optional().parse(undefined)).toBeUndefined();
    expect(openEnum(['a']).nullable().parse(null)).toBeNull();
    expect(z.array(openEnum(['a'])).parse(['a', 'b'])).toEqual(['a', 'b']);
  });

  it('holds the schemas to the documented values under AUDIT_SCHEMAS', () => {
    const audited = underAudit(() => openEnum(['software', 'service_desk']));
    const rejected = audited.safeParse('product_discovery');

    expect(rejected.success).toBe(false);
    expect(rejected.error?.issues[0].code).toBe('invalid_value');
    expect(audited.safeParse('software').success).toBe(true);
  });
});

describe('the generated schemas', () => {
  it('lets a project type Atlassian added since through', () => {
    const project = ProjectSchema.parse({ id: '1', projectTypeKey: 'something_new' });

    expect(project.projectTypeKey).toBe('something_new');
  });

  it('knows the five project types that exist today', () => {
    for (const key of ['software', 'service_desk', 'business', 'product_discovery', 'customer_service']) {
      expect(ProjectSchema.parse({ projectTypeKey: key }).projectTypeKey).toBe(key);
    }
  });

  it('keeps a discriminating property closed, so a union can still pick a branch', () => {
    const wrongNodeType = WorkflowCompoundConditionSchema.safeParse({ conditions: [], nodeType: 'simple', operator: 'AND' });

    expect(wrongNodeType.success).toBe(false);
  });

  it('suggests the documented values while accepting any string', () => {
    const documented: Project['projectTypeKey'] = 'product_discovery';
    const undocumented: Project['projectTypeKey'] = 'whatever_comes_next';

    expect([documented, undocumented]).toHaveLength(2);

    // @ts-expect-error the type is open now, so it no longer narrows to the documented values alone
    const narrowed: 'software' | 'service_desk' | 'business' = undocumented;

    expect(narrowed).toBe('whatever_comes_next');
  });
});
