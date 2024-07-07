const TemplateCardData = [
  {
    title: 'Node',
    icon: 'https://lf-cdn.marscode.com.cn/obj/eden-cn/ljhwz_lkpkbvsj/ljhwZthlaukjlkulzlp/project_template/prod/e78a9920fc913dcd1b339f0ee1493e429fb237c8/images/native_nodejs/icon.svg',
  },
  {
    title: 'Vue3',
    icon: 'https://lf-cdn.marscode.com.cn/obj/eden-cn/ljhwz_lkpkbvsj/ljhwZthlaukjlkulzlp/project_template/prod/e78a9920fc913dcd1b339f0ee1493e429fb237c8/images/native_nodejs/icon.svg',
  },
  {
    title: 'React',
    icon: 'https://lf-cdn.marscode.com.cn/obj/eden-cn/ljhwz_lkpkbvsj/ljhwZthlaukjlkulzlp/project_template/prod/e78a9920fc913dcd1b339f0ee1493e429fb237c8/images/native_golang/icon.svg',
  },
];
const LinkCardData = [
  {
    linkText: 'Node',
    LinkUrl: 'https://www.baidu.com',
    linkDesc: 'ai帮助你学习前端后端运维安全',
  },
  {
    linkText: 'Node',
    LinkUrl: 'https://www.baidu.com',
    linkDesc: 'ai帮助你学习前端后端运维安全',
  },
  {
    linkText: 'Node',
    LinkUrl: 'https://www.baidu.com',
    linkDesc: 'ai帮助你学习前端后端运维安全',
  },
];

function createTemplateCard(templateName: string, templateIconUrl: string) {
  return (
    <div className=" group relative h-[20vh] py-[16px] px-[16px] duration-200 transition-all rounded-[8px] hover:rounded-[16px] hover:bg-black/50 bg-black/40 overflow-hidden flex flex-col w-1/3 cursor-pointer">
      <div className="flex items-center h-[28px]">
        <div className="w-[28px] h-[28px] rounded-[6px] flex items-center justify-center">
          <img className="rounded-[6px]" width="28" height="28" src={templateIconUrl} />
        </div>
        <div className="font-[600] text-[16px] my-[12px] flex-1 leading-[20px] h-[20px] ml-[12px]">
          {templateName}
        </div>
      </div>
      <div className="text-[12px] overflow-hidden flex-1 text-ellipsis mt-[16px] text-[var(--text-default)]">
        快速开始 {templateName} 开发
      </div>
      <div className="mt-[16px]">
        <div className="bg-tr-1 bg-white/5 text-[14px] group-hover:bg-white/15  w-full font-[600] rounded-[4px] py-[5px] px-[16px] text-center">
          体验
        </div>
      </div>
    </div>
  );
}

function createLinkCard(linkText: string, linkUrl: string, linkDesc: string) {
  return (
    <a rel="noreferrer" className="w-1/3 cursor-pointer" href={linkUrl} target="_blank">
      <div className="relative group py-[20px] px-[20px] rounded-[8px] hover:rounded-[16px] hover:bg-[#282A2E] bg-[#1F2124] overflow-hidden flex flex-col transition-all duration-200">
        <div className="flex items-center h-[16px] w-full place-content-between mb-[12px]">
          <div className="font-[600] text-[16px] my-[12px] flex-1 leading-[20px] h-[20px]">
            {linkText}
          </div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="none"
            viewBox="0 0 16 16"
            className="hidden group-hover:inline-block"
          >
            <path
              fill="#ADB0B8"
              fillRule="evenodd"
              d="M12.582 9.772c0 .185-.149.334-.333.334h-.667a.333.333 0 0 1-.333-.334V5.714l-6.984 6.984a.333.333 0 0 1-.471 0l-.472-.471a.333.333 0 0 1 0-.472l6.983-6.983H6.25a.333.333 0 0 1-.333-.333v-.667c0-.184.149-.333.333-.333h6c.184 0 .333.15.333.333z"
              clipRule="evenodd"
            />
          </svg>
        </div>
        <div className="text-[12px] h-[36px] leading-[18px] overflow-hidden text-ellipsis text-[#dadde5]">
          {linkDesc}
        </div>
      </div>
    </a>
  );
}

export default function DashboardPage() {
  return (
    <div className="bg-[#181a1f] w-full h-full flex justify-center items-center overflow-hidden">
      <div className=" flex flex-col items-start justify-start gap-y-12  h-full w-[70%] overflow-auto pt-12">
        <div className=" flex flex-col gap-y-5">
          <span className=" text-[32px] font-[800] leading-[38.2px]">欢迎使用 Online Edit</span>
          <span className=" text-[14px] text-[#c7ccd6]">
            一款集成 AI 能力的 Online IDE，提供开箱即用的开发环境，简化开发过程，提高效率
          </span>
        </div>

        <div className="relative flex flex-col pt-6 px-6 w-full h-[40vh] rounded-lg overflow-hidden">
          <>
            <img
              src="https://lf-cdn.marscode.cn/obj/marscode-bucket-cn/A0_prod/static/image/create-from-template-bg.f1c04af1.png"
              alt=""
              className="absolute inset-0 w-full h-full object-cover pointer-events-none"
            />
            <div className="absolute inset-0 w-full h-full bg-gray-800 opacity-20 pointer-events-none"></div>
            <div className="absolute inset-0 w-full h-full flex items-center justify-center pointer-events-none">
              <div className=" pointer-events-none bg-radial-[rgba(255,255,255,0.667)-rgba(233,242,255,0.25)] bg-center bg-no-repeat bg-contain w-full h-full"></div>
            </div>
          </>
          <>
            <div className=" flex justify-start items-center h-[3.5vh] font-[800]">
              <span className=" text-[24px] ml-4">创建您的项目</span>
              <div className=" ml-auto flex gap-x-2 items-center">
                <div className=" cursor-pointer text-[14px] p-3 flex items-center justify-center rounded-md font-[500] w-[7vw] h-[3.2vh] hover:bg-white/20 hover:text-white">
                  导入Git项目
                </div>
                <span className=" font-[600] text-[12px]">|</span>
                <div className=" cursor-pointer text-[14px] p-3 flex items-center justify-center rounded-md font-[500] w-[7vw] h-[3.2vh] hover:bg-white/20 hover:text-white">
                  选择更多模板
                </div>
              </div>
            </div>
          </>
          <p className=" text-[#737780] leading-[17px] ml-4 mb-[12px] mt-[26px] text-[14px] px-[8px]">
            使用模板快速开始
          </p>
          <div className=" flex items-center justify-center mt-4 w-full gap-x-4 px-2">
            {TemplateCardData.map((item) => createTemplateCard(item.title, item.icon))}
          </div>
        </div>
        <>
          <p className=" text-[#737780] text-[14px]">阅读文档了解如何使用</p>
          <div className=" flex gap-x-4 items-center justify-center w-full mt-[-3vh]">
            {LinkCardData.map((item) => createLinkCard(item.linkText, item.LinkUrl, item.linkDesc))}
          </div>
        </>
      </div>
    </div>
  );
}
