function resolveSiteUrl() {
  if (process.env.NEXT_PUBLIC_SITE_URL) return process.env.NEXT_PUBLIC_SITE_URL;
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`;
  return "https://psychology-site-six.vercel.app";
}

export const siteConfig = {
  name: "Центр психологии и обучения",
  shortName: "Центр психологии",
  title: "Психолог · терапия и обучение | Цифровой офис практикующего специалиста",
  description:
    "Центральный digital-офис психолога: терапия для клиентов, курсы МГИ, супервизия и группы для коллег. Запись через Telegram и WhatsApp.",
  keywords: [
    "психолог",
    "терапия",
    "обучение психологов",
    "супервизия",
    "курсы МГИ",
    "парная терапия",
    "семейная терапия",
    "консультация психолога",
  ],
  url: resolveSiteUrl(),
  locale: "ru_RU",
  psychologist: {
    name: "Имя Фамилия",
    jobTitle: "Клинический психолог · супервизор · преподаватель МГИ",
    description:
      "Практикующий психолог с 20+ лет стажа. Индивидуальная, парная и семейная терапия. Обучение и супервизия для коллег.",
    sameAs: [
      "https://t.me/your_psychologist",
      "https://instagram.com/your_profile",
      "https://youtube.com/@your_channel",
    ],
  },
  contacts: {
    telegram: "https://t.me/your_psychologist",
    telegramHandle: "@your_psychologist",
    whatsapp: "https://wa.me/79000000000",
    email: "hello@psychology-site.ru",
    phone: "+7 (900) 000-00-00",
    city: "Москва · онлайн по всему миру",
  },
  apsod: {
    name: "APSOD",
    url: "https://apsod.com/",
    tagline: "Digital-продукты любой сложности",
    email: "karelinseo@gmail.com",
    telegram: "https://t.me/Apsod_IT",
  },
  courses: [
    {
      name: "Супервизия для практикующих психологов",
      description:
        "Профессиональная супервизия: разбор кейсов, этика, развитие компетенций.",
      startDate: "2026-09-01",
      endDate: "2026-12-15",
      courseMode: "online",
    },
    {
      name: "Курс МГИ — 1 ступень",
      description: "Базовая программа Московского гештальт-института.",
      startDate: "2026-10-01",
      endDate: "2027-06-01",
      courseMode: "blended",
    },
  ],
} as const;
