import { exec } from 'node:child_process';
import { createServer, type IncomingMessage, type ServerResponse } from 'node:http';
import { buildAtlassianAuthUrl } from './buildAtlassianAuthUrl';

const TOKEN_URL = 'https://auth.atlassian.com/oauth/token';
const CALLBACK_TIMEOUT_MS = 5 * 60 * 1000;

export interface ObtainAtlassianOAuthTokensOptions {
  clientId: string;
  clientSecret: string;
  redirectUri: string;
  scope: string;
  state?: string;
  openBrowser?: boolean;
}

export interface AtlassianOAuthTokens {
  accessToken: string;
  expiresIn: number;
  scope: string;
  refreshToken?: string;
}

function randomState(): string {
  const array = new Uint8Array(24);

  if (typeof crypto !== 'undefined') {
    crypto.getRandomValues(array);
  } else {
    for (let i = 0; i < array.length; i++) {
      array[i] = Math.floor(Math.random() * 256);
    }
  }

  return Array.from(array, b => b.toString(16).padStart(2, '0')).join('');
}

function openUrl(url: string): void {
  let command: string;

  if (process.platform === 'darwin') {
    command = 'open';
  } else if (process.platform === 'win32') {
    command = 'start';
  } else {
    command = 'xdg-open';
  }

  exec(`${command} "${url}"`);
}

export async function obtainAtlassianOAuthTokens(
  options: ObtainAtlassianOAuthTokensOptions,
): Promise<AtlassianOAuthTokens> {
  const { clientId, clientSecret, redirectUri, scope, openBrowser = false } = options;
  const state = options.state ?? randomState();

  const authUrl = buildAtlassianAuthUrl({ clientId, redirectUri, scope, state });
  const parsedRedirect = new URL(redirectUri);
  const host = parsedRedirect.hostname || 'localhost';
  const port = parsedRedirect.port ? parseInt(parsedRedirect.port, 10) : 8765;
  const path = parsedRedirect.pathname || '/callback';

  return new Promise((resolve, reject) => {
    const timeout = setTimeout(() => {
      server.close();
      reject(new Error('OAuth callback timeout'));
    }, CALLBACK_TIMEOUT_MS);

    const server = createServer((req: IncomingMessage, res: ServerResponse) => {
      const requestUrl = req.url ?? '';
      const [pathname, query] = requestUrl.split('?');

      if (pathname !== path && pathname !== `${path}/`) {
        res.writeHead(404);
        res.end();

        return;
      }

      const params = new URLSearchParams(query);
      const code = params.get('code');
      const receivedState = params.get('state');

      if (!code || receivedState !== state) {
        res.writeHead(400);
        res.end('Invalid state or missing code');
        server.close();
        clearTimeout(timeout);
        reject(new Error('Invalid state or missing code'));

        return;
      }

      res.writeHead(200, { 'Content-Type': 'text/html' });
      res.end('<!DOCTYPE html><html><body><p>Authorization successful, you can close this window.</p></body></html>');
      server.close();
      clearTimeout(timeout);

      fetch(TOKEN_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          grant_type: 'authorization_code',
          client_id: clientId,
          client_secret: clientSecret,
          code,
          redirect_uri: redirectUri,
        }),
      })
        .then(r => {
          if (!r.ok) {
            return r.text().then(t => {
              throw new Error(`Token exchange failed: ${r.status} ${t}`);
            });
          }

          return r.json();
        })
        .then((data: { access_token: string; expires_in: number; scope: string; refresh_token?: string }) => {
          resolve({
            accessToken: data.access_token,
            expiresIn: data.expires_in,
            scope: data.scope,
            refreshToken: data.refresh_token,
          });
        })
        .catch(reject);
    });

    server.listen(port, host, () => {
      if (openBrowser) {
        openUrl(authUrl);
      }
    });

    server.on('error', err => {
      clearTimeout(timeout);
      reject(err);
    });
  });
}
