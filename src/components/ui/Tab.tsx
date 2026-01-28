"use client";

interface TabProps {
  label: string;
  isActive: boolean;
  onClick: () => void;
  isMobile?: boolean;
}

const Tab = ({ label, isActive, onClick, isMobile = false }: TabProps) => {
  // Для десктопа используем color-text, для мобильных color-gray
  const inactiveColor = isMobile ? "text-(--color-gray)" : "text-(--color-text)";

  return (
    <button
      onClick={onClick}
      className="relative flex flex-col items-center pb-3 px-2 transition-colors"
      aria-selected={isActive}
      role="tab"
    >
      <span
        className={`text-[16px] font-normal transition-colors ${isActive ? "text-(--color-violet)" : inactiveColor}`}
      >
        {label}
      </span>

      {/* Индикатор активной вкладки */}
      {isActive && (
        <div
          className="absolute bottom-0 w-[82px] h-1 bg-(--color-violet) rounded-t-[8px]"
          style={{
            width: "82px",
            height: "4px",
            borderRadius: "8px 8px 0 0",
            opacity: 1,
          }}
        />
      )}
    </button>
  );
};

export default Tab;
