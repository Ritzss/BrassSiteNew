import { ReactNode } from "react";

const layout = ({ children }: { children: ReactNode }) => {
  return (
  <div className='bg-[#f4f2dd]'>
    <div>{children}</div>
  </div>
);
};

export default layout;
