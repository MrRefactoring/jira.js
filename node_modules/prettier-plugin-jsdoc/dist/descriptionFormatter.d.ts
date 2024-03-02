import { AllOptions } from "./types.js";
interface DescriptionEndLineParams {
    tag: string;
    isEndTag: boolean;
}
declare function descriptionEndLine({ tag, isEndTag, }: DescriptionEndLineParams): string;
interface FormatOptions {
    tagStringLength?: number;
    beginningSpace: string;
}
declare function formatDescription(tag: string, text: string, options: AllOptions, formatOptions: FormatOptions): Promise<string>;
export { descriptionEndLine, FormatOptions, formatDescription };
