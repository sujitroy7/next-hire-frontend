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

export interface RecruiterPagination {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface RecruitersResponse {
  status: string;
  data: {
    recruiters: Recruiter[];
    pagination: RecruiterPagination;
  };
}
