import { exec } from 'node:child_process';
import { randomUUID } from 'node:crypto';
import { createServer } from 'node:http';
import {
  exchangeAuthorizationCode,
  generateAuthorizationUrl,
  getAccessibleResources,
  Version3Client,
} from 'jira.js';
import { config } from './config';

const redirectUri = `http://localhost:${config.port}/callback`;
const CALLBACK_TIMEOUT_MS = 5 * 60 * 1000;

/** Open a URL in the default browser, cross-platform (best-effort). */
function openBrowser(url: string): void {
  const command =
    process.platform === 'darwin'
      ? `open "${url}"`
      : process.platform === 'win32'
        ? `start "" "${url}"`
        : `xdg-open "${url}"`;

  exec(command, error => {
    if (error) {
      console.log('   (Could not open the browser automatically — open the link above manually.)');
    }
  });
}

/** Spin up a temporary server on config.port and wait for ?code=... on /callback. */
function waitForAuthorizationCode(expectedState: string): Promise<string> {
  return new Promise<string>((resolve, reject) => {
    const server = createServer((req, res) => {
      if (!req.url) {
        return;
      }

      const url = new URL(req.url, redirectUri);

      if (url.pathname !== '/callback') {
        res.writeHead(404).end();

        return;
      }

      const respond = (status: number, message: string) => {
        res.writeHead(status, { 'Content-Type': 'text/html; charset=utf-8' });
        res.end(
          `<!doctype html><meta charset="utf-8"><body style="font-family:sans-serif;padding:2rem">` +
            `<h2>${message}</h2><p>You can close this tab and return to the terminal.</p></body>`,
        );
      };

      const cleanup = () => {
        clearTimeout(timeout);
        server.close();
      };

      const error = url.searchParams.get('error');
      const code = url.searchParams.get('code');
      const state = url.searchParams.get('state');

      if (error) {
        respond(400, `❌ Authorization error: ${error}`);
        cleanup();
        reject(new Error(`Authorization failed: ${error} — ${url.searchParams.get('error_description') ?? ''}`));

        return;
      }

      if (state !== expectedState) {
        respond(400, '❌ State mismatch (possible CSRF). Aborted.');
        cleanup();
        reject(new Error('State mismatch — possible CSRF.'));

        return;
      }

      if (!code) {
        respond(400, '❌ No authorization code in the response.');
        cleanup();
        reject(new Error('No authorization code in callback.'));

        return;
      }

      respond(200, '✅ Authorization successful!');
      cleanup();
      resolve(code);
    });

    const timeout = setTimeout(() => {
      server.close();
      reject(new Error(`Timed out waiting for authorization (${CALLBACK_TIMEOUT_MS / 1000}s).`));
    }, CALLBACK_TIMEOUT_MS);

    server.on('error', (err: NodeJS.ErrnoException) => {
      clearTimeout(timeout);

      if (err.code === 'EADDRINUSE') {
        reject(
          new Error(
            `Port ${config.port} is in use. Change "port" in src/config.ts (and the redirect_uri in the developer console).`,
          ),
        );
      } else {
        reject(err);
      }
    });

    server.listen(config.port);
  });
}

async function main(): Promise<void> {
  const state = randomUUID();
  const authUrl = generateAuthorizationUrl({
    clientId: config.clientId,
    scopes: config.scopes,
    redirectUri,
    state,
  });

  console.log('\n1) Opening the browser for sign-in and consent...');
  console.log(`   If it didn't open, go there manually:\n   ${authUrl}\n`);
  console.log(`2) Waiting for the redirect to ${redirectUri} ...`);

  openBrowser(authUrl);

  const code = await waitForAuthorizationCode(state);

  console.log('\n3) Code received. Exchanging it for tokens...');
  const tokens = await exchangeAuthorizationCode({
    clientId: config.clientId,
    clientSecret: config.clientSecret,
    code,
    redirectUri,
  });
  console.log(
    `   ✅ Tokens received (expires_in=${tokens.expiresIn}s, refresh_token=${tokens.refreshToken ? 'yes' : 'no — add the offline_access scope'}).`,
  );

  console.log('\n4) Accessible resources (accessible-resources):');
  const resources = await getAccessibleResources(tokens.accessToken);
  for (const resource of resources) {
    console.log(`   • ${resource.name} — ${resource.url}  (cloudId: ${resource.id})`);
  }

  // No `host`: the cloudId is resolved automatically and the token is refreshed on expiry / 401.
  const client = new Version3Client({
    authentication: {
      oauth2: {
        accessToken: tokens.accessToken,
        refreshToken: tokens.refreshToken,
        clientId: config.clientId,
        clientSecret: config.clientSecret,
        expiresAt: Date.now() + tokens.expiresIn * 1000,
        onTokenRefresh: event => {
          console.log(`\n🔄 Token refreshed automatically. New expiresAt = ${event.expiresAt}`);
        },
      },
    },
  });

  console.log('\n5) Requesting GET /myself (cloudId resolved automatically)...');
  const me = await client.myself.getCurrentUser();

  console.log('\n✅ Done! OAuth 2.0 authentication works.');
  console.log(`   displayName : ${me.displayName}`);
  console.log(`   accountId   : ${me.accountId}`);
  console.log(`   email       : ${me.emailAddress ?? '(hidden by privacy settings)'}`);
  console.log('\nFull response:');
  console.dir(me, { depth: null });
}

main()
  .then(() => process.exit(0))
  .catch((error: unknown) => {
    console.error('\n❌ Error:', error instanceof Error ? error.message : error);
    process.exit(1);
  });
