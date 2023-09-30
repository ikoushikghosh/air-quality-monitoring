import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const Navbar: React.FC = () => {
  return (
    <div className="navbar bg-base-100 mb-20 shadow-xl rounded-box">
      <div className="flex-1">
        <a className="btn btn-ghost normal-case text-xl">Air Quality Monitor</a>
      </div>
      <div className="flex-none">
        <div className="dropdown dropdown-end">
          <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
            <div className="w-10 rounded-full">
              <Image
                src="/images/profile.png"
                height={144}
                width={144}
                alt="Your Name"
              />
            </div>
          </label>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
          >
            <li>
              <Link href="/login">Logout</Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
