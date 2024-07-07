'use client';

import React, { useEffect } from 'react';

const GiscusComments: React.FC = () => {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://giscus.app/client.js';
    script.setAttribute('data-repo', 'xun082/online-edit-web');
    script.setAttribute('data-repo-id', 'R_kgDOJ4NYUQ');
    script.setAttribute('data-category', 'Announcements');
    script.setAttribute('data-category-id', 'DIC_kwDOJ4NYUc4Cgojg');
    script.setAttribute('data-mapping', 'title');
    script.setAttribute('data-strict', '0');
    script.setAttribute('data-reactions-enabled', '1');
    script.setAttribute('data-emit-metadata', '0');
    script.setAttribute('data-input-position', 'top');
    script.setAttribute('data-theme', 'dark');
    script.setAttribute('data-lang', 'zh-CN');
    script.setAttribute('data-loading', 'lazy');
    script.setAttribute('crossorigin', 'anonymous');
    script.async = true;

    const comments = document.getElementById('giscus-comments');

    if (comments) {
      comments.appendChild(script);
    }

    return () => {
      if (comments) {
        comments.innerHTML = '';
      }
    };
  }, []);

  return (
    <div className="max-w-4xl mx-auto p-4 bg-gray-800 rounded-lg shadow-lg">
      <div id="giscus-comments" />
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
