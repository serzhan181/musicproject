"use client";

import { ReactNode, useState } from "react";
import { Button } from "./button";
import { ChevronLeft, ChevronRight } from "lucide-react";

export const Carousel = ({ items }: { items: ReactNode[] }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const updateIndex = (newIndex: number) => {
    if (newIndex < 0) {
      newIndex = 0;
    } else if (newIndex >= items.length) {
      newIndex = 0;
    }

    setActiveIndex(newIndex);
  };

  return (
    <div className="relative flex flex-col justify-center w-full overflow-hidden">
      <div
        className="flex gap-5 transition-transform whitespace-nowrap"
        style={{ transform: `translate(-${activeIndex * 100}%)` }}
      >
        {items}
      </div>

      <div className="absolute flex justify-between w-full px-6">
        <Button
          onClick={() => updateIndex(activeIndex - 1)}
          className="w-12 h-12 rounded-full"
          variant="secondary"
        >
          <ChevronLeft />
        </Button>

        <Button
          onClick={() => updateIndex(activeIndex + 1)}
          className="w-12 h-12 rounded-full"
          variant="secondary"
        >
          <ChevronRight />
        </Button>
      </div>
    </div>
  );
};
