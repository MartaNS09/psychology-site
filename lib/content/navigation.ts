/** Компактная навигация в шапке — остальное на главной и в футере */
export const mainNav = [
  { href: "/clients", label: "Клиентам" },
  { href: "/education", label: "Коллегам" },
  { href: "/topics", label: "Блог" },
  { href: "/faq", label: "Вопросы" },
  { href: "/contact", label: "Контакты" },
] as const;

export const footerClientsNav = [
  { href: "/clients", label: "Терапия" },
  { href: "/clients/women", label: "Для женщин" },
  { href: "/clients/men", label: "Для мужчин" },
  { href: "/clients/couples", label: "Пары" },
  { href: "/clients/family", label: "Семья" },
  { href: "/clients/children", label: "Дети и подростки" },
  { href: "/clients/online", label: "Онлайн-терапия" },
  { href: "/clients/crisis", label: "Кризисная сессия" },
  { href: "/stories", label: "Истории клиентов" },
  { href: "/contact", label: "Запись" },
] as const;

export const footerEducationNav = [
  { href: "/education", label: "Обучение" },
  { href: "/education/mgi-stage-1", label: "МГИ — 1 ступень" },
  { href: "/education/mgi-stage-2", label: "МГИ — 2 ступень" },
  { href: "/education/supervision", label: "Супервизия" },
  { href: "/education/groups", label: "Группы" },
  { href: "/contact?type=course", label: "Регистрация" },
] as const;

/** Внутренние ссылки для SEO-блоков на главной и внутренних страницах */
export const internalLinksHub = [
  {
    title: "Терапия для клиентов",
    links: [
      { href: "/clients/women", label: "Терапия для женщин" },
      { href: "/clients/men", label: "Терапия для мужчин" },
      { href: "/clients/couples", label: "Парная терапия" },
      { href: "/clients/family", label: "Семейная терапия" },
      { href: "/clients/children", label: "Дети и подростки" },
      { href: "/clients/online", label: "Онлайн-терапия" },
      { href: "/clients/crisis", label: "Кризисная поддержка" },
    ],
  },
  {
    title: "Обучение для коллег",
    links: [
      { href: "/education/mgi-stage-1", label: "МГИ — 1 ступень" },
      { href: "/education/mgi-stage-2", label: "МГИ — 2 ступень" },
      { href: "/education/supervision", label: "Супервизия" },
      { href: "/education/groups", label: "Группы" },
    ],
  },
  {
    title: "Материалы и ответы",
    links: [
      { href: "/topics", label: "Блог и статьи" },
      { href: "/stories", label: "Истории клиентов" },
      { href: "/faq", label: "Частые вопросы" },
      { href: "/contact", label: "Запись и контакты" },
    ],
  },
] as const;
