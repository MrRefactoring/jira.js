export const host = '';
export const email = '';
export const apiToken = '';

if (!host) {
  throw new Error('Please specify host');
} else if (!email) {
  throw new Error('Please specify email');
} else if (!apiToken) {
  throw new Error('Please specify apiToken');
}
