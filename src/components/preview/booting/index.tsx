import { FC, useState } from 'react';
import { FaLightbulb, FaArrowsRotate, FaCircleCheck, FaO, FaCircleXmark } from 'react-icons/fa6';

import { stepQueue } from './constant';

const BootingStep: FC<{ condition: number; title?: string }> = ({ condition = 0, title }) => {
  function getStatuByCode(condition: number) {
    switch (condition) {
      case -1:
        return <FaCircleXmark className="text-red-400" />;
      case 0:
        return <FaO />;
      case 1:
        return <FaCircleCheck />;
      case 2:
        return <FaArrowsRotate className="animate-spin rotate-360 infinite duration-1000" />;
    }
  }

  return (
    <div className="flex items-center">
      {getStatuByCode(condition)}
      <span className="mx-2">{title}</span>
    </div>
  );
};

const BootingWebContainer: FC = () => {
  const [steps] = useState(stepQueue);

  return (
    <div className="h-full w-full flex flex-col justify-center  items-center">
      <FaLightbulb className={`${true ? 'text-sky-400' : 'text-gray-400'} text-8xl my-4`} />
      <h2 className="mb-6">Installing dependencies</h2>
      <div className="steps">
        {steps.map((step, index) => (
          <BootingStep key={index} {...step} />
        ))}
      </div>
    </div>
  );
};

export default BootingWebContainer;
