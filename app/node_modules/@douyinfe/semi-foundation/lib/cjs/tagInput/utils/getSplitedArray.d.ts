/**
 * Get the splited array.
 * We expect separators to be string | string[] | null, but users
 * are also allowed to pass in other types.
 */
declare const getSplitedArray: (originString: string, separators: string | string[] | null) => string[];
export default getSplitedArray;
