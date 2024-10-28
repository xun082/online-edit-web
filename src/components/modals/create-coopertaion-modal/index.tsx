import { useState } from 'react';
import { useRouter } from 'next/navigation';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useModal } from '@/hooks/useModal';

export function CreateCoopertaionModal() {
  const router = useRouter();
  const [docName, setDocName] = useState('');
  const { isOpen, onClose, type } = useModal();
  const isModalOpen = isOpen && type === 'createCooperation';

  const handleCreate = async () => {
    // 发送 POST 请求
    const response = await fetch('http://localhost:8080/api/v1/document/create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        docName,
      }),
    }).then((response) => response.json());

    if (response.message === 'Created') {
      router.push(`/cooperation/${response.data._id}`);
    } else {
    }
  };

  return (
    <Dialog open={isModalOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px] bg-[#24262b]/90">
        <DialogHeader>
          <DialogTitle>创建文档</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center">
            <Label htmlFor="docname" className="text-center">
              文档名
            </Label>
            <Input
              id="docName"
              value={docName}
              onChange={(e) => setDocName(e.target.value)}
              className="col-span-3 h-8 bg-[#343740] w-full rounded-md border border-white/20 px-3 py-1 text-sm shadow-sm focus-within:ring-white focus-visible:outline-none focus-visible:ring-1 pr-[72px]"
            />
          </div>
        </div>
        <DialogFooter>
          <Button
            disabled={!docName}
            className="h-[3.8vh] bg-[#387BFF] text-white hover:bg-blue-700 cursor-pointer font-[600]"
            onClick={handleCreate}
          >
            创建
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
