'use client';

type UserStatus = 'online' | 'offline';

interface StatusMessageProps {
  status: UserStatus;
  lastSeen?: string;
}

const OnlineStatusMessage = ({ status, lastSeen }:StatusMessageProps) => {

  const getStatusInfo = () => {
    if (status === 'online') {
      return {
        text: 'в сети',
        colorClass: 'text-[var(--color-violet)]'
      };
    }

    if (status === 'offline' && lastSeen) {
      return {
        text: `был(а) ${lastSeen}`,
        colorClass: 'text-[var(--color-gray)]'
      };
    }

    return null;
  };

  const statusInfo = getStatusInfo();

  if (!statusInfo) return null;

  return (
    <p
      className={`
        text-sm
        font-normal
        leading-tight
        tracking-wide
        ${statusInfo.colorClass}
        [font-family:Roboto,_sans-serif] // Гарантируем использование Roboto
      `}
      // Для доступности: указываем роль и aria-label
      role="status"
      aria-label={statusInfo.text}
    >
      {statusInfo.text}
    </p>
  );
};

export default OnlineStatusMessage;

