/**
 * The FAQ shown on /services, plus the helper that flattens an entry to the
 * plain text a reader actually sees.
 *
 * Extracted from src/pages/Services.jsx so scripts/schema.mjs can emit a
 * schema.org FAQPage without restating the answers. Keep free of JSX and asset
 * imports — Node imports it directly.
 *
 * Entry shapes (all three occur):
 *   { question, answer }
 *   { question, answer, bullets }            — answer is followed by a <ul>
 *   { question, answer: "", sections }       — ALL visible text is in sections
 */

/** Marker in an answer that FaqItem renders as a link to the inquiry form. */
export const INQUIRY_LINK_MARKER = "(Кликни тук)";

/** The visible label that marker becomes — the brackets are not rendered. */
export const INQUIRY_LINK_LABEL = "Кликни тук";

export const faqItems = [
  {
    question: "Колко време отнема изготвянето на интериорен проект?",
    answer:
      "Срокът зависи от сложността на обекта, квадратурата и темпото, с което се вземат решения от страна на клиента. Опита показва, че изготвянето на цялостен интериорен проект за тристаен апартамент отнема средно около 2 месеца.",
  },
  {
    question: "Мога ли да се възползвам само от консултация, без цялостен проект?",
    answer: "Да. Не всеки случай изисква пълен интериорен проект. Предлагам самостоятелни консултации, подходящи при нужда от конкретни насоки. Най-често срещаните типове консултации са:",
    bullets: [
      "Консултация преди покупка на жилище – оглед на място, анализ на потенциала, плюсове и минуси на имота.",
      "Консултация при избор на материали и мебели – насоки, доставчици и доверени партньори с добри срокове и цени.",
      "Консултация на обект – обсъждане на решения на място и отговори на възникнали въпроси по време на изпълнение.",
    ],
  },
  {
    question: "В кои населени места работите?",
    answer:
      "Интериорни проекти – в цяла България и в чужбина (условията за вземане на мерки се уточняват допълнително). Авторски надзор — София и Бургас.",
  },
  {
    question: "Само в един стил ли проектирате?",
    answer:
      "Не. Работя с персонален подход, без шаблони и фиксиран стил. Всеки проект се изгражда спрямо начина на живот, нуждите и естетиката на конкретния клиент.",
  },
  {
    question: "Как се извършва плащането?",
    answer:
      "Сключваме договор, след което имате 5 дневен срок да заплатите 30% от сумата като аванс. 40% се заплащат след приключване на идейна фаза, а остатъкът при приключване на технически проект.",
  },
  {
    question: "Как се формира цената на интериорния проект?",
    answer:
      "Цената зависи от избрания пакет и характеристиките на обекта – квадратура, тип строителство, скосявания и други специфики. След попълване на форма за запитване (Кликни тук) и първоначална консултация се изготвя индивидуална оферта.",
  },
  {
    question: "Възможно ли е проектиране само на отделна зона/стая?",
    answer:
      "Подхождам към интериора като към цялостна система – целта е пространствата да „говорят на един език“ и да се усещат като едно завършено жилище, а не като отделни решения. Поради този подход работя само по цялостни проекти (мин. площ 50 кв.м).",
  },
  {
    question: "Каква е разликата между авторски надзор и управление на проект?",
    answer: "",
    sections: [
      {
        heading: "Авторски надзор",
        bullets: [
          "Контрол на изпълнението спрямо проекта.",
          "Определен брой посещения на обекта.",
          "Разрешаване на казуси по време на строително-ремонтните дейности.",
          "Таксува се почасово.",
        ],
      },
      {
        heading: "Управление на проект",
        bullets: [
          "Цялостна координация на всички изпълнители.",
          "Организация на огледи и оферти.",
          "Осигуряване на достъп до обекта.",
          "Контрол на срокове, качество и процеси.",
        ],
      },
    ],
  },
  {
    question: "Работите ли с определени марки и изпълнители?",
    answer:
      "Да. Работя с доказани във времето партньори и изпълнители, на които мога да разчитам за качество и коректност.",
  },
];

/**
 * The answer as a reader sees it, for schema.org acceptedAnswer.
 *
 * This lives next to the data on purpose. Three entries would be wrong if the
 * raw `answer` were used directly:
 *   - the sections-only entry has answer: "" and would publish nothing;
 *   - the bulleted entry would lose its list;
 *   - the pricing entry contains the literal "(Кликни тук)", which FaqItem
 *     renders as a link, so the reader never sees the parentheses.
 *
 * If a new entry shape is added, this and the renderer in Services.jsx should
 * be updated together.
 */
export function faqAnswerFragments(item) {
  const fragments = [];

  if (item.answer) {
    // The marker is rendered as a link labelled INQUIRY_LINK_LABEL, so the
    // reader sees the surrounding text either side of it, without the brackets.
    const [before, after] = item.answer.split(INQUIRY_LINK_MARKER);
    fragments.push(before);
    if (after !== undefined) {
      fragments.push(INQUIRY_LINK_LABEL);
      fragments.push(after);
    }
  }

  for (const bullet of item.bullets ?? []) fragments.push(bullet);

  for (const section of item.sections ?? []) {
    fragments.push(section.heading);
    for (const bullet of section.bullets) fragments.push(bullet);
  }

  return fragments.map((f) => f.replace(/\s+/g, " ").trim()).filter(Boolean);
}

/** The whole answer as one string, for schema.org acceptedAnswer. */
export function faqAnswerText(item) {
  return faqAnswerFragments(item).join(" ");
}
