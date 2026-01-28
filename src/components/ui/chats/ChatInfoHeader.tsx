"use client";

import Image from "next/image";
import backDesktop from "@/src/assets/icons/back-desktop.svg";
import backMobile from "@/src/assets/icons/back-icon.svg";

interface ChatInfoHeaderProps {
  onClose: () => void;
  chatType?: "group" | "channel" | "private";
  isMobile?: boolean;
}

const ChatInfoHeader = ({
  onClose,
  chatType = "private",
  isMobile = false,
}: ChatInfoHeaderProps) => {
  // Определяем заголовок в зависимости от типа чата
  const getTitle = () => {
    if (chatType === "group") return "Информация о группе";
    if (chatType === "channel") return "Информация о канале";
    return "Информация";
  };

  if (isMobile) {
    // Мобильная версия - кнопка "Назад" слева
    return (
      <div className="flex items-center w-full p-4 border-b border-(--color-gray-1)">
        <button
          onClick={onClose}
          className="flex-shrink-0 w-10 h-10 bg-transparent rounded-lg flex items-center justify-center transition-colors duration-200 hover:bg-gray-100 active:bg-gray-200"
          aria-label="Назад"
        >
          <Image
            src={backMobile}
            alt="Назад"
            width={24}
            height={24}
            style={{ width: "auto", height: "auto" }}
          />
        </button>

        <h1 className="text-lg font-semibold text-gray-900 ml-3 flex-1">{getTitle()}</h1>
      </div>
    );
  }

  // Десктопная версия - SVG крестик слева
  return (
    <div className="flex items-center p-4 border-b border-(--color-gray-1)">
      <button
        onClick={onClose}
        className="flex-shrink-0 w-10 h-10 bg-transparent rounded-lg flex items-center justify-center transition-colors duration-200 hover:bg-gray-100 active:bg-gray-200"
        aria-label="Закрыть"
      >
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M18 6L6 18M6 6L18 18"
            stroke="#6B7280"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>

      <h1 className="text-lg font-semibold text-gray-900 ml-3 flex-1">{getTitle()}</h1>
    </div>
  );
};

export default ChatInfoHeader;
