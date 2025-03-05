export function classNames(
	...classes: Array<string | false | null | undefined>
) {
	return classes.filter(Boolean).join(" ");
}

/**
<div
  classNames={classNames(
    'flex flex-col items-center',
    'bg-blue-500 hover:bg-blue-400',
    'text-white',
  )}
/> 
 */

// type ClassDictionary = Record<string, unknown>;
// type ClassValue =
// 	| ClassArray
// 	| ClassDictionary
// 	| string
// 	| number
// 	| bigint
// 	| null
// 	| boolean
// 	| undefined;
// type ClassArray = ClassValue[];

// function toValue(mix: unknown) {
// 	let k,
// 		y,
// 		str = "";

// 	if (typeof mix === "string" || typeof mix === "number") {
// 		str += mix;
// 	} else if (typeof mix === "object") {
// 		if (Array.isArray(mix)) {
// 			const len = mix.length;

// 			for (k = 0; k < len; k++) {
// 				if (mix[k]) {
// 					if ((y = toValue(mix[k]))) {
// 						if (str) str += " ";
// 						str += y;
// 					}
// 				}
// 			}
// 		} else {
// 			for (y in mix) {
// 				if (mix[y]) {
// 					if (str) str += " ";
// 					str += y;
// 				}
// 			}
// 		}
// 	}

// 	return str;
// }

// export function clsx(...args: Array<ClassValue>): string {
// 	let str = "";

// 	for (const arg of args) {
// 		const value = toValue(arg);

// 		if (value) {
// 			if (str) str += " ";
// 			str += value;
// 		}
// 	}

// 	// for (let i = 0; i < len; i++) {
// 	// 	if ((tmp = arguments[i])) {
// 	// 		if ((x = toValue(tmp))) {
// 	// 			if (str) str += " ";
// 	// 			str += x;
// 	// 		}
// 	// 	}
// 	// }

// 	return str;
// }

// export default clsx;
