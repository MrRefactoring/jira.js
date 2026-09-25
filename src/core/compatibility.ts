import { z } from 'zod';

export const JsonValueSchema: z.ZodType<z.output<z.ZodAny>, unknown> = z.unknown();

export function nonNullOutput<Schema extends z.ZodType>(
  schema: Schema,
): z.ZodType<Exclude<z.output<Schema>, null>, z.input<Schema>> {
  return schema.transform(value => (value === null ? undefined : value)) as unknown as z.ZodType<
    Exclude<z.output<Schema>, null>,
    z.input<Schema>
  >;
}

export function requiredInResponse<Schema extends z.ZodType>(schema: Schema): z.ZodOptional<Schema> {
  return schema as unknown as z.ZodOptional<Schema>;
}
