'use client';
import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

export function Header({ translate, titleComponent }: any) {
  return (
    <motion.div className="max-w-5xl mx-auto text-center div" style={{ translateY: translate }}>
      {titleComponent}
    </motion.div>
  );
}

export function Card({
  rotate,
  scale,
  translate,
  content,
}: {
  rotate: any;
  scale: any;
  translate: any;
  content: React.ReactNode;
}) {
  return (
    <motion.div
      className="-mt-2 mx-auto w-full rounded-[30px] max-w-5xl hidden sm:block"
      style={{
        rotateX: rotate,
        scale,
      }}
    >
      <motion.div
        className="w-full h-full"
        style={{
          translateY: translate,
          boxShadow:
            '0 0 #0000004d, 0 9px 20px #0000004a, 0 37px 37px #00000042, 0 84px 50px #00000026, 0 149px 60px #0000000a, 0 233px 65px #00000003',
        }}
      >
        {content}
      </motion.div>
    </motion.div>
  );
}

export function ContainerScroll({
  titleComponent,
  content,
}: {
  titleComponent: string | React.ReactNode;
  content: React.ReactNode;
}) {
  const containerRef = useRef<any>(null);
  const { scrollYProgress } = useScroll({ target: containerRef });
  const [isMobile, setIsMobile] = React.useState(false);

  React.useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => {
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

  const scaleDimensions = () => {
    return isMobile ? [0.7, 1] : [1.05, 1];
  };

  const rotate = useTransform(scrollYProgress, [0, 1], [20, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], scaleDimensions());
  const translate = useTransform(scrollYProgress, [0, 1], [0, -100]);

  return (
    <div
      ref={containerRef}
      className="h-[90vh] sm:h-[120vh] flex items-start sm:items-center justify-center relative p-20"
    >
      <div className="relative w-full h-full" style={{ perspective: '1000px' }}>
        <Header titleComponent={titleComponent} translate={translate} />
        <Card content={content} rotate={rotate} scale={scale} translate={translate} />
      </div>
    </div>
  );
}
