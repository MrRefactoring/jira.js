import type { OptionsReader } from "..";
import type { Logger } from "../../loggers";
import type { Options } from "../options";
/**
 * Obtains option values from typedoc.json
 *
 * Changes need to happen here at some point. I think we should follow ESLint's new config
 * system eventually: https://eslint.org/blog/2022/08/new-config-system-part-1/
 */
export declare class TypeDocReader implements OptionsReader {
    /**
     * Should run before the tsconfig reader so that it can specify a tsconfig file to read.
     */
    order: number;
    name: string;
    supportsPackages: boolean;
    /**
     * Read user configuration from a typedoc.json or typedoc.js configuration file.
     */
    read(container: Options, logger: Logger, cwd: string): Promise<void>;
    /**
     * Read the given options file + any extended files.
     * @param file
     * @param container
     * @param logger
     */
    private readFile;
    /**
     * Search for the configuration file given path
     *
     * @param  path Path to the typedoc.(js|json) file. If path is a directory
     *   typedoc file will be attempted to be found at the root of this path
     * @return the typedoc.(js|json) file path or undefined
     */
    private findTypedocFile;
}
