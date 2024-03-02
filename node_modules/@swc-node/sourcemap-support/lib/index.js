"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.installSourceMapSupport = exports.SourcemapMap = void 0;
const source_map_support_1 = __importDefault(require("source-map-support"));
exports.SourcemapMap = new Map();
function installSourceMapSupport() {
    source_map_support_1.default.install({
        handleUncaughtExceptions: false,
        environment: 'node',
        retrieveSourceMap(file) {
            if (exports.SourcemapMap.has(file)) {
                return {
                    url: file,
                    map: exports.SourcemapMap.get(file),
                };
            }
            return null;
        },
    });
}
exports.installSourceMapSupport = installSourceMapSupport;
//# sourceMappingURL=index.js.map