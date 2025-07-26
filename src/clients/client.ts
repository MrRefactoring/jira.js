import type { Request } from '../request';

export abstract class Client {
  async sendRequest<T>(request: Request): Promise<T> {
    const response = await this.sendRequestWithRawResponse(request);

    return this.handleFetchResponse(response);
  }

  abstract sendRequestWithRawResponse(request: Request): Promise<Response>;

  async handleFetchResponse<T>(response: Response): Promise<T> {
    const contentType = response.headers.get('content-type') || '';

    try {
      if (contentType.includes('application/json')) {
        return await response.json().catch(async () => {
          return undefined;
        });
      } else if (contentType.includes('text/')) {
        return (await response.text()) as T;
      } else if (
        contentType.includes('application/octet-stream') ||
        contentType.includes('application/x-www-form-urlencoded') ||
        !contentType
      ) {
        return (await response.arrayBuffer()) as T;
      } else {
        return response as T;
      }
    } catch (error) {
      // todo
      throw new Error(`Failed to parse response: ${error instanceof Error ? error.message : String(error)}`);
    }
  }
}
