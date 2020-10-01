function removeUndefinedFromArray<T>(array: Array<T>): Array<T> {
  return array.filter((element) => element !== undefined);
}

function removeUndefinedFromObject<T>(object: Record<string, T>): Record<string, T> {
  return Object.entries(object).reduce((accumulator, current) => {
    const [key, value] = current;

    if (value === undefined) {
      return accumulator;
    }

    const isObject = typeof value === 'object';
    const isNull = value === null;
    const isSet = value instanceof Set;
    const isMap = value instanceof Map;

    if (
      !isNull
      && isObject
      && !isSet
      && !isMap
    ) {
      return {
        ...accumulator,
        [key]: Array.isArray(value)
          ? removeUndefinedFromArray(value)
          : removeUndefinedFromObject(value as Record<string, unknown>),
      };
    }

    return {
      ...accumulator,
      [key]: value,
    };
  }, {});
}

export function removeUndefinedElements<T>(o: Array<T>): Array<T>;
export function removeUndefinedElements<T>(o: Record<string, T>): Record<string, T>;
export function removeUndefinedElements(o: any): any {
  switch (typeof o) {
    case 'object':
      if (Array.isArray(o)) {
        return removeUndefinedFromArray(o);
      }

      return removeUndefinedFromObject(o);
    default:
      return o;
  }
}
