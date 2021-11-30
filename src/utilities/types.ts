export type DeepPartial<T> = {
  [P in keyof T]?: Partial<T[P]>
}

export type SubPartial<T, Ks extends keyof T> = Partial<Pick<T, Ks>> & Pick<T, Exclude<keyof T, Ks>>
