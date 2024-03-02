import { Spec } from "comment-parser";
import { AllOptions } from "./types.js";
declare const stringify: ({ name, description, type, tag }: Spec, tagIndex: number, finalTagsArray: Spec[], options: AllOptions, maxTagTitleLength: number, maxTagTypeNameLength: number, maxTagNameLength: number) => Promise<string>;
export { stringify };
