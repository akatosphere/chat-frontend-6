// src/data/chats.ts
export const chatsList = [
  {
    id: "group-1",
    name: "Рабочий чат",
    avatar: "/avatar/group.png",
    content: "Обсуждение текущих проектов и задач",
    time: "14:30",
    new: true,
    notifications: true,
    is_online: false,
    was_online_at: "",
    type: "group", // новый параметр для отличия групп
    members: 12 // количество участников
  },
  {
    id: "channel-1",
    name: "Новости компании",
    avatar: "/avatar/channel.png",
    content: "Важное объявление от руководства",
    time: "Вчера",
    new: false,
    notifications: true,
    is_online: false,
    was_online_at: "",
    type: "channel", // новый параметр для отличия каналов
    members: 45 // количество подписчиков
  },
  {
    id: "group-2",
    name: "Футбольные фанаты",
    avatar: "/avatar/group.png",
    content: "Обсуждаем матч в субботу",
    time: "10:15",
    new: true,
    notifications: true,
    is_online: false,
    was_online_at: "",
    type: "group",
    members: 8
  },
  {
    id: "1",
    name: "Влад Ляшев",
    avatar: "/avatar/avatar-1.png",
    content: "Привет, Владик!",
    time: "21:49",
    new: true,
    notifications: false,
    is_online: true,
    was_online_at: "",
    type: "private" // можно добавить для приватных чатов
  },
  {
    id: "2",
    name: "Сергей Евтушенко",
    avatar: "/avatar/avatar-2.png",
    content:
      "Привет. Я оставил две стремянки и два шуруповёрта. Один в кейсе, а другой просто так. Одна батарейка может кончиться, тогда будете одним добивать. Воды с собой возьмите, там ничего уже не осталось.",
    time: "21:49",
    new: false,
    notifications: false,
    is_online: true,
    was_online_at: "",
    type: "private"
  },
  {
    id: "3",
    name: "Инна Георгиевна",
    avatar: "/avatar/avatar-3.png",
    content:
      "Привет. Я оставил две стремянки и два шуруповёрта. Один в кейсе, а другой просто так. Одна батарейка может кончиться, тогда будете одним добивать. Воды с собой возьмите, там ничего уже не осталось.",
    time: "21:49",
    notifications: true,
    is_online: false,
    was_online_at: "был(а) только что",
    type: "private"
  },
  {
    id: "4",
    name: "Константин Передвиженцев",
    avatar: "/avatar/avatar-4.png",
    content: "doc00498820200806132640.pdf",
    time: "21:49",
    new: true,
    notifications: false,
    is_online: false,
    was_online_at: "был(а) 22 минуты назад",
    type: "private"
  },
  {
    id: "5",
    name: "Анастасия Бортникова",
    avatar: "/avatar/avatar-5.png",
    content: "Мурка по утрам на балкон рвëтся. Никак не успокоится",
    time: "21:49",
    new: true,
    notifications: true,
    is_online: false,
    was_online_at: "был(а) 22 часа назад",
    type: "private"
  },
  {
    id: "6",
    name: "Ванесса Рейхарт",
    avatar: "/avatar/avatar-6.png",
    content:
      "Привет. Я оставил две стремянки и два шуруповёрта. Один в кейсе, а другой просто так. Одна батарейка может кончиться, тогда будете одним добивать. Воды с собой возьмите, там ничего уже не осталось.",
    time: "ПН",
    new: true,
    notifications: false,
    is_online: false,
    was_online_at: "был(а) вчера в 21:15",
    type: "private"
  },
  {
    id: "7",
    name: "Илья Макаров",
    avatar: "/avatar/avatar-7.png",
    content: "instruction.pdf",
    time: "ПН",
    new: false,
    notifications: false,
    is_online: false,
    was_online_at: "был(а) 02.04.24",
    type: "private"
  },
  {
    id: "8",
    name: "Алексей Митрофанов",
    content: "Мурка по утрам на балкон рвëтся. Жить не может без традиционного гуляния на балконе.",
    time: "ПН",
    new: false,
    notifications: true,
    is_online: false,
    was_online_at: "был(а) 02.04.24",
    type: "private"
  },
  {
    id: "9",
    name: "Александр Маслюченков",
    avatar: "/avatar/avatar-9.png",
    content: "Мурка по утрам на балкон рвëтся. Жить не может без традиционного гуляния на балконе.",
    time: "ПН",
    new: false,
    notifications: true,
    is_online: false,
    was_online_at: "был(а) 02.04.24",
    type: "private"
  },
  {
    id: "10",
    name: "Ира Непогодьевшинаа",
    avatar: "/avatar/avatar-10.png",
    content: "Привет",
    time: "30.12.23",
    new: false,
    notifications: true,
    is_online: false,
    was_online_at: "был(а) 02.04.24",
    type: "private"
  },
  {
    id: "11",
    name: "Оксана Костомина",
    avatar: "/avatar/avatar-11.png",
    content: "Привет",
    time: "30.12.23",
    new: false,
    notifications: false,
    is_online: false,
    was_online_at: "был(а) 02.04.24",
    type: "private"
  },
  {
    id: "group-3",
    name: "Обсуждение отпусков",
    avatar: "/avatar/group.png",
    content: "Кто когда планирует отдыхать в этом году?",
    time: "Позавчера",
    new: false,
    notifications: true,
    is_online: false,
    was_online_at: "",
    type: "group",
    members: 6
  },
  {
    id: "channel-2",
    name: "Технологические новинки",
    avatar: "/avatar/channel.png",
    content: "Обзор новых технологий в веб-разработке",
    time: "25.03.24",
    new: false,
    notifications: false,
    is_online: false,
    was_online_at: "",
    type: "channel",
    members: 102
  }
];