"use client";

import Input from "@/src/components/ui/Input";
import Image from "next/image";
import search from "../../../assets/icons/search.svg";
import createDesktop from "../../../assets/icons/create.svg";
import create2Desktop from "../../../assets/icons/create2.svg";
import createMobile from "../../../assets/icons/create-mobile.svg";
import channel from "../../../assets/icons/channel.svg";
import group from "../../../assets/icons/group.svg";
import ModalDropdown from "@/src/components/ui/modal/ModalDropdown";
import { useEffect, useRef, useState } from "react";
import { useClickOutside } from "@/src/hooks/useClickOutside";
import ContextMenu from "../../../components/ui/chats/ContextMenu";
import { chatsList } from "@/src/data/chats";
import { useRouter } from "next/navigation";
import ChatInfoContent from "@/src/components/ui/chats/ChatInfoContent";
import ChatInfoHeader from "@/src/components/ui/chats/ChatInfoHeader";
import { useIsMobile } from "@/src/hooks/useIsMobile";

const Page = () => {
  const POPUP_HEIGHT = 238;
  const MENU_OFFSET = 20;

  const [chats, setChats] = useState(chatsList);
  const [searchQuery, setSearchQuery] = useState("");
  const [openContextMenu, setOpenContextMenu] = useState(false);
  const [menuPosition, setMenuPosition] = useState({
    x: 0,
    y: 0,
    placement: "bottom" as "top" | "bottom",
  });
  const [selectedChatId, setSelectedChatId] = useState<string | null>(null);
  const [selectedChat, setSelectedChat] = useState<any>(null);
  const [showChatInfo, setShowChatInfo] = useState(false);
  const [showChatPage, setShowChatPage] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const popupRef = useRef<HTMLDivElement>(null);

  const [isCreateButtonActive, setIsCreateButtonActive] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const router = useRouter();

  const isMobile = useIsMobile();

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const isContentTall = () => {
      const viewportHeight = window.innerHeight;
      const threshold = viewportHeight - 165;
      return container.scrollHeight > threshold;
    };

    const onMouseEnter = () => {
      if (isContentTall()) {
        container.style.paddingRight = "0px";
      }
    };

    const onMouseLeave = () => {
      container.style.paddingRight = "6px";
    };

    container.addEventListener("mouseenter", onMouseEnter);
    container.addEventListener("mouseleave", onMouseLeave);

    return () => {
      container.removeEventListener("mouseenter", onMouseEnter);
      container.removeEventListener("mouseleave", onMouseLeave);
    };
  }, []);

  const handleRightClick = (e: React.MouseEvent, chat) => {
    e.preventDefault();
    const chatId = chat.name;

    const { clientY, clientX } = e;
    const windowHeight = window.innerHeight;

    const hasSpaceBelow = clientY + POPUP_HEIGHT + MENU_OFFSET <= windowHeight;

    setMenuPosition({
      x: clientX,
      y: clientY,
      placement: hasSpaceBelow ? "bottom" : "top",
    });

    setOpenContextMenu(true);
    setSelectedChatId(chatId);
  };

  const handleOutsideClick = () => {
    setOpenContextMenu(false);
    setSelectedChatId(null);
  };

  useClickOutside(popupRef, handleOutsideClick);

  const toggleNotifications = () => {
    if (!selectedChatId) return;

    setChats(prevChats =>
      prevChats.map(chat =>
        chat.name === selectedChatId ? { ...chat, notifications: !chat.notifications } : chat,
      ),
    );

    setOpenContextMenu(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleCreateClick = () => {
    setIsCreateButtonActive(true);
    setIsModalOpen(true);
  };

  const handleCreateGroup = () => {
    setIsModalOpen(false);
    setIsCreateButtonActive(false);
    router.push("/chats/new-group");
  };

  const handleCreateChannel = () => {
    setIsModalOpen(false);
    setIsCreateButtonActive(false);
    router.push("/chats/new-channel");
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setTimeout(() => setIsCreateButtonActive(false), 150);
  };

  const handleChatClick = chat => {
    setSelectedChat(chat);
    setSelectedChatId(chat.name);

    if (isMobile) {
      setShowChatPage(true);
      setShowChatInfo(false);
    } else {
      setShowChatInfo(false);
    }
  };

  const handleChatHeaderClick = () => {
    if (selectedChat) {
      setShowChatInfo(true);
      setShowChatPage(false);
    }
  };

  const handleCloseChatInfo = () => {
    setShowChatInfo(false);
  };

  const handleBackFromChat = () => {
    setShowChatPage(false);
    setShowChatInfo(false);
  };

  const handleToggleNotifications = (chatId: string) => {
    setChats(prevChats =>
      prevChats.map(chat =>
        chat.id === chatId ? { ...chat, notifications: !chat.notifications } : chat,
      ),
    );
  };

  const filteredChats = chats.filter(chat =>
    chat.name.toLowerCase().includes(searchQuery.trim().toLowerCase()),
  );

  return (
    <div className="flex flex-row gap-x-6 w-full justify-center md:mb-1">
      {/* Левый блок - Список чатов */}
      <div
        className={`w-full md:max-w-[360px] md:min-w-[360px] min-h-[calc(100vh-88px)] bg-(--color-gray-light) md:rounded-lg border border-(--color-gray-1) ${(showChatInfo || showChatPage) && isMobile ? "hidden" : "flex"} ${showChatInfo ? "hidden md:flex" : ""}`}
      >
        <div className="flex flex-col w-full">
          <div className="relative w-full p-4">
            <div className="flex gap-x-2 w-full relative">
              <div className="relative flex-1">
                <Input
                  onChange={handleChange}
                  placeholder="Поиск"
                  type="search"
                  className="placeholder:text-base placeholder:height-1.3 placeholder:font-normal border border-(--color-gray-1) 
                  pr-3 pl-11 pt-2.5 pb-2.5 md:pr-3 md:pl-11 md:pt-2.5 md:pb-2.5 h-[44px] w-full"
                />
                <Image
                  src={search}
                  alt="Поиск"
                  className="absolute left-7 top-1/2 -translate-y-1/2 w-[16px] md:w-[24px]"
                />
              </div>

              <button
                className="flex-shrink-0 w-[44px] h-[44px] bg-transparent rounded-lg flex items-center justify-center transition-colors duration-200"
                aria-label="Создать чат"
                onClick={handleCreateClick}
              >
                <div className="md:hidden flex items-center justify-center mt-[2px]">
                  <Image
                    src={createMobile}
                    alt="Создать"
                    width={26}
                    height={26}
                    className="mr-[2px]"
                    style={{ width: "auto", height: "auto" }}
                  />
                </div>

                <div className="hidden md:flex items-center justify-center">
                  <Image
                    src={isCreateButtonActive ? create2Desktop : createDesktop}
                    alt="Создать"
                    width={24}
                    height={24}
                  />
                </div>
              </button>

              {isModalOpen && (
                <ModalDropdown onClose={handleCloseModal} className="md:right-0 right-4 top-full">
                  <div className="w-[192px] h-[128px] md:w-[220px] md:h-[88px] bg-white rounded-lg border border-(--color-gray-1) shadow-lg overflow-hidden">
                    <button
                      onClick={handleCreateGroup}
                      className="w-full h-1/2 md:h-[44px] bg-transparent hover:bg-gray-50 active:bg-gray-100 flex items-center justify-between px-4 transition-colors"
                    >
                      <span className="text-base font-normal text-gray-900">Создать группу</span>
                      <Image src={group} alt="Группа" width={24} height={24} className="w-6 h-6" />
                    </button>

                    <div className="w-full h-px bg-(--color-gray-1)" />

                    <button
                      onClick={handleCreateChannel}
                      className="w-full h-1/2 md:h-[44px] bg-transparent hover:bg-gray-50 active:bg-gray-100 flex items-center justify-between px-4 transition-colors"
                    >
                      <span className="text-base font-normal text-gray-900">Создать канал</span>
                      <Image src={channel} alt="Канал" width={24} height={24} className="w-6 h-6" />
                    </button>
                  </div>
                </ModalDropdown>
              )}
            </div>
          </div>

          <div
            ref={containerRef}
            className="w-full overflow-y-auto h-[calc(100vh-165px)] md:h-[calc(100vh-170px)] scroll-custom px-2"
          >
            {filteredChats.length > 0 ? (
              filteredChats.map((chat, index) => (
                <div
                  onContextMenu={e => handleRightClick(e, chat)}
                  onClick={() => handleChatClick(chat)}
                  key={index}
                  className={`flex py-1.5 gap-x-2 min-w-[344px] h-[72px] cursor-pointer hover:bg-(--color-gray-2)
                     rounded-lg px-2 mt-2 mb-1
                 ${selectedChat?.name === chat.name ? "bg-(--color-gray-2)" : ""}`}
                >
                  {chat.avatar ? (
                    <Image
                      className="h-15 w-15"
                      src={chat.avatar}
                      width={60}
                      height={60}
                      alt="Аватар"
                    />
                  ) : (
                    <Image
                      className="h-15 w-15"
                      src="/avatar/avatar-8.png"
                      width={60}
                      height={60}
                      alt="Аватар"
                    />
                  )}

                  <div className="relative after:absolute after:left-0 after:right-0 after:bottom-[-10px] after:border-b after:border-1 after:border-(--color-button-disabled) after:z--1 w-full">
                    <div className="flex justify-between mb-1">
                      <div className="flex gap-x-1 h-[22px] ">
                        <p className="font-medium text‑lg leading-[1.2] truncate max-w-[165px]">
                          {chat.name}
                        </p>
                        {!chat.notifications && (
                          <div className="flex items-center">
                            <Image
                              className="w-4.5 h-4.5 "
                              src="/assets/icons/chat/no-sound.svg"
                              alt="Уведомления отключены"
                              width={18}
                              height={18}
                            />
                          </div>
                        )}
                      </div>
                      <div className="flex gap-x-0.5 h-[22px]">
                        <div className="flex items-center">
                          {chat.new === true ? (
                            <Image
                              className="w-4.5 h-4.5"
                              src="/assets/icons/chat/unread.svg"
                              alt="Новое сообщение"
                              width={18}
                              height={18}
                            />
                          ) : chat.new === false ? (
                            <Image
                              className="w-4.5 h-4.5"
                              src="/assets/icons/chat/read.svg"
                              alt="Прочитано"
                              width={18}
                              height={18}
                            />
                          ) : (
                            <Image
                              className="w-4.5 h-4.5"
                              src="/assets/icons/chat/loading.svg"
                              alt="Загрузка"
                              width={18}
                              height={18}
                            />
                          )}
                        </div>
                        <div className="flex items-center">
                          <p className="text-sm font-normal text-(--color-gray) leading-[1.2] tracking-[1%]">
                            {chat.time}
                          </p>
                        </div>
                      </div>
                    </div>
                    <p className="text-sm font-normal text-(--color-gray) leading-[1.2] tracking-[1%] line-clamp-2">
                      {chat.content}
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <div className="flex flex-col items-center mt-45 text-center text-(--color-gray) font-normal">
                <Image
                  className="mb-6"
                  src="/images/not-found.png"
                  alt="Ничего не найдено"
                  width={200}
                  height={200}
                />
                <p className="mb-2 text-lg">Поиск не дал результатов</p>
                <p className="text-[14px]">По вашему запросу ничего не найдено.</p>
                <p className="text-[14px]">Измените запрос и попробуйте снова</p>
              </div>
            )}
          </div>
          <ContextMenu
            isOpen={openContextMenu}
            ref={popupRef}
            chats={chats}
            chatId={selectedChatId}
            position={menuPosition}
            onToggleNotifications={toggleNotifications}
            menuOffset={MENU_OFFSET}
          />
        </div>
      </div>

      {/* Средний блок - Чат или сообщение о выборе */}
      {(showChatPage || !isMobile) && (
        <div
          className={`${isMobile ? "flex" : "hidden md:flex"} flex-col min-h-[calc(100vh-88px)] bg-(--color-gray-light) rounded-lg border border-(--color-gray-1) ${showChatInfo && !isMobile ? "flex-1 max-w-[744px]" : "w-full max-w-[744px]"}`}
        >
          {selectedChat ? (
            <div className="flex flex-col h-full">
              <div className="flex items-center p-4 border-b border-(--color-gray-1)">
                {isMobile && (
                  <button
                    onClick={handleBackFromChat}
                    className="flex-shrink-0 w-10 h-10 bg-transparent rounded-lg flex items-center justify-center transition-colors duration-200 hover:bg-gray-100 active:bg-gray-200 mr-2"
                    aria-label="Назад"
                  >
                    <Image
                      src="/assets/icons/back-icon.svg"
                      alt="Назад"
                      width={24}
                      height={24}
                      style={{ width: "auto", height: "auto" }}
                    />
                  </button>
                )}
                <div
                  className="flex items-center flex-1 cursor-pointer hover:bg-gray-50 transition-colors p-2 rounded-lg"
                  onClick={handleChatHeaderClick}
                >
                  {selectedChat.avatar ? (
                    <Image
                      className="h-10 w-10 rounded-full mr-3"
                      src={selectedChat.avatar}
                      width={40}
                      height={40}
                      alt="Аватар"
                    />
                  ) : (
                    <div className="h-10 w-10 rounded-full bg-gray-300 flex items-center justify-center mr-3">
                      <span className="text-white font-medium">
                        {selectedChat.name?.charAt(0) || "?"}
                      </span>
                    </div>
                  )}
                  <div className="flex flex-col">
                    <p className="font-medium text-lg text-gray-900">{selectedChat.name}</p>
                    {(selectedChat.type === "group" || selectedChat.type === "channel") &&
                      selectedChat.members && (
                        <p className="text-sm text-(--color-text)">
                          {selectedChat.type === "group"
                            ? `${selectedChat.members} участников`
                            : `${selectedChat.members} подписчиков`}
                        </p>
                      )}
                  </div>
                </div>
              </div>

              <div className="flex-1 overflow-y-auto flex items-center justify-center">
                <p className="text-(--color-gray) text-lg font-normal">
                  Здесь будут сообщения чата
                </p>
              </div>
            </div>
          ) : (
            !isMobile && (
              <div className="flex justify-center text-center items-center w-full h-full">
                <p className="text-(--color-gray) text-lg font-normal">
                  Выберите контакт для начала общения
                </p>
              </div>
            )
          )}
        </div>
      )}

      {/* Правый блок - Информация о чате */}
      {showChatInfo && selectedChat && (
        <div
          className={`${isMobile ? "flex" : "hidden md:flex"} flex-col w-full md:max-w-[360px] md:min-w-[360px] min-h-[calc(100vh-88px)] bg-(--color-gray-light) rounded-lg border border-(--color-gray-1)`}
        >
          {!isMobile ? (
            <ChatInfoHeader
              onClose={handleCloseChatInfo}
              chatType={selectedChat.type}
              isMobile={false}
            />
          ) : (
            <ChatInfoHeader
              onClose={handleBackFromChat}
              chatType={selectedChat.type}
              isMobile={true}
            />
          )}
          <ChatInfoContent
            chat={selectedChat}
            onToggleNotifications={handleToggleNotifications}
            isMobile={isMobile}
          />
        </div>
      )}
    </div>
  );
};

export default Page;
