import React, { useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from 'next/navigation';
import SimpleBarReact from "simplebar-react";
import 'simplebar-react/dist/simplebar.min.css';

export default function Sidebar() {
  const pathname = usePathname();

  // Styling function for active/inactive links
  const linkClass = (path) =>
    `block px-3 py-2 rounded-md transition-colors duration-300 ${
      pathname === path
        ? 'text-[#947e03] font-semibold bg-[#947e30]'
        : 'text-white hover:text-[#947e03]'
    }`;

  return (
    <nav className="sidebar-wrapper sidebar-dark">
      {/* Top Logo Section */}
      <div className="dark:bg-gray-900 bg-[#ffffff] h-25 flex   items-center px-6">
        <Link href="/dashboard">
          <Image
            src="/images/2-removebg-preview copy.png"
            width={130}
            height={24}
            alt="logo"
          />
        </Link>
      </div>

      {/* Sidebar Navigation */}
      <div className="sidebar-content dark:bg-gray-900 bg-[#ffffff]">
        <SimpleBarReact style={{ height: "calc(100vh - 70px)" }}>
          <ul className="sidebar-menu border-t border-[#947e03] mt-1 px-4 space-y-1 pt-4">
             <li><Link href="/dashboard" className={linkClass("/dashboard")}><span className="text-black">Dashboard</span></Link></li>
            <li><Link href="/profile" className={linkClass("/profile")}><span className="text-black"> Profile</span></Link></li>
            <li><Link href="/listing" className={linkClass("/listing")}><span className="text-black">Listing</span></Link></li>
            <li><Link href="/blog" className={linkClass("/blog")}><span className="text-black">Blogs</span></Link></li>
            <li><Link href="/newsletter" className={linkClass("/newsletter")}><span className="text-black">Newsletter</span></Link></li>
            <li><Link href="/users" className={linkClass("/users")}><span className="text-black">users</span></Link></li>
          </ul>
        </SimpleBarReact>
      </div>
    </nav>
  );
}
