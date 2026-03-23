import Link from "next/link";

export default function NavItem({
  href,
  label,
}: {
  href: string;
  label: string;
}) {
  return (
    <Link
      href={href as any}
      className="text-sm font-medium transition-colors hover:text-primary"
    >
      {label}
    </Link>
  );
}
