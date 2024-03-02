import { format } from "prettier";
import BSearch from "binary-searching";
import { TAGS_DEFAULT } from "./roles.js";
function convertToModernType(oldType) {
    return withoutStrings(oldType, (type) => {
        type = type.trim();
        type = type.replace(/\.</g, "<");
        type = type.replace(/\*/g, " any ");
        type = type
            .replace(/^\?\s*(\w+)$/, "$1 | null")
            .replace(/^(\w+)\s*\?$/, "$1 | null");
        let changed = true;
        while (changed) {
            changed = false;
            type = type.replace(/(^|[^$\w\xA0-\uFFFF])Array\s*<((?:[^<>=]|=>|=(?!>)|<(?:[^<>=]|=>|=(?!>))+>)+)>/g, (_, prefix, inner) => {
                changed = true;
                return `${prefix}(${inner})[]`;
            });
        }
        return type;
    });
}
function withoutStrings(type, mapFn) {
    const strings = [];
    let modifiedType = type.replace(/(["'])(?:\\(?:\r\n|[\s\S])|(?!\1)[^\\\r\n])*\1/g, (m) => {
        strings.push(m);
        return `String$${strings.length - 1}$`;
    });
    if (modifiedType.includes("`")) {
        return type;
    }
    modifiedType = mapFn(modifiedType);
    return modifiedType.replace(/String\$(\d+)\$/g, (_, index) => strings[index]);
}
async function formatType(type, options) {
    try {
        const TYPE_START = "type name = ";
        let pretty = type;
        let rest = false;
        if (pretty.startsWith("...")) {
            rest = true;
            pretty = `(${pretty.slice(3)})[]`;
        }
        pretty = await format(`${TYPE_START}${pretty}`, {
            ...options,
            parser: "typescript",
            plugins: [],
            filepath: "file.ts",
        });
        pretty = pretty.slice(TYPE_START.length);
        pretty = pretty
            .replace(/^\s*/g, "")
            .replace(/[;\n]*$/g, "")
            .replace(/^\|/g, "")
            .trim();
        if (rest) {
            pretty = "..." + pretty.replace(/\[\s*\]$/, "");
        }
        return pretty;
    }
    catch (error) {
        return type;
    }
}
function addStarsToTheBeginningOfTheLines(originalComment, comment, options) {
    if ((options.jsdocCommentLineStrategy === "singleLine" &&
        numberOfAStringInString(comment.trim(), "\n") === 0) ||
        (options.jsdocCommentLineStrategy === "keep" &&
            numberOfAStringInString(originalComment, "\n") === 0)) {
        return `* ${comment.trim()} `;
    }
    return `*${comment.replace(/(\n(?!$))/g, "\n * ")}\n `;
}
function numberOfAStringInString(string, search) {
    return (string.match(new RegExp(search, "g")) || []).length;
}
function capitalizer(str) {
    if (!str) {
        return str;
    }
    if (str.match(/^https?:\/\//i)) {
        return str;
    }
    if (str.startsWith("- ")) {
        return str.slice(0, 2) + capitalizer(str.slice(2));
    }
    return str[0].toUpperCase() + str.slice(1);
}
function detectEndOfLine(text) {
    const counter = {
        "\r": 0,
        "\r\n": 0,
        "\n": 0,
    };
    const lineEndPattern = /\r\n?|\n/g;
    let m;
    while ((m = lineEndPattern.exec(text))) {
        counter[m[0]]++;
    }
    const cr = counter["\r"];
    const crlf = counter["\r\n"];
    const lf = counter["\n"];
    const max = Math.max(cr, crlf, lf);
    if (lf === max) {
        return "lf";
    }
    else if (crlf === max) {
        return "crlf";
    }
    else {
        return "cr";
    }
}
function findTokenIndex(tokens, token) {
    return BSearch.eq(tokens, token, (a, b) => {
        if (a.loc.start.line === b.loc.start.line) {
            return a.loc.start.column - b.loc.start.column;
        }
        else {
            return a.loc.start.line - b.loc.start.line;
        }
    });
}
async function formatCode(result, beginningSpace, options) {
    const { printWidth, jsdocKeepUnParseAbleExampleIndent } = options;
    if (result
        .split("\n")
        .slice(1)
        .every((v) => !v.trim() || v.startsWith(beginningSpace))) {
        result = result.replace(new RegExp(`\n${beginningSpace.replace(/[\t]/g, "[\\t]")}`, "g"), "\n");
    }
    try {
        let formattedExample = "";
        const examplePrintWith = printWidth - 4;
        if (result.trim().startsWith("{")) {
            formattedExample = await format(result || "", {
                ...options,
                parser: "json",
                printWidth: examplePrintWith,
            });
        }
        else {
            formattedExample = await format(result || "", {
                ...options,
                printWidth: examplePrintWith,
            });
        }
        result = formattedExample.replace(/(^|\n)/g, `\n${beginningSpace}`);
    }
    catch (err) {
        result = `\n${result
            .split("\n")
            .map((l) => `${beginningSpace}${jsdocKeepUnParseAbleExampleIndent ? l : l.trim()}`)
            .join("\n")}\n`;
        result = result.replace(/^\n[\s]+\n/g, "\n");
    }
    return result;
}
const findPluginByParser = (parserName, options) => {
    const tsPlugin = options.plugins.find((plugin) => {
        return (typeof plugin === "object" &&
            plugin.name &&
            plugin.parsers &&
            plugin.parsers.hasOwnProperty(parserName));
    });
    return !tsPlugin ||
        tsPlugin.name === "prettier-plugin-jsdoc" ||
        tsPlugin.parsers?.hasOwnProperty("jsdoc-parser")
        ? undefined
        : tsPlugin.parsers?.[parserName];
};
const isDefaultTag = (tag) => TAGS_DEFAULT.includes(tag);
export { convertToModernType, formatType, addStarsToTheBeginningOfTheLines, capitalizer, detectEndOfLine, findTokenIndex, formatCode, findPluginByParser, isDefaultTag, };
//# sourceMappingURL=utils.js.map