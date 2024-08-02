'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { v4 as uuidv4 } from 'uuid';

import {
  templateList,
  LinkCardData,
  UPLOAD_FILE_DATA,
  isoDateStringFormat,
  DirectoryInterface,
} from '@/utils';
import { useModal } from '@/hooks/useModal';
import { useUploadFileDataStore } from '@/store/uploadFileDataStore';

export default function DashboardPage() {
  const { onOpen } = useModal();
  const [showProjectList, setShowProjectList] = useState(false);
  const [projectList, setProjectList] = useState([]);
  useEffect(() => {
    const projectData =
      localStorage.getItem(UPLOAD_FILE_DATA) === null
        ? []
        : JSON.parse(localStorage.getItem(UPLOAD_FILE_DATA)!);

    if (projectData.length > 0) {
      setProjectList(projectData);
      setShowProjectList(true);
    }
  }, []);

  return (
    <div className="bg-[#181a1f] w-full h-full flex justify-center items-center overflow-hidden">
      <div className="flex flex-col items-start justify-start gap-y-12 h-full w-[70%] overflow-auto pt-12">
        {showProjectList ? (
          <div className=" flex flex-col gap-y-4">
            <div className=" flex justify-between mb-3">
              <div className=" text-[18px] font-[600] text-[#c7ccd6]">项目</div>
              <div></div>
            </div>
            <div className=" flex flex-col gap-y-4 overflow-y-scroll h-[60vh] hide-scrollbar">
              {projectList.map((item) => (
                <ProjectCard projectData={item} key={(item as any).id} />
              ))}
            </div>
          </div>
        ) : (
          <>
            <div className="flex flex-col gap-y-5">
              <span className="text-[32px] font-[800] leading-[38.2px]">欢迎使用 Online Edit</span>
              <span className="text-[14px] text-[#c7ccd6]">
                一款集成 AI 能力的 Online IDE，提供开箱即用的开发环境，简化开发过程，提高效率
              </span>
            </div>
            <div className="relative flex flex-col pt-6 px-6 w-full h-[40vh] rounded-lg overflow-hidden">
              <img
                src="/dashboard.png"
                alt=""
                className="absolute inset-0 w-full h-full object-cover pointer-events-none"
              />
              <div className="absolute inset-0 w-full h-full bg-gray-800 opacity-20 pointer-events-none"></div>
              <div className="absolute inset-0 w-full h-full flex items-center justify-center pointer-events-none">
                <div className="pointer-events-none bg-radial-[rgba(255,255,255,0.667)-rgba(233,242,255,0.25)] bg-center bg-no-repeat bg-contain w-full h-full"></div>
              </div>
              <div className="flex justify-start items-center h-[3.5vh] font-[800]">
                <span className="text-[24px] ml-4">创建您的项目</span>
                <div className="ml-auto flex gap-x-2 items-center">
                  <div className="cursor-pointer text-[14px] p-3 flex items-center justify-center rounded-md font-[500] w-[7vw] h-[3.2vh] hover:bg-white/20 hover:text-white">
                    导入Git项目
                  </div>
                  <span className="font-[600] text-[12px]">|</span>
                  <div
                    onClick={() => onOpen('createProject')}
                    className="cursor-pointer text-[14px] p-3 flex items-center justify-center rounded-md font-[500] w-[8vw] h-[3.2vh] hover:bg-white/20 hover:text-white"
                  >
                    选择更多模板
                  </div>
                </div>
              </div>
              <p className="text-[#737780] leading-[17px] ml-4 mb-[12px] mt-[26px] text-[14px] px-[8px]">
                使用模板快速开始
              </p>
              <div className="flex items-center justify-center mt-4 w-full gap-x-4 px-2">
                {Object.keys(templateList)
                  .slice(0, 3)
                  .map((item) => (
                    <TemplateCard
                      key={item}
                      fileData={templateList[item].template}
                      title={item}
                      icon={templateList[item].icon}
                    />
                  ))}
              </div>
            </div>
            <p className="text-[#737780] text-[14px]">阅读文档了解如何使用</p>
            <div className="flex gap-x-4 items-center justify-center w-full mt-[-3vh]">
              {LinkCardData.map((item) => (
                <LinkCard
                  key={item.linkText}
                  linkText={item.linkText}
                  linkUrl={item.linkUrl}
                  linkDesc={item.linkDesc}
                />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

const TemplateCard: React.FC<{ title: string; fileData: string; icon: string }> = ({
  title,
  icon,
  fileData,
}) => {
  const router = useRouter();
  const { setFileData } = useUploadFileDataStore();

  const quickStartProject = () => {
    try {
      const projectId = uuidv4();
      const preUploadFileData =
        localStorage.getItem(UPLOAD_FILE_DATA) !== null
          ? JSON.parse(localStorage.getItem(UPLOAD_FILE_DATA) as string)
          : [];
      preUploadFileData.push({
        name: `${title}-${projectId}`,
        desc: `一个快速开始的${title}项目`,
        id: projectId,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      });
      localStorage.setItem(UPLOAD_FILE_DATA, JSON.stringify(preUploadFileData));

      const projectInfo = {
        projectFileData: fileData,
        name: `${title}-${projectId}`,
        desc: `一个快速开始的${title}项目`,
        id: projectId,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      localStorage.setItem(projectId, JSON.stringify(projectInfo));
      setFileData(fileData as unknown as DirectoryInterface[]);
      router.push(`edit/${projectId}/file`);
    } catch (error) {
      console.error('Failed to create project:', error);
    }
  };

  return (
    <div
      key={title}
      className="group relative h-[20vh] py-[16px] px-[16px] duration-200 transition-all rounded-[8px] hover:rounded-[16px] hover:bg-black/50 bg-black/40 overflow-hidden flex flex-col w-1/3 cursor-pointer"
    >
      <div className="flex items-center h-[28px]">
        <div className="w-[28px] h-[28px] rounded-[6px] flex items-center justify-center">
          <img className="rounded-[6px]" width="28" height="28" src={icon} alt={title} />
        </div>
        <div className="font-[600] text-[16px] my-[12px] flex-1 leading-[20px] h-[20px] ml-[12px]">
          {title}
        </div>
      </div>
      <div className="text-[12px] overflow-hidden flex-1 text-ellipsis mt-[16px] text-[var(--text-default)]">
        快速开始 {title} 开发
      </div>
      <div className="mt-[16px]">
        <div
          onClick={() => quickStartProject()}
          className="bg-tr-1 bg-white/5 text-[14px] group-hover:bg-white/15 w-full font-[600] rounded-[4px] py-[5px] px-[16px] text-center"
        >
          体验
        </div>
      </div>
    </div>
  );
};

const LinkCard: React.FC<{ linkText: string; linkUrl: string; linkDesc: string }> = ({
  linkText,
  linkUrl,
  linkDesc,
}) => (
  <a
    key={linkText}
    rel="noreferrer"
    className="w-1/3 cursor-pointer"
    href={linkUrl}
    target="_blank"
  >
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
const ProjectCard: React.FC<{ projectData: any }> = ({ projectData }) => {
  const router = useRouter();
  const handleDirectToEdit = () => {
    const projectId = projectData.id;
    router.push(`/edit/${projectId}/file`);
  };

  return (
    <div
      onClick={() => {
        handleDirectToEdit();
      }}
      className=" flex justify-between py-4 px-5 rounded-[6px] cursor-pointer transition-all bg-[#24262b] hover:bg-[#33363d]"
    >
      <div className="flex gap-5 items-center">
        <div className="flex items-center justify-center">
          <img className="rounded-[6px] w-8 h-8" src="/project.svg" />
        </div>
        <div className="w-[760px] flex flex-col justify-between space-y-[2px]">
          <div className="project-name font-semibold text-[16px]">{projectData.name}</div>
          <div className="flex text-[12px] text-[#6f737c] gap-[6px] items-center">
            <div>{projectData.desc}</div>
            <div>{isoDateStringFormat(projectData.createdAt)}</div>
          </div>
        </div>
      </div>
      <div className="flex items-center gap-[8px]">
        <svg
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M6.75872 13.5391C6.43329 13.8645 6.43329 14.3922 6.75872 14.7176L7.34797 15.3069C7.67342 15.6323 8.20106 15.6323 8.52649 15.3069L13.2405 10.5928C13.4041 10.4292 13.4855 10.2146 13.4846 10.0001C13.4855 9.78574 13.4041 9.57106 13.2405 9.40747L8.52649 4.69342C8.20106 4.36799 7.67342 4.36799 7.34797 4.69342L6.75872 5.28267C6.43329 5.60811 6.43329 6.13576 6.75872 6.46119L10.2977 10.0001L6.75872 13.5391Z"
            fill="#737780"
          ></path>
        </svg>
      </div>
    </div>
  );
};
