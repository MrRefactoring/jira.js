import { NodeSchema, type Node } from '../models/node';
import { ClusterStateSchema, type ClusterState } from '../models/clusterState';
import type { DeleteNode } from '../parameters/deleteNode';
import type { ChangeNodeStateToOffline } from '../parameters/changeNodeStateToOffline';
import type { Client, SendRequestOptions } from '#/core';
import { z } from 'zod';

/** Delete the node from the cluster if state of node is OFFLINE. */
export async function deleteNode(client: Client, parameters: DeleteNode): Promise<void> {
  const config: SendRequestOptions<void> = {
    url: `/rest/api/2/cluster/node/${parameters.nodeId}`,
    method: 'DELETE',
  };

  return await client.sendRequest(config);
}

/** Change the node's state to offline if the node is reporting as active, but is not alive. */
export async function changeNodeStateToOffline(client: Client, parameters: ChangeNodeStateToOffline): Promise<void> {
  const config: SendRequestOptions<void> = {
    url: `/rest/api/2/cluster/node/${parameters.nodeId}/offline`,
    method: 'PUT',
  };

  return await client.sendRequest(config);
}

/** Returns all nodes in cluster. */
export async function getAllNodes(client: Client): Promise<Node[]> {
  const config: SendRequestOptions<Node[]> = {
    url: '/rest/api/2/cluster/nodes',
    method: 'GET',
    schema: z.array(NodeSchema),
  };

  return await client.sendRequest(config);
}

/** Approves the cluster upgrade. */
export async function approveUpgrade(client: Client): Promise<void> {
  const config: SendRequestOptions<void> = {
    url: '/rest/api/2/cluster/zdu/approve',
    method: 'POST',
  };

  return await client.sendRequest(config);
}

/** Cancels the ongoing cluster upgrade. */
export async function cancelUpgrade(client: Client): Promise<void> {
  const config: SendRequestOptions<void> = {
    url: '/rest/api/2/cluster/zdu/cancel',
    method: 'POST',
  };

  return await client.sendRequest(config);
}

/** Retries the cluster upgrade. */
export async function acknowledgeErrors(client: Client): Promise<void> {
  const config: SendRequestOptions<void> = {
    url: '/rest/api/2/cluster/zdu/retryUpgrade',
    method: 'POST',
  };

  return await client.sendRequest(config);
}

/** Starts the cluster upgrade. */
export async function setReadyToUpgrade(client: Client): Promise<void> {
  const config: SendRequestOptions<void> = {
    url: '/rest/api/2/cluster/zdu/start',
    method: 'POST',
  };

  return await client.sendRequest(config);
}

/** Returns the current state of the cluster upgrade. */
export async function getState(client: Client): Promise<ClusterState> {
  const config: SendRequestOptions<ClusterState> = {
    url: '/rest/api/2/cluster/zdu/state',
    method: 'GET',
    schema: ClusterStateSchema,
  };

  return await client.sendRequest(config);
}
