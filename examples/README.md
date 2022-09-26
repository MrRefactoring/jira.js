# Jira.js usage examples

## Table of contents

1. [Initial steps](#initial-steps)
2. Examples
   1. [Basic example](#basic-example)
   2. [Add worklog example](#add-worklog-example)
   3. [Get all worklogs example](#get-all-worklogs-example)

## Initial steps

1. Install dependencies

```shell
npm i
```

2. Specify `host`, `email` and `apiToken` variables in `src/credentials.ts` file

```ts
const host = 'https://your-domain.atlassian.net';
const email = 'YOUR_EMAIL';
const apiToken = 'YOUR_API_TOKEN';
```

## Examples

### Basic example

> ⚠️ Attention, the following behavior is performed:
> 1. If you don't have any projects yet, then a new project is created with the `PROJECT` key, called `My Project`
> 2. If you already have a project, it will create a new `task` named `My first issue` in the first project that comes along

To run the basic example, just run the `basic` script:

```shell
npm run basic
```

---

### Add worklog example

> ⚠️ Attention, the following behavior is performed:
>
> In the first project that comes along, a new task is created, and one new Workflow is added to it

> If you haven't created a project yet, follow the [basic example](#basic-example)

To add a `worklog` run the `addWorklog` script:

```shell
npm run addWorklog
```

---

### Get all worklogs example

> ⚠️ Attention, the following behavior is performed:
>
> The same as in [Add worklog example](#add-worklog-example), and will also get all the worklogs that have been added

> If you haven't created a project yet, follow the [basic example](#basic-example)

To get all worklogs run the `getAllWorklogs` script:

```shell
npm run getAllWorklogs
```
