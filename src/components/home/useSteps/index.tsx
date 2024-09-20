import React from 'react';

const steps = [
  {
    title: 'Select or create a project',
    image: '/images/step-1.png',
    description1: 'Choose the right technology stack for your needs. ',
    description2: 'If available, open an existing project.',
  },
  {
    title: 'Code writing',
    image: '/images/step-2.png',
    description1: 'Write your code in the editor. ',
    description2: 'Make necessary edits to the code.',
  },
  {
    title: 'Run and Debug',
    image: '/images/step-3.png',
    description1: 'Execute the code to view the output. ',
    description2: 'Utilize debugging tools to identify and fix issues.',
  },
];

export const UseSteps: React.FC = () => {
  return (
    <div className="relative z-20 py-24 mx-auto col max-w-7xl px-0 flex flex-col items-center gap-24">
      {steps.map((item, index) => (
        <div
          key={index}
          className="w-full sm:w-3/4 gap-4 px-12 flex flex-col items-center lg:flex-row md:gap-16 relative"
        >
          <div className="relative col gap-4 basis-2/3 justify-center text-center md:text-start">
            {index !== steps.length - 1 && (
              <img
                src="/arrow.svg"
                alt="arrow"
                className="absolute -left-20 top-36 xl:top-24 lg:block hidden"
              />
            )}
            <h2 className="font-semibold tracking-tight text-[1.8rem] mb-4">
              <span className="bg-text bg-gradient-to-r pb-1">{item.title}</span>
            </h2>
            <div className="flex flex-col gap-3">
              <p className="body-md text-light " style={{ lineHeight: '1.5rem' }}>
                {item.description1}
              </p>
              <p className="body-md text-light " style={{ lineHeight: '1.5rem' }}>
                {item.description2}
              </p>
            </div>

            <p className="absolute -left-16 text-5xl font-bold top-0 hidden md:block bg-hashed-text text-transparent bg-clip-text [-webkit-text-stroke:1px_#fafafa]">
              {index + 1}
            </p>
          </div>
          <div className="relative basis-4/5">
            <div className="w-full h-full rounded-xl basis-2/5 absolute -right-6 -bottom-6 bg-gradient-to-r from-white/20 to-white"></div>
            <div className="relative col justify-center overflow-hidden shadow-lg round-rect w-full border border-gray-400">
              <img src={item.image} alt={item.title} />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
