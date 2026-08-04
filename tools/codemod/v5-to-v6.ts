/**
 * jira.js 5.x → 6.0 codemod.
 *
 * Rewrites what can be rewritten safely:
 *   - `new Version3Client({…})`        → `createCloudClient({…})`
 *   - `new Version2Client({…})`        → `createCloudClient({…})` with a note — v2 is gone, v3 is the surface now
 *   - `new AgileClient({…})`           → `createAgileClient({…})`
 *   - `new ServiceDeskClient({…})`     → `createServiceDeskClient({…})`
 *   - `authentication: { basic: … }`   → `auth: { type: 'basic', … }`
 *   - `authentication: { oauth2: … }`  → `auth: { type: 'bearer', token }`
 *   - namespace imports (`Version3`)   → `jira.js/cloud`
 *   - trailing callback arguments      → dropped (the API is promise-only)
 *
 * Everything it cannot decide gets a `TODO(jira.js@6)` comment rather than a guess: JWT auth, middlewares, and the
 * places where a v2-only response shape was being read. See MIGRATION.md.
 *
 * Usage, once `jira.js@6` is installed — this file ships in the package:
 *   npx jscodeshift -t node_modules/jira.js/tools/codemod/v5-to-v6.ts --parser ts --extensions ts,tsx,js,jsx src/
 */
import type { API, Collection, FileInfo, JSCodeshift, ObjectExpression, Options } from 'jscodeshift';

const TODO = 'TODO(jira.js@6)';

/** 5.x client class → the factory that replaces it. */
const CLIENT_FACTORIES = new Map<string, string>([
  ['Version3Client', 'createCloudClient'],
  ['Version2Client', 'createCloudClient'],
  ['AgileClient', 'createAgileClient'],
  ['ServiceDeskClient', 'createServiceDeskClient'],
]);

/** Namespace re-exports that became subpath entry points. */
const NAMESPACE_ENTRIES = new Map<string, string>([
  ['Version3', 'jira.js/cloud'],
  ['Version2', 'jira.js/cloud'],
  ['Agile', 'jira.js/agile'],
  ['ServiceDesk', 'jira.js/serviceDesk'],
]);

/** Attaches a note to a node. Takes the node, not the path: some call sites only hold the node. */
function note(j: JSCodeshift, target: { comments?: unknown[] }, message: string): void {
  target.comments = [...(target.comments ?? []), j.commentLine(` ${TODO}: ${message}`, true, false)];
}

/** `authentication: { basic: {…} }` → `auth: { type: 'basic', … }`. */
function rewriteAuthentication(j: JSCodeshift, config: ObjectExpression): void {
  const property = config.properties.find(
    p => p.type === 'ObjectProperty' && p.key.type === 'Identifier' && p.key.name === 'authentication',
  );

  if (!property || property.type !== 'ObjectProperty' || property.value.type !== 'ObjectExpression') return;

  const [variant] = property.value.properties;

  if (variant?.type !== 'ObjectProperty' || variant.key.type !== 'Identifier') return;

  const kind = variant.key.name;

  if (kind === 'jwt') {
    note(j, property as never, 'JWT authentication is not supported in 6.0 — see MIGRATION.md');

    return;
  }

  if (variant.value.type !== 'ObjectExpression') return;

  const fields = [...variant.value.properties];

  if (kind === 'oauth2') {
    const accessToken = fields.find(
      f => f.type === 'ObjectProperty' && f.key.type === 'Identifier' && f.key.name === 'accessToken',
    );

    property.key = j.identifier('auth');
    property.value = j.objectExpression([
      j.objectProperty(j.identifier('type'), j.stringLiteral('bearer')),
      ...(accessToken && accessToken.type === 'ObjectProperty'
        ? [j.objectProperty(j.identifier('token'), accessToken.value as never)]
        : []),
    ]);

    if (!accessToken) {
      note(
        j,
        property as never,
        'the full OAuth 2.0 flow moved to auth: { type: "oauth2", clientId, clientSecret, refreshToken }',
      );
    }

    return;
  }

  property.key = j.identifier('auth');
  property.value = j.objectExpression([
    j.objectProperty(j.identifier('type'), j.stringLiteral(kind)),
    ...(fields as never[]),
  ]);
}

export default function transform(file: FileInfo, api: API, _options: Options): string {
  const j = api.jscodeshift;
  const root: Collection = j(file.source);

  let changed = false;
  const factoriesUsed = new Set<string>();

  root
    .find(j.NewExpression)
    .filter(path => path.node.callee.type === 'Identifier' && CLIENT_FACTORIES.has(path.node.callee.name))
    .forEach(path => {
      const className = (path.node.callee as { name: string }).name;
      const factory = CLIENT_FACTORIES.get(className)!;
      const [config] = path.node.arguments;

      if (config?.type === 'ObjectExpression') rewriteAuthentication(j, config);

      j(path).replaceWith(j.callExpression(j.identifier(factory), path.node.arguments));

      if (className === 'Version2Client') {
        note(
          j,
          path.node as never,
          'Version2Client is gone — this is the v3 surface. Rich-text fields are documents; pass a string to keep wiki markup',
        );
      }

      factoriesUsed.add(factory);
      changed = true;
    });

  root
    .find(j.ImportDeclaration)
    .filter(path => path.node.source.value === 'jira.js')
    .forEach(path => {
      const specifiers = path.node.specifiers ?? [];
      const rewritten = specifiers.map(spec => {
        if (spec.type !== 'ImportSpecifier' || spec.imported.type !== 'Identifier') return spec;

        const factory = CLIENT_FACTORIES.get(spec.imported.name);

        if (!factory) return spec;

        changed = true;

        return j.importSpecifier(j.identifier(factory));
      });

      const seen = new Set<string>();

      path.node.specifiers = rewritten.filter(spec => {
        if (spec.type !== 'ImportSpecifier' || spec.imported.type !== 'Identifier') return true;

        if (seen.has(spec.imported.name)) return false;

        seen.add(spec.imported.name);

        return true;
      });
    });

  root
    .find(j.ImportDeclaration)
    .filter(path => path.node.source.value === 'jira.js')
    .forEach(path => {
      (path.node.specifiers ?? []).forEach(spec => {
        if (spec.type !== 'ImportNamespaceSpecifier' && spec.type !== 'ImportSpecifier') return;

        const name =
          spec.type === 'ImportSpecifier' && spec.imported.type === 'Identifier' ? spec.imported.name : undefined;
        const entry = name && NAMESPACE_ENTRIES.get(name);

        if (!entry) return;

        note(j, path.node as never, `import these from '${entry}' instead of the '${name}' namespace`);
        changed = true;
      });
    });

  root
    .find(j.CallExpression)
    .filter(path => {
      const last = path.node.arguments.at(-1);

      return (
        path.node.arguments.length > 1
        && (last?.type === 'ArrowFunctionExpression' || last?.type === 'FunctionExpression')
        && path.node.callee.type === 'MemberExpression'
      );
    })
    .forEach(path => {
      note(j, path.node as never, 'callbacks were removed — await the promise instead');
      changed = true;
    });

  if (factoriesUsed.size > 0) {
    const hasImport = root
      .find(j.ImportDeclaration)
      .some(path => path.node.source.value === 'jira.js');

    if (!hasImport) {
      root
        .get()
        .node.program.body.unshift(
          j.importDeclaration(
            [...factoriesUsed].map(name => j.importSpecifier(j.identifier(name))),
            j.stringLiteral('jira.js'),
          ),
        );
    }
  }

  return changed ? root.toSource({ quote: 'single' }) : file.source;
}
