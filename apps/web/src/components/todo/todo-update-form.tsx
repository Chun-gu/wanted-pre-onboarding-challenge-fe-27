import { updateTodo } from "@/apis/todo";
import { validateFormData } from "@/lib/validate";
import { updateTodoSchema } from "@/types/todo";

import type { Todo } from "@/types/todo";

type TodoUpdateFormProps = {
	todo: Todo;
	toggleUpdateMode: () => void;
};

export const TodoUpdateForm = ({
	todo,
	toggleUpdateMode,
}: TodoUpdateFormProps) => {
	async function handleSubmitUpdate(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault();

		const formData = new FormData(e.currentTarget);
		const { isValid, data, error } = validateFormData(
			formData,
			updateTodoSchema,
		);
		for (const [name, value] of formData) {
			if (value === "") return;
		}

		const title = formData.get("todo-title") as string;
		const content = formData.get("todo-content") as string;
		// const formDataObj = Object.fromEntries(formData.entries());
		// const serializedData = JSON.stringify(formDataObj);
		const updatedTodo = await updateTodo({ id: todo.id, title, content });

		toggleUpdateMode();
	}

	return (
		<form onSubmit={handleSubmitUpdate}>
			<input
				type="text"
				name="todo-title"
				id="todo-title"
				defaultValue={todo.title}
			/>
			<textarea
				name="todo-content"
				id="todo-content"
				defaultValue={todo.content}
			/>

			<button type="button" onClick={toggleUpdateMode}>
				취소
			</button>
			<button type="submit">완료</button>
		</form>
	);
};

// function isObjectEntry([, value]: [string, FormDataEntryValue]) {
// 	return value instanceof Object;
// }

// function getObjectTypeName(value: unknown): string {
//   return toString.call(value).slice(8, -1);
// }

// function isFormData(value: unknown): value is FormData {
//   return getObjectTypeName(value) === 'FormData';
// }

// export async function parseForm<
//   T extends ZodRawShape | ZodTypeAny,
//   Parser extends SearchParamsParser<any>
// >(
//   request: Request | FormData,
//   schema: T,
//   options?: Options<Parser>
// ): Promise<ParsedData<T>> {
//   try {
//     const formData = isFormData(request)
//       ? request
//       : await request.clone().formData();
//     const data = await parseFormData(formData, options?.parser);
//     const finalSchema = isZodType(schema) ? schema : z.object(schema);
//     return await finalSchema.parseAsync(data);
//   } catch (error) {
//     throw createErrorResponse(options);
//   }
// }

// /**
//  * Get the form data from a request as an object.
//  */
// function parseFormData(formData: FormData, customParser?: SearchParamsParser) {
// 	const objectEntries = [...formData.entries()].filter(isObjectEntry);
// 	objectEntries.forEach(([key, value]) => {
// 		formData.set(key, JSON.stringify(value));
// 	});
// 	// Context on `as any` usage: https://github.com/microsoft/TypeScript/issues/30584
// 	return parseSearchParams(
// 		new URLSearchParams(formData as unknown as Record<string, string>),
// 		customParser,
// 	);
// }
// /**
//  * Get the URLSearchParams as an object.
//  */
// function parseSearchParams(
// 	searchParams: URLSearchParams,
// 	customParser?: SearchParamsParser,
// ): ParsedSearchParams {
// 	const parser = customParser || parseSearchParamsDefault;
// 	return parser(searchParams);
// }

// /**
//  * The default parser for URLSearchParams.
//  * Get the search params as an object. Create arrays for duplicate keys.
//  */
// const parseSearchParamsDefault: SearchParamsParser = (searchParams) => {
// 	const values: ParsedSearchParams = {};

// 	for (const [key, value] of searchParams) {
// 		const currentVal = values[key];
// 		if (currentVal && Array.isArray(currentVal)) {
// 			currentVal.push(value);
// 		} else if (currentVal) {
// 			values[key] = [currentVal, value];
// 		} else {
// 			values[key] = value;
// 		}
// 	}

// 	return values;
// };

// /**
//  * Function signature to allow for custom URLSearchParams parsing.
//  */
// type SearchParamsParser<T = ParsedSearchParams> = (
// 	searchParams: URLSearchParams,
// ) => T;

// /**
//  * The data returned from parsing a URLSearchParams object.
//  */
// type ParsedSearchParams = Record<string, string | string[]>;
