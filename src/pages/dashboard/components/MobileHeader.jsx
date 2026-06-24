import React from 'react';
import { Bell, User, LogOut } from 'lucide-react';

const MobileHeader = ({
  isMenuOpen,
  setIsMenuOpen,
}) => {
  return (
    <header className="fixed top-3 md:hidden left-0 right-0 z-50 flex justify-center pointer-events-none">
      
      <div
        className="
          w-[92%]
          max-w-md
          rounded-xl
          border border-white/10
          bg-black/20
          backdrop-blur-xl
          shadow-2xl
          px-4
          py-3
          pointer-events-auto
        "
      >
        <div className="flex items-center justify-between">

          {/* ESQUERDA */}
          <div className="flex items-center gap-3 relative">

            {/* Avatar */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                setIsMenuOpen(!isMenuOpen);
              }}
              className="
                w-11 h-11
                rounded-full
                overflow-hidden
                border border-white/10
                active:scale-95
                transition
              "
            >
              <img
                src="https://github.com/gabriellyleitedev.png"
                alt="Perfil"
                className="w-full h-full object-cover"
              />
            </button>

            {/* Status */}
            <div>
              <h1 className="text-white text-sm font-medium">
                Olá, Gabi!
              </h1>

              <div className="flex items-center gap-1.5 mt-0.5">
                <div className="w-1.5 h-1.5 rounded-full bg-[#1fba11] animate-pulse" />

                <span className="text-[12px] -mt-1 text-neutral-400 tracking-wide">
                  Deepin Online
                </span>
              </div>
            </div>
          </div>

          {/* DIREITA */}
          <button
            className="
              relative
              w-11 h-11
              rounded-full
              border border-white/10
              bg-white/4
              backdrop-blur-md
              flex items-center justify-center
              text-white
              active:scale-95
              transition
            "
          >
            <Bell size={18} />

            <span
              className="
                absolute
                top-2
                right-2
                w-2 h-2
                rounded-full
                bg-orange-500
                ring-2
                ring-black
              "
            />
          </button>
        </div>
      </div>
    </header>
  );
};

export default MobileHeader;