/* eslint-disable @typescript-eslint/no-explicit-any */
export const isUndefined = (obj: any): obj is undefined => typeof obj === 'undefined';

export const isNil = (val: any): val is null | undefined => isUndefined(val) || val === null;

export const isObject = (fn: any): fn is object => !isNil(fn) && typeof fn === 'object';

export const isString = (val: any): val is string => typeof val === 'string';

export const isNumber = (val: any): val is number => typeof val === 'number';

export interface HttpExceptionOptions {
  /** Original cause of the error */
  cause?: unknown;
  description?: string;
}

export const DEFAULT_EXCEPTION_STATUS = 500;
export const DEFAULT_EXCEPTION_MESSAGE = 'Something went wrong';
export const DEFAULT_EXCEPTION_CODE = 'INTERNAL_SERVER_ERROR';
export const DEFAULT_EXCEPTION_STATUS_TEXT = 'Internal server error';

/** Defines the base HTTP exception, which is handled by the default Exceptions Handler. */
export class HttpException extends Error {
  /**
   * Instantiate a plain HTTP Exception.
   *
   * @example
   *   throw new HttpException('message', HttpStatus.BAD_REQUEST);
   *   throw new HttpException('custom message', HttpStatus.BAD_REQUEST, {
   *     cause: new Error('Cause Error'),
   *   });
   *
   * @param response String, object describing the error condition or the error cause.
   * @param status HTTP response status code.
   * @param options An object used to add an error cause. Configures error chaining support
   * @usageNotes
   * The constructor arguments define the response and the HTTP response status code.
   * - The `response` argument (required) defines the JSON response body. alternatively, it can also be
   *  an error object that is used to define an error [cause](https://nodejs.org/en/blog/release/v16.9.0/#error-cause).
   * - The `status` argument (optional) defines the HTTP Status Code.
   * - The `options` argument (optional) defines additional error options. Currently, it supports the `cause` attribute,
   *  and can be used as an alternative way to specify the error cause: `const error = new HttpException('description', 400, { cause: new Error() });`
   *
   * By default, the JSON response body contains two properties:
   * - `statusCode`: the Http Status Code.
   * - `message`: a short description of the HTTP error by default; override this
   * by supplying a string in the `response` parameter.
   *
   * The `status` argument is required, and should be a valid HTTP status code.
   * Best practice is to use the `HttpStatus` enum imported from `nestjs/common`.
   * @see https://nodejs.org/en/blog/release/v16.9.0/#error-cause
   * @see https://github.com/microsoft/TypeScript/issues/45167
   */
  constructor(
    public readonly response: string | Record<string, any>,
    status?: number,
    options?: HttpExceptionOptions,
  ) {
    super();

    this.name = this.initName();
    this.cause = this.initCause(response, options);
    this.code = this.initCode(response);
    this.message = this.initMessage(response);
    this.status = this.initStatus(response, status);
    this.statusText = this.initStatusText(response, this.status);
  }

  public readonly cause?: unknown;

  public readonly code?: string;

  public readonly status: number;

  public readonly statusText?: string;

  protected initMessage(response: string | Record<string, any>) {
    if (isString(response)) {
      return response;
    }

    if (isObject(response) && isString((response as Record<string, any>).message)) {
      return (response as Record<string, any>).message;
    }

    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
    if (this.constructor) {
      return this.constructor.name.match(/[A-Z][a-z]+|[0-9]+/g)?.join(' ') ?? 'Error';
    }

    return DEFAULT_EXCEPTION_MESSAGE;
  }

  protected initCause(response: string | Record<string, any>, options?: HttpExceptionOptions): unknown {
    if (options?.cause) {
      return options.cause;
    }

    if (isObject(response) && isObject((response as Record<string, any>).cause)) {
      return (response as Record<string, any>).cause;
    }

    return undefined;
  }

  protected initCode(response: string | Record<string, any>): string {
    if (isObject(response) && isString((response as Record<string, any>).code)) {
      return (response as Record<string, any>).code;
    }

    return DEFAULT_EXCEPTION_CODE;
  }

  protected initName(): string {
    return this.constructor.name;
  }

  protected initStatus(response: string | Record<string, any>, status?: number): number {
    if (status) {
      return status;
    }

    if (isObject(response) && isNumber((response as Record<string, any>).status)) {
      return (response as Record<string, any>).status;
    }

    if (isObject(response) && isNumber((response as Record<string, any>).statusCode)) {
      return (response as Record<string, any>).statusCode;
    }

    return DEFAULT_EXCEPTION_STATUS;
  }

  protected initStatusText(response: string | Record<string, any>, status?: number): string | undefined {
    if (isObject(response) && isString((response as Record<string, any>).statusText)) {
      return (response as Record<string, any>).statusText;
    }

    return status ? undefined : DEFAULT_EXCEPTION_STATUS_TEXT;
  }
}
