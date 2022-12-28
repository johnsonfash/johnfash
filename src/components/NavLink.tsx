import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";

function NavLink({
  href,
  className,
  children,
}: {
  href: string;
  className?: string;
  children: string;
}) {
  const route = useRouter();
  return (
    <Link
      href={href}
      className={`${className} ${
        route.pathname == href ? "active" : "text-muted"
      }`}
    >
      {children}
    </Link>
  );
}

export default NavLink;
