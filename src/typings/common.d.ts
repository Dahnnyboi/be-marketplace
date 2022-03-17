declare type EnvironmentType =
  | string
  | 'development'
  | 'production'
  | undefined;

declare type UserType = 'buyer' | 'seller';

type PasswordBody = {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
};

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
