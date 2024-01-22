import { ReactNode } from "react";
import { twMerge } from "tailwind-merge";

const Layout = ({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) => {
  return (
    <div className="p-8 flex">
      <div
        className={`p-8 border min-w-[20rem] w-3/4 m-auto ${twMerge(
          className,
        )}`}
      >
        {children}
      </div>
    </div>
  );
};

export default Layout;
