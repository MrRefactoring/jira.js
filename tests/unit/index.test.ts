import test from 'ava';
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

test('Callback should be defined', t => {
  const callback: Callback<string> = () => {};

  t.truthy(!!callback);
});

test('Config should be defined', t => {
  const config: Config = {
    host: 'http://localhost',
  };

  t.truthy(!!config);
  t.truthy(!!config.host);
  t.is(typeof config.host, 'string');
});

test('Agile client should be defined', t => {
  t.truthy(!!AgileClient);
});

test('Agile models should be defined', t => {
  t.truthy(!!AgileModels);
});

test('Agile parameters should be defined', t => {
  t.truthy(!!AgileParameters);
});

test('Version2 client should be defined', t => {
  t.truthy(!!Version2Client);
});

test('Version2 models should be defined', t => {
  t.truthy(!!Version2Models);
});

test('Version2 parameters should be defined', t => {
  t.truthy(!!Version2Parameters);
});

test('Version3 client should be defined', t => {
  t.truthy(!!Version3Client);
});

test('Version3 models should be defined', t => {
  t.truthy(!!Version3Models);
});

test('Version3 parameters should be defined', t => {
  t.truthy(!!Version3Parameters);
});

test('ServiceDesk client should be defined', t => {
  t.truthy(!!ServiceDeskClient);
});

test('ServiceDesk models should be defined', t => {
  t.truthy(!!ServiceDeskModels);
});

test('ServiceDesk parameters should be defined', t => {
  t.truthy(!!ServiceDeskParameters);
});
