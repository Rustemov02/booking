import { FC } from "react";

const PageHeader: FC<{ title: string; sideText?: string }> = ({
  title,
  sideText,
}) => {
  return (
    <div className="w-full flex flex-row items-center justify-between">
      <p className="text-[32px] font-bold text-neutral-950">{title}</p>
      <p>{sideText}</p>
    </div>
  );
};

export default PageHeader;
