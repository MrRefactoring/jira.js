import { type ClientConfig, type RequestOptions, createClient } from '#/core';
import type { AuthBasic, AuthBearer } from '#/core';
import * as teams from './api/teams';
import * as externalTeams from './api/externalTeams';
import * as teamMembers from './api/teamMembers';
import type {
  QueryTeams,
  CreateTeam,
  ArchiveTeams,
  UnarchiveTeams,
  GetTeam,
  DeleteTeam,
  UpdateTeam,
  RestoreTeam,
  UploadAndSetTeamCoverPhoto,
  CreateExternalLinkedTeam,
  UnlinkTeamsFromExternalSource,
  LinkTeamToExternalSource,
  FetchMembers,
  AddMembers,
  RemoveMembers,
} from './parameters';
import type {
  TeamPaginationResult,
  TeamResponseWithMembers,
  BulkOperationResponse,
  TeamResponse,
  MembershipPage,
  MembershipAddResponse,
  MembershipRemoveResponse,
} from './models';

export type TeamsClientConfig = Omit<ClientConfig, 'auth' | 'host'> & {
  /** The site to send through. Teams answers on it behind `/gateway/api`, the same host every other surface uses. */
  host: string;

  /**
   * Email and API token, or a bearer token.
   *
   * OAuth 2.0 is absent by design: the Teams API does not accept it, and neither do Forge apps.
   */
  auth: AuthBasic | AuthBearer;
};

export function createTeamsClient(config: TeamsClientConfig) {
  const client = createClient(config);

  return {
    teams: {
      queryTeams: (parameters: QueryTeams, options?: RequestOptions): Promise<TeamPaginationResult> =>
        teams.queryTeams(client, parameters, options),
      createTeam: (parameters: CreateTeam, options?: RequestOptions): Promise<TeamResponseWithMembers> =>
        teams.createTeam(client, parameters, options),
      archiveTeams: (parameters: ArchiveTeams, options?: RequestOptions): Promise<BulkOperationResponse> =>
        teams.archiveTeams(client, parameters, options),
      unarchiveTeams: (parameters: UnarchiveTeams, options?: RequestOptions): Promise<BulkOperationResponse> =>
        teams.unarchiveTeams(client, parameters, options),
      getTeam: (parameters: GetTeam, options?: RequestOptions): Promise<TeamResponse> =>
        teams.getTeam(client, parameters, options),
      deleteTeam: (parameters: DeleteTeam, options?: RequestOptions): Promise<void> =>
        teams.deleteTeam(client, parameters, options),
      updateTeam: (parameters: UpdateTeam, options?: RequestOptions): Promise<TeamResponse> =>
        teams.updateTeam(client, parameters, options),
      restoreTeam: (parameters: RestoreTeam, options?: RequestOptions): Promise<void> =>
        teams.restoreTeam(client, parameters, options),
      uploadAndSetTeamCoverPhoto: (parameters: UploadAndSetTeamCoverPhoto, options?: RequestOptions): Promise<void> =>
        teams.uploadAndSetTeamCoverPhoto(client, parameters, options),
    },
    externalTeams: {
      createExternalLinkedTeam: (
        parameters: CreateExternalLinkedTeam,
        options?: RequestOptions,
      ): Promise<TeamResponse> => externalTeams.createExternalLinkedTeam(client, parameters, options),
      unlinkTeamsFromExternalSource: (
        parameters: UnlinkTeamsFromExternalSource,
        options?: RequestOptions,
      ): Promise<BulkOperationResponse> => externalTeams.unlinkTeamsFromExternalSource(client, parameters, options),
      linkTeamToExternalSource: (parameters: LinkTeamToExternalSource, options?: RequestOptions): Promise<void> =>
        externalTeams.linkTeamToExternalSource(client, parameters, options),
    },
    teamMembers: {
      fetchMembers: (parameters: FetchMembers, options?: RequestOptions): Promise<MembershipPage> =>
        teamMembers.fetchMembers(client, parameters, options),
      addMembers: (parameters: AddMembers, options?: RequestOptions): Promise<MembershipAddResponse> =>
        teamMembers.addMembers(client, parameters, options),
      removeMembers: (parameters: RemoveMembers, options?: RequestOptions): Promise<MembershipRemoveResponse> =>
        teamMembers.removeMembers(client, parameters, options),
    },
  };
}

export type TeamsClient = ReturnType<typeof createTeamsClient>;
