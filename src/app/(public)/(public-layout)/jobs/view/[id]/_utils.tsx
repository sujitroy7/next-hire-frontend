import { Job } from "@/types/job";

export const formatCurrency = (amount: number, currency: string = "USD") => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
    maximumFractionDigits: 0,
  }).format(amount);
};

export const getSalaryDisplay = (job: Job) => {
  if (!job.salaryMin && !job.salaryMax) return "Salary not specified";
  if (job.salaryMin && !job.salaryMax)
    return `${formatCurrency(job.salaryMin, job.currency)}+`;
  if (!job.salaryMin && job.salaryMax)
    return `Up to ${formatCurrency(job.salaryMax, job.currency)}`;
  return `${formatCurrency(job.salaryMin, job.currency)} - ${formatCurrency(job.salaryMax, job.currency)}`;
};
