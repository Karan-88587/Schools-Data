"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaRegListAlt } from "react-icons/fa";
import { IoIosAddCircleOutline } from "react-icons/io";

export default function Navbar() {
  const pathname = usePathname();

  const links = [
    { href: "/", label: "Show Schools", icon: <FaRegListAlt /> },
    { href: "/addSchool", label: "Add School", icon: <IoIosAddCircleOutline /> },
  ];

  return (
    <nav className="flex items-center h-14 px-10 bg-gray-50">
      <div className="flex gap-10">
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={`text-lg font-semibold transition-colors ${pathname === link.href
                ? "text-green-400 border-b-2 border-green-500"
                : "text-dark hover:text-gray-800"
              }`}
          >
            <div className="flex items-center gap-2">
              <span className="text-2xl">{link.icon}</span>
              <span>{link.label}</span>
            </div>
          </Link>
        ))}
      </div>
    </nav>
  );
}