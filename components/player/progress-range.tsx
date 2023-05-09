import { MouseEvent, useRef, useState } from "react";

interface ProgressRangeProps {
  progress: number;
  setProgress: (val: number) => void;
}

export const ProgressRange = ({
  progress,
  setProgress,
}: ProgressRangeProps) => {
  const [mouseDown, setMouseDown] = useState(false);

  const divRef = useRef<HTMLDivElement | null>(null);

  const handleSetProgress = (e: MouseEvent<HTMLDivElement>) => {
    const divWidth = divRef.current?.offsetWidth || 0;
    const position = e.clientX - (divRef.current?.offsetLeft || 0);
    const percentage = position / divWidth;
    setProgress(percentage);
  };

  return (
    <div
      className="flex items-center w-full h-full cursor-pointer group"
      onMouseDown={(e) => {
        handleSetProgress(e);
        setMouseDown(true);
      }}
      onMouseUp={() => setMouseDown(false)}
      onMouseLeave={() => setMouseDown(false)}
      onMouseMove={(e) => {
        if (mouseDown) {
          handleSetProgress(e);
        }
      }}
      ref={divRef}
    >
      {/* // All progress bar */}
      <div className="w-full h-0.5 bg-background relative">
        {/* Played progress */}
        <div
          style={{ width: `${progress * 100}%` }}
          className="bg-primary h-0.5"
        ></div>
        <div
          style={{ left: `${progress * 100}%` }}
          className="absolute w-2 h-2 transition-opacity rounded-full opacity-0 cursor-pointer -top-[3px] bg-primary group-hover:opacity-100"
        ></div>
      </div>
    </div>
  );
};
