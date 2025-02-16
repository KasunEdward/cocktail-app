import React from "react";

type TooltipProps = {
  content: string;
  children: React.ReactNode;
};

const Tooltip: React.FC<TooltipProps> = ({ content, children }) => {
  return (
    <div className="relative flex items-center group">
      {children}
      <span className="absolute bottom-full mb-2 hidden group-hover:block bg-primary-2 text-white-1 text-xs rounded py-1 px-2 whitespace-nowrap">
        {content}
      </span>
    </div>
  );
};

export default Tooltip;
