import { CommentSchema, type Comment } from '../models/comment';
import type { CreateComment } from '../parameters/createComment';
import type { GetComments } from '../parameters/getComments';
import type { Client, SendRequestOptions } from '#/core';
import { z } from 'zod';

/** Add a comment to an object. */
export async function createComment(client: Client, parameters: CreateComment): Promise<Comment> {
  const config: SendRequestOptions<Comment> = {
    url: '/rest/assets/1.0/comment/create',
    method: 'POST',
    body: {
      created: parameters.created,
      updated: parameters.updated,
      id: parameters.id,
      actor: parameters.actor,
      role: parameters.role,
      comment: parameters.comment,
      commentOutput: parameters.commentOutput,
      objectId: parameters.objectId,
      canEdit: parameters.canEdit,
      canDelete: parameters.canDelete,
    },
    schema: CommentSchema,
  };

  return await client.sendRequest(config);
}

/** Get the comments for an object by object ID. */
export async function getComments(client: Client, parameters: GetComments): Promise<Comment[]> {
  const config: SendRequestOptions<Comment[]> = {
    url: `/rest/assets/1.0/comment/object/${parameters.objectId}`,
    method: 'GET',
    searchParams: {
      asc: parameters.asc,
    },
    schema: z.array(CommentSchema),
  };

  return await client.sendRequest(config);
}
