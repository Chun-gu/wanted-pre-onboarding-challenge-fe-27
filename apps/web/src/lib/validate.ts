/* eslint-disable no-useless-escape */
/* eslint-disable @typescript-eslint/no-explicit-any */
import z from "zod";

type ValidationError<T> = {
	[K in keyof T]: { message: string };
};

type ValidationResult<TValue, TSchema extends z.Schema> =
	| { isValid: true; data: TValue; error: undefined }
	| { isValid: false; data: undefined; error: z.inferFormattedError<TSchema> };

export function validate<TValue>(
	value: unknown,
	schema: z.Schema<TValue>,
): ValidationResult<TValue, typeof schema> {
	const { success, data, error } = schema.safeParse(value);

	if (success) {
		return { isValid: true, data, error };
	} else {
		return { isValid: false, data, error: error.format() };
	}
}

export function validateFormData<TValue>(
	formData: FormData,
	schema: z.Schema<TValue>,
): ValidationResult<TValue, typeof schema> {
	const formDataObj = Object.fromEntries(formData);

	const { success, data, error } = schema.safeParse(formDataObj);

	if (success) {
		return { isValid: true, data, error };
	} else {
		return { isValid: false, data, error: error.format() };
	}
}

// function formatError(error: ZodError) {
// 	return error.format();
// }

// type GenericObject = { [key: string]: any };
// type FieldValues = Record<string | number, any>;
// type FieldErrors = Record<string, string>;
// type Validator<DataType> = {
// 	validate: (
// 		unvalidatedData: GenericObject | FormData,
// 	) => Promise<ValidationResult<DataType>>;
// };
// type ValidatorError = {
// 	formId?: string;
// 	fieldErrors: FieldErrors;
// };
// type ValidationResult<DataType> = SuccessResult<DataType> | ErrorResult;
// type ErrorResult = BaseResult & {
// 	error: ValidatorError;
// 	data: undefined;
// };
// type SuccessResult<DataType> = BaseResult & {
// 	data: DataType;
// 	error: undefined;
// };
// type BaseResult = { submittedData: GenericObject; formId?: string };
// type CreateValidatorArg<DataType> = {
// 	validate: (
// 		unvalidatedData: GenericObject,
// 	) => Promise<Valid<DataType> | Invalid>;
// };
// type Valid<DataType> = { data: DataType; error: undefined };
// type Invalid = { error: FieldErrors; data: undefined };
// type ValidationErrorResponseData = {
// 	formId?: string;
// 	fieldErrors: FieldErrors;
// 	repopulateFields?: unknown;
// };

// function withZod<T, U extends z.ZodTypeDef>(
// 	zodSchema: z.Schema<T, U, unknown>,
// 	parseParams?: Partial<z.ParseParams>,
// ): Validator<T> {
// 	return createValidator({
// 		validate: async (value) => {
// 			const { success, data, error } = await zodSchema.safeParseAsync(
// 				value,
// 				parseParams,
// 			);

// 			if (success) return { data, error };

// 			const fieldErrors: FieldErrors = {};

// 			getIssuesForError(error).forEach((issue) => {
// 				const path = pathToString(issue.path);
// 				if (!fieldErrors[path]) fieldErrors[path] = issue.message;
// 			});

// 			return { data, error: fieldErrors };
// 		},
// 	});
// }

// const FORM_ID_FIELD_NAME = "rvfFormId";

// function createValidator<T>(validator: CreateValidatorArg<T>): Validator<T> {
// 	return {
// 		validate: async (value) => {
// 			const data = preprocessFormData(value);
// 			const result = await validator.validate(data);
// 			const formId = data[FORM_ID_FIELD_NAME];

// 			if (result.error) {
// 				return {
// 					data: undefined,
// 					error: {
// 						fieldErrors: result.error,
// 						formId,
// 					},
// 					submittedData: data,
// 					formId,
// 				};
// 			}

// 			return {
// 				data: result.data,
// 				error: undefined,
// 				submittedData: data,
// 				formId,
// 			};
// 		},
// 	};
// }

