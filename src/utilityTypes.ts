// eslint-disable-next-line @typescript-eslint/no-namespace
export namespace UtilityTypes {
  /** Mark some properties which only the former including as optional and set the value to never */
  export type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /** Get the XOR type which could make 2 types exclude each other */
  export type XOR<T, U> = T | U extends object ? (Without<T, U> & U) | (Without<U, T> & T) : T | U;

  /** Get the XOR type for 3 types */
  export type XOR3<T, U, V> = XOR<XOR<T, U>, V>;
}
