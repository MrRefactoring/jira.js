export interface GetAuditRecords {
    /** The number of records to skip before returning the first result. */
    offset?: number;
    /** The maximum number of results to return. */
    limit?: number;
    /** The strings to match with audit field content, space separated. */
    filter?: string;
    /**
     * The date and time on or after which returned audit records must have been created. If `to` is provided `from` must
     * be before `to` or no audit records are returned.
     */
    from?: string;
    /**
     * The date and time on or before which returned audit results must have been created. If `from` is provided `to` must
     * be after `from` or no audit records are returned.
     */
    to?: string;
}
