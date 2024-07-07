import { Header } from '@/components/main/header';
import { Sider } from '@/components/main/sider';

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className=" flex flex-col w-[100vw] h-[100vh] overflow-hidden">
      <div className=" w-[100vw] h-[5vh] bg-[#24262B] flex items-center">
        <Header></Header>
      </div>
      <div className=" flex-1 flex flex-row bg-red-400 w-[100vw]">
        <div className=" h-full w-[18vw] bg-gray-400">
          <Sider></Sider>
        </div>
        <div className=" h-full w-[5px] bg-[#1f2023]"></div>
        <div className=" h-full flex-1 bg-black">{children}</div>
        <div></div>
      </div>
    </div>
  );
}
