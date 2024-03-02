"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.readTsConfig = exports.getTypeDocOptionsFromTsConfig = exports.findTsConfigFile = void 0;
const typescript_1 = __importDefault(require("typescript"));
const fs_1 = require("./fs");
const module_1 = require("module");
function findTsConfigFile(path) {
    let fileToRead = path;
    if ((0, fs_1.isDir)(fileToRead)) {
        fileToRead = typescript_1.default.findConfigFile(path, fs_1.isFile);
    }
    if (!fileToRead || !(0, fs_1.isFile)(fileToRead)) {
        return;
    }
    return fileToRead;
}
exports.findTsConfigFile = findTsConfigFile;
// We don't need recursive read checks because that would cause a diagnostic
// when reading the tsconfig for compiler options, which happens first, and we bail before
// doing this in that case.
function getTypeDocOptionsFromTsConfig(file) {
    const readResult = typescript_1.default.readConfigFile(file, fs_1.readFile);
    const result = {};
    if (readResult.error) {
        return result;
    }
    if ("extends" in readResult.config) {
        const resolver = (0, module_1.createRequire)(file);
        const extended = Array.isArray(readResult.config.extends)
            ? readResult.config.extends.map(String)
            : [String(readResult.config.extends)];
        for (const extendedFile of extended) {
            let resolvedParent;
            try {
                resolvedParent = resolver.resolve(extendedFile);
            }
            catch {
                continue;
            }
            Object.assign(result, getTypeDocOptionsFromTsConfig(resolvedParent));
        }
    }
    if ("typedocOptions" in readResult.config) {
        Object.assign(result, readResult.config.typedocOptions);
    }
    return result;
}
exports.getTypeDocOptionsFromTsConfig = getTypeDocOptionsFromTsConfig;
const tsConfigCache = {};
function readTsConfig(path, logger) {
    if (tsConfigCache[path]) {
        return tsConfigCache[path];
    }
    const parsed = typescript_1.default.getParsedCommandLineOfConfigFile(path, {}, {
        ...typescript_1.default.sys,
        onUnRecoverableConfigFileDiagnostic: logger.diagnostic.bind(logger),
    });
    if (!parsed) {
        return;
    }
    logger.diagnostics(parsed.errors);
    tsConfigCache[path] = parsed;
    return parsed;
}
exports.readTsConfig = readTsConfig;
