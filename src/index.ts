/**
 * @description Load when used and only once - (使用时加载且只加载一次)
 * @param getter - () => ({})
 * @example
 * ```ts
 * import useLazyData from 'use-lazy-data'
 * const data = useLazyData(() => ({
 *  name: 'Jaye'
 * }))
 * console.log(data) -> "{}"
 * data.value
 * console.log(data) -> "{ value: { name: 'Jaye' } }"
 *
 * const data2 = useLazyData({
 *   name: () => 'Jaye',
 * })
 * console.log(data2) -> "{}"
 * data2.name
 * console.log(data2) -> "{ name: 'Jaye' }"
 * ```
 */
export default function useLazyData<T extends () => any>(getter: T): { value: ReturnType<T> }

/**
 * @description Load when used and only once - (使用时加载且只加载一次)
 * @param getter - { prop: () => ({}) }
 * @example
 * ```ts
 * import useLazyData from 'use-lazy-data'
 * const data = useLazyData(() => ({
 *  name: 'Jaye'
 * }))
 * console.log(data) -> "{}"
 * data.value
 * console.log(data) -> "{ value: { name: 'Jaye' } }"
 *
 * const data2 = useLazyData({
 *   name: () => 'Jaye',
 * })
 * console.log(data2) -> "{}"
 * data2.name
 * console.log(data2) -> "{ name: 'Jaye' }"
 * ```
 */
// eslint-disable-next-line
export default function useLazyData<T extends Record<string, () => any>>(getter: T): { [K in keyof T]: ReturnType<T[K]> }

// eslint-disable-next-line
export default function useLazyData<T extends Record<string, () => any> | (() => any)>(
  getter: T
): T extends Record<string, () => any>
  ? { [K in keyof T]: ReturnType<T[K]> }
  : T extends () => any
    ? { value: ReturnType<T> }
    : never {
  if (typeof getter === 'function') {
    // @ts-ignore
    return {
      get value() {
        delete this.value
        return (this.value = getter())
      }
    }
  }

  if (Object.prototype.toString.call(getter) === '[object Object]') {
    const obj = {}
    for (const key in getter) {
      Object.defineProperty(obj, key, {
        get() {
          delete this[key]
          return (this[key] = (getter[key] as () => any)())
        },
        configurable: true,
        enumerable: true
      })
    }
    // @ts-ignore
    return obj
  }

  throw new Error('Invalid getter')
}
