import config from "../../prettier.config.mjs";

/** @type {import("prettier").Config}*/
export default {
	...config,
	plugins: [
		"@ianvs/prettier-plugin-sort-imports",
		"prettier-plugin-tailwindcss",
	],
	tailwindFunctions: ["cva"],
	importOrder: [
		"<BUILTIN_MODULES>",
		"",
		"^react.*",
		"<THIRD_PARTY_MODULES>",
		"",
		"^@/.*",
		"",
		"^(?!.*[.]css$)[./].*$",
		"",
		"<TYPES>^(node:)",
		"<TYPES>^react.*",
		"<TYPES>",
		"<TYPES>^@/.*",
		"<TYPES>^[.]",
		"",
		".css$",
	],
	importOrderParserPlugins: ["typescript", "jsx"],
	importOrderTypeScriptVersion: "5.6.2",
	importOrderCaseSensitive: true,
};
