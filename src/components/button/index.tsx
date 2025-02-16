type ButtonProps = {
    onClick?: () => void;
    disabled?: boolean;
    variant?: "primary" | "secondary" | "disabled";
    className?: string;
    children: React.ReactNode;
  };
  
  const buttonVariants = {
    primary: "bg-primary-2 text-white-1 hover:bg-primary-1",
    secondary: "bg-blue-500 text-white hover:bg-blue-600",
    disabled: "!bg-gray-400 !hover:bg-gray-400 !text-gray-700 cursor-not-allowed",
  };
  
  const Button: React.FC<ButtonProps> = ({ onClick, disabled = false, variant = "primary", className = "", children }) => {
    return (
      <button
        onClick={onClick}
        disabled={disabled}
        className={`px-3 py-2 rounded ${buttonVariants[variant]} ${disabled ? buttonVariants.disabled : ""} ${className}`}
      >
        {children}
      </button>
    );
  };

  export default Button;