import { LoaderCircle } from "lucide-react";
import { twMerge } from "tailwind-merge";

export const Loader = ({
  className,
  text = "Please wait...",
}: {
  className?: string;
  text?: string;
}) => {
  return (
    <div
      className={twMerge(
        "flex flex-col gap-4 items-center justify-center w-full text-gray-600",
        className
      )}
    >
      <div className="animate-spin">
        <LoaderCircle />
      </div>
      <p>{text}</p>
    </div>
  );
};
