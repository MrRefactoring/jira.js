import * as Models from './models';
import * as Parameters from './parameters';
import { Client } from '../clients';
import { Callback } from '../callback';
import { RequestConfig } from '../requestConfig';

export class IssueCustomFieldOptions {
  constructor(private client: Client) { }
  async getOptionsForField<T = Models.PageBeanCustomFieldOptionDetails>(parameters: Parameters.GetOptionsForField, callback: Callback<T>): Promise<void>;
  async getOptionsForField<T = Models.PageBeanCustomFieldOptionDetails>(parameters: Parameters.GetOptionsForField, callback?: undefined): Promise<T>;
  async getOptionsForField<T = Models.PageBeanCustomFieldOptionDetails>(parameters: Parameters.GetOptionsForField, callback?: Callback<T>): Promise<void | T> {
    const config = ({
      url: `/rest/api/2/customField/${parameters.fieldId}/option`,
      method: 'GET',
      params: {
        startAt: parameters.startAt,
        maxResults: parameters.maxResults,
      },
    } as RequestConfig);

    return this.client.sendRequest(config, callback);
  }
  async createCustomFieldOptions<T = any>(parameters: Parameters.CreateCustomFieldOptions, callback: Callback<T>): Promise<void>;
  async createCustomFieldOptions<T = any>(parameters: Parameters.CreateCustomFieldOptions, callback?: undefined): Promise<T>;
  async createCustomFieldOptions<T = any>(parameters: Parameters.CreateCustomFieldOptions, callback?: Callback<T>): Promise<void | T> {
    const config = ({
      url: `/rest/api/2/customField/${parameters.fieldId}/option`,
      method: 'POST',
      data: {
        options: parameters.options,
      },
    } as RequestConfig);

    return this.client.sendRequest(config, callback);
  }
  async updateCustomFieldOptions<T = void>(parameters: Parameters.UpdateCustomFieldOptions, callback: Callback<T>): Promise<void>;
  async updateCustomFieldOptions<T = void>(parameters: Parameters.UpdateCustomFieldOptions, callback?: undefined): Promise<T>;
  async updateCustomFieldOptions<T = void>(parameters: Parameters.UpdateCustomFieldOptions, callback?: Callback<T>): Promise<void | T> {
    const config = ({
      url: `/rest/api/2/customField/${parameters.fieldId}/option`,
      method: 'PUT',
      data: {
        options: parameters.options,
      },
    } as RequestConfig);

    return this.client.sendRequest(config, callback);
  }
  async getCustomFieldOption<T = Models.CustomFieldOption>(parameters: Parameters.GetCustomFieldOption, callback: Callback<T>): Promise<void>;
  async getCustomFieldOption<T = Models.CustomFieldOption>(parameters: Parameters.GetCustomFieldOption, callback?: undefined): Promise<T>;
  async getCustomFieldOption<T = Models.CustomFieldOption>(parameters: Parameters.GetCustomFieldOption, callback?: Callback<T>): Promise<void | T> {
    const config = ({
      url: `/rest/api/2/customFieldOption/${parameters.id}`,
      method: 'GET',
    } as RequestConfig);

    return this.client.sendRequest(config, callback);
  }
  async getOptionsForContext<T = Models.PageBeanCustomFieldContextOption>(parameters: Parameters.GetOptionsForContext, callback: Callback<T>): Promise<void>;
  async getOptionsForContext<T = Models.PageBeanCustomFieldContextOption>(parameters: Parameters.GetOptionsForContext, callback?: undefined): Promise<T>;
  async getOptionsForContext<T = Models.PageBeanCustomFieldContextOption>(parameters: Parameters.GetOptionsForContext, callback?: Callback<T>): Promise<void | T> {
    const config = ({
      url: `/rest/api/2/field/${parameters.fieldId}/context/${parameters.contextId}/option`,
      method: 'GET',
      params: {
        optionId: parameters.optionId,
        onlyOptions: parameters.onlyOptions,
        startAt: parameters.startAt,
        maxResults: parameters.maxResults,
      },
    } as RequestConfig);

    return this.client.sendRequest(config, callback);
  }
  async createCustomFieldOption<T = Models.CustomFieldCreatedContextOptionsList>(parameters: Parameters.CreateCustomFieldOption, callback: Callback<T>): Promise<void>;
  async createCustomFieldOption<T = Models.CustomFieldCreatedContextOptionsList>(parameters: Parameters.CreateCustomFieldOption, callback?: undefined): Promise<T>;
  async createCustomFieldOption<T = Models.CustomFieldCreatedContextOptionsList>(parameters: Parameters.CreateCustomFieldOption, callback?: Callback<T>): Promise<void | T> {
    const config = ({
      url: `/rest/api/2/field/${parameters.fieldId}/context/${parameters.contextId}/option`,
      method: 'POST',
      data: {
        options: parameters.options,
      },
    } as RequestConfig);

    return this.client.sendRequest(config, callback);
  }
  async updateCustomFieldOption<T = Models.CustomFieldUpdatedContextOptionsList>(parameters: Parameters.UpdateCustomFieldOption, callback: Callback<T>): Promise<void>;
  async updateCustomFieldOption<T = Models.CustomFieldUpdatedContextOptionsList>(parameters: Parameters.UpdateCustomFieldOption, callback?: undefined): Promise<T>;
  async updateCustomFieldOption<T = Models.CustomFieldUpdatedContextOptionsList>(parameters: Parameters.UpdateCustomFieldOption, callback?: Callback<T>): Promise<void | T> {
    const config = ({
      url: `/rest/api/2/field/${parameters.fieldId}/context/${parameters.contextId}/option`,
      method: 'PUT',
      data: {
        options: parameters.options,
      },
    } as RequestConfig);

    return this.client.sendRequest(config, callback);
  }
  async reorderCustomFieldOptions<T = void>(parameters: Parameters.ReorderCustomFieldOptions, callback: Callback<T>): Promise<void>;
  async reorderCustomFieldOptions<T = void>(parameters: Parameters.ReorderCustomFieldOptions, callback?: undefined): Promise<T>;
  async reorderCustomFieldOptions<T = void>(parameters: Parameters.ReorderCustomFieldOptions, callback?: Callback<T>): Promise<void | T> {
    const config = ({
      url: `/rest/api/2/field/${parameters.fieldId}/context/${parameters.contextId}/option/move`,
      method: 'PUT',
      data: {
        customFieldOptionIds: parameters.customFieldOptionIds,
        after: parameters.after,
        position: parameters.position,
      },
    } as RequestConfig);

    return this.client.sendRequest(config, callback);
  }
  async deleteCustomFieldOption<T = void>(parameters: Parameters.DeleteCustomFieldOption, callback: Callback<T>): Promise<void>;
  async deleteCustomFieldOption<T = void>(parameters: Parameters.DeleteCustomFieldOption, callback?: undefined): Promise<T>;
  async deleteCustomFieldOption<T = void>(parameters: Parameters.DeleteCustomFieldOption, callback?: Callback<T>): Promise<void | T> {
    const config = ({
      url: `/rest/api/2/field/${parameters.fieldId}/context/${parameters.contextId}/option/${parameters.optionId}`,
      method: 'DELETE',
    } as RequestConfig);

    return this.client.sendRequest(config, callback);
  }
}
