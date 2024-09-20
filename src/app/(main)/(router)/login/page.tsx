import { FC } from 'react';

import { PROJECT_Name } from '@/utils/constants';

const LoginPage: FC = () => {
  return (
    <div className="LoginPage">
      <header className="LoginPageHeader py-4 px-6 flex items-center justify-between bg-[rgba(17,17,17,1)] opacity-65">
        <h1 className="h-[40px] flex-grow-0 leading-[40px] text-white font-bold select-none">
          {PROJECT_Name}
        </h1>
      </header>
    </div>
  );
};

export default LoginPage;
