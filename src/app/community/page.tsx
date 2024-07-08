'use client';

import React from 'react';
import Giscus from '@giscus/react';

const GiscusComments: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto p-4 bg-gray-800 rounded-lg shadow-lg">
      <Giscus
        repo="xun082/online-edit-web"
        repoId="R_kgDOJ4NYUQ"
        category="Announcements"
        categoryId="DIC_kwDOJ4NYUc4Cgojg"
        mapping="title"
        strict="0"
        reactionsEnabled="1"
        emitMetadata="0"
        inputPosition="top"
        theme="dark"
        lang="zh-CN"
        loading="lazy"
      />
    </div>
  );
};

const Community: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <h1 className="text-3xl font-bold mb-6">Community Feedback</h1>
      <GiscusComments />
    </div>
  );
};

export default Community;
