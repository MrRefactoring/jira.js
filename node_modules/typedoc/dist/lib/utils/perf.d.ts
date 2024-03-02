export declare function bench<T extends Function>(fn: T, name?: string): T;
export declare function Bench<T extends Function>(value: T, context: ClassMethodDecoratorContext): (this: any, ...args: any) => any;
export declare function measure<T>(cb: () => T): T;
