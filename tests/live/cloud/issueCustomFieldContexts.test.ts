import { beforeAll, describe, expect, it } from 'vitest';
import { isForbiddenError, isNotFoundError } from '#/core';
import type { CloudClient } from '#/cloud/createCloudClient';
import { getCloudClient } from '../setup/client';

/**
 * Live suite for the `issueCustomFieldContexts` and `issueCustomFieldOptions` APIs.
 *
 * Read-only. A context decides which projects and issue types a custom field applies to, and its options are the
 * values a select field offers. Both are shared configuration: adding an option makes it selectable everywhere the
 * context applies, and deleting one leaves issues holding a value that no longer exists.
 *
 * The concept worth pinning is that a custom field is not a single thing. It has contexts, each with its own options
 * and its own default, and "the field's value list" is meaningless without naming which context. That indirection is
 * behind a lot of confusion about why an option appears in one project and not another.
 */
describe('Jira Cloud — custom field contexts and options (live, read-only)', () => {
  let client: CloudClient;
  let fieldId: string | undefined;
  let permitted = true;

  beforeAll(async () => {
    client = getCloudClient();

    const fields = await client.issueFields.getFields();

    fieldId = fields.find(field => field.custom)?.id;

    if (!fieldId) return;

    permitted = await client.issueCustomFieldContexts
      .getContextsForField({ fieldId, maxResults: 1 })
      .then(() => true)
      .catch(() => false);
  });

  it('lists the contexts of a custom field, or refuses typed', async () => {
    if (!fieldId) return;

    if (!permitted) {
      const error = await client.issueCustomFieldContexts.getContextsForField({ fieldId }).catch((e: unknown) => e);

      expect(isForbiddenError(error) || (error as { status?: number }).status === 401).toBe(true);

      return;
    }

    const page = await client.issueCustomFieldContexts.getContextsForField({ fieldId, maxResults: 10 });

    expect(Array.isArray(page.values)).toBe(true);

    for (const context of page.values ?? []) {
      expect(typeof context.id).toBe('string');
      expect(typeof context.name).toBe('string');
      // `isGlobalContext` and `isAnyIssueType` are what decide the scope; a
      // context that is both applies the field everywhere on the site.
      expect(typeof context.isGlobalContext).toBe('boolean');
      expect(typeof context.isAnyIssueType).toBe('boolean');
    }
  });

  it('filters contexts by scope', async () => {
    if (!fieldId || !permitted) return;

    const global = await client.issueCustomFieldContexts.getContextsForField({
      fieldId,
      isGlobalContext: true,
      maxResults: 10,
    });

    for (const context of global.values ?? []) expect(context.isGlobalContext).toBe(true);
  });

  it('reports the projects a context applies to', async () => {
    if (!fieldId || !permitted) return;

    const contexts = await client.issueCustomFieldContexts.getContextsForField({ fieldId, maxResults: 1 });
    const contextId = Number(contexts.values?.[0]?.id);

    if (!contextId) return;

    const mapping = await client.issueCustomFieldContexts
      .getProjectContextMapping({ fieldId, contextId: [contextId] })
      .catch((e: unknown) => e);

    if (mapping instanceof Error) return;

    const result = mapping as Awaited<ReturnType<typeof client.issueCustomFieldContexts.getProjectContextMapping>>;

    // A global context maps to no projects at all — the empty list means
    // "everywhere", not "nowhere", which is exactly backwards from intuition.
    expect(Array.isArray(result.values)).toBe(true);
  });

  it('reports the issue types a context applies to', async () => {
    if (!fieldId || !permitted) return;

    const contexts = await client.issueCustomFieldContexts.getContextsForField({ fieldId, maxResults: 1 });
    const contextId = Number(contexts.values?.[0]?.id);

    if (!contextId) return;

    const mapping = await client.issueCustomFieldContexts
      .getIssueTypeMappingsForContexts({ contextId: [contextId] })
      .catch((e: unknown) => e);

    if (mapping instanceof Error) return;

    expect(mapping).toBeDefined();
  });

  it('lists the options of a context, which are what a select field offers', async () => {
    if (!fieldId || !permitted) return;

    const contexts = await client.issueCustomFieldContexts.getContextsForField({ fieldId, maxResults: 1 });
    const contextId = Number(contexts.values?.[0]?.id);

    if (!contextId) return;

    const options = await client.issueCustomFieldOptions
      .getOptionsForContext({ fieldId, contextId, maxResults: 20 })
      .catch((e: unknown) => e);

    if (options instanceof Error) {
      // A text or number field has no options at all, and asking produces an
      // error rather than an empty list — the field type decides whether this
      // endpoint is even meaningful.
      expect((options as { status?: number }).status).toBeGreaterThanOrEqual(400);

      return;
    }

    const page = options as Awaited<ReturnType<typeof client.issueCustomFieldOptions.getOptionsForContext>>;

    for (const option of page.values ?? []) {
      expect(typeof option.id).toBe('string');
      expect(typeof option.value).toBe('string');
      expect(typeof option.disabled).toBe('boolean');
    }
  });

  it('reports default values per context rather than per field', async () => {
    if (!fieldId || !permitted) return;

    const defaults = await client.issueCustomFieldContexts
      .getContextDefaultValues({ fieldId, maxResults: 10 })
      .catch((e: unknown) => e);

    if (defaults instanceof Error) return;

    const page = defaults as Awaited<ReturnType<typeof client.issueCustomFieldContexts.getContextDefaultValues>>;

    // Each default is tied to a contextId — the same field can default
    // differently in two projects, which is the whole point of contexts.
    for (const value of page.values ?? []) expect(value.contextId).toBeTruthy();
  });

  it('surfaces an unknown field as a typed error', async () => {
    const error = await client.issueCustomFieldContexts
      .getContextsForField({ fieldId: 'customfield_99999999' })
      .catch((e: unknown) => e);

    expect(error).toBeInstanceOf(Error);
    expect(isNotFoundError(error) || isForbiddenError(error) || (error as { status?: number }).status === 400).toBe(
      true,
    );
  });

  it('fails typed on the destructive path, without ever aiming it at a real context', async () => {
    // Deleting a context removes the field from every project it applied to,
    // and the values stored on their issues go with it.
    const error = await client.issueCustomFieldContexts
      .deleteCustomFieldContext({ fieldId: 'customfield_99999999', contextId: 99999999 })
      .catch((e: unknown) => e);

    expect(error).toBeInstanceOf(Error);
    expect((error as { status?: number }).status).toBeGreaterThanOrEqual(400);
  });
});
