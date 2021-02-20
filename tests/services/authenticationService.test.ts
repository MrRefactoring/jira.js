import * as sinon from 'sinon';
import { OAuth } from 'oauth';
import { AuthenticationService } from '../../src/services/authenticationService';
import { Config } from '../../src';

describe('Authentication Service', () => {
  it('should return undefined when authentication does not used', async () => {
    const authentication = undefined;

    const token = await AuthenticationService.getAuthenticationToken(authentication);

    expect(token).toBeUndefined();
  });

  describe('Basic authentication', () => {
    it('should return Basic authentication token for password case', async () => {
      const authentication: Config.Authentication = {
        basic: {
          username: 'test_username',
          password: 'test_password',
        },
      };

      const token = await AuthenticationService.getAuthenticationToken(authentication);

      expect(token).toBe('Basic dGVzdF91c2VybmFtZTp0ZXN0X3Bhc3N3b3Jk');
    });

    it('should return Basic authentication token for apiToken case', async () => {
      const authentication: Config.Authentication = {
        basic: {
          username: 'test_username',
          apiToken: 'test_apiToken',
        },
      };

      const token = await AuthenticationService.getAuthenticationToken(authentication);

      expect(token).toBe('Basic dGVzdF91c2VybmFtZTp0ZXN0X2FwaVRva2Vu');
    });
  });

  describe('OAuth authentication', () => {
    // Valid RSA keypair used to test RSA-SHA1 signature method
    const RsaPrivateKey = '-----BEGIN RSA PRIVATE KEY-----\n'
      + 'MIICXQIBAAKBgQDizE4gQP5nPQhzof/Vp2U2DDY3UY/Gxha2CwKW0URe7McxtnmE\n'
      + 'CrZnT1n/YtfrrCNxY5KMP4o8hMrxsYEe05+1ZGFT68ztms3puUxilU5E3BQMhz1t\n'
      + 'JMJEGcTt8nZUlM4utli7fHgDtWbhvqvYjRMGn3AjyLOfY8XZvnFkGjipvQIDAQAB\n'
      + 'AoGAKgk6FcpWHOZ4EY6eL4iGPt1Gkzw/zNTcUsN5qGCDLqDuTq2Gmk2t/zn68VXt\n'
      + 'tVXDf/m3qN0CDzOBtghzaTZKLGhnSewQ98obMWgPcvAsb4adEEeW1/xigbMiaW2X\n'
      + 'cu6GhZxY16edbuQ40LRrPoVK94nXQpj8p7w4IQ301Sm8PSECQQD1ZlOj4ugvfhEt\n'
      + 'exi4WyAaM45fylmN290UXYqZ8SYPI/VliDytIlMfyq5Rv+l+dud1XDPrWOQ0ImgV\n'
      + 'HJn7uvoZAkEA7JhHNmHF9dbdF9Koj86K2Cl6c8KUu7U7d2BAuB6pPkt8+D8+y4St\n'
      + 'PaCmN4oP4X+sf5rqBYoXywHlqEei2BdpRQJBAMYgR4cZu7wcXGIL8HlnmROObHSK\n'
      + 'OqN9z5CRtUV0nPW8YnQG+nYOMG6KhRMbjri750OpnYF100kEPmRNI0VKQIECQE8R\n'
      + 'fQsRleTYz768ahTVQ9WF1ySErMwmfx8gDcD6jjkBZVxZVpURXAwyehopi7Eix/VF\n'
      + 'QlxjkBwKIEQi3Ks297kCQQCL9by1bueKDMJO2YX1Brm767pkDKkWtGfPS+d3xMtC\n'
      + 'KJHHCqrS1V+D5Q89x5wIRHKxE5UMTc0JNa554OxwFORX\n'
      + '-----END RSA PRIVATE KEY-----';

    const RsaPublicKey = '-----BEGIN PUBLIC KEY-----\n'
      + 'MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQDizE4gQP5nPQhzof/Vp2U2DDY3\n'
      + 'UY/Gxha2CwKW0URe7McxtnmECrZnT1n/YtfrrCNxY5KMP4o8hMrxsYEe05+1ZGFT\n'
      + '68ztms3puUxilU5E3BQMhz1tJMJEGcTt8nZUlM4utli7fHgDtWbhvqvYjRMGn3Aj\n'
      + 'yLOfY8XZvnFkGjipvQIDAQAB\n'
      + '-----END PUBLIC KEY-----';

    it('OAuth 1.0 authentication', async () => {
      const authentication: Config.Authentication = {
        oauth: {
          accessToken: 'accessToken',
          tokenSecret: 'tokenSecret',
          consumerKey: RsaPublicKey,
          consumerSecret: RsaPrivateKey,
        },
      };

      const stub = sinon.stub(OAuth.prototype, 'authHeader');

      await AuthenticationService.getAuthenticationToken(
        authentication,
        {
          baseURL: 'http://localhost',
          method: 'POST',
          url: '/agile/1.0/board',
        },
      );

      expect(stub.calledOnce).toBeTruthy();
      stub.restore();
    });
  });
});