// function preprocessFormData(data: GenericObject | FormData): GenericObject {
// 	// A slightly janky way of determining if the data is a FormData object
// 	// since node doesn't really have FormData
// 	if ("entries" in data && typeof data.entries === "function")
// 		return objectFromPathEntries([...data.entries()]);

// 	// Only need to unflatten if it has object/array syntax
// 	if (Object.keys(data).some((key) => /[\[\]\.]/.test(key)))
// 		return objectFromPathEntries(Object.entries(data));

// 	return data;
// }

// function objectFromPathEntries(entries: [string, any][]) {
// 	const map = new MultiValueMap<string, any>();

// 	entries.forEach(([key, value]) => map.add(key, value));

// 	return [...map.entries()].reduce(
// 		(acc, [key, value]) =>
// 			setPath(acc, key, value.length === 1 ? value[0] : value),
// 		{} as Record<string, any>,
// 	);
// }

// function stringToPathArray<T extends string>(path: T): (string | number)[] {
// 	if (path.length === 0) return [];

// 	const match =
// 		path.match(/^\[(.+?)\](.*)$/) || path.match(/^\.?([^\.\[\]]+)(.*)$/);

// 	if (match) {
// 		const [, key, rest] = match;
// 		return [/^\d+$/.test(key) ? Number(key) : key, ...stringToPathArray(rest)];
// 	}

// 	return [path];
// }

// function setPath<T>(object: T, path: string, value: any) {
// 	// deeply mutate the data
// 	const parts = stringToPathArray(path);
// 	let obj: any = object;

// 	for (let i = 0; i < parts.length - 1; i++) {
// 		const part = parts[i];
// 		const nextPart = parts[i + 1];

// 		if (obj[part] === undefined) {
// 			obj[part] = typeof nextPart === "number" ? [] : {};
// 		}

// 		obj = obj[part];
// 	}

// 	obj[parts[parts.length - 1]] = value;

// 	return object;
// }

// class MultiValueMap<Key, Value> {
// 	private dict: Map<Key, Value[]> = new Map();

// 	add = (key: Key, value: Value) => {
// 		if (this.dict.has(key)) {
// 			this.dict.get(key)!.push(value);
// 		} else {
// 			this.dict.set(key, [value]);
// 		}
// 	};

// 	delete = (key: Key) => {
// 		this.dict.delete(key);
// 	};

// 	remove = (key: Key, value: Value) => {
// 		if (this.dict.has(key) === false) return;

// 		const array = this.dict.get(key)!;
// 		const index = array.indexOf(value);

// 		if (index !== -1) array.splice(index, 1);
// 		if (array.length === 0) this.dict.delete(key);
// 	};

// 	getAll = (key: Key): Value[] => this.dict.get(key) ?? [];

// 	entries = (): IterableIterator<[Key, Value[]]> => this.dict.entries();

// 	keys = (): IterableIterator<Key> => this.dict.keys();

// 	values = (): IterableIterator<Value[]> => this.dict.values();

// 	has = (key: Key): boolean => this.dict.has(key);
// }

// function isValidationErrorResponse<T>(
// 	response: T | ValidationErrorResponseData,
// ): response is ValidationErrorResponseData {
// 	return (
// 		typeof response === "object" &&
// 		response !== null &&
// 		"fieldErrors" in response
// 	);
// }

// function getIssuesForError(err: z.ZodError<any>): z.ZodIssue[] {
// 	const issues = err.issues.flatMap(
// 		(issue) =>
// 			"unionErrors" in issue
// 				? issue.unionErrors.flatMap((err) => getIssuesForError(err))
// 				: [issue],
// 		// if ("unionErrors" in issue) {
// 		// 	return issue.unionErrors.flatMap((err) => getIssuesForError(err));
// 		// } else {
// 		// 	return [issue];
// 		// }
// 	);

// 	return issues;
// }

// function pathToString(array: (string | number)[]): string {
// 	return array.reduce((string: string, item: string | number) => {
// 		const prefix = string === "" ? "" : ".";
// 		return string + (isNaN(Number(item)) ? prefix + item : "[" + item + "]");
// 	}, "");
// }
