import 'dotenv/config';
import { createAgileProject } from './utils/createAgileProject';
import { createSoftwareProject } from './utils/createSoftwareProject';
import { deleteAgileProject } from './utils/deleteAgileProject';
import { deleteSoftwareProject } from './utils/deleteSoftwareProject';

export default async function setup() {
  console.log('Setting up integration test environment...');

  try {
    await deleteSoftwareProject();
    console.log('[1/4] Cleaned up existing software project');
  } catch {
    console.error('[1/4] No existing software project to clean up');
  }

  try {
    await deleteAgileProject();
    console.log('[2/4] Cleaned up existing agile project');
  } catch {
    console.error('[2/4] No existing agile project to clean up');
  }

  try {
    await createSoftwareProject();
    console.log('[3/4] Software project created successfully');
  } catch (error) {
    console.error('[3/4] Failed to create software project:', error);
    throw error;
  }

  try {
    await createAgileProject();
    console.log('[4/4] Agile project created successfully');
  } catch (error) {
    console.error('[4/4] Failed to create agile project:', error);
    try {
      await deleteSoftwareProject();
    } catch (cleanupError) {
      console.error('Failed to cleanup software project:', cleanupError);
    }
    throw error;
  }

  console.log('Integration test environment setup complete');
}
