
import React from 'react';

const Header = () => {
  return (
    <div className="flex flex-col items-center justify-center gap-6 w-full">
      <h1 className="text-3xl font-bold text-black tracking-widest">FIFA TRUCOS</h1>
      <div className="w-24 h-24 bg-[#f07c41] rounded-full flex items-center justify-center shadow-lg">
        <span className="text-white text-4xl font-bold">P1</span>
      </div>
    </div>
  );
};

export default Header;
