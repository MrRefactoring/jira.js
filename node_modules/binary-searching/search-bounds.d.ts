declare module "binary-searching" {
  /**
   * Custom comparison function
   *
   * @param {*} a
   * @param {*} b
   * @returns {number} A number
   *
   *  - negative if `a` precedes `b`
   *  - positive if `b` precedes `a`
   *  - 0 if there if `a` may be both before or after `b`
   *
   * A consistent ordering function must be anticommutative,
   * in the sense that `c(a,b) < 0` if and only if `c(b,a) > 0`.
   *
   */
  interface CompareFunc<T> {
    (a: T, b: T): number;
  }

  interface BSearch {
    /**
     * @param {Array<*>} array
     * @param {*} y
     * @param {[function]} compare
     * @param {number} [lo= 0] Lower bound of the search interval
     * @param {number} [hi= array.length-1] upper bound for the search interval
     * @returns {number} the last index `lo <= i <= hi`, such that the array such that
     * `array[i]` precedes `y`, or `lo - 1` if no such element exists in the specified
     * slice.
     */
    gt<T>(
      array: T[],
      y: T,
      compare?: CompareFunc<T>,
      lo?: number,
      hi?: number
    ): number;

    /**
     * @param {Array<*>} array
     * @param {*} y
     * @param {[function]} compare
     * @param {number} [lo= 0] Lower bound of the search interval
     * @param {number} [hi= array.length-1] upper bound for the search interval
     * @returns {number} the first index `lo <= i <= hi`, such that
     * `y` does not precede `array[i]`, or `hi + 1` if no such element exists in the
     * specified slice.
     */
    ge<T>(
      array: T[],
      y: T,
      compare?: CompareFunc<T>,
      lo?: number,
      hi?: number
    ): number;

    /**
     * @param {Array<*>} array
     * @param {*} y
     * @param {[function]} compare
     * @param {number} [lo= 0] Lower bound of the search interval
     * @param {number} [hi= array.length-1] upper bound for the search interval
     * @returns {number} the last index `lo <= i <= hi`, such that
     * `array[i]` precedes `y`, or `lo - 1` if no such element exists in the
     * specified slice.
     */
    lt<T>(
      array: T[],
      y: T,
      compare?: CompareFunc<T>,
      lo?: number,
      hi?: number
    ): number;
    /**
     * @param {Array<*>} array
     * @param {*} y
     * @param {[function]} compare
     * @param {number} [lo= 0] Lower bound of the search interval
     * @param {number} [hi= array.length-1] upper bound for the search interval
     * @returns {number} the last index `lo <= i <= hi`, such that
     * `y` does not precede `array[i]`, or `lo - 1` if no such element exists in the
     * specified slice.
     */
    le<T>(
      array: T[],
      y: T,
      compare?: CompareFunc<T>,
      lo?: number,
      hi?: number
    ): number;
    /**
     * @param {Array<*>} array
     * @param {*} y
     * @param {[function]} compare
     * @param {number} [lo= 0] Lower bound of the search interval
     * @param {number} [hi= array.length-1] upper bound for the search interval
     * @returns {number} the last index `lo <= i <= hi`, such that
     * `y` does not precede `array[i]`, and `array[i]` does not precede `y`,
     * or `-1` if no such element exists in the specified slice.
     */
    eq<T>(
      array: T[],
      y: T,
      compare?: CompareFunc<T>,
      lo?: number,
      hi?: number
    ): number;
  }
  const bsearch: BSearch;
  export = bsearch;
}
