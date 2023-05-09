import React from "react";

const Button = ({ text, onClick }: { text: string; onClick: React.MouseEventHandler<HTMLButtonElement> }) => {
  return (
    <button
      className="flex items-center justify-center hover:bg-primary gap-2 p-2 bg-secondary w-full rounded-full"
      onClick={onClick}
    >
      {text}
    </button>
  );
};

export default Button;
