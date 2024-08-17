/**
 * @description Load data when in use
 * ```ts
 * const data = useLazyData(fn)
 * console.log(data.value)
 * ```
 */
export default function useLazyData<T extends() => ReturnType<T>>(fn: T): { value: ReturnType<T> } {
  return {
    get value() {
      // @ts-ignore
      delete this.value
      // @ts-ignore
      return (this.value = fn())
    }
  }
}
