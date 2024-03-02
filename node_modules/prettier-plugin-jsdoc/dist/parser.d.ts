import { AST, AllOptions } from "./types.js";
import { Parser } from "prettier";
export declare const getParser: (originalParse: Parser["parse"], parserName: string) => (text: string, parsersOrOptions: Parameters<Parser["parse"]>[1], maybeOptions?: AllOptions) => Promise<AST>;
