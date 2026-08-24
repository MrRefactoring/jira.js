/**
 * Per-call transport options — the last argument of every generated operation.
 *
 * Kept apart from the operation's own parameters, which are a faithful projection of the specification: a field named
 * here can never be mistaken for one the API declares, and the exported parameter types stay exactly what they
 * describe.
 *
 * @public
 */
export interface RequestOptions {
  /**
   * Aborts the request, and any retry back-off it is waiting out.
   *
   * The reason the signal carries is rethrown untouched — a `DOMException` named `AbortError` by default, whatever was
   * passed to `abort()` otherwise, and a `TimeoutError` from `AbortSignal.timeout()`. It is never wrapped in a
   * `NetworkError`: an abort is not a transport failure, and callers branch on the reason they supplied.
   */
  signal?: AbortSignal;
}
