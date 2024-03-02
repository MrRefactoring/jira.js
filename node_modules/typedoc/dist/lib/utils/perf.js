"use strict";
/* eslint-disable no-console */
Object.defineProperty(exports, "__esModule", { value: true });
exports.measure = exports.Bench = exports.bench = void 0;
const perf_hooks_1 = require("perf_hooks");
const benchmarks = [];
function bench(fn, name = fn.name) {
    const matching = benchmarks.find((b) => b.name === name);
    const timer = matching || {
        name,
        calls: 0,
        time: 0,
    };
    if (!matching)
        benchmarks.push(timer);
    return function bench(...args) {
        timer.calls++;
        const start = perf_hooks_1.performance.now();
        const end = () => (timer.time += perf_hooks_1.performance.now() - start);
        let result;
        try {
            result = fn.apply(this, args);
        }
        catch (error) {
            end();
            throw error;
        }
        if (result instanceof Promise) {
            result.then((res) => {
                end();
                return res;
            }, () => {
                end();
            });
        }
        else {
            end();
        }
        return result;
    };
}
exports.bench = bench;
function Bench(value, context) {
    let runner;
    return function (...args) {
        if (!runner) {
            const className = Object.getPrototypeOf(this).constructor.name;
            runner = bench(value, `${className}.${String(context.name)}`);
        }
        return runner.apply(this, args);
    };
}
exports.Bench = Bench;
function measure(cb) {
    return bench(cb, "measure()")();
}
exports.measure = measure;
process.on("exit", () => {
    if (!benchmarks.length)
        return;
    const width = benchmarks.reduce((a, b) => Math.max(a, b.name.length), 11);
    console.log("=".repeat(width + 35));
    console.log(`${"Benchmarked".padEnd(width)} | Calls | Time (ms) | Average (ms)`);
    console.log("=".repeat(width + 35));
    for (const { name, calls, time } of benchmarks) {
        console.log(`${name.padEnd(width)} | ${calls.toString().padEnd(5)} | ${time
            .toFixed(2)
            .padEnd(9)} | ${(time / calls).toFixed(2)}`);
    }
    console.log("=".repeat(width + 35));
});
