import type { Client } from '../client';
import type { Request } from '../request';
import type { GetAttachmentContentParameters } from './parameters/getAttachmentContentParameters';
import type { GetAttachmentThumbnailParameters } from './parameters/getAttachmentThumbnailParameters';
import type { RemoveAttachmentParameters } from './parameters/removeAttachmentParameters';
import type { GetAttachmentParameters } from './parameters/getAttachmentParameters';
import type { ExpandAttachmentForHumansParameters } from './parameters/expandAttachmentForHumansParameters';
import type { ExpandAttachmentForMachinesParameters } from './parameters/expandAttachmentForMachinesParameters';
import type { AddAttachmentParameters } from './parameters/addAttachmentParameters';

export class IssueAttachments {
  constructor(private client: Client) {}
  /**
   * Returns the contents of an attachment. A `Range` header can be set to define a range of bytes within the attachment
   * to download. See the [HTTP Range header standard](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Range)
   * for details. *
   *
   * - To return a thumbnail of the attachment, use [Get attachment
   *   thumbnail](#api-rest-api-2-attachment-thumbnail-id-get).
   * -
   * - This operation can be accessed anonymously.
   * -
   * - **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:** For the
   *   issue containing the attachment:
   * -
   * - - _Browse projects_ [project permission](https://confluence.atlassian.com/x/yodKLg) for the project that the issue is
   *       in.
   * - - If [issue-level security](https://confluence.atlassian.com/x/J4lKLg) is configured, issue-level security permission
   *       to view the issue.
   * - - If attachments are added in private comments, the comment-level restriction will be applied.
   */
  async getAttachmentContent(parameters: GetAttachmentContentParameters) {
    const request: Request = {
      url: `/rest/api/2/attachment/content/${parameters.id}`,
      method: 'GET',
      query: {
        redirect: parameters.redirect,
      },
    };

    return this.client.sendRequest(request);
  }

  /**
   * Returns the attachment settings, that is, whether attachments are enabled and the maximum attachment size allowed.
   * *
   *
   * - Note that there are also [project permissions](https://confluence.atlassian.com/x/yodKLg) that restrict whether
   *   users can create and delete attachments.
   * -
   * - This operation can be accessed anonymously.
   * -
   * - **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:** None.
   */
  async getAttachmentMeta() {
    const request: Request = {
      url: '/rest/api/2/attachment/meta',
      method: 'GET',
    };

    return this.client.sendRequest(request);
  }

  /**
   * Returns the thumbnail of an attachment. *
   *
   * - To return the attachment contents, use [Get attachment content](#api-rest-api-2-attachment-content-id-get).
   * -
   * - This operation can be accessed anonymously.
   * -
   * - **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:** For the
   *   issue containing the attachment:
   * -
   * - - _Browse projects_ [project permission](https://confluence.atlassian.com/x/yodKLg) for the project that the issue is
   *       in.
   * - - If [issue-level security](https://confluence.atlassian.com/x/J4lKLg) is configured, issue-level security permission
   *       to view the issue.
   * - - If attachments are added in private comments, the comment-level restriction will be applied.
   */
  async getAttachmentThumbnail(parameters: GetAttachmentThumbnailParameters) {
    const request: Request = {
      url: `/rest/api/2/attachment/thumbnail/${parameters.id}`,
      method: 'GET',
      query: {
        redirect: parameters.redirect,
        fallbackToDefault: parameters.fallbackToDefault,
        width: parameters.width,
        height: parameters.height,
      },
    };

    return this.client.sendRequest(request);
  }

  /**
   * Deletes an attachment from an issue. *
   *
   * - This operation can be accessed anonymously.
   * -
   * - **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:** For the
   *   project holding the issue containing the attachment:
   * -
   * - - _Delete own attachments_ [project permission](https://confluence.atlassian.com/x/yodKLg) to delete an attachment
   *       created by the calling user.
   * - - _Delete all attachments_ [project permission](https://confluence.atlassian.com/x/yodKLg) to delete an attachment
   *       created by any user.
   */
  async removeAttachment(parameters: RemoveAttachmentParameters) {
    const request: Request = {
      url: `/rest/api/2/attachment/${parameters.id}`,
      method: 'DELETE',
    };

    return this.client.sendRequest(request);
  }

  /**
   * Returns the metadata for an attachment. Note that the attachment itself is not returned. *
   *
   * - This operation can be accessed anonymously.
   * -
   * - **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:**
   * -
   * - - _Browse projects_ [project permission](https://confluence.atlassian.com/x/yodKLg) for the project that the issue is
   *       in.
   * - - If [issue-level security](https://confluence.atlassian.com/x/J4lKLg) is configured, issue-level security permission
   *       to view the issue.
   * - - If attachments are added in private comments, the comment-level restriction will be applied.
   */
  async getAttachment(parameters: GetAttachmentParameters) {
    const request: Request = {
      url: `/rest/api/2/attachment/${parameters.id}`,
      method: 'GET',
    };

    return this.client.sendRequest(request);
  }

