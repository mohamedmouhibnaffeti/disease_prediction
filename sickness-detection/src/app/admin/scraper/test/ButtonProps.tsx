import React from 'react';

interface ButtonProps {
  onClick: () => void;
}

const Button: React.FC<ButtonProps> = ({ onClick }) => {
  return (
    <button className='bg-slate-500' onClick={onClick}>
      Generate Numbers and Calculate
    </button>
  );
};

export default Button;

