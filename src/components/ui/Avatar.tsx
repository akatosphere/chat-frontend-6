/**
 * Компонент аватара пользователя
 * URL изображения. Если отсутствует, отображается SVG-заглушка
 * Размер аватара: 'small' (40×40) или 'large' (60×60). По умолчанию: 'large'
 * Текст для атрибута alt. Если не указан, используется 'User avatar'
 */
'use client';

import Image from 'next/image';
// import UserAvatarIcon from '@/assets/icons/avatars-icon.svg';
type AvatarSize = 'small' | 'large';

interface AvatarProps {
  src?: string;
  size?: AvatarSize;
  alt?: string;
}

const Avatar = ({ src, size = 'large', alt }: AvatarProps) => {

  const containerClasses = size === 'small' ? 'w-10 h-10' : 'w-15 h-15';

  const iconClasses = 'w-full h-full';

  return (
    <div className={`relative ${containerClasses} flex-shrink-0 rounded-full overflow-hidden`}>
      {src ? (
        <Image
          src={src}
          alt={alt || 'User avatar'}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 60px, 60px"
        />
      ) : (
        // <UserAvatarIcon className={iconClasses} />
        // ! Временно вставил иконку кодом, пока настройка импорта иконок в React-компонент не завершена

        <svg width="100%" height="100%" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M60 30C60 46.5685 46.5685 60 30 60C13.4315 60 0 46.5685 0 30C0 13.4315 13.4315 0 30 0C46.5685 0 60 13.4315 60 30Z" fill="url(#paint0_linear_2030_7222)" />
          <path d="M30 22.1429C31.4405 22.1429 32.619 23.3214 32.619 24.7619C32.619 26.2024 31.4405 27.381 30 27.381C28.5595 27.381 27.381 26.2024 27.381 24.7619C27.381 23.3214 28.5595 22.1429 30 22.1429ZM30 33.9286C33.5357 33.9286 37.5952 35.6179 37.8571 36.5476V37.8571H22.1429V36.5607C22.4048 35.6179 26.4643 33.9286 30 33.9286ZM30 19.5238C27.106 19.5238 24.7619 21.8679 24.7619 24.7619C24.7619 27.656 27.106 30 30 30C32.894 30 35.2381 27.656 35.2381 24.7619C35.2381 21.8679 32.894 19.5238 30 19.5238ZM30 31.3095C26.5036 31.3095 19.5238 33.0643 19.5238 36.5476V40.4762H40.4762V36.5476C40.4762 33.0643 33.4964 31.3095 30 31.3095Z" fill="#7769E1" />
          <defs>
            <linearGradient id="paint0_linear_2030_7222" x1="13.5" y1="9.375" x2="43.875" y2="52.875" gradientUnits="userSpaceOnUse">
              <stop stop-color="#E2EAFE" />
              <stop offset="1" stop-color="#DCF0EE" />
            </linearGradient>
          </defs>
        </svg>
      )}
    </div>
  );
};

export default Avatar;
