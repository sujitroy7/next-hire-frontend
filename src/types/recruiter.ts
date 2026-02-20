export interface RecruiterUser {
  email: string;
  createdAt: string;
}

export interface Recruiter {
  id: string;
  userId: string;
  firstName: string;
  lastName: string;
  publicEmail: string | null;
  publicPhone: string | null;
  linkedinUrl: string | null;
  about: string | null;
  isActive: boolean;
  user: RecruiterUser;
}
