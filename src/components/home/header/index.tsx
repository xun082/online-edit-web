import Link from 'next/link';
import React from 'react';

interface Icon {
  icon: React.ReactNode;
  link: string;
}

interface HeaderProps {
  title: string;
  icons: Icon[];
  router: HeaderRouter[];
}

interface HeaderRouter {
  title: React.ReactNode;
  link: string;
}

const renderIcon = (icons: Icon[]) =>
  icons.map((icon) => (
    <a href={icon.link} key={icon.link} className="p-2 rounded-md text-[#ffffff]">
      {icon.icon}
    </a>
  ));

const renderRouter = (router: HeaderRouter[]) =>
  router.map((item) => (
    <Link
      href={item.link}
      key={item.link}
      className="p-2 rounded-md hover:text-white text-white/60 font-medium"
    >
      {item.title}
    </Link>
  ));

export const Header: React.FC<HeaderProps> = ({ title, icons, router }) => {
  return (
    <header className="flex items-center justify-between bg-[rgba(17,17,17,1)] py-4 px-6 fixed left-0 top-0 right-0 z-[999] opacity-65">
      <h1 className="text-white font-bold flex-grow-0">{title}</h1>
      <div className="flex items-center space-x-2">
        {renderRouter(router)}
        <input
          type="search"
          placeholder="Search documentation..."
          className="bg-[#e5e5e5]/15 text-white/60 hidden sm:block focus:text-white focus:border-2 focus:border-neutral-400 h-8 outline-none pl-3 pr-1 py-2 rounded-lg"
        />
        {renderIcon(icons)}
      </div>
    </header>
  );
};
