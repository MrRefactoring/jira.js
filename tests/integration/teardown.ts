import 'dotenv/config';
import { deleteAgileProject } from './utils/deleteAgileProject';
import { deleteSoftwareProject } from './utils/deleteSoftwareProject';

export default async function teardown() {
  console.log('Tearing down integration test environment...');

  const errors: Error[] = [];

  try {
    await deleteSoftwareProject();
    console.log('[1/2] Software project deleted successfully');
  } catch (error) {
    console.error('[1/2] Failed to delete software project:', error);
    errors.push(error as Error);
  }

  try {
    await deleteAgileProject();
    console.log('[2/2] Agile project deleted successfully');
  } catch (error) {
    console.error('[2/2] Failed to delete agile project:', error);
    errors.push(error as Error);
  }

  if (errors.length > 0) {
    console.error('Some projects could not be deleted:', errors);
  }

  console.log('Integration test environment teardown complete');
}
