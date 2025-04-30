/** ID of a registered webhook or error messages explaining why a webhook wasn't registered. */
export interface RegisteredWebhook {
    /** The ID of the webhook. Returned if the webhook is created. */
    createdWebhookId?: number;
    /** Error messages specifying why the webhook creation failed. */
    errors?: string[];
}
