"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = require("path");
const ava_1 = __importDefault(require("ava"));
const lodash_1 = require("lodash");
const sinon_1 = __importDefault(require("sinon"));
const ts = __importStar(require("typescript"));
const read_default_tsconfig_1 = require("../read-default-tsconfig");
(0, ava_1.default)('should read tsconfig from cwd if without any config', (t) => {
    delete process.env.SWC_NODE_PROJECT;
    const defaultOptions = (0, read_default_tsconfig_1.readDefaultTsConfig)();
    const { config } = ts.readConfigFile((0, path_1.join)(process.cwd(), 'tsconfig.json'), ts.sys.readFile);
    const { options } = ts.parseJsonConfigFileContent(config, ts.sys, process.cwd());
    t.deepEqual((0, lodash_1.omit)(defaultOptions, 'files'), options);
});
(0, ava_1.default)('should RESPECT SWC_NODE_PROJECT env', (t) => {
    const configPath = (0, path_1.join)(__dirname, 'tsconfig.spec.json');
    delete process.env.SWC_NODE_PROJECT;
    delete process.env.TS_NODE_PROJECT;
    process.env.SWC_NODE_PROJECT = configPath;
    const defaultOptions = (0, read_default_tsconfig_1.readDefaultTsConfig)();
    const { config } = ts.readConfigFile(configPath, ts.sys.readFile);
    const { options } = ts.parseJsonConfigFileContent(config, ts.sys, (0, path_1.dirname)(configPath));
    t.deepEqual((0, lodash_1.omit)(defaultOptions, 'files'), options);
});
(0, ava_1.default)('should RESPECT TS_NODE_PROJECT env', (t) => {
    const configPath = (0, path_1.join)(__dirname, 'tsconfig.spec.json');
    delete process.env.SWC_NODE_PROJECT;
    delete process.env.TS_NODE_PROJECT;
    process.env.TS_NODE_PROJECT = configPath;
    const defaultOptions = (0, read_default_tsconfig_1.readDefaultTsConfig)();
    const { config } = ts.readConfigFile(configPath, ts.sys.readFile);
    const { options } = ts.parseJsonConfigFileContent(config, ts.sys, (0, path_1.dirname)(configPath));
    t.deepEqual((0, lodash_1.omit)(defaultOptions, 'files'), options);
});
(0, ava_1.default)('should RESPECT tsconfig path in subdirectory', (t) => {
    const configPath = (0, path_1.join)(__dirname, 'subdirectory/tsconfig.extend.json');
    delete process.env.SWC_NODE_PROJECT;
    delete process.env.TS_NODE_PROJECT;
    process.env.TS_NODE_PROJECT = configPath;
    const defaultOptions = (0, read_default_tsconfig_1.readDefaultTsConfig)();
    const { config } = ts.readConfigFile(configPath, ts.sys.readFile);
    const { options } = ts.parseJsonConfigFileContent(config, ts.sys, (0, path_1.dirname)(configPath));
    t.deepEqual((0, lodash_1.omit)(defaultOptions, 'files'), options);
});
(0, ava_1.default)('should return default compiler options when the tsConfigPath is invalid', (t) => {
    const configPath = (0, path_1.join)(__dirname, 'invalid', 'tsconfig.json');
    delete process.env.SWC_NODE_PROJECT;
    delete process.env.TS_NODE_PROJECT;
    process.env.TS_NODE_PROJECT = configPath;
    const defaultOptions = (0, read_default_tsconfig_1.readDefaultTsConfig)();
    t.deepEqual(defaultOptions, {
        target: ts.ScriptTarget.ES2018,
        module: ts.ModuleKind.CommonJS,
        moduleResolution: ts.ModuleResolutionKind.NodeJs,
        sourceMap: true,
        esModuleInterop: true,
    });
});
(0, ava_1.default)('should RESPECT tsconfig path in subdirectory with a relative path', (t) => {
    const configPath = (0, path_1.join)('..', '__test__', 'tsconfig.spec.json');
    const fullConfigPath = (0, path_1.join)(__dirname, 'tsconfig.spec.json');
    delete process.env.SWC_NODE_PROJECT;
    delete process.env.TS_NODE_PROJECT;
    process.env.TS_NODE_PROJECT = configPath;
    sinon_1.default.replace(process, 'cwd', () => __dirname);
    const defaultOptions = (0, read_default_tsconfig_1.readDefaultTsConfig)();
    sinon_1.default.restore();
    const { config } = ts.readConfigFile(fullConfigPath, ts.sys.readFile);
    const { options } = ts.parseJsonConfigFileContent(config, ts.sys, (0, path_1.dirname)(fullConfigPath));
    t.deepEqual((0, lodash_1.omit)(defaultOptions, 'files'), options);
});
//# sourceMappingURL=read-default-config.spec.js.map