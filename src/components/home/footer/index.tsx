import React from 'react';
import Link from 'next/link';
interface Icon {
  icon: React.ReactNode;
  link: string;
}
interface LinkProps {
  name: string;
  link: string;
}
interface FooterProps {
  icons: Icon[];
}

const Product: LinkProps[] = [
  {
    name: 'Features',
    link: '/',
  },
  {
    name: 'Pricing',
    link: '/',
  },
  {
    name: 'Documentation',
    link: '/',
  },
  {
    name: 'Changelog',
    link: '/',
  },
];
const Resources: LinkProps[] = [
  {
    name: 'Blog',
    link: '/',
  },
  {
    name: 'Tutorials',
    link: '/',
  },
  {
    name: 'Community',
    link: '/',
  },
  {
    name: 'FAQ',
    link: '/',
  },
];
const About: LinkProps[] = [
  {
    name: 'Company',
    link: '/',
  },
  {
    name: 'Team',
    link: '/',
  },
  {
    name: 'Careers',
    link: '/',
  },
  {
    name: 'Contact Us',
    link: '/',
  },
];
const Partners: LinkProps[] = [
  {
    name: 'GitHub',
    link: '/',
  },
  {
    name: 'Stack Overflow',
    link: '/',
  },
  {
    name: 'Careers',
    link: '/',
  },
  {
    name: 'VS Code',
    link: '/',
  },
];
// 渲染链接
const renderLink = (products: LinkProps[]) =>
  products.map((item) => (
    <li>
      <Link href={item.link}>{item.name}</Link>
    </li>
  ));

const renderIcon = (icons: Icon[]) =>
  icons.map((icon) => (
    <a
      href={icon.link}
      key={icon.link}
      className="p-2 rounded-md text-white border border-white/30 hover:bg-white/10 transition-colors"
    >
      {icon.icon}
    </a>
  ));

export const Footer: React.FC<FooterProps> = ({ icons }) => {
  return (
    <footer className="py-16 px-10 mx-auto border-t border-t-[#e5e5e5]/10">
      <div className="max-w-6xl mx-auto">
        <div className="flex">
          {/* 左侧: 信息相关内容 (占1/3宽度) */}
          <div className="w-1/3 pr-8">
            <div className="flex flex-col mb-4">
              <h2 className="text-white font-bold text-3xl mb-2">Online Edit</h2>
              <p className="text-white opacity-70">Made with ❤️ by Coder</p>
              <div className="flex mt-3 space-x-3">{renderIcon(icons)}</div>
            </div>
            <p className="text-white opacity-50">
              2024 © All Rights Reserved
              {/* 一个简单易用的在线代码编辑器，提供高效便捷的编程体验。无论您是初学者还是专业人士，我们都能满足您的所有需求。 */}
            </p>
          </div>

          {/* 右侧: 四个内容块 (占2/3宽度) */}
          <div className="w-2/3 flex space-x-8">
            <div className="flex-1">
              <h4 className="text-white font-semibold mb-4">Product</h4>
              <ul className="text-white opacity-70 space-y-2">{renderLink(Product)}</ul>
            </div>
            <div className="flex-1">
              <h4 className="text-white font-semibold mb-4">Resources</h4>
              <ul className="text-white opacity-70 space-y-2">{renderLink(Resources)}</ul>
            </div>

            <div className="flex-1">
              <h4 className="text-white font-semibold mb-4">About Us</h4>
              <ul className="text-white opacity-70 space-y-2">{renderLink(About)}</ul>
            </div>
            <div className="flex-1">
              <h4 className="text-white font-semibold mb-4">Partners</h4>
              <ul className="text-white opacity-70 space-y-2">{renderLink(Partners)}</ul>
            </div>
          </div>
        </div>

        {/* <div className="mt-12 text-center text-white opacity-50">
          <p>© 2024 Online Editor. Published under MIT License.</p>
        </div> */}
      </div>
    </footer>
  );
};
