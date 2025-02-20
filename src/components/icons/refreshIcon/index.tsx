import React from "react";

type IconProps = {
  size?: number;
  color?: string;
  className?: string;
};

const RefreshIcon: React.FC<IconProps> = ({
  size = 24,
  color = "currentColor",
  className = "feather feather-refresh-cw",
}) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox={`0 0 24 24`}
      fill="none"
      stroke={color}
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
      className={className}
    >
      <polyline points="23 4 23 10 17 10"></polyline>
      <polyline points="1 20 1 14 7 14"></polyline>
      <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"></path>
    </svg>
  );
};

export default RefreshIcon;
