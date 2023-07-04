# Jira.js Usage Examples

This guide provides examples of using the [`jira.js`](https://github.com/MrRefactoring/jira.js) library to interact with Jira's API. These examples will help you get started with common operations like creating a project, adding a task, adding a worklog, and retrieving all worklogs.

## Table of contents

1. [Getting Started](#getting-started)
2. [Examples](#examples)
   * [Basic Example](#basic-example)
   * [Add Worklog Example](#add-worklog-example)
   * [Get All Worklogs Example](#get-all-worklogs-example)

## Getting Started

Before you start running the examples, make sure to complete the following steps:

1. **Install Dependencies**: The examples require certain Node.js packages to run. Install these dependencies by running the command:

```console
npm i
```

2. **Setup Credentials:** The jira.js library uses your Jira's `host`, `email`, and `apiToken` to authenticate requests. Specify these in the `src/credentials.ts` file:

```typescript
const host = 'https://your-domain.atlassian.net';
const email = 'YOUR_EMAIL';
const apiToken = 'YOUR_API_TOKEN';
```

## Examples

Here are some examples of what you can do with `jira.js`:

### Basic Example

This example creates a new project and a new task in that project.

⚠️ **NOTE:** The script first checks if you have any existing projects.
If you do, it creates a new task in the first project it finds.
If you don't, it creates a new project with the key **PROJECT** and the name **My Project**,
and then creates a task in that project.

To run this example, use the command:

```console
npm run basic
```

---

### Add Worklog Example

This example creates a new task in the first project it finds and adds a worklog to it.

⚠️ **NOTE:** If you don't have any existing projects, you should run the [Basic Example](#basic-example) first to create a project.
One new Worklog will be added.

To run this example, use the command:

```console
npm run addWorklog
```

---

### Get All Worklogs Example

This example creates a new task, adds a worklog to it,
and then retrieves all the worklogs that have been added to the task.

⚠️ **NOTE:** Similar to the Add Worklog Example, you should have an existing project before running this example.
If you don't, run the Basic Example first.

To run this example, use the command:

```console
npm run getAllWorklogs
```
