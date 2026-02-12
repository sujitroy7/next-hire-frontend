export enum UserRoleEnum {
  ORGANIZATION = "ORGANIZATION",
  RECRUITER = "RECRUITER",
  CANDIDATE = "CANDIDATE",
}
export type UserRole = keyof typeof UserRoleEnum;

export interface User {
  id: string;
  email: string;
  phone: string | null;
  userType: UserRole;
  addressId: string | null;
  createdAt: string;
}

export interface PermissionsTokenPayload {
  sub: string;
  role: UserRole;
  iat: number;
  exp: number;
}

export interface AccessTokenPayload {
  sub: string;
  email: string;
  userType: UserRole;
  roles: UserRole[];
  iat: number;
  exp: number;
}
