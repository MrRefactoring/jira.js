import { createServer, request as httpRequest } from 'node:http';
import { connect } from 'node:net';

export function findFreePort(): Promise<number> {
  return new Promise((resolve, reject) => {
    const srv = createServer();

    srv.unref();
    srv.on('error', reject);
    srv.listen(0, '127.0.0.1', () => {
      const addr = srv.address();

      if (addr && typeof addr === 'object') {
        const { port } = addr;
        srv.close(() => resolve(port));
      } else {
        srv.close();
        reject(new Error('Could not determine free port'));
      }
    });
  });
}

export async function waitForPort(port: number, timeoutMs = 1000): Promise<void> {
  const deadline = Date.now() + timeoutMs;

  while (Date.now() < deadline) {
    try {
      await new Promise<void>((resolve, reject) => {
        const socket = connect({ host: '127.0.0.1', port });
        socket.once('connect', () => {
          socket.end();
          resolve();
        });
        socket.once('error', reject);
      });

      return;
    } catch {
      await new Promise(r => setTimeout(r, 10));
    }
  }

  throw new Error(`Timed out waiting for port ${port}`);
}

export interface CallbackResult {
  status: number;
  body: string;
}

export function sendCallback(port: number, path: string, query: string): Promise<CallbackResult> {
  return new Promise((resolve, reject) => {
    const req = httpRequest(
      {
        host: '127.0.0.1',
        port,
        path: query ? `${path}?${query}` : path,
        method: 'GET',
      },
      res => {
        let data = '';
        res.on('data', chunk => (data += chunk));
        res.on('end', () => resolve({ status: res.statusCode ?? 0, body: data }));
        res.on('error', reject);
      },
    );

    req.on('error', reject);
    req.end();
  });
}
