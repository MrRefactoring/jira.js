import prettier from "prettier";
import { JsdocOptions } from "./types.js";
declare const options: {
    readonly jsdocSpaces: {
        readonly name: "jsdocSpaces";
        readonly type: "int";
        readonly category: "jsdoc";
        readonly default: 1;
        readonly description: "How many spaces will be used to separate tag elements.";
    };
    readonly jsdocDescriptionWithDot: {
        readonly name: "jsdocDescriptionWithDot";
        readonly type: "boolean";
        readonly category: "jsdoc";
        readonly default: false;
        readonly description: "Should dot be inserted at the end of description";
    };
    readonly jsdocDescriptionTag: {
        readonly name: "jsdocDescriptionTag";
        readonly type: "boolean";
        readonly category: "jsdoc";
        readonly default: false;
        readonly description: "Should description tag be used";
    };
    readonly jsdocVerticalAlignment: {
        readonly name: "jsdocVerticalAlignment";
        readonly type: "boolean";
        readonly category: "jsdoc";
        readonly default: false;
        readonly description: "Should tags, types, names and description be aligned";
    };
    readonly jsdocKeepUnParseAbleExampleIndent: {
        readonly name: "jsdocKeepUnParseAbleExampleIndent";
        readonly type: "boolean";
        readonly category: "jsdoc";
        readonly default: false;
        readonly description: "Should unParseAble example (pseudo code or no js code) keep its indentation";
    };
    readonly jsdocSingleLineComment: {
        readonly name: "jsdocSingleLineComment";
        readonly type: "boolean";
        readonly category: "jsdoc";
        readonly deprecated: "use jsdocCommentLineStrategy instead will be remove on v2";
        readonly default: true;
        readonly description: "Should compact single line comment";
    };
    readonly jsdocCommentLineStrategy: {
        readonly name: "jsdocCommentLineStrategy";
        readonly type: "choice";
        readonly choices: {
            since?: string | undefined;
            value: any;
            description: string;
        }[];
        readonly category: "jsdoc";
        readonly default: "singleLine";
        readonly description: "How comments line should be";
    };
    readonly jsdocSeparateReturnsFromParam: {
        readonly name: "jsdocSeparateReturnsFromParam";
        readonly type: "boolean";
        readonly category: "jsdoc";
        readonly default: false;
        readonly description: "Add an space between last @param and @returns";
    };
    readonly jsdocSeparateTagGroups: {
        readonly name: "jsdocSeparateTagGroups";
        readonly type: "boolean";
        readonly category: "jsdoc";
        readonly default: false;
        readonly description: "Add an space between tag groups";
    };
    readonly jsdocCapitalizeDescription: {
        readonly name: "jsdocCapitalizeDescription";
        readonly type: "boolean";
        readonly category: "jsdoc";
        readonly default: true;
        readonly description: "Should capitalize first letter of description";
    };
    readonly tsdoc: {
        readonly name: "tsdoc";
        readonly type: "boolean";
        readonly category: "jsdoc";
        readonly default: false;
        readonly description: "Should format as tsdoc";
    };
    readonly jsdocPrintWidth: {
        readonly name: "jsdocPrintWidth";
        readonly type: "int";
        readonly category: "jsdoc";
        readonly default: undefined;
        readonly description: "If You don't set value to jsdocPrintWidth, the printWidth will be use as jsdocPrintWidth.";
    };
    readonly jsdocAddDefaultToDescription: {
        readonly name: "jsdocAddDefaultToDescription";
        readonly type: "boolean";
        readonly category: "jsdoc";
        readonly default: true;
        readonly description: "Add Default value of a param to end description";
    };
    readonly jsdocPreferCodeFences: {
        readonly name: "jsdocPreferCodeFences";
        readonly type: "boolean";
        readonly category: "jsdoc";
        readonly default: false;
        readonly description: "Prefer to render code blocks using \"fences\" (triple backticks). If not set, blocks without a language tag will be rendered with a four space indentation.";
    };
    readonly jsdocLineWrappingStyle: {
        readonly name: "jsdocLineWrappingStyle";
        readonly type: "choice";
        readonly choices: {
            since?: string | undefined;
            value: any;
            description: string;
        }[];
        readonly category: "jsdoc";
        readonly default: "greedy";
        readonly description: "Strategy for wrapping lines for the given print width. More options may be added in the future.";
    };
    readonly jsdocTagsOrder: {
        readonly name: "jsdocTagsOrder";
        readonly type: "string";
        readonly category: "jsdoc";
        readonly default: undefined;
        readonly description: "How many spaces will be used to separate tag elements.";
    };
};
declare const defaultOptions: JsdocOptions;
declare const parsers: {
    readonly babel: {
        preprocess: (text: string, options: prettier.ParserOptions) => string;
        parse: any;
        astFormat: string;
        hasPragma?: ((text: string) => boolean) | undefined;
        locStart: (node: any) => number;
        locEnd: (node: any) => number;
    };
    readonly "babel-flow": {
        preprocess: (text: string, options: prettier.ParserOptions) => string;
        parse: any;
        astFormat: string;
        hasPragma?: ((text: string) => boolean) | undefined;
        locStart: (node: any) => number;
        locEnd: (node: any) => number;
    };
    readonly "babel-ts": {
        preprocess: (text: string, options: prettier.ParserOptions) => string;
        parse: any;
        astFormat: string;
        hasPragma?: ((text: string) => boolean) | undefined;
        locStart: (node: any) => number;
        locEnd: (node: any) => number;
    };
    readonly flow: {
        preprocess: (text: string, options: prettier.ParserOptions) => string;
        parse: any;
        astFormat: string;
        hasPragma?: ((text: string) => boolean) | undefined;
        locStart: (node: any) => number;
        locEnd: (node: any) => number;
    };
    readonly typescript: prettier.Parser<any>;
    readonly "jsdoc-parser": {
        preprocess: (text: string, options: prettier.ParserOptions) => string;
        parse: any;
        astFormat: string;
        hasPragma?: ((text: string) => boolean) | undefined;
        locStart: (node: any) => number;
        locEnd: (node: any) => number;
    };
};
export { options, parsers, defaultOptions };
export type Options = Partial<JsdocOptions>;
