import { Client } from "../../clients/client";
import { Callback } from "../../callback";
import { RequestConfig } from "../../requestConfig";
import * as Models from "../models";
export class GroupAndUserPicker {
    constructor(private client: Client) { }
    async findUsersAndGroups<T = Models.FoundUsersAndGroups>(parameters: any, callback: Callback<T>): Promise<void>;
    async findUsersAndGroups<T = Models.FoundUsersAndGroups>(parameters: any, callback?: undefined): Promise<T>;
    async findUsersAndGroups<T = Models.FoundUsersAndGroups>(parameters: any, callback?: Callback<T>): Promise<void | T> {
        const config = ({
            url: "/rest/api/3/groupuserpicker",
            method: "GET"
        } as RequestConfig);
        return this.client.sendRequest(config, callback);
    }
}