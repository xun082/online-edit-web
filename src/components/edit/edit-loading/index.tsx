import React from 'react';

const LoadingSVG = () => {
  return (
    <svg className="loading-spinner" viewBox="0 0 50 50" xmlns="http://www.w3.org/2000/svg">
      <circle className="path" cx="25" cy="25" r="20" fill="none" strokeWidth="5" />
    </svg>
  );
};

const styles = `
  .loading-spinner {
    width: 50px;
    height: 50px;
    animation: rotate 2s linear infinite;
  }
  .path {
    stroke: #333;
    stroke-linecap: round;
    animation: dash 1.5s ease-in-out infinite;
  }
  @keyframes rotate {
    100% {
      transform: rotate(360deg);
    }
  }
  @keyframes dash {
    0% {
      stroke-dasharray: 1, 150;
      stroke-dashoffset: 0;
    }
    50% {
      stroke-dasharray: 90, 150;
      stroke-dashoffset: -35;
    }
    100% {
      stroke-dasharray: 90, 150;
      stroke-dashoffset: -124;
    }
  }
`;

export default function LoadingComponent() {
  return (
    <>
      <style>{styles}</style>
      <div className="loading-container">
        <LoadingSVG />
      </div>
    </>
  );
}
