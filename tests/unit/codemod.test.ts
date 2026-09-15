import jscodeshift from 'jscodeshift';
import { describe, expect, it } from 'vitest';
import transform from '../../tools/codemod/v5-to-v6';

const j = jscodeshift.withParser('ts');

function run(source: string): string {
  return transform({ path: 'sample.ts', source }, { jscodeshift: j, j, stats: () => {}, report: () => {} } as never, {});
}

const CLIENT = "const jira = new Version3Client({ host: 'https://example.atlassian.net' });";

describe('v5-to-v6 codemod', () => {
  describe('leaves code that only looks like a client alone', () => {
    it('does not touch String.prototype.search reached through a property named status', () => {
      const out = run(`${CLIENT}\nconst order = { status: 'PENDING' };\nconst hit = order.status.search(/PEND/);`);

      expect(out).toContain('order.status.search(/PEND/)');
      expect(out).not.toContain('order.status.searchStatuses');
    });

    it('does not touch a plain property read named search', () => {
      const out = run(`${CLIENT}\nconst form = { status: 'draft' };\nconst raw = form.status.search;`);

      expect(out).toContain('form.status.search;');
      expect(out).not.toContain('searchStatuses');
    });

    it('does not rewrite through a parameter that shadows the client', () => {
      const out = run(`${CLIENT}\nfunction g(jira: { status: string }) {\n  return jira.status.search(/x/);\n}`);

      expect(out).toContain('jira.status.search(/x/)');
      expect(out).not.toContain('searchStatuses');
    });

    it('does not rewrite through a local that shadows a destructured namespace', () => {
      const out = run(`${CLIENT}\nconst { status } = jira;\nfunction g(url: URL) {\n  const status = url.search;\n  return status.search;\n}`);

      expect(out).toContain('return status.search;');
      expect(out).not.toContain('searchStatuses');
    });

    it('does not rewrite a computed access whose key is a variable', () => {
      const out = run(`${CLIENT}\nconst search = 'search';\nconst box = { status: {} };\nconst v = box.status[search];`);

      expect(out).toContain('box.status[search]');
      expect(out).not.toContain('[searchStatuses]');
    });

    it('does not rewrite through a loop variable that shadows a destructured namespace', () => {
      const out = run(`${CLIENT}\nconst { status } = jira;\nfor (const status of ['a']) {\n  status.search(/done/);\n}`);

      expect(out).toContain('status.search(/done/)');
      expect(out).not.toContain('searchStatuses');
    });

    it('does not rewrite through a block local that shadows the client', () => {
      const out = run(`${CLIENT}\nif (ready) {\n  const jira = other();\n  jira.status.search(/x/);\n}`);

      expect(out).toContain('jira.status.search(/x/)');
      expect(out).not.toContain('searchStatuses');
    });

    it('does not rewrite through a namespace member that shadows the client', () => {
      const out = run(`${CLIENT}\nnamespace N {\n  const jira = other();\n  jira.status.search(/x/);\n}`);

      expect(out).toContain('jira.status.search(/x/)');
      expect(out).not.toContain('searchStatuses');
    });

    it('does not rewrite through an exported namespace var that shadows the client', () => {
      const out = run(`${CLIENT}\nnamespace N {\n  export var jira = other();\n  jira.status.search(/x/);\n}`);

      expect(out).toContain('jira.status.search(/x/)');
      expect(out).not.toContain('searchStatuses');
    });

    it('leaves a file with nothing to change byte for byte', () => {
      const source = "const order = { status: 'PENDING' };\nconst hit = order.status.search(/PEND/);\n";

      expect(run(source)).toBe(source);
    });
  });

  describe('rewrites the renamed methods on a real client', () => {
    it('rewrites a direct call', () => {
      expect(run(`${CLIENT}\njira.status.search({});`)).toContain('jira.status.searchStatuses({})');
    });

    it('rewrites a call inside a namespace that does not shadow the client', () => {
      expect(run(`${CLIENT}\nnamespace N {\n  jira.status.search({});\n}`)).toContain('jira.status.searchStatuses({})');
    });

    it('rewrites a client declared inside a namespace', () => {
      expect(run(`namespace N {\n  ${CLIENT}\n  jira.status.search({});\n}`)).toContain('jira.status.searchStatuses({})');
    });

    it('rewrites a namespace reached through a string key', () => {
      expect(run(`${CLIENT}\njira['status'].search({});`)).toContain('jira[\'status\'].searchStatuses({})');
    });

    it('rewrites a destructured namespace', () => {
      const out = run(`${CLIENT}\nconst { issueSearch } = jira;\nissueSearch.searchForIssuesUsingJqlEnhancedSearch({});`);

      expect(out).toContain('issueSearch.searchIssues({})');
    });

    it('rewrites a namespace held in a variable', () => {
      const out = run(`${CLIENT}\nconst s = jira.issueSearch;\ns.searchForIssuesUsingJqlEnhancedSearchPost({});`);

      expect(out).toContain('s.searchIssuesPost({})');
    });

    it('rewrites a client declared inside a block', () => {
      const out = run("if (ready) {\n  const jira = createCloudClient({ host: 'https://example.atlassian.net' });\n  jira.status.search({});\n}");

      expect(out).toContain('jira.status.searchStatuses({})');
    });

    it('rewrites a call after a sibling block that declares the same name', () => {
      const out = run(`${CLIENT}\nfunction g() {\n  if (x) { const jira = 1; }\n  jira.status.search({});\n}`);

      expect(out).toContain('jira.status.searchStatuses({})');
    });

    it('rewrites a call after a loop whose variable has the same name', () => {
      const out = run(
        `${CLIENT}\nasync function g(items) {\n  for (const jira of items) { log(jira); }\n  await jira.issueSearch.searchForIssuesUsingJqlEnhancedSearch({});\n}`,
      );

      expect(out).toContain('await jira.issueSearch.searchIssues({})');
      expect(out).not.toContain('TODO');
    });

    it('rewrites the jira expression evaluation', () => {
      const out = run(`${CLIENT}\njira.jiraExpressions.evaluateJiraExpressionUsingEnhancedSearch({});`);

      expect(out).toContain('jira.jiraExpressions.evaluateExpression({})');
    });
  });

  describe('migrates the client import', () => {
    it('migrates a file that imports the client from the package', () => {
      const out = run(
        "import { Version3Client } from 'jira.js';\nconst client = new Version3Client({ host: 'https://example.atlassian.net' });\nawait client.status.search({});",
      );

      expect(out).toContain("import { createCloudClient } from 'jira.js';");
      expect(out).toContain("createCloudClient({ host: 'https://example.atlassian.net' })");
      expect(out).toContain('client.status.searchStatuses({})');
    });

    it('migrates a client imported under another name', () => {
      const out = run(
        "import { Version3Client as V3 } from 'jira.js';\nconst client = new V3({ host: 'https://example.atlassian.net' });\nclient.status.search({});",
      );

      expect(out).toContain("import { createCloudClient } from 'jira.js';");
      expect(out).toContain("createCloudClient({ host: 'https://example.atlassian.net' })");
      expect(out).not.toContain('new V3');
      expect(out).toContain('client.status.searchStatuses({})');
    });

    it('adds the import to a file that had none and survives a second run', () => {
      const once = run(`${CLIENT}\njira.status.search({});`);

      expect(once).toContain("import { createCloudClient } from 'jira.js';");
      expect(run(once)).toBe(once);
    });
  });

  describe('flags what it cannot resolve', () => {
    it('notes a retired v5 name taken out of a namespace by destructuring', () => {
      const out = run(`${CLIENT}\nconst { searchForIssuesUsingJqlEnhancedSearch } = jira.issueSearch;`);

      expect(out).toContain('TODO(jira.js@6)');
      expect(out).toContain('issueSearch.searchIssues');
    });

    it('notes a retired v5 name taken out of the client by nested destructuring', () => {
      const out = run(`${CLIENT}\nconst { issueSearch: { searchForIssuesUsingJqlEnhancedSearchPost } } = jira;`);

      expect(out).toContain('TODO(jira.js@6)');
      expect(out).toContain('issueSearch.searchIssuesPost');
    });

    it('notes a retired v5 name on an unknown receiver instead of rewriting it', () => {
      const out = run('unknownThing.searchForIssuesUsingJqlEnhancedSearch({});');

      expect(out).toContain('TODO(jira.js@6)');
      expect(out).toContain('issueSearch.searchIssues');
      expect(out).toContain('unknownThing.searchForIssuesUsingJqlEnhancedSearch({})');
    });

    it('keeps a noted throw parseable', () => {
      const out = run('function g(c) {\n  throw c.issueSearch.searchForIssuesUsingJqlEnhancedSearch;\n}');

      expect(out).toContain('TODO(jira.js@6)');
      expect(() => j(out)).not.toThrow();
      expect(j(out).find(j.ThrowStatement).get().node.argument.type).toBe('MemberExpression');
    });

    it('keeps the argument of a noted yield', () => {
      const out = run('function* saga(c) {\n  yield c.issueSearch.searchForIssuesUsingJqlEnhancedSearch({});\n}');

      expect(out).toContain('TODO(jira.js@6)');
      expect(j(out).find(j.YieldExpression).get().node.argument).not.toBeNull();
    });

    it('does not repeat a note when run twice', () => {
      const once = run('unknownThing.searchForIssuesUsingJqlEnhancedSearch({});');
      const twice = run(once);

      expect(twice.split('TODO(jira.js@6)').length - 1).toBe(1);
    });

    it('stays silent about a bare search on an unknown receiver', () => {
      const out = run('const hit = whatever.status.search(/x/);');

      expect(out).not.toContain('TODO(jira.js@6)');
    });
  });
});
