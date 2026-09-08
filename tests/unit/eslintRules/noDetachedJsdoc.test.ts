import { RuleTester } from 'eslint';
import { describe, it } from 'vitest';
import { noDetachedJsdoc } from '../../../eslintRules/noDetachedJsdoc';

RuleTester.describe = describe;
RuleTester.it = it;

const ruleTester = new RuleTester({
  languageOptions: { ecmaVersion: 2022, sourceType: 'module' },
});

ruleTester.run('no-detached-jsdoc', noDetachedJsdoc, {
  valid: [
    "/** What this module is. */\n\nexport const a = 1;\n",
    "import { z } from 'zod';\n\n/** Doc. */\nexport const a = 1;\n",
    "import { z } from 'zod';\n\n/**\n * Doc.\n */\nexport const a = 1;\n",
    "import { z } from 'zod';\n// note\n\nexport const a = 1;\n",
    "import { z } from 'zod';\n/* note */\n\nexport const a = 1;\n",
  ],
  invalid: [
    {
      code: "import { z } from 'zod';\n/** Doc. */\n\nexport const a = 1;\n",
      output: "import { z } from 'zod';\n/** Doc. */\nexport const a = 1;\n",
      errors: [{ messageId: 'detached' }],
    },
    {
      code: "import { z } from 'zod';\n/**\n * Doc.\n */\n\nexport const a = 1;\n",
      output: "import { z } from 'zod';\n/**\n * Doc.\n */\nexport const a = 1;\n",
      errors: [{ messageId: 'detached' }],
    },
    {
      code: 'export const a = {\n  /** Doc. */\n\n  b: 1,\n};\n',
      output: 'export const a = {\n  /** Doc. */\n  b: 1,\n};\n',
      errors: [{ messageId: 'detached' }],
    },
    {
      code: "import { z } from 'zod';\n/** Doc. */\n\n\nexport const a = 1;\n",
      output: "import { z } from 'zod';\n/** Doc. */\nexport const a = 1;\n",
      errors: [{ messageId: 'detached' }],
    },
  ],
});
