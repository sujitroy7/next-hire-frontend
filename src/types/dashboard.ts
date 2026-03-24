export interface OrgDashboardStats {
  totalJobs: number;
  activeApplications: number;
  interviewsScheduled: number;
  hires: number;
}

export interface DashboardRecentJob {
  id: string;
  title: string;
  department: string | null;
  status: string;
  _count: {
    jobApplications: number;
  };
}

export interface RecentActivityItem {
  id: string;
  status: string;
  appliedAt: string;
  candidate: {
    firstName: string;
    lastName: string;
  };
  job: {
    title: string;
  };
}