  /**
   * Returns the metadata for the contents of an attachment, if it is an archive, and metadata for the attachment
   * itself. For example, if the attachment is a ZIP archive, then information about the files in the archive is
   * returned and metadata for the ZIP archive. Currently, only the ZIP archive format is supported. *
   *
   * - Use this operation to retrieve data that is presented to the user, as this operation returns the metadata for the
   *   attachment itself, such as the attachment's ID and name. Otherwise, use [ Get contents metadata for an expanded
   *   attachment](#api-rest-api-2-attachment-id-expand-raw-get), which only returns the metadata for the attachment's
   *   contents.
   * -
   * - This operation can be accessed anonymously.
   * -
   * - **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:** For the
   *   issue containing the attachment:
   * -
   * - - _Browse projects_ [project permission](https://confluence.atlassian.com/x/yodKLg) for the project that the issue is
   *       in.
   * - - If [issue-level security](https://confluence.atlassian.com/x/J4lKLg) is configured, issue-level security permission
   *       to view the issue.
   * - - If attachments are added in private comments, the comment-level restriction will be applied.
   */
  async expandAttachmentForHumans(parameters: ExpandAttachmentForHumansParameters) {
    const request: Request = {
      url: `/rest/api/2/attachment/${parameters.id}/expand/human`,
      method: 'GET',
    };

    return this.client.sendRequest(request);
  }

  /**
   * Returns the metadata for the contents of an attachment, if it is an archive. For example, if the attachment is a
   * ZIP archive, then information about the files in the archive is returned. Currently, only the ZIP archive format is
   * supported. *
   *
   * - Use this operation if you are processing the data without presenting it to the user, as this operation only returns
   *   the metadata for the contents of the attachment. Otherwise, to retrieve data to present to the user, use [ Get
   *   all metadata for an expanded attachment](#api-rest-api-2-attachment-id-expand-human-get) which also returns the
   *   metadata for the attachment itself, such as the attachment's ID and name.
   * -
   * - This operation can be accessed anonymously.
   * -
   * - **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:** For the
   *   issue containing the attachment:
   * -
   * - - _Browse projects_ [project permission](https://confluence.atlassian.com/x/yodKLg) for the project that the issue is
   *       in.
   * - - If [issue-level security](https://confluence.atlassian.com/x/J4lKLg) is configured, issue-level security permission
   *       to view the issue.
   * - - If attachments are added in private comments, the comment-level restriction will be applied.
   */
  async expandAttachmentForMachines(parameters: ExpandAttachmentForMachinesParameters) {
    const request: Request = {
      url: `/rest/api/2/attachment/${parameters.id}/expand/raw`,
      method: 'GET',
    };

    return this.client.sendRequest(request);
  }

