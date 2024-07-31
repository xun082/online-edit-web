import { NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import { FaGithub } from 'react-icons/fa';
import { RiTwitterXFill, RiRocketLine } from 'react-icons/ri';
import { PiAcorn } from 'react-icons/pi';

import { Header } from '@/components/home/header';
import { HoverEffect } from '@/components/home/card-hover-effect';
import { ContainerScroll } from '@/components/home/container-scroll-animation';
import { BackgroundBeams } from '@/components/home/background-beams';
import { Footer } from '@/components/home/footer';
import { PROJECT_Name, PATHS } from '@/utils';

const projects = [
  {
    icon: <PiAcorn className="w-8 h-8" />,
    title: 'title1',
    description: 'desc1!',
    link: '/a',
  },
  {
    icon: <PiAcorn className="w-8 h-8" />,
    title: 'title2',
    description: 'desc2',
    link: '/b',
  },
  {
    icon: <PiAcorn className="w-8 h-8" />,
    title: 'title3',
    description: 'desc3',
    link: '/c',
  },
  {
    icon: <PiAcorn className="w-8 h-8" />,
    title: 'title4',
    description: 'desc4',
    link: '/d',
  },
  {
    icon: <PiAcorn className="w-8 h-8" />,
    title: 'title5',
    description: 'desc5',
    link: '/e',
  },
  {
    icon: <PiAcorn className="w-8 h-8" />,
    title: 'title6',
    description: 'desc6',
    link: '/f',
  },
];

const socialIcons = [
  {
    icon: <FaGithub className="w-6 h-6" />,
    link: 'https://github.com/xun082/online-edit-web',
  },
  {
    icon: <RiTwitterXFill className="w-6 h-6" />,
    link: 'https://github.com/xun082/online-edit-web111',
  },
];

const router = [
  {
    title: 'page1',
    link: '/a',
  },
  {
    title: 'page2',
    link: '/b',
  },
];

const Home: NextPage = () => {
  const getStartedButton = (
    <Link href={PATHS.MAIN_DASHBOARD}>
      <button className="relative inline-block p-px text-base font-semibold leading-6 text-white no-underline rounded-full shadow-2xl cursor-pointer bg-slate-800 group shadow-zinc-900 overflow-hidden">
        <span className="absolute top-0 left-0 w-full h-1 bg-[image:linear-gradient(to_right,#0c002b,#1779ff)] animate-snakeBorderTop delay-1000"></span>
        <span className="absolute top-0 right-0 w-1 h-full bg-[image:linear-gradient(to_bottom,#0c002b,#1779ff)] animate-snakeBorderLeft "></span>
        <span className="absolute bottom-0 left-0 w-full h-1 bg-[image:linear-gradient(to_left,#0c002b,#1779ff)] animate-snakeBorderBottom "></span>
        <span className="absolute top-0 left-0 w-1 h-full bg-[image:linear-gradient(to_top,#0c002b,#1779ff)] animate-snakeBorderRight delay-1000"></span>
        <div className="relative z-10 flex items-center px-6 py-2 space-x-2 rounded-full bg-zinc-950 ring-1 ring-white/10">
          <span>Get started</span>
          <RiRocketLine />
        </div>
      </button>
    </Link>
  );

  return (
    <>
      <Head>
        <title>{PROJECT_Name} - Home</title>
        <meta
          name="description"
          content="Welcome to the home page of our project. Enjoy your online edit experience."
        />
        <meta name="keywords" content="online edit, project name, home page" />
      </Head>
      <div className="bg-[#111111]">
        <header className="relative flex flex-col items-center justify-center gap-12 antialiased">
          <Header title={PROJECT_Name} icons={socialIcons} router={router} />
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
                <h1 className="text-5xl font-bold text-center text-transparent bg-opacity-50 sm:text-6xl lg:text-7xl bg-clip-text bg-gradient-to-b from-neutral-50 to-neutral-400 select-none">
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
        </header>

        <main className="container mt-12 mx-auto bg-[#111111]">
          <HoverEffect items={projects} />
        </main>

        <div className="container mx-auto mt-20 mb-20 space-y-6">
          <div className="text-center">{getStartedButton}</div>
        </div>
        <Footer />
      </div>
    </>
  );
};

export default Home;
