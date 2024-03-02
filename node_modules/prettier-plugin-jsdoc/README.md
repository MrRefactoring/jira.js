[![NPM](https://nodei.co/npm/prettier-plugin-jsdoc.png)](https://nodei.co/npm/prettier-plugin-jsdoc/)

[![install size](https://packagephobia.now.sh/badge?p=prettier-plugin-jsdoc)](https://packagephobia.now.sh/result?p=prettier-plugin-jsdoc)
[![dependencies](https://david-dm.org/hosseinmd/prettier-plugin-jsdoc.svg)](https://david-dm.org/hosseinmd/prettier-plugin-jsdoc.svg)

![Prettier Banner](https://raw.githubusercontent.com/prettier/prettier-logo/master/images/prettier-banner-light.png)

# prettier-plugin-jsdoc

Prettier plugin for format comment blocks and convert to standard
Match with Visual studio and other IDE which support jsdoc and comments as markdown.

Many good examples of how this plugin work, are in tests directory.
Compare tests and their snapshot

Configured with best practices of jsDoc style guides.

## TOC

- [Installation](#Installation)
- [Examples](#Examples)
- [Links](#Links)
- [Options](#Options)
- [Support](#Support)

## Installation

1. Install and configure Prettier as usual
2. Install prettier-plugin-jsdoc

```npm
npm i prettier-plugin-jsdoc --save
```

```yarn
yarn add prettier-plugin-jsdoc
```

## Config

Set `prettier-plugin-jsdoc` to your plugins list.

.prettierrc

```json
{
  "plugins": ["prettier-plugin-jsdoc"],
};
```

Prettier v3

```json
{
  "plugins": ["./node_modules/prettier-plugin-jsdoc/dist/index.js"]
};
```

If you want ignore some type of files remove "prettier-plugin-jsdoc" from plugins or add empty plugins

```.prettierrc.js
module.exports = {
  "plugins": ["prettier-plugin-jsdoc"]
  overrides: [
    {
      files: '*.tsx',
      options: {
        "plugins": []
      },
    },
  ],
};
```

## Ignore

To ignore prettier use `/* */` or `//` instead of /\*\* \*/

## Examples

#### Single line

```js
/**
 * @param {  string   }    param0 description
 */
function fun(param0) {}
```

Format to

```js
/** @param {string} param0 Description */
function fun(param0) {}
```

#### React Component

```js
/**
 * @type {React.FC<{   message:string}   >}
 */
const Component = memo(({ message }) => {
  return <p>{message}</p>;
});
```

Format to

```js
/** @type {React.FC<{message: string}>} */
const Component = memo(({ message }) => {
  return <p>{message}</p>;
});
```

#### Typescript Objects

```js
/**
 @typedef {
    {
        "userId": {
        "profileImageLink": *,
        "isBusinessUser": "isResellerUser"|"isBoolean"|  "isSubUser" |    "isNot",
        "shareCode": number,
        "referredBy": any,
        },
        id:number
      }
     } User
     */
```

Format to

```js
/**
 * @typedef {{
 *   userId: {
 *     profileImageLink: any;
 *     isBusinessUser: "isResellerUser" | "isBoolean" | "isSubUser" | "isNot";
 *     shareCode: number;
 *     referredBy: any;
 *   };
 *   id: number;
 * }} User
 */
```

#### Example

Add code to example tag

```js
/**
 * @examples
 *   var one= 5
 *   var two=10
 *
 *   if(one > 2) { two += one }
 */
```

to

```js
/**
 * @example
 *   var one = 5;
 *   var two = 10;
 *
 *   if (one > 2) {
 *     two += one;
 *   }
 */
```

#### Description

Description is formatting as Markdown, so you could use any features of Markdown on that. Like code tags ("```js"), header tags like "# AHeader" or other markdown features.

## Options

| Key                               | type                              | Default     | description                                                                               |
| :-------------------------------- | :-------------------------------- | :---------- | ----------------------------------------------------------------------------------------- |
| jsdocSpaces                       | Number                            | 1           |
| jsdocDescriptionWithDot           | Boolean                           | false       |
| jsdocDescriptionTag               | Boolean                           | false       |
| jsdocVerticalAlignment            | Boolean                           | false       |
| jsdocKeepUnParseAbleExampleIndent | Boolean                           | false       |
| jsdocCommentLineStrategy          | ("singleLine","multiline","keep") | "singleLine |
| jsdocCapitalizeDescription        | Boolean                           | true        |
| jsdocSeparateReturnsFromParam     | Boolean                           | false       | Add an space between last @param and @returns                                             |
| jsdocSeparateTagGroups            | Boolean                           | false       | Add an space between tag groups                                                           |
| jsdocPreferCodeFences             | Boolean                           | false       | Always fence code blocks (surround them by triple backticks)                              |
| tsdoc                             | Boolean                           | false       |
| jsdocPrintWidth                   | Number                            | undefined   | If You don't set value to jsdocPrintWidth, the printWidth will be use as jsdocPrintWidth. |
| jsdocLineWrappingStyle            | String                            | "greedy"    | "greedy": Lines wrap as soon as they reach the print width                                |
| jsdocTagsOrder                    | String (object)                   | "undefined" | [Custom Tags Order](doc/CUSTOM_TAGS_ORDER.md)                                             |

Full up to date list and description of options can be found in Prettier help. First install plugin then run Prettier with "--help" option.

`$ prettier --help` # global installation

`$ ./node_modules/.bin/prettier --help` # local installation

## ESLint

Install [eslint-plugin-prettier](https://github.com/prettier/eslint-plugin-prettier)

```
$ yarn add eslint eslint-plugin-prettier
```

Then, in your .eslintrc.json:

```json
{
  "plugins": ["prettier"],
  "rules": {
    "prettier/prettier": "error"
  }
}
```

## Tsdoc

We hope to support whole tsdoc, if we missed somethings please create an issue.

```json
{
  "tsdoc": true
};
```

## Contribute

1- Get a clone/fork of repo

2- Install yarn

3- Add your changes

4- Add a test to your change if needed

5- Create PR

This project extended from @gum3n worked project on GitLab.

## Links

[Prettier](https://prettier.io)

[JSDoc](https://jsdoc.app)

## Supported prettier version

| version | prettier version |
| ------- | ---------------- |
| 1.0.0+  | 3.0.0+           |
| 0.4.2   | 2.x+             |
