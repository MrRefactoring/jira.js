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
 *   - the four renamed methods         → their 6.x names, e.g. `status.search` → `status.searchStatuses`
 *
 * Everything it cannot decide gets a `TODO(jira.js@6)` comment rather than a guess: JWT auth, middlewares, and the
 * places where a v2-only response shape was being read. See MIGRATION.md.
 *
 * Usage, once `jira.js@6` is installed — this file ships in the package:
 *   npx jscodeshift -t node_modules/jira.js/tools/codemod/v5-to-v6.ts --parser ts --extensions ts,tsx,js,jsx src/
 */
import type {
  API,
  ASTPath,
  Collection,
  FileInfo,
  JSCodeshift,
  MemberExpression,
  ObjectExpression,
  Options,
} from 'jscodeshift';

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

const RENAMED_METHODS = new Map<string, Map<string, string>>([
  [
    'issueSearch',
    new Map([
      ['searchForIssuesUsingJqlEnhancedSearch', 'searchIssues'],
      ['searchForIssuesUsingJqlEnhancedSearchPost', 'searchIssuesPost'],
    ]),
  ],
  ['jiraExpressions', new Map([['evaluateJiraExpressionUsingEnhancedSearch', 'evaluateExpression']])],
  ['status', new Map([['search', 'searchStatuses']])],
]);

const FACTORY_NAMES = new Set(CLIENT_FACTORIES.values());

const LIVE_ALIASES = new Set(['status.search']);

const RETIRED_METHOD_REPLACEMENTS = new Map<string, string>(
  [...RENAMED_METHODS].flatMap(([namespace, methods]) =>
    [...methods]
      .filter(([method]) => !LIVE_ALIASES.has(`${namespace}.${method}`))
      .map(([method, replacement]): [string, string] => [method, `${namespace}.${replacement}`]),
  ),
);

type Bindings<T> = Map<string, Map<unknown, T>>;

type Node = { type: string; [key: string]: unknown };

function patternNames(pattern: unknown): string[] {
  const node = pattern as Node | null | undefined;

  switch (node?.type) {
    case 'Identifier':
      return [node.name as string];
    case 'ObjectPattern':
      return (node.properties as Node[]).flatMap(property =>
        patternNames(property.type === 'RestElement' ? property.argument : property.value),
      );
    case 'ArrayPattern':
      return (node.elements as unknown[]).flatMap(patternNames);
    case 'AssignmentPattern':
      return patternNames(node.left);
    case 'RestElement':
      return patternNames(node.argument);
    default:
      return [];
  }
}

function lexicalNames(statement: unknown): string[] {
  const node = statement as Node | null | undefined;

  if (node?.type === 'VariableDeclaration' && node.kind !== 'var') {
    return (node.declarations as Node[]).flatMap(declarator => patternNames(declarator.id));
  }

  if (node?.type === 'ClassDeclaration' || node?.type === 'FunctionDeclaration') {
    return patternNames(node.id);
  }

  return [];
}

function namespaceMemberNames(statement: unknown): string[] {
  const node = statement as Node | null | undefined;
  const declaration = node?.type === 'ExportNamedDeclaration' ? (node.declaration as Node | null) : node;

  if (declaration?.type === 'VariableDeclaration') {
    return (declaration.declarations as Node[]).flatMap(declarator => patternNames(declarator.id));
  }

  return lexicalNames(declaration);
}

function declaresLexically(node: Node, name: string): boolean {
  switch (node.type) {
    case 'Program':
    case 'BlockStatement':
    case 'StaticBlock':
      return (node.body as unknown[]).some(statement => lexicalNames(statement).includes(name));
    case 'TSModuleBlock':
      return (node.body as unknown[]).some(statement => namespaceMemberNames(statement).includes(name));
    case 'ForStatement':
      return lexicalNames(node.init).includes(name);
    case 'ForInStatement':
    case 'ForOfStatement':
      return lexicalNames(node.left).includes(name);
    case 'SwitchStatement':
      return (node.cases as Node[]).some(branch =>
        (branch.consequent as unknown[]).some(statement => lexicalNames(statement).includes(name)),
      );
    default:
      return false;
  }
}

function declaredInNestedBlock(binding: ASTPath, scopeNode: unknown): boolean {
  for (let current = binding.parent; current && current.node !== scopeNode; current = current.parent) {
    const node = current.node as Node;

    if ((node.type === 'VariableDeclaration' && node.kind !== 'var') || node.type === 'ClassDeclaration') {
      const container = current.parent;

      return !(container?.node === scopeNode || (container?.node.type === 'BlockStatement' && container.parent?.node === scopeNode));
    }
  }

  return false;
}

function bindingOwner(path: ASTPath, name: string): unknown {
  let scope = path.scope?.lookup(name);

  while (scope && (scope.getBindings()[name] as ASTPath[]).every(binding => declaredInNestedBlock(binding, scope.node))) {
    scope = scope.parent?.lookup(name);
  }

  const scopeNode = scope?.node;

  for (let current: ASTPath | null = path; current; current = current.parent) {
    if (current.node === scopeNode || declaresLexically(current.node as Node, name)) return current.node;
  }

  return scopeNode;
}

function bind<T>(bindings: Bindings<T>, path: ASTPath, name: string, value: T): void {
  const owners = bindings.get(name) ?? new Map<unknown, T>();

  owners.set(bindingOwner(path, name), value);
  bindings.set(name, owners);
}

function resolve<T>(bindings: Bindings<T>, path: ASTPath, name: string): T | undefined {
  return bindings.get(name)?.get(bindingOwner(path, name));
}

