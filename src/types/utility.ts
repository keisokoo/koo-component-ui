// type ABC = PrefixKeys<T, '$'>
export type PrefixKeys<T, Prefix extends string> = {
  [P in keyof T as `${Prefix}${P & string}`]: T[P]
}
