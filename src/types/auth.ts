export enum UserType {
  ORGANIZATION = "ORGANIZATION",
  RECRUITER = "RECRUITER",
  CANDIDATE = "CANDIDATE",
}

export interface User {
  id: string;
  email: string;
  phone: string | null;
  userType: UserType;
  addressId: string | null;
  createdAt: string;
}
