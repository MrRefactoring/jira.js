import * as Models from './models';
import * as Parameters from './parameters';
import { Client } from '../clients';
import { Callback } from '../callback';
import { RequestConfig } from '../requestConfig';

export class AppProperties {
  constructor(private client: Client) { }
  async getAddonProperties<T = Models.PropertyKeys>(parameters: Parameters.GetAddonProperties, callback: Callback<T>): Promise<void>;
  async getAddonProperties<T = Models.PropertyKeys>(parameters: Parameters.GetAddonProperties, callback?: undefined): Promise<T>;
  async getAddonProperties<T = Models.PropertyKeys>(parameters: Parameters.GetAddonProperties, callback?: Callback<T>): Promise<void | T> {
    const config = ({
      url: `/rest/atlassian-connect/1/addons/${parameters.addonKey}/properties`,
      method: 'GET',
    } as RequestConfig);

    return this.client.sendRequest(config, callback);
  }
  async getAddonProperty<T = Models.EntityProperty>(parameters: Parameters.GetAddonProperty, callback: Callback<T>): Promise<void>;
  async getAddonProperty<T = Models.EntityProperty>(parameters: Parameters.GetAddonProperty, callback?: undefined): Promise<T>;
  async getAddonProperty<T = Models.EntityProperty>(parameters: Parameters.GetAddonProperty, callback?: Callback<T>): Promise<void | T> {
    const config = ({
      url: `/rest/atlassian-connect/1/addons/${parameters.addonKey}/properties/${parameters.propertyKey}`,
      method: 'GET',
    } as RequestConfig);

    return this.client.sendRequest(config, callback);
  }
  async putAddonProperty<T = Models.OperationMessage>(parameters: Parameters.PutAddonProperty, callback: Callback<T>): Promise<void>;
  async putAddonProperty<T = Models.OperationMessage>(parameters: Parameters.PutAddonProperty, callback?: undefined): Promise<T>;
  async putAddonProperty<T = Models.OperationMessage>(parameters: Parameters.PutAddonProperty, callback?: Callback<T>): Promise<void | T> {
    const config = ({
      url: `/rest/atlassian-connect/1/addons/${parameters.addonKey}/properties/${parameters.propertyKey}`,
      method: 'PUT',
    } as RequestConfig);

    return this.client.sendRequest(config, callback);
  }
  async deleteAddonProperty<T = any>(parameters: Parameters.DeleteAddonProperty, callback: Callback<T>): Promise<void>;
  async deleteAddonProperty<T = any>(parameters: Parameters.DeleteAddonProperty, callback?: undefined): Promise<T>;
  async deleteAddonProperty<T = any>(parameters: Parameters.DeleteAddonProperty, callback?: Callback<T>): Promise<void | T> {
    const config = ({
      url: `/rest/atlassian-connect/1/addons/${parameters.addonKey}/properties/${parameters.propertyKey}`,
      method: 'DELETE',
    } as RequestConfig);

    return this.client.sendRequest(config, callback);
  }
}
