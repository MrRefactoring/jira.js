import { z } from 'zod';

export const JsonValueSchema: z.ZodType<z.output<z.ZodAny>, unknown> = z.unknown();

export function nonNullOutput<Schema extends z.ZodType>(
  schema: Schema,
): z.ZodType<Exclude<z.output<Schema>, null>, z.input<Schema>> {
  return schema as z.ZodType<Exclude<z.output<Schema>, null>, z.input<Schema>>;
}

export function requireResponseKeys<Schema extends z.ZodObject>(
  schema: Schema,
  keys: readonly (keyof z.output<Schema> & string)[],
): Schema {
  return schema.superRefine((value, context) => {
    for (const key of keys) {
      if (value[key] === undefined) {
        context.addIssue({ code: 'custom', message: 'Required', path: [key] });
      }
    }
  });
}
