"use client";

import { useState } from "react";
import Image from "next/image";
import NotificationToggle from "@/src/components/ui/NotificationToggle";
import Tab from "@/src/components/ui/Tab";
import DescriptionField from "@/src/components/ui/DescriptionField";

interface ChatInfoContentProps {
  chat: any;
  isMobile?: boolean;
  onToggleNotifications?: (chatId: string) => void;
}

const ChatInfoContent = ({
  chat,
  isMobile = false,
  onToggleNotifications,
}: ChatInfoContentProps) => {
  const [localNotifications, setLocalNotifications] = useState(chat.notifications);
  const [activeTab, setActiveTab] = useState<"participants">("participants");

  const isGroup = chat.type === "group";
  const isChannel = chat.type === "channel";
  const isPrivate = !isGroup && !isChannel;

  const handleToggleNotifications = () => {
    const newValue = !localNotifications;
    setLocalNotifications(newValue);

    if (onToggleNotifications) {
      onToggleNotifications(chat.id);
    }
  };

  // Десктопная версия
  if (!isMobile) {
    return (
      <div className="flex-1 overflow-y-auto">
        {/* Большое квадратное фото на всю ширину для десктопа */}
        <div className="relative w-full aspect-square bg-gray-300 overflow-hidden">
          {chat.avatar ? (
            <Image
              src={chat.avatar}
              alt={isGroup ? "Обложка группы" : isChannel ? "Обложка канала" : "Аватар чата"}
              fill
              className="object-cover"
              sizes="100vw"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gray-300">
              <span className="text-white font-medium text-6xl">{chat.name?.charAt(0) || "?"}</span>
            </div>
          )}

          {/* Градиент поверх фото для лучшей читаемости текста */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />

          {/* Текст на фото */}
          <div className="absolute bottom-4 left-4 text-white">
            <h2 className="text-2xl font-medium leading-[130%] tracking-[0.01em] mb-1">
              {chat.name}
            </h2>

            {(isGroup || isChannel) && chat.members && (
              <p className="text-lg font-normal leading-[130%] tracking-[0.01em]">
                {isGroup ? `${chat.members} участников` : `${chat.members} подписчиков`}
              </p>
            )}

            {isPrivate && (
              <p className="text-lg font-normal leading-[130%] tracking-[0.01em]">
                {chat.is_online ? "В сети" : `Был(а) ${chat.was_online_at}`}
              </p>
            )}
          </div>
        </div>

        {/* Контент под фото */}
        <div className="p-4">
          {/* Блок уведомлений - всегда показываем */}
          <div className="mb-6">
            <div className="flex items-center justify-between py-2">
              <h3 className="text-[16px] font-normal text-(--color-text) normal-case mb-0">
                Уведомления
              </h3>
              <NotificationToggle
                checked={localNotifications}
                onChange={handleToggleNotifications}
              />
            </div>
          </div>

          {/* Для групп и каналов */}
          {(isGroup || isChannel) && (
            <div className="space-y-6">
              {/* Описание без заголовка сверху */}
              <div className="border border-(--color-gray-1) rounded-lg overflow-hidden bg-white">
                <DescriptionField value={chat.description || ""} />
              </div>

              {/* Таб только "Участники" */}
              <div className="border-b border-(--color-gray-1)">
                <div className="flex" role="tablist">
                  <Tab
                    label="Участники"
                    isActive={activeTab === "participants"}
                    onClick={() => {}} // Не нужно менять, только одна вкладка
                    isMobile={false}
                  />
                </div>
              </div>

              {/* Список участников (минимум 1 - владелец) */}
              <div className="min-h-[200px]">
                <div className="space-y-3">
                  {/* Владелец (первый участник) */}
                  <div className="flex items-center">
                    <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                      <span className="text-blue-600 font-medium">
                        {chat.name?.charAt(0) || "В"}
                      </span>
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">Вы (владелец)</p>
                      <p className="text-sm text-(--color-text)">В сети</p>
                    </div>
                  </div>

                  {/* Остальные участники (если есть) */}
                  {chat.members > 1 &&
                    Array.from({ length: Math.min(chat.members - 1, 5) }).map((_, index) => (
                      <div key={index} className="flex items-center">
                        <div className="h-10 w-10 rounded-full bg-gray-300 flex items-center justify-center mr-3">
                          <span className="text-white font-medium">
                            {String.fromCharCode(65 + index)}
                          </span>
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">
                            {isGroup ? `Участник ${index + 1}` : `Подписчик ${index + 1}`}
                          </p>
                          <p className="text-sm text-(--color-text)">В сети</p>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            </div>
          )}

          {/* Для обычных чатов - НИЧЕГО НИЖЕ УВЕДОМЛЕНИЙ */}
        </div>
      </div>
    );
  }

  // Мобильная версия
  return (
    <div className="flex-1 overflow-y-auto p-4">
      <div className="flex items-start mb-6">
        <div className="flex-shrink-0 mr-4">
          {chat.avatar ? (
            <Image
              className="rounded-full"
              src={chat.avatar}
              width={88}
              height={88}
              alt={isGroup ? "Аватар группы" : isChannel ? "Аватар канала" : "Аватар чата"}
            />
          ) : (
            <div className="h-[88px] w-[88px] rounded-full bg-gray-300 flex items-center justify-center">
              <span className="text-white font-medium text-2xl">{chat.name?.charAt(0) || "?"}</span>
            </div>
          )}
        </div>

        <div className="flex-1">
          <h2 className="text-xl font-semibold text-gray-900 mb-2">{chat.name}</h2>

          {(isGroup || isChannel) && chat.members && (
            <p className="text-(--color-text)">
              {isGroup ? `${chat.members} участников` : `${chat.members} подписчиков`}
            </p>
          )}

          {isPrivate && (
            <p className="text-(--color-text)">
              {chat.is_online ? "В сети" : `Был(а) ${chat.was_online_at}`}
            </p>
          )}
        </div>
      </div>

      {/* Блок уведомлений - всегда показываем */}
      <div className="mb-6">
        <div className="flex items-center justify-between py-2">
          <h3 className="text-[16px] font-normal text-(--color-text) normal-case mb-0">
            Уведомления
          </h3>
          <NotificationToggle checked={localNotifications} onChange={handleToggleNotifications} />
        </div>
      </div>

      {/* Для групп и каналов */}
      {(isGroup || isChannel) && (
        <div className="space-y-6">
          {/* Описание без заголовка сверху */}
          <div className="border border-(--color-gray-1) rounded-lg overflow-hidden bg-white">
            <DescriptionField value={chat.description || ""} />
          </div>

          {/* Таб только "Участники" */}
          <div className="border-b border-(--color-gray-1)">
            <div className="flex" role="tablist">
              <Tab
                label="Участники"
                isActive={activeTab === "participants"}
                onClick={() => {}} // Не нужно менять, только одна вкладка
                isMobile={true}
              />
            </div>
          </div>

          {/* Список участников (минимум 1 - владелец) */}
          <div className="min-h-[200px]">
            <div className="space-y-3">
              {/* Владелец (первый участник) */}
              <div className="flex items-center">
                <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                  <span className="text-blue-600 font-medium">{chat.name?.charAt(0) || "В"}</span>
                </div>
                <div>
                  <p className="font-medium text-gray-900">Вы (владелец)</p>
                  <p className="text-sm text-(--color-text)">В сети</p>
                </div>
              </div>

              {/* Остальные участники (если есть) */}
              {chat.members > 1 &&
                Array.from({ length: Math.min(chat.members - 1, 5) }).map((_, index) => (
                  <div key={index} className="flex items-center">
                    <div className="h-10 w-10 rounded-full bg-gray-300 flex items-center justify-center mr-3">
                      <span className="text-white font-medium">
                        {String.fromCharCode(65 + index)}
                      </span>
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">
                        {isGroup ? `Участник ${index + 1}` : `Подписчик ${index + 1}`}
                      </p>
                      <p className="text-sm text-(--color-text)">В сети</p>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      )}

      {/* Для обычных чатов - ПОКА НИЧЕГО НИЖЕ УВЕДОМЛЕНИЙ */}
    </div>
  );
};

export default ChatInfoContent;
