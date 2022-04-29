// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Any = any;
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

type ExpressRequestQuery =
  | string
  | string[]
  | QueryString.ParsedQs
  | QueryString.ParsedQs[]
  | undefined;
type Ordering = 'DESC' | 'ASC';

type PaginationQuery = {
  limit: number;
  offset: number;
  order: Ordering;
  orderBy: string;
  search?: string;
};

type PaginationInterface = {
  data: Array<Any>;
  meta: {
    totalPages: number;
    totalRows: number;
    limit: number;
    offset: number;
    order: string;
    orderBy: string;
  };
};
