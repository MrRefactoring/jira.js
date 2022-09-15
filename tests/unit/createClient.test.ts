import test from 'ava';
import { AgileClient, BaseClient, ClientType, createClient, Version2Client, Version3Client } from '../../src';

const defaultConfig = { host: 'http://localhost', newErrorHandling: true };

test('should create Agile client', t => {
  const client = createClient(ClientType.Agile, defaultConfig);

  t.truthy(!!client);
  t.truthy(client instanceof AgileClient);
});

test('should create Version 2 client', t => {
  const client = createClient(ClientType.Version2, defaultConfig);

  t.truthy(!!client);
  t.truthy(client instanceof Version2Client);
});

test('should create Version 3 client', t => {
  const client = createClient(ClientType.Version3, defaultConfig);

  t.truthy(!!client);
  t.truthy(client instanceof Version3Client);
});

test('should create ServiceDesk client', t => {
  const client = createClient(ClientType.Version2, defaultConfig);

  t.truthy(!!client);
  t.truthy(client instanceof Version2Client);
});

test('should create Base client', t => {
  // @ts-ignore
  const client = createClient('baseClient', defaultConfig);

  t.truthy(!!client);
  t.truthy(client instanceof BaseClient);
});
