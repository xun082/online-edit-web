import NextTopLoader from 'nextjs-toploader';

interface nextTopLoaderProps {}

const NextProcessLoader: React.FC<nextTopLoaderProps> = () => {
  return <NextTopLoader showSpinner={false}></NextTopLoader>;
};

export default NextProcessLoader;
