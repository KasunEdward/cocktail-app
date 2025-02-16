import { IconProps } from "@/utils/gloabl-typs";

interface IconButtonProps {
    icon: React.FC<IconProps>;
    onClick?: () => void;
    size?: number;
    color?: string;
    className?: string;
  };
const IconButton: React.FC<IconButtonProps> = ({ icon: IconComponent, onClick, size = 24, color = "currentColor", className = "" }) => {
    return (
      <button
        onClick={onClick}
        className={`p-2 rounded-full bg-gray-200 hover:bg-gray-300 focus:outline-none ${className || ""}`}
      >
        <IconComponent size={size} color={color} className={className} />
      </button>
    );
  };

  export default IconButton;