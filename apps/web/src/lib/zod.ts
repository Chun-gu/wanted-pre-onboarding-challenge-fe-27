import { z } from "zod";

import type {
	ZodEffects,
	ZodNullable,
	ZodOptional,
	ZodType,
	ZodTypeAny,
} from "zod";

type IsNullable<T> = Extract<T, null> extends never ? false : true;
type IsOptional<T> = Extract<T, undefined> extends never ? false : true;

type ZodWithEffects<T extends ZodTypeAny> = T | ZodEffects<T, unknown, unknown>;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type ToZodSchema<T extends Record<string, any>> = {
	[K in keyof T]-?: IsNullable<T[K]> extends true
		? ZodWithEffects<ZodNullable<ZodType<T[K]>>>
		: IsOptional<T[K]> extends true
			? ZodWithEffects<ZodOptional<ZodType<T[K]>>>
			: ZodWithEffects<ZodType<T[K]>>;
};

interface Tables {
	id: number;
	name?: string;
}
type ZodTables = ToZodSchema<Tables>;

export const baseClient = z.object({
	id: z.number().positive(),
	name: z.string().min(2).max(200).optional(),
} satisfies ToZodSchema<Tables>);
type BaseClient = z.infer<typeof baseClient>;
// baseClient satisfies Tables;
