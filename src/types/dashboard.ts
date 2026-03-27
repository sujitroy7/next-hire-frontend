export interface OrgDashboardStats {
  totalJobs: number;
  activeApplications: number;
  interviewsScheduled: number;
  hires: number;
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
