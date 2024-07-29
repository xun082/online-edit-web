'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import { v4 as uuidv4 } from 'uuid';

import { Textarea } from '@/components/ui/textarea';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from '@/components/ui/command';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { getDirectory } from '@/utils/getLocalDirectory';
import { useModal } from '@/hooks/useModal';
import { useUploadFileDataStore } from '@/store/uploadFileDataStore';
import { cn, UPLOAD_FILE_DATA } from '@/utils';

export const CreateProjectModal = () => {
  const { setFileData } = useUploadFileDataStore();
  const { isOpen, onClose, type } = useModal();
  const [loading, setLoading] = useState(false);
  const [fileNameState, setFileNameState] = useState<string>('');
  const [fileDescState, setFileDescState] = useState<string>('');
  const [uploadFileState, setUploadFileState] = useState<any>([]);
  const router = useRouter();
  const disAllowCreate =
    loading || uploadFileState.length < 1 || fileDescState === '' || fileNameState === '';
  const isModalOpen = isOpen && type === 'createProject';

  const handleUploadClick = async () => {
    if (loading) return;
    setLoading(true);

    try {
      const res = await getDirectory();

      if (res) {
        const directoryData = Array.isArray(res) ? res : [res];
        setUploadFileState(directoryData);
      }
    } catch (error) {
      console.error('Failed to get directory:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateProject = () => {
    if (disAllowCreate) return;

    try {
      const projectId = uuidv4();
      const preUploadFileData =
        localStorage.getItem(UPLOAD_FILE_DATA) !== null
          ? JSON.parse(localStorage.getItem(UPLOAD_FILE_DATA) as string)
          : [];
      preUploadFileData.push({
        name: fileNameState,
        desc: fileDescState,
        id: projectId,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      });
      localStorage.setItem(UPLOAD_FILE_DATA, JSON.stringify(preUploadFileData));

      const projectInfo = {
        projectFileData: uploadFileState,
        name: fileNameState,
        desc: fileDescState,
        id: projectId,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      localStorage.setItem(projectId, JSON.stringify(projectInfo));
      setFileData(uploadFileState);
      onClose();
      router.push(`edit/${projectId}/file`);
    } catch (error) {
      console.error('Failed to create project:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={isModalOpen} onOpenChange={onClose}>
      <DialogDescription />
      <DialogContent className="bg-[#24262b]/90 text-white min-w-[45vw] p-0 overflow-hidden">
        <DialogHeader className="pt-8 px-6">
          <DialogTitle className="flex text-center font-bold">创建项目</DialogTitle>
        </DialogHeader>
        <div className="p-2 pb-12 w-full h-full flex relative justify-center items-center gap-x-8">
          <div className=" relative w-[45%] h-[50vh]">
            <Tabs defaultValue="template" className=" w-full">
              <TabsList className="w-full inline-flex h-8 items-center justify-center rounded-[8px] bg-tr-2 bg-[#3c3e49] p-1 px-2 text-muted-foreground">
                <TabsTrigger
                  className="  flex-1 h-6 rounded-[5px] data-[state=active]:font-[600] data-[state=active]:text-[#24262b] data-[state=active]:bg-[#ffffff] data-[state=active]:shadow"
                  value="template"
                >
                  模板
                </TabsTrigger>
                <TabsTrigger
                  className=" flex-1 h-6 rounded-[5px] data-[state=active]:font-[600] data-[state=active]:text-[#24262b] data-[state=active]:bg-[#ffffff] data-[state=active]:shadow"
                  value="importing files"
                >
                  导入代码
                </TabsTrigger>
              </TabsList>
              <TabsContent className=" flex flex-col gap-y-2 pt-1" value="template">
                <div className=" font-[300] text-[14px] text-[#676b74]">
                  <span className="text-red-500 mr-1">*</span>选择模板
                </div>
                <Command className=" bg-transparent shadow-md">
                  <CommandInput className=" text-[12px]" placeholder="搜索" />
                  <CommandList className=" h-[32vh] overscroll-y-scroll hide-scrollbar">
                    <CommandEmpty>No results found.</CommandEmpty>
                    <CommandGroup className="" heading="Suggestions">
                      <CommandItem>
                        <span>Calendar</span>
                      </CommandItem>
                      <CommandItem>
                        <span>Search Emoji</span>
                      </CommandItem>
                      <CommandItem>
                        <span>Launch</span>
                      </CommandItem>
                    </CommandGroup>
                    <CommandSeparator />
                    <CommandGroup heading="Settings">
                      <CommandItem>
                        <span>Profile</span>
                      </CommandItem>
                      <CommandItem>
                        <span>Mail</span>
                      </CommandItem>
                      <CommandItem>
                        <span>Settings</span>
                      </CommandItem>
                    </CommandGroup>
                  </CommandList>
                </Command>
              </TabsContent>
              <TabsContent className=" flex flex-col gap-y-2 pt-1" value="importing files">
                <div className=" font-[300] text-[14px] text-[#676b74]">
                  <span className="text-red-500 mr-1">*</span>选择仓库
                </div>
                <Tabs defaultValue="local" className=" w-full">
                  <TabsList className="w-full inline-flex h-8 items-center justify-center rounded-[8px] bg-tr-2 bg-[#3c3e49] p-1 px-2 text-muted-foreground">
                    <TabsTrigger
                      className="  flex-1 h-6 rounded-[5px] data-[state=active]:font-[600] data-[state=active]:text-[#24262b] data-[state=active]:bg-[#ffffff] data-[state=active]:shadow"
                      value="local"
                    >
                      本地导入
                    </TabsTrigger>
                    <TabsTrigger
                      className=" flex-1 h-6 rounded-[5px] data-[state=active]:font-[600] data-[state=active]:text-[#24262b] data-[state=active]:bg-[#ffffff] data-[state=active]:shadow"
                      value="github"
                    >
                      github导入
                    </TabsTrigger>
                  </TabsList>
                  <TabsContent className=" flex flex-col gap-y-2 pt-1" value="local">
                    <div
                      onClick={handleUploadClick}
                      className="flex justify-center flex-col items-center mt-2 gap-x-2 py-6 border-white/20 border-[1px] rounded-sm cursor-pointer"
                    >
                      {loading ? (
                        <AiOutlineLoading3Quarters className="font-[600] animate-spin" />
                      ) : (
                        <>
                          <svg
                            className="w-8 h-8 mb-3 text-gray-500 dark:text-gray-400"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 20 16"
                          >
                            <path
                              stroke="currentColor"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                            />
                          </svg>
                          <p className="mb-1 text-sm text-gray-500 dark:text-gray-400">
                            <span className="font-semibold">Click to upload</span>
                          </p>
                          <p className="text-xs text-gray-500 dark:text-gray-400"></p>
                        </>
                      )}
                    </div>
                  </TabsContent>
                  <TabsContent className=" flex flex-col gap-y-2 pt-1" value="github"></TabsContent>
                </Tabs>
              </TabsContent>
            </Tabs>
          </div>
          <div className=" w-[1.5px] h-[48vh] bg-[rgba(194,202,242,.08)]"></div>
          <div className=" relative w-[45%] h-[50vh] flex flex-col gap-y-3">
            <div className=" text-[#6d717a]">模板</div>

            <div className="relative w-full h-[10vh] group py-[20px] px-[20px] border-[1px] border-white/20 rounded-[8px] hover:rounded-[16px] hover:bg-[#282A2E] bg-[#1F2124] overflow-hidden flex flex-col transition-all duration-200">
              <div className="flex items-center h-[16px] w-full place-content-between mb-[12px]">
                <div className="font-[600] text-[16px] my-[12px] flex-1 leading-[20px] h-[20px]">
                  {'231313'}
                </div>
              </div>
              <div className="text-[12px] h-[36px] leading-[18px] overflow-hidden text-ellipsis text-[#dadde5]">
                {'使用python快速开发'}
              </div>
            </div>
            <div className=" font-[300] text-[14px] text-[#676b74]">
              <span className="text-red-500 mr-1">*</span>项目名称
            </div>
            <Input
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                setFileNameState(e.target.value);
              }}
              className="h-8 bg-[#343740] w-full rounded-md border border-white/20 px-3 py-1 text-sm shadow-sm focus-within:ring-white focus-visible:outline-none focus-visible:ring-1  pr-[72px]"
            ></Input>
            <div className=" font-[300] text-[14px] text-[#676b74]">
              <span className="text-red-500 mr-1">*</span>项目描述
            </div>

            <Textarea
              onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
                setFileDescState(e.target.value);
              }}
              className="h-8 bg-[#343740] w-full rounded-md border border-white/20 px-3 py-1 text-sm shadow-sm focus-within:ring-white focus-visible:outline-none focus-visible:ring-1  pr-[72px]"
            ></Textarea>
            <Button
              onClick={() => {
                handleCreateProject();
              }}
              className={cn(
                ' absolute bottom-10 w-full h-[3.8vh] bg-[#387BFF]  text-white',
                disAllowCreate
                  ? ' pointer-events-none bg-[#387BFF]/70'
                  : 'hover:bg-blue-700 cursor-pointer font-[600]',
              )}
            >
              创建项目
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
