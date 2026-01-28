"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { chatsList } from "@/src/data/chats";
import ChatInfoHeader from "@/src/components/ui/chats/ChatInfoHeader";
import ChatInfoContent from "@/src/components/ui/chats/ChatInfoContent";
import { useIsMobile } from "@/src/hooks/useIsMobile";

const ChatInfoPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const chatId = searchParams.get("id");
  const isMobile = useIsMobile();

  const [chat, setChat] = useState<any>(null);

  useEffect(() => {
    if (chatId) {
      const foundChat = chatsList.find(c => c.id === chatId);
      setChat(foundChat);
    }
  }, [chatId]);

  const handleClose = () => {
    router.back();
  };

  const handleToggleNotifications = (chatId: string) => {
    const updatedChatsList = chatsList.map(chat =>
      chat.id === chatId ? { ...chat, notifications: !chat.notifications } : chat,
    );

    console.log("Toggle notifications for chat:", chatId);

    if (chat && chat.id === chatId) {
      setChat({
        ...chat,
        notifications: !chat.notifications,
      });
    }
  };

  if (!chat) {
    return (
      <div className="flex justify-center items-center min-h-[calc(100vh-88px)]">
        <p>Чат не найден</p>
      </div>
    );
  }

  return (
    <div className="flex flex-row gap-x-6 w-full justify-center md:mb-1">
      <div className="w-full md:max-w-[360px] md:min-w-[360px] min-h-[calc(100vh-88px)] bg-(--color-gray-light) md:rounded-lg border border-(--color-gray-1)">
        <ChatInfoHeader onClose={handleClose} chatType={chat.type} isMobile={isMobile} />
        <ChatInfoContent
          chat={chat}
          isMobile={isMobile}
          onToggleNotifications={handleToggleNotifications}
        />
      </div>

      {/* Для десктопа - остальные колонки */}
      <div
        className="hidden md:flex justify-center text-center items-center w-full 
      max-w-[744px] min-h-[calc(100vh-88px)] bg-(--color-gray-light) rounded-lg  md:rounded-lg border border-(--color-gray-1) px-4"
      >
        <p className="text-(--color-gray) text-lg font-normal">
          {chat.type === "group"
            ? `Группа: ${chat.name}`
            : chat.type === "channel"
              ? `Канал: ${chat.name}`
              : `Чат с ${chat.name}`}
        </p>
      </div>
    </div>
  );
};

export default ChatInfoPage;
