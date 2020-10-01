import { removeUndefinedElements } from '../../src/utils';

describe('Utils: removeUndefinedElements', () => {
  it('should return empty object for empty object', () => {
    const originalObject: {} = {};
    const expectedObject: {} = {};

    const actualObject = removeUndefinedElements(originalObject);

    expect(actualObject).toEqual(expectedObject);
  });

  it('should return empty array for empty array', () => {
    const originalArray: [] = [];
    const expectedArray: [] = [];

    const actualArray = removeUndefinedElements(originalArray);

    expect(actualArray).toEqual(expectedArray);
  });

  it('shouldn\'t remove any element', () => {
    const originalObject = {
      key1: 'stringValue',
      emptyString: '',
      nullValue: null,
      falseBooleanValue: false,
      trueBooleanValue: true,
      map: new Map(),
      set: new Set(),
      emptyArray: [],
      number: 0,
      arrayWithNullElements: [null, null],
      arrayWithEmptyString: [''],
      arrayWithStrings: ['string1', 'string2'],
    };

    const expectedObject = {
      key1: 'stringValue',
      emptyString: '',
      nullValue: null,
      falseBooleanValue: false,
      trueBooleanValue: true,
      map: new Map(),
      set: new Set(),
      emptyArray: [],
      number: 0,
      arrayWithNullElements: [null, null],
      arrayWithEmptyString: [''],
      arrayWithStrings: ['string1', 'string2'],
    };

    const actualObject = removeUndefinedElements(originalObject);

    expect(actualObject).toEqual(expectedObject);
  });

  it('should remove undefined elements from array', () => {
    const originalArray = [undefined, 'someString', 3, undefined, '', null, undefined, undefined];
    const expectedArray = ['someString', 3, '', null];

    const actualArray = removeUndefinedElements(originalArray);

    expect(actualArray).toEqual(expectedArray);
  });
});
