import { NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import { FaGithub } from 'react-icons/fa';
import { RiTwitterXFill, RiRocketLine } from 'react-icons/ri';

import { Header } from '@/components/home/header';
import { HoverEffect } from '@/components/home/card-hover-effect';
import { ContainerScroll } from '@/components/home/container-scroll-animation';
import { BackgroundBeams } from '@/components/home/background-beams';
import { Footer } from '@/components/home/footer';
import { UseSteps } from '@/components/home/useSteps';
import { PROJECT_Name, PATHS } from '@/utils';

const projects = [
  {
    icon: '/react.svg',
    title: 'React',
    description: 'JavaScript',
    link: '/',
  },
  {
    icon: '/react.svg',
    title: 'React',
    description: 'TypeScript',
    link: '/',
  },
  {
    icon: '/vue.svg',
    title: 'Vue',
    description: 'JavaScript',
    link: '/',
  },
  {
    icon: '/vue.svg',
    title: 'Vue',
    description: 'TypeScript',
    link: '/',
  },
  {
    icon: '/preact.svg',
    title: 'Preact',
    description: 'JavaScript',
    link: '/',
  },
  {
    icon: '/preact.svg',
    title: 'Preact',
    description: 'TypeScript',
    link: '/',
  },
  {
    icon: '/node.svg',
    title: 'Vanilla',
    description: 'JavaScript',
    link: '/g',
  },
  {
    icon: '/node.svg',
    title: 'Vanilla',
    description: 'TypeScript',
    link: '/h',
  },
];

const socialIcons = [
  {
    icon: <FaGithub className="w-6 h-6" />,
    link: 'https://github.com/xun082/online-edit-web',
  },
  {
    icon: <RiTwitterXFill className="w-6 h-6" />,
    link: 'https://github.com/xun082/online-edit-web',
  },
];

const router = [
  {
    title: 'Docs',
    link: '/a1',
  },
  {
    title: 'Blog',
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
                <img alt="preview" className="object-contain" src="/images/home.png" />
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
          <h3 className="text-white mx-auto text-center text-3xl">
            Boot a shareable environment in <strong className="text-[#1779ff]">milliseconds</strong>
          </h3>
          <HoverEffect items={projects} />
        </main>
        <section className="container relative mx-auto mb-20 space-y-6">
          <hr className="border-t border-gray-300 h-px top-[-1em] absolute w-full border-dashed" />
          <div className="flex ">
            <UseSteps />
          </div>
        </section>
        <div className="container mx-auto mt-20 mb-20 space-y-6">
          <div className="text-center">{getStartedButton}</div>
        </div>
        <Footer icons={socialIcons} />
      </div>
    </>
  );
};

export default Home;
