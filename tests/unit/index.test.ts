import { test } from 'vitest';
import {
  AgileClient,
  AgileModels,
  AgileParameters,
  ServiceDeskClient,
  ServiceDeskModels,
  ServiceDeskParameters,
  Version2Client,
  Version2Models,
  Version2Parameters,
  Version3Client,
  Version3Models,
  Version3Parameters,
  type Callback,
  type Config,
} from '../../src/index.js';

test('Callback should be defined', ({ expect }) => {
  const callback: Callback<string> = () => {};

  expect(!!callback).toBeTruthy();
});

test('Config should be defined', ({ expect }) => {
  const config: Config = {
    host: 'http://localhost',
  };

  expect(!!config).toBeTruthy();
  expect(!!config.host).toBeTruthy();
  expect(typeof config.host).toBe('string');
});

test('Agile client should be defined', ({ expect }) => {
  expect(!!AgileClient).toBeTruthy();
});

test('Agile models should be defined', ({ expect }) => {
  expect(!!AgileModels).toBeTruthy();
});

test('Agile parameters should be defined', ({ expect }) => {
  expect(!!AgileParameters).toBeTruthy();
});

test('Version2 client should be defined', ({ expect }) => {
  expect(!!Version2Client).toBeTruthy();
});

test('Version2 models should be defined', ({ expect }) => {
  expect(!!Version2Models).toBeTruthy();
});

test('Version2 parameters should be defined', ({ expect }) => {
  expect(!!Version2Parameters).toBeTruthy();
});

test('Version3 client should be defined', ({ expect }) => {
  expect(!!Version3Client).toBeTruthy();
});

test('Version3 models should be defined', ({ expect }) => {
  expect(!!Version3Models).toBeTruthy();
});

test('Version3 parameters should be defined', ({ expect }) => {
  expect(!!Version3Parameters).toBeTruthy();
});

test('ServiceDesk client should be defined', ({ expect }) => {
  expect(!!ServiceDeskClient).toBeTruthy();
});

test('ServiceDesk models should be defined', ({ expect }) => {
  expect(!!ServiceDeskModels).toBeTruthy();
});

test('ServiceDesk parameters should be defined', ({ expect }) => {
  expect(!!ServiceDeskParameters).toBeTruthy();
});
