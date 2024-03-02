import type { DefaultThemeRenderContext } from "../DefaultThemeRenderContext";
import { JSX } from "../../../../utils";
import { Reflection } from "../../../../models";
export declare function commentSummary({ markdown }: DefaultThemeRenderContext, props: Reflection): JSX.Element | undefined;
export declare function commentTags({ markdown }: DefaultThemeRenderContext, props: Reflection): JSX.Element | undefined;
export declare function reflectionFlags(_context: DefaultThemeRenderContext, props: Reflection): JSX.Element;
