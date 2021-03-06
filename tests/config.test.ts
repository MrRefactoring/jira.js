import { Config } from '../src';

describe('Config interface tests', () => {
  describe('Telemetry', () => {
    it('should accept false value', () => {
      const config: Config = {
        host: '',
        telemetry: false,
      };

      expect(config.telemetry).toBeFalsy();
    });

    it('should accept true value', () => {
      const config: Config = {
        host: '',
        telemetry: true,
      };

      expect(config.telemetry).toBeTruthy();
    });

    it('should accept undefined value', () => {
      const config: Config = {
        host: '',
      };

      expect(config.telemetry).toBeUndefined();
    });
  });
});
