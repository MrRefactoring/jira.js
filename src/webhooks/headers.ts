/**
 * The headers Jira attaches to a webhook it delivers.
 *
 * Written in lower case, because that is how they arrive: Node lower-cases every incoming header name, and so does
 * every framework built on it. A capture from a real site carried `x-atlassian-webhook-flow` and
 * `x-atlassian-webhook-identifier` and nothing spelt the way the documentation spells them.
 *
 * Every value is a string. `x-atlassian-webhook-retry` counts retries and reads like a number, but an HTTP header has
 * no numbers in it — parse it if you need one.
 */
export interface WebhookHeaders {
  /**
   * Identifies this delivery. Unique within the site and unchanged across retries, so it is what you record to
   * recognise a webhook you have already handled.
   */
  'x-atlassian-webhook-identifier': string;

  /**
   * Which delivery lane carried it.
   *
   * `Primary` is the event itself and should arrive within thirty seconds. `Secondary` is the fallout of a bulk or
   * cascading change — deleting an issue sends `jira:issue_deleted` as primary and every dependent
   * `comment_deleted`, `attachment_deleted` and `issuelink_deleted` as secondary — and is allowed a quarter of an
   * hour.
   */
  'x-atlassian-webhook-flow': 'Primary' | 'Secondary';

  /** How many times this delivery has been retried. Absent on the first attempt. */
  'x-atlassian-webhook-retry'?: string;

  /**
   * Whatever a Connect app attached to the REST request that caused the event, up to 1024 printable ASCII
   * characters. Absent unless an app set it.
   */
  'x-atlassian-webhook-trace'?: string;

  /**
   * The body's signature, as `method=signature` — `sha256=…` in practice. Present only on a webhook registered with
   * a secret, and the only thing that tells you the request really came from Jira.
   *
   * Pass it to `verifyWebhookSignature` along with the raw body and the secret you registered. A delivery that fails
   * that check is one anyone could have sent.
   */
  'x-hub-signature'?: string;
}
