"use client";

interface NotificationToggleProps {
  checked: boolean;
  onChange?: () => void;
  disabled?: boolean;
}

const NotificationToggle = ({ checked, onChange, disabled = false }: NotificationToggleProps) => {
  const handleClick = () => {
    if (!disabled && onChange) {
      onChange();
    }
  };

  return (
    <div
      className={`relative inline-flex items-center w-[52px] h-[32px] rounded-[100px] transition-colors duration-200 ${disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}`}
      onClick={handleClick}
      aria-label={checked ? "Уведомления включены" : "Уведомления выключены"}
      role="switch"
      aria-checked={checked}
    >
      {/* Фон переключателя */}
      <div
        className={`absolute inset-0 rounded-[100px] transition-colors duration-200 ${checked ? "bg-(--color-violet)" : "bg-(--color-violet-light)"}`}
      />

      {/* Круглый индикатор */}
      <div
        className={`absolute top-1 h-6 w-6 rounded-full bg-white shadow-sm transition-all duration-200 ${checked ? "left-[26px]" : "left-1"}`}
        style={{
          transform: checked ? "translateX(0)" : "translateX(0)",
        }}
      />
    </div>
  );
};

export default NotificationToggle;
