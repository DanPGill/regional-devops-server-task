import type { PropsWithChildren } from "react";

type LoadingSpinnerWrapperProps = {
  isLoading: boolean;
  spinnerColor?: string;
} & PropsWithChildren;

const LoadingSpinnerWrapper: React.FC<LoadingSpinnerWrapperProps> = ({
  children,
  isLoading,
  spinnerColor,
}) => {
  return isLoading ? (
    <div className="flex flex-1 items-center justify-center">
      <div
        style={{ color: spinnerColor || "blue" }}
        className="align-[-0.125em]motion-reduce:animate-[spin_1.5s_linear_infinite] inline-block size-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent text-blue"
        role="status"
      ></div>
    </div>
  ) : (
    <>{children}</>
  );
};

export default LoadingSpinnerWrapper;
