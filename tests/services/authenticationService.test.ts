import { AuthenticationService } from '../../src/services/authenticationService';
import { ClientConfig } from "../../src/clientConfig";

describe('Authentication Service', () => {
  describe('Basic authentication', () => {
    it('should return Basic authentication token for password case', () => {
      const authentication: ClientConfig.Authentication = {
        basic: {
          username: 'test_username',
          password: 'test_password',
        },
      };

      const token = AuthenticationService.getAuthenticationToken(authentication);

      expect(token).toBe('Basic dGVzdF91c2VybmFtZTp0ZXN0X3Bhc3N3b3Jk');
    });

    it('should return Basic authentication token for apiToken case', () => {
      const authentication: ClientConfig.Authentication = {
        basic: {
          username: 'test_username',
          apiToken: 'test_apiToken',
        },
      };

      const token = AuthenticationService.getAuthenticationToken(authentication);

      expect(token).toBe('Basic dGVzdF91c2VybmFtZTp0ZXN0X2FwaVRva2Vu');
    });
  });
});
