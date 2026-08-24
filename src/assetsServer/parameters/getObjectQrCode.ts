import { z } from 'zod';

export const GetObjectQrCodeSchema = z.object({
  /** The size of the QR code. */
  size: z.string().optional(),
  /** The ID of the object to retrieve the QR code for. */
  id: z.string(),
});

export type GetObjectQrCode = z.input<typeof GetObjectQrCodeSchema>;
