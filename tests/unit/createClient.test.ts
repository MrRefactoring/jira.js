import { test } from 'vitest';
import { AgileClient, BaseClient, ClientType, Version2Client, Version3Client, createClient } from '../../src/index.js';

const defaultConfig = { host: 'http://localhost' };

test('should create Agile client', ({ expect }) => {
  const client = createClient(ClientType.Agile, defaultConfig);

  expect(!!client).toBeTruthy();
  expect(client instanceof AgileClient).toBeTruthy();
});

test('should create Version 2 client', ({ expect }) => {
  const client = createClient(ClientType.Version2, defaultConfig);

  expect(!!client).toBeTruthy();
  expect(client instanceof Version2Client).toBeTruthy();
});

test('should create Version 3 client', ({ expect }) => {
  const client = createClient(ClientType.Version3, defaultConfig);

  expect(!!client).toBeTruthy();
  expect(client instanceof Version3Client).toBeTruthy();
});

test('should create ServiceDesk client', ({ expect }) => {
  const client = createClient(ClientType.Version2, defaultConfig);

  expect(!!client).toBeTruthy();
  expect(client instanceof Version2Client).toBeTruthy();
});

test('should create Base client', ({ expect }) => {
  // @ts-ignore
  const client = createClient('baseClient', defaultConfig);

  expect(!!client).toBeTruthy();
  expect(client instanceof BaseClient).toBeTruthy();
});