function memberName(node: MemberExpression): string | undefined {
  if (node.computed) return node.property.type === 'StringLiteral' ? node.property.value : undefined;

  return node.property.type === 'Identifier' ? node.property.name : undefined;
}

function collectClients(j: JSCodeshift, root: Collection): Bindings<true> {
  const clients: Bindings<true> = new Map();

  root.find(j.VariableDeclarator).forEach(path => {
    const { id, init } = path.node;

    if (id.type !== 'Identifier' || !init) return;

    const fromFactory =
      init.type === 'CallExpression' && init.callee.type === 'Identifier' && FACTORY_NAMES.has(init.callee.name);
    const fromClass =
      init.type === 'NewExpression' && init.callee.type === 'Identifier' && CLIENT_FACTORIES.has(init.callee.name);

    if (fromFactory || fromClass) bind(clients, path, id.name, true);
  });

  return clients;
}

function collectNamespaceAliases(j: JSCodeshift, root: Collection, clients: Bindings<true>): Bindings<string> {
  const aliases: Bindings<string> = new Map();

  root.find(j.VariableDeclarator).forEach(path => {
    const { id, init } = path.node;

    if (!init) return;

    if (
      id.type === 'Identifier'
      && init.type === 'MemberExpression'
      && init.object.type === 'Identifier'
      && resolve(clients, path, init.object.name)
    ) {
      const namespace = memberName(init);

      if (namespace && RENAMED_METHODS.has(namespace)) bind(aliases, path, id.name, namespace);

      return;
    }

    if (id.type === 'ObjectPattern' && init.type === 'Identifier' && resolve(clients, path, init.name)) {
      id.properties.forEach(property => {
        if (property.type !== 'ObjectProperty' || property.key.type !== 'Identifier') return;

        if (!RENAMED_METHODS.has(property.key.name)) return;

        if (property.value.type === 'Identifier') bind(aliases, path, property.value.name, property.key.name);
      });
    }
  });

  return aliases;
}

/** Attaches a note to a node. Takes the node, not the path: some call sites only hold the node. */
function note(j: JSCodeshift, target: { comments?: { value?: unknown }[] }, message: string): boolean {
  const text = ` ${TODO}: ${message}`;

  if (target.comments?.some(comment => comment.value === text)) return false;

  target.comments = [...(target.comments ?? []), j.commentLine(text, true, false)];

  return true;
}

function noteStatement(j: JSCodeshift, path: ASTPath, message: string): boolean {
  const statements = j(path).closest(j.Statement);
  let statement = (statements.size() > 0 ? statements.paths()[0] : path) as ASTPath;

  while (statement.parent && /^Export/.test(statement.parent.node.type)) statement = statement.parent;

  return note(j, statement.node as never, message);
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
  const importedClasses = new Map<string, string>();

  root
    .find(j.ImportDeclaration)
    .filter(path => path.node.source.value === 'jira.js')
    .forEach(path => {
      (path.node.specifiers ?? []).forEach(spec => {
        if (spec.type !== 'ImportSpecifier' || spec.imported.type !== 'Identifier') return;

        if (CLIENT_FACTORIES.has(spec.imported.name)) {
          importedClasses.set(spec.local?.type === 'Identifier' ? spec.local.name : spec.imported.name, spec.imported.name);
        }
      });
    });

  const clientClass = (callee: unknown): string | undefined => {
    const node = callee as Node;

    if (node.type !== 'Identifier') return undefined;

    const name = node.name as string;

    return importedClasses.get(name) ?? (CLIENT_FACTORIES.has(name) ? name : undefined);
  };

  root
    .find(j.NewExpression)
    .filter(path => clientClass(path.node.callee) !== undefined)
    .forEach(path => {
      const className = clientClass(path.node.callee)!;
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

        return j.importSpecifier(j.identifier(factory), j.identifier(factory));
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

  const clients = collectClients(j, root);
  const namespaceAliases = collectNamespaceAliases(j, root, clients);

  root.find(j.MemberExpression).forEach(path => {
    const method = memberName(path.node);

    if (!method) return;

    const { object } = path.node;
    let namespace: string | undefined;

    if (object.type === 'Identifier') {
      namespace = resolve(namespaceAliases, path, object.name);
    } else if (
      object.type === 'MemberExpression'
      && object.object.type === 'Identifier'
      && resolve(clients, path, object.object.name)
    ) {
      namespace = memberName(object);
    }

    const replacement = namespace && RENAMED_METHODS.get(namespace)?.get(method);

    if (replacement) {
      path.node.property = j.identifier(replacement);
      path.node.computed = false;
      changed = true;

      return;
    }

    const retired = RETIRED_METHOD_REPLACEMENTS.get(method);

    if (retired && !namespace) {
      changed =
        noteStatement(j, path, `\`${method}\` has no 6.x alias — call \`${retired}\` on a jira.js client`) || changed;
    }
  });

  root.find(j.ObjectPattern).forEach(path => {
    path.node.properties.forEach(property => {
      if (property.type !== 'ObjectProperty' || property.key.type !== 'Identifier') return;

      const retired = RETIRED_METHOD_REPLACEMENTS.get(property.key.name);

      if (retired) {
        changed =
          noteStatement(j, path, `\`${property.key.name}\` has no 6.x alias — call \`${retired}\` on a jira.js client`)
          || changed;
      }
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
      changed = noteStatement(j, path, 'callbacks were removed — await the promise instead') || changed;
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
            [...factoriesUsed].map(name => j.importSpecifier(j.identifier(name), j.identifier(name))),
            j.stringLiteral('jira.js'),
          ),
        );
    }
  }

  return changed ? root.toSource({ quote: 'single' }) : file.source;
}
