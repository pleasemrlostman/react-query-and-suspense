import { ReactNode } from "react";

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="p-8">
      <div className="p-4 border min-w-[20rem] w-3/4 m-auto">{children}</div>
    </div>
  );
};

export default Layout;
