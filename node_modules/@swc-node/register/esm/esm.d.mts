interface ResolveContext {
    conditions: string[];
    parentURL: string | undefined;
}
interface ResolveResult {
    format?: string;
    shortCircuit?: boolean;
    url: string;
}
type ResolveArgs = [
    specifier: string,
    context?: ResolveContext,
    nextResolve?: (...args: ResolveArgs) => Promise<ResolveResult>
];
type ResolveFn = (...args: Required<ResolveArgs>) => Promise<ResolveResult>;
export declare const resolve: ResolveFn;
interface LoadContext {
    conditions: string[];
    format: string | null | undefined;
}
interface LoadResult {
    format: string;
    shortCircuit?: boolean;
    source: string | ArrayBuffer | SharedArrayBuffer | Uint8Array;
}
type LoadArgs = [url: string, context: LoadContext, nextLoad?: (...args: LoadArgs) => Promise<LoadResult>];
type LoadFn = (...args: Required<LoadArgs>) => Promise<LoadResult>;
export declare const load: LoadFn;
export {};
