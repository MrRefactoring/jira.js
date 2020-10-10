/* eslint-disable lines-between-class-members */

import { BaseClient } from './baseClient';
import {
  Backlog,
  Board,
  Boards,
  Builds,
  Deployments,
  DevelopmentInformation,
  Epic,
  FeatureFlags,
  Issue,
  SearchEpics,
  Sprint,
} from '../api/agile';

export class AgileClient extends BaseClient {
  backlog = new Backlog(this);
  board = new Board(this);
  boards = new Boards(this);
  builds = new Builds(this);
  deployments = new Deployments(this);
  developmentInformation = new DevelopmentInformation(this);
  epic = new Epic(this);
  featureFlags = new FeatureFlags(this);
  issue = new Issue(this);
  searchEpics = new SearchEpics(this);
  sprint = new Sprint(this);
}
