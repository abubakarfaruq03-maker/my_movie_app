const baseStyles =
  "p-4 rounded-2xl cursor-pointer";

const variants = {
  primary:
    "bg-red-800 text-white hover:bg-red-700",
  secondary:
    "bg-white text-red-800 hover:bg-gray-100",
};

const Button = ({
  text,
  onClick,
  variant = "primary",
  className = "",
  disabled = false,
}) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`
        ${baseStyles}
        ${variants[variant]}
        ${disabled ? "opacity-50 cursor-not-allowed" : ""}
        ${className}
      `}
    >
      {text}
    </button>
  );
};

export default Button;
