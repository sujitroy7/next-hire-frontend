// Helper function to format dates
export const formatDate = (date: Date | string | null | undefined) => {
  if (!date) return "Present";
  const d = new Date(date);
  return d.toLocaleDateString("en-US", { month: "short", year: "numeric" });
};
