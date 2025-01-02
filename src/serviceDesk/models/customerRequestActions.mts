import { CustomerRequestAction } from './customerRequestAction.mjs';

export interface CustomerRequestActions {
  addAttachment?: CustomerRequestAction;
  addComment?: CustomerRequestAction;
  addParticipant?: CustomerRequestAction;
  removeParticipant?: CustomerRequestAction;
}
