export const host = 'https://jira-js.atlassian.net/';
export const email = 'mrrefactoring@yandex.ru';
export const apiToken = 'ATATT3xFfGF0CQo3Ed8gqWxZmT2nlOEinQZJkp7hVY-ynttVtAsRwGF5JYD1vBcSu0i3RNfilR_RbksRFBxU33tsWTi7R5ontSouy0mwNqPhTazoZiVm5ah3_Emcy9g7-KB0rW7XTm5uLHeCdUW9X-Fv1jqWUHjtrOgCr4pXtcV6DmJPyBLa3Jg=582DE538';

if (!host) {
  throw new Error('Please specify host');
} else if (!email) {
  throw new Error('Please specify email');
} else if (!apiToken) {
  throw new Error('Please specify apiToken');
}
