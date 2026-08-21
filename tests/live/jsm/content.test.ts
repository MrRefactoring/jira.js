import { beforeAll, describe, expect, inject, it } from 'vitest';
import type { AssetsServerClient } from '#/assetsServer/createAssetsServerClient';
import { assets } from './setup/client';
import { assetName } from './setup/naming';
import type { Fixtures } from './setup/fixtures';

/** The bytes and prose hung off an object: comments, attachments, the icon it wears and the QR code it prints. */
describe('assets content', () => {
  let api: AssetsServerClient;
  let fixtures: Fixtures;

  beforeAll(() => {
    api = assets();
    fixtures = inject('jsmFixtures');
  });

  it('comments on an object and reads the comment back', async () => {
    const created = await api.comments.createComment({
      objectId: fixtures.objectId,
      comment: assetName('comment'),
      role: 0,
    });

    expect(created.id).toBeTypeOf('number');

    const comments = await api.comments.getComments({ objectId: String(fixtures.objectId) });

    expect(comments.some(comment => comment.id === created.id)).toBe(true);
  });

  it('attaches a file to an object, lists it and removes it', async () => {
    const attached = await api.attachments.addAttachments({
      objectId: String(fixtures.objectId),
      attachments: { filename: 'jira-js.txt', content: 'attached by the live suite' },
    });

    const attachment = attached[0];

    expect(attachment?.id).toBeTypeOf('number');

    const listed = await api.attachments.getAttachments({ objectId: String(fixtures.objectId) });

    expect(listed.some(entry => entry.id === attachment!.id)).toBe(true);

    await api.attachments.deleteAttachment({ attachmentId: String(attachment!.id) });
  });

  it('lists the global icons and loads one', async () => {
    const icons = await api.icons.findGlobalIcons();

    expect(icons.some(icon => icon.id === fixtures.iconId)).toBe(true);

    const icon = await api.icons.getIcon({ id: String(fixtures.iconId) });

    expect(icon.id).toBe(fixtures.iconId);
  });

  it('lists the icons a schema declares of its own', async () => {
    const icons = await api.icons.findIcons({ id: String(fixtures.schemaId) });

    expect(Array.isArray(icons)).toBe(true);
  });

  /**
   * The one endpoint on this surface that answers with an image. The document declares an empty `application/json`
   * body for it, so what is checked is that the bytes arrive as a PNG rather than through the JSON parser.
   */
  it('prints an object as a QR code', async () => {
    const png = await api.qrCode.getObjectQrCode({ id: String(fixtures.objectId) });
    const bytes = new Uint8Array(png as unknown as ArrayBufferLike);

    expect([...bytes.slice(0, 4)]).toEqual([0x89, 0x50, 0x4e, 0x47]);
  });
});
