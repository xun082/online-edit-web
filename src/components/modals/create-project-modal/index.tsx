/* eslint-disable @typescript-eslint/ban-ts-comment */
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';

import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { getDirectory } from '@/utils/getLocalDirectory';
import { useModal } from '@/hooks/useModal';
import { useUploadFileDataStore } from '@/store/uploadFileDataStore';

export const CreateProjectModal = () => {
  const { setFileData } = useUploadFileDataStore();
  const { isOpen, onClose, type } = useModal();
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const isModalOpen = isOpen && type === 'createProject';

  return (
    <Dialog open={isModalOpen} onOpenChange={onClose}>
      <DialogContent className="bg-[#24262b] text-white p-0 overflow-hidden">
        <DialogHeader className="pt-8 px-6">
          <DialogTitle className=" text-center font-bold">create Project</DialogTitle>
        </DialogHeader>
        <div className="p-6 pb-12">
          <div
            onClick={async () => {
              if (loading) return;
              setLoading(true);

              let res = await getDirectory();

              if (res) {
                // @ts-expect-error
                if (!Array.isArray(res)) res = [res];
                setTimeout(() => {
                  onClose();
                  // @ts-expect-error
                  setFileData(res);
                  router.push('edit/file');
                }, 1000);
              }

              setTimeout(() => {
                setLoading(false);
              }, 1000);
            }}
            className="flex justify-center flex-col items-center mt-2 gap-x-2 py-6 border-white/20 border-[1px] rounded-sm cursor-pointer"
          >
            {loading ? (
              <AiOutlineLoading3Quarters className=" font-[600] animate-spin" />
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
        </div>
      </DialogContent>
    </Dialog>
  );
};
