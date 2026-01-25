export interface CustomTemplateOptions {
  /**
   * Enable screen delegated admin support for the template. This means screen and associated schemes will be copied
   * rather than referenced.
   */
  enableScreenDelegatedAdminSupport?: boolean;
  /**
   * Enable workflow delegated admin support for the template. This means workflows and workflow schemes will be copied
   * rather than referenced.
   */
  enableWorkflowDelegatedAdminSupport?: boolean;
}
