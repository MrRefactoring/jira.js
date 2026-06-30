export interface GetAttachmentContent {
  /** The ID of the attachment. */
  id: string;
  /**
   * Whether a redirect is provided for the attachment download. Clients that do not automatically follow redirects can
   * set this to `false` to avoid making multiple requests to download the attachment.
   */
  redirect?: boolean;
  /**
   * An HTTP `Range` header value to download only a specific byte range of the attachment, e.g. `bytes=0-1023`,
   * `bytes=1024-`, or `bytes=-500`. When set and `redirect` is not provided explicitly, the request is sent with
   * `redirect=false` so the server returns `206 Partial Content` (a `Range` with the default `redirect=true` returns a
   * `303` to a signed URL where range support is not guaranteed). See the
   * [HTTP Range header standard](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Range).
   */
  range?: string;
}
