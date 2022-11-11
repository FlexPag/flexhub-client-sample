// convert type to what would be the ouput of json stringify followed by json parse
export type AsParsedJSON<T> = T extends string
  ? string
  : T extends number
  ? number
  : T extends boolean
  ? boolean
  : T extends null
  ? null
  : T extends Date
  ? string
  : T extends undefined
  ? undefined
  : T extends Array<infer U>
  ? Array<AsParsedJSON<U>>
  : T extends ReadonlyArray<infer U>
  ? ReadonlyArray<AsParsedJSON<U>>
  : T extends object
  ? { [K in keyof T]: AsParsedJSON<T[K]> }
  : T;
