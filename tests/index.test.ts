import {
  AgileClient,
  AgileModels,
  AgileParameters,

  Version2Client,
  Version2Models,
  Version2Parameters,

  Version3Client,
  Version3Models,
  Version3Parameters,
} from '../src';

describe('Facade', () => {
  describe('Agile', () => {
    it('client should be defined', () => {
      expect(AgileClient).toBeDefined();
    });

    it('models should be defined', () => {
      expect(AgileModels).toBeDefined();
    });

    it('parameters should be defined', () => {
      expect(AgileParameters).toBeDefined();
    });
  });

  describe('Version 2', () => {
    it('client should be defined', () => {
      expect(Version2Client).toBeDefined();
    });

    it('models should be defined', () => {
      expect(Version2Models).toBeDefined();
    });

    it('parameters should be defined', () => {
      expect(Version2Parameters).toBeDefined();
    });
  });

  describe('Version 3', () => {
    it('client should be defined', () => {
      expect(Version3Client).toBeDefined();
    });

    it('models should be defined', () => {
      expect(Version3Models).toBeDefined();
    });

    it('parameters should be defined', () => {
      expect(Version3Parameters).toBeDefined();
    });
  });
});
