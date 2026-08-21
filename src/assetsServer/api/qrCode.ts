import type { GetObjectQrCode } from '../parameters/getObjectQrCode';
import { type Client, type SendRequestOptions, BufferSchema, type Buffer } from '#/core';

/** Get a QR code for an object. */
export async function getObjectQrCode(client: Client, parameters: GetObjectQrCode): Promise<Buffer> {
  const config: SendRequestOptions<Buffer> = {
    url: `/rest/assets/1.0/qrcode/object/${parameters.id}/code.png`,
    method: 'GET',
    headers: {
      Accept: 'image/png',
    },
    searchParams: {
      size: parameters.size,
    },
    schema: BufferSchema,
  };

  return await client.sendRequest(config);
}
