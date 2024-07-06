import React from 'react';
import Link from 'next/link';
export const Footer: React.FC = () => {
  return (
    <footer className="flex items-center justify-between py-16 px-10 mx-auto border-t border-t-[#e5e5e5]/10">
      <Link href="https://github.com/xun082/online-edit-web" className="text-white">
        online edit
      </Link>
      <span className="text-white opacity-50">Published under MIT License</span>
    </footer>
  );
};
