import { test } from 'vitest';
import {
  AgileClient,
  ServiceDeskClient,
  Version2Client,
  Version3Client,
  type Callback,
  type Config,
} from '@/index.mjs';

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

test('Version2 client should be defined', ({ expect }) => {
  expect(!!Version2Client).toBeTruthy();
});

test('Version3 client should be defined', ({ expect }) => {
  expect(!!Version3Client).toBeTruthy();
});

test('ServiceDesk client should be defined', ({ expect }) => {
  expect(!!ServiceDeskClient).toBeTruthy();
});
