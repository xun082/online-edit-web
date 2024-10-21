'use client';

import React from 'react';

import { cn } from '@/utils';

interface AvatarCirclesProps {
  className?: string;
  avatarCount?: number;
  avatarUrls: string[];
}

export const CollaboratorAvatarList = ({
  avatarCount,
  className,
  avatarUrls,
}: AvatarCirclesProps) => {
  return (
    <div className={cn('z-10 flex -space-x-3', className)}>
      {avatarUrls.map((url, index) => (
        <img
          key={index}
          className="h-8 w-8 rounded-full border-2 border-white dark:border-gray-800"
          src={url}
          width={40}
          height={40}
          alt={`Avatar ${index + 1}`}
        />
      ))}
      {avatarCount && (
        <span className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-white bg-black text-center text-xs font-medium text-white hover:bg-gray-600 dark:border-gray-800 dark:bg-white dark:text-black">
          +{avatarCount}
        </span>
      )}
    </div>
  );
};
