import { useMemo } from 'react';
import Link from 'next/link';

import { Header } from '@/components/home/header/header';
import { HoverEffect } from '@/components/home/card-hover-effect/card-hover-effect';
import { ContainerScroll } from '@/components/home/container-scroll-animation/container-scroll-animation';
import { BackgroundBeams } from '@/components/home/background-beams/background-beams';
import { Footer } from '@/components/home/footer/footer';

export const projects = [
  {
    icon: <i className="w-8 h-8 i-ri-code-s-slash-line" />,
    title: 'title1',
    description: 'desc1!',
    link: '/',
  },
  {
    icon: <i className="w-8 h-8 i-ri-node-tree" />,
    title: 'title2',
    description: 'desc2',
    link: '/',
  },
  {
    icon: <i className="w-8 h-8 i-ri-box-1-line" />,
    title: 'title3',
    description: 'desc3',
    link: '/',
  },
  {
    icon: <i className="w-8 h-8 i-ri-gallery-line" />,
    title: 'title4',
    description: 'desc4',
    link: '/',
  },
  {
    icon: <i className="w-8 h-8 i-ri-box-3-line" />,
    title: 'title5',
    description: 'desc5',
    link: '/',
  },
  {
    icon: <i className="w-8 h-8 i-ri-shapes-line" />,
    title: 'title6',
    description: 'desc6',
    link: '/',
  },
];

export const icons = [
  {
    icon: <i className="w-6 h-6 i-ri-github-fill" />,

    link: 'https://github.com/xun082/online-edit-web',
  },
  {
    icon: <i className="w-5 h-5 i-ri-twitter-x-line" />,

    link: 'https://github.com/xun082/online-edit-web',
  },
];
export const router = [
  {
    title: 'page1',
    link: '/',
  },
  {
    title: 'page2',
    link: '/',
  },
];
export default function Home() {
  const getStartedButton = useMemo(() => {
    return (
      <Link href="/">
        <button className="relative inline-block p-px text-base font-semibold leading-6 text-white no-underline rounded-full shadow-2xl cursor-pointer bg-slate-800 group shadow-zinc-900">
          <span className="absolute inset-0 overflow-hidden rounded-full">
            <span className="absolute inset-0 rounded-full bg-[image:radial-gradient(75%_100%_at_50%_0%,rgba(56,189,248,0.6)_0%,rgba(56,189,248,0)_75%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
          </span>
          <div className="relative z-10 flex items-center px-6 py-2 space-x-2 rounded-full bg-zinc-950 ring-1 ring-white/10 ">
            <span>Get started</span>
            <i className="i-ri-rocket-line" />
          </div>
          <span className="absolute -bottom-0 left-[1.125rem] h-px w-[calc(100%-2.25rem)] bg-gradient-to-r from-emerald-400/0 via-emerald-400/90 to-emerald-400/0 transition-opacity duration-500 group-hover:opacity-40" />
        </button>
      </Link>
    );
  }, []);

  return (
    <>
      <div className="relative flex flex-col items-center justify-center gap-12 antialiased bg-[#111111]">
        <Header title="online-edit" icons={icons} router={router}></Header>
        <BackgroundBeams />
        <ContainerScroll
          content={
            <div
              className="w-screen overflow-hidden rounded-lg sm:w-full"
              style={{
                boxShadow:
                  '0 2px 15px -3px var(--next-devtools-widget-shadow), 0 4px 6px -4px var(--next-devtools-widget-shadow)',
              }}
            >
              <img alt="preview" className="object-contain" src="/images/preview.png" />
            </div>
          }
          titleComponent={
            <div className="relative z-10 p-4 pt-20 mx-auto">
              <h1 className="text-5xl font-bold text-center text-transparent bg-opacity-50 sm:text-6xl lg:text-7xl bg-clip-text bg-gradient-to-b from-neutral-50 to-neutral-400">
                enjoy
                <br />
                your
                <br />
                online edit
              </h1>

              <div className="my-6">{getStartedButton}</div>
            </div>
          }
        />
      </div>

      <div className="container mt-12 mx-auto bg-[#111111]">
        <HoverEffect items={projects} />
      </div>

      <div className="container mx-auto mt-20 mb-20 space-y-6">
        <div className="text-center">{getStartedButton}</div>
      </div>
      <Footer></Footer>
    </>
  );
}