  /**
   * Adds one or more attachments to an issue. Attachments are posted as multipart/form-data ([RFC
   * 1867](https://www.ietf.org/rfc/rfc1867.txt)). *
   *
   * - Note that:
   * -
   * - - The request must have a `X-Atlassian-Token: no-check` header, if not it is blocked. See [Special
   *       headers](#special-request-headers) for more information.
   * - - The name of the multipart/form-data parameter that contains the attachments must be `file`.
   * -
   * - The following examples upload a file called _myfile.txt_ to the issue _TEST-123_:
   * -
   * - #### curl
   * -
   * - Curl --location --request POST 'https://your-domain.atlassian.net/rest/api/2/issue/TEST-123/attachments'
   * - -u 'email@example.com:<api_token>'
   * - -H 'X-Atlassian-Token: no-check'
   * - --form 'file=@"myfile.txt"'
   * -
   * - #### Node.js
   * -
   * - // This code sample uses the 'node-fetch' and 'form-data' libraries:
   * - // https://www.npmjs.com/package/node-fetch
   * - // https://www.npmjs.com/package/form-data
   * - Const fetch = require('node-fetch');
   * - Const FormData = require('form-data');
   * - Const fs = require('fs');
   * -
   * - Const filePath = 'myfile.txt';
   * - Const form = new FormData();
   * - Const stats = fs.statSync(filePath);
   * - Const fileSizeInBytes = stats.size;
   * - Const fileStream = fs.createReadStream(filePath);
   * -
   * - Form.append('file', fileStream, { knownLength: fileSizeInBytes });
   * -
   * - Fetch('https://your-domain.atlassian.net/rest/api/2/issue/TEST-123/attachments', {
   * - Method: 'POST',
   * - Body: form,
   * - Headers: {
   * - 'Authorization': `Basic ${Buffer.from(
   * - 'email@example.com:';
   * - ).toString('base64')}`,
   * - 'Accept': 'application/json',
   * - 'X-Atlassian-Token': 'no-check'
   * - }
   * - })
   * - .then(response => {
   * - Console.log(
   * - `Response: ${response.status} ${response.statusText}`;
   * - );
   * - Return response.text();
   * - })
   * - .then(text => console.log(text))
   * - .catch(err => console.error(err));
   * -
   * - #### Java
   * -
   * - // This code sample uses the 'Unirest' library:
   * - // http://unirest.io/java.html
   * - HttpResponse response =
   *   Unirest.post("https://your-domain.atlassian.net/rest/api/2/issue/{issueIdOrKey}/attachments")
   * - .basicAuth("email@example.com", "")
   * - .header("Accept", "application/json")
   * - .header("X-Atlassian-Token", "no-check")
   * - .field("file", new File("myfile.txt"))
   * - .asJson();
   * -
   * - System.out.println(response.getBody());
   * -
   * - #### Python
   * -
   * - # This code sample uses the 'requests' library:
   * - # http://docs.python-requests.org
   * - Import requests
   * - From requests.auth import HTTPBasicAuth
   * - Import json
   * -
   * - Url = 'https://your-domain.atlassian.net/rest/api/2/issue/{issueIdOrKey}/attachments';
   * -
   * - Auth = HTTPBasicAuth('email@example.com', '');
   * -
   * - Headers = {
   * - "Accept": "application/json",
   * - "X-Atlassian-Token": "no-check"
   * - }
   * -
   * - Response = requests.request(
   * - "POST",
   * - Url,
   * - Headers = headers,
   * - Auth = auth,
   * - Files = {
   * - "file": ("myfile.txt", open("myfile.txt","rb"), "application-type")
   * - }
   * - )
   * -
   * - Print(json.dumps(json.loads(response.text), (sort_keys = True), (indent = 4), (separators = (',', ': '))));
   * -
   * - #### PHP
   * -
   * - // This code sample uses the 'Unirest' library:
   * - // http://unirest.io/php.html
   * - Unirest\Request::auth('email@example.com', '');
   * -
   * - $headers = array(
   * - 'Accept' => 'application/json',
   * - 'X-Atlassian-Token' => 'no-check'
   * - );
   * -
   * - $parameters = array(
   * - 'file' => File::add('myfile.txt')
   * - );
   * -
   * - $response = Unirest\Request::post(
   * - 'https://your-domain.atlassian.net/rest/api/2/issue/{issueIdOrKey}/attachments',
   * - $headers,
   * - $parameters;
   * - );
   * -
   * - Var_dump($response);
   * -
   * - #### Forge
   * -
   * - // This sample uses Atlassian Forge and the `form-data` library.
   * - // https://developer.atlassian.com/platform/forge/
   * - // https://www.npmjs.com/package/form-data
   * - Import api from '@forge/api';
   * - Import FormData from 'form-data';
   * -
   * - Const form = new FormData();
   * - Form.append('file', fileStream, { knownLength: fileSizeInBytes });
   * -
   * - Const response = await api.asApp().requestJira('/rest/api/2/issue/{issueIdOrKey}/attachments', {
   * - Method: 'POST',
   * - Body: form,
   * - Headers: {
   * - 'Accept': 'application/json',
   * - 'X-Atlassian-Token': 'no-check'
   * - }
   * - });
   * -
   * - Console.log(`Response: ${response.status} ${response.statusText}`);
   * - Console.log(await response.json());
   * -
   * - Tip: Use a client library. Many client libraries have classes for handling multipart POST operations. For example,
   *   in Java, the Apache HTTP Components library provides a
   *   [MultiPartEntity](http://hc.apache.org/httpcomponents-client-ga/httpmime/apidocs/org/apache/http/entity/mime/MultipartEntity.html)
   *   class for multipart POST operations.
   * -
   * - This operation can be accessed anonymously.
   * -
   * - **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:**
   * -
   * - - _Browse Projects_ and _Create attachments_ [ project permission](https://confluence.atlassian.com/x/yodKLg) for the
   *       project that the issue is in.
   * - - If [issue-level security](https://confluence.atlassian.com/x/J4lKLg) is configured, issue-level security permission
   *       to view the issue.
   */
  async addAttachment(parameters: AddAttachmentParameters) {
    const request: Request = {
      url: `/rest/api/2/issue/${parameters.issueIdOrKey}/attachments`,
      method: 'POST',
    };

    return this.client.sendRequest(request);
  }
}
