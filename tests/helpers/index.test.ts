import { getAuthentication } from '../../src/helpers';
import { AxiosRequestConfig } from 'axios';
import * as sinon from 'sinon';

describe('Authentication tests', () => {
  it('should return basic', () => {
    const config = {
      host: 'https://xxx.jirahost.com',
      authentication: {
        basic: {
          username: 'user',
          password: 'pwd',
        }
      }
    };

    const authentication = getAuthentication(config);

    expect(authentication).toEqual('Basic dXNlcjpwd2Q=');
  });

  it('should return bearer', () => {
    const config = {
      host: '',
      authentication: {
        accessToken: 'WQtMWNmZDg2ZDY3ZjdjIiwiZXhwIjoxNTc4MjMyOTQzLCJpZGVudGl0eSI6InZsYWRpc2xhdi50dXBpa2luQGFrdmVsb24uY29tIiwiZnJlc2giOmZhbHNlLCJ0eXBlIjoiYWNjZXNzIiwidXNlcl9jbGFpbXMiOnsiaWQiOiI5NjJmNWQ3Yy03ZWZhLTQ4ZDQtN2JiNC0wOGQ2YTE4NDZkMzkiLCJlbWFpbCI6InZsYWRpc2xhdi50dXBpa2luQGFrdmVsb24uY29tIiw',
      }
    };

    const authentication = getAuthentication(config);

    expect(authentication).toEqual('Bearer WQtMWNmZDg2ZDY3ZjdjIiwiZXhwIjoxNTc4MjMyOTQzLCJpZGVudGl0eSI6InZsYWRpc2xhdi50dXBpa2luQGFrdmVsb24uY29tIiwiZnJlc2giOmZhbHNlLCJ0eXBlIjoiYWNjZXNzIiwidXNlcl9jbGFpbXMiOnsiaWQiOiI5NjJmNWQ3Yy03ZWZhLTQ4ZDQtN2JiNC0wOGQ2YTE4NDZkMzkiLCJlbWFpbCI6InZsYWRpc2xhdi50dXBpa2luQGFrdmVsb24uY29tIiw');
  });

  it('should return JWT', () => {
    sinon.stub(Date, 'now').returns(1578228681601);

    const config = {
      host: '',
      authentication: {
        jwt: {
          iss: 'atlassian-connect-addon',
          secret: '...',
        }
      }
    };

    const request: AxiosRequestConfig = {
      url: '',
      method: 'GET'
    };

    const authentication = getAuthentication(config, request);

    expect(authentication).toEqual('JWT eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJhdGxhc3NpYW4tY29ubmVjdC1hZGRvbiIsImlhdCI6MTU3ODIyODY4MSwiZXhwIjoxNTc4MjI4ODYxLCJxc2giOiJjODhjYWFkMTVhMWMxYTkwMGI4YWMwOGFhOTY4NmY0ZTgxODQ1MzliZWExZGVkYTM2ZTJmNjQ5NDMwZGYzMjM5In0.uzwrZluDVyTMfUBxNY88nJI5VJyD8YKGAz8y6N7k4Uo');
  });

  it('should return undefined', () => {
    const config = {
      host: '',
    };

    const authentication = getAuthentication(config);

    expect(authentication).toBeUndefined();
  });
});
