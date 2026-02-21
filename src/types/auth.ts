export enum UserRoleEnum {
  ORGANIZATION = "ORGANIZATION",
  RECRUITER = "RECRUITER",
  CANDIDATE = "CANDIDATE",
}
export type UserRole = keyof typeof UserRoleEnum;

export interface User {
  id: string;
  fullName: string | null;
  email: string;
  userType: UserRole;
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
