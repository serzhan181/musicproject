import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const secToMinSec = (sec: number) => {
  const minutes = Math.floor(sec / 60);
  const remainingSeconds = sec % 60;
  const formattedMinutes =
    minutes < 10 ? `0${Math.floor(minutes)}` : Math.floor(minutes);
  const formattedSeconds =
    remainingSeconds < 10
      ? `0${Math.floor(remainingSeconds)}`
      : Math.floor(remainingSeconds);
  return `${formattedMinutes}:${formattedSeconds}`;
};
