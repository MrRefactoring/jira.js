import * as Models from './models';
import * as Parameters from './parameters';
import { Client } from '../clients';
import { Callback } from '../callback';
import { RequestConfig } from '../requestConfig';

export class IssueAttachments {
  constructor(private client: Client) { }
  async getAttachmentMeta<T = Models.AttachmentSettings>(callback?: Callback<T>): Promise<void>;
  async getAttachmentMeta<T = Models.AttachmentSettings>(callback?: undefined): Promise<T>;
  async getAttachmentMeta<T = Models.AttachmentSettings>(callback?: Callback<T>): Promise<void | T> {
    const config = ({
      url: '/rest/api/3/attachment/meta',
      method: 'GET',
    } as RequestConfig);

    return this.client.sendRequest(config, callback);
  }
  async getAttachment<T = Models.AttachmentMetadata>(parameters: Parameters.GetAttachment, callback: Callback<T>): Promise<void>;
  async getAttachment<T = Models.AttachmentMetadata>(parameters: Parameters.GetAttachment, callback?: undefined): Promise<T>;
  async getAttachment<T = Models.AttachmentMetadata>(parameters: Parameters.GetAttachment, callback?: Callback<T>): Promise<void | T> {
    const config = ({
      url: `/rest/api/3/attachment/${parameters.id}`,
      method: 'GET',
    } as RequestConfig);

    return this.client.sendRequest(config, callback);
  }
  async removeAttachment<T = any>(parameters: Parameters.RemoveAttachment, callback: Callback<T>): Promise<void>;
  async removeAttachment<T = any>(parameters: Parameters.RemoveAttachment, callback?: undefined): Promise<T>;
  async removeAttachment<T = any>(parameters: Parameters.RemoveAttachment, callback?: Callback<T>): Promise<void | T> {
    const config = ({
      url: `/rest/api/3/attachment/${parameters.id}`,
      method: 'DELETE',
    } as RequestConfig);

    return this.client.sendRequest(config, callback);
  }
  async expandAttachmentForHumans<T = Models.AttachmentArchiveMetadataReadable>(parameters: Parameters.ExpandAttachmentForHumans, callback: Callback<T>): Promise<void>;
  async expandAttachmentForHumans<T = Models.AttachmentArchiveMetadataReadable>(parameters: Parameters.ExpandAttachmentForHumans, callback?: undefined): Promise<T>;
  async expandAttachmentForHumans<T = Models.AttachmentArchiveMetadataReadable>(parameters: Parameters.ExpandAttachmentForHumans, callback?: Callback<T>): Promise<void | T> {
    const config = ({
      url: `/rest/api/3/attachment/${parameters.id}/expand/human`,
      method: 'GET',
    } as RequestConfig);

    return this.client.sendRequest(config, callback);
  }
  async expandAttachmentForMachines<T = Models.AttachmentArchiveImpl>(parameters: Parameters.ExpandAttachmentForMachines, callback: Callback<T>): Promise<void>;
  async expandAttachmentForMachines<T = Models.AttachmentArchiveImpl>(parameters: Parameters.ExpandAttachmentForMachines, callback?: undefined): Promise<T>;
  async expandAttachmentForMachines<T = Models.AttachmentArchiveImpl>(parameters: Parameters.ExpandAttachmentForMachines, callback?: Callback<T>): Promise<void | T> {
    const config = ({
      url: `/rest/api/3/attachment/${parameters.id}/expand/raw`,
      method: 'GET',
    } as RequestConfig);

    return this.client.sendRequest(config, callback);
  }
  async addAttachment<T = any>(parameters: Parameters.AddAttachment, callback: Callback<T>): Promise<void>;
  async addAttachment<T = any>(parameters: Parameters.AddAttachment, callback?: undefined): Promise<T>;
  async addAttachment<T = any>(parameters: Parameters.AddAttachment, callback?: Callback<T>): Promise<void | T> {
    const config = ({
      url: `/rest/api/3/issue/${parameters.issueIdOrKey}/attachments`,
      method: 'POST',
    } as RequestConfig);

    return this.client.sendRequest(config, callback);
  }
}
