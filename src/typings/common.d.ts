declare type ENVIRONMENT_TYPE =
  | string
  | 'development'
  | 'production'
  | undefined;

type StaticOrigin =
  | boolean
  | string
  | RegExp
  | (boolean | string | RegExp)[];

type CustomOrigin = (
  requestOrigin: string | undefined,
  callback: (err: Error | null, origin?: StaticOrigin) => void,
) => void;

type OriginCallback = (
  err: Error | null,
  origin?: StaticOrigin,
) => void;
