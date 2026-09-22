/**
 * Single source of truth for the site's routes.
 *
 * IMPORTANT: this file must stay free of JSX and asset imports. It is imported
 * both by the browser bundle and directly by Node (scripts/prerender.mjs,
 * scripts/sitemap.mjs). Its sibling src/data/selectedProjects.js imports JPEGs
 * and is therefore unloadable from Node — do not copy that pattern here.
 *
 * Fields per route:
 *   path        route path, exactly as declared in src/App.jsx <Routes>
 *   title       <title> for the prerendered page
 *   description <meta name="description">
 *   assert      build-time proof the route rendered its OWN content, not the
 *               wildcard fallback. { text } | { selector, minCount }.
 *
 * Marker rules (see scripts/prerender.mjs):
 *   - Must be text that appears ONLY on that page. The footer nav is inside
 *     #root and renders everywhere, so its labels ("Пакети", "Проекти",
 *     "Често задавани въпроси", "Блог", "Отзиви") are unusable as markers.
 *   - Must sit on a single source line in the JSX. React joins a text node
 *     split across lines with a space, so a marker spanning two lines will not
 *     match as written.
 */

export const SITE_ORIGIN = "https://atelierbydoli.com";

export const routes = [
  {
    path: "/",
    title: "Atelier by Doli — интериорен дизайн и архитектура в София",
    description:
      "Доли Ликоманова — архитект и интериорен дизайнер с над пет години опит в София, Виена и Лондон. Персонален интериорен дизайн за дом и бизнес.",
    assert: { text: "Персонален интериорен дизайн" },
  },
  {
    path: "/projects",
    title: "Проекти — интериорни проекти | Atelier by Doli",
    description:
      "Избрани интериорни проекти на Atelier by Doli — жилища, студиа и вили. Всеки проект е изграден спрямо начина на живот и нуждите на клиента.",
    assert: { selector: ".project-title", minCount: 8 },
  },
  {
    path: "/services",
    title: "Услуги и пакети за интериорен проект | Atelier by Doli",
    description:
      "Пакети за интериорен проект, авторски надзор, управление на проект и консултации. Цените на базов пакет започват от 30–35 €/кв.м, консултации 70 €/час.",
    assert: { text: "Цените на базов пакет започват от" },
  },

  {
    path: "/projects/home-in-sage",
    title: "Home in Sage — интериорен проект | Atelier by Doli",
    description:
      "Проект за дом на млада двойка, която обича да прекарва време вкъщи. Меки, топли тонове и нюанси на зеленото за спокойна атмосфера.",
    assert: { text: "Проект за дом на млада двойка" },
  },
  {
    path: "/projects/home-in-burgundy",
    title: "Burgundy Home — интериорен проект | Atelier by Doli",
    description:
      "Двустаен апартамент, проектиран с фокус върху практичността и максималното използване на пространството, с достатъчно място за съхранение.",
    assert: { text: "гардероби позволяват на всичко да си има място" },
  },
  {
    path: "/projects/home-in-pastel",
    title: "Home in Pastel — интериорен проект | Atelier by Doli",
    description:
      "Дом за млада двойка, създаден с усещане за английски уют. Зеленият цвят и фрезованите повърхности внасят характер и мекота.",
    assert: { text: "усещане за английски уют" },
  },
  {
    path: "/projects/home-in-blue",
    title: "Home in Blue — интериорен проект | Atelier by Doli",
    description:
      "Апартамент под наем, проектиран с мисъл за баланс между визия и бюджет. Атрактивна визия, лесна поддръжка и дълготрайно усещане за дом.",
    assert: { text: "Апартамент под наем, проектиран с мисъл за баланс" },
  },
  {
    path: "/projects/mountain-home",
    title: "Mountain Home — интериорен проект | Atelier by Doli",
    description:
      "Уютна вила в планината, в която модерният дизайн е балансиран с естествени дървени елементи — място за почивка и откъсване от градския ритъм.",
    assert: { text: "Уютна вила в планината" },
  },
  {
    path: "/projects/bachelor-grey",
    title: "Bachelor Grey — интериорен проект | Atelier by Doli",
    description:
      "Апартамент, проектиран за мъж с предпочитание към изчистен и функционален интериор. Сива гама и практични решения, които извличат максимум от пространството.",
    assert: { text: "Апартамент, проектиран за мъж с предпочитание" },
  },
  {
    path: "/projects/studio-24-5",
    title: "Studio 24,5 — интериорен проект | Atelier by Doli",
    description:
      "Студио с фокус върху максимална функционалност и комфорт. Шалфеено зелено и топли дървени акценти обединяват пространството и разделят зоните.",
    assert: { text: "Студио с фокус върху максимална функционалност" },
  },
  {
    path: "/projects/soft-beige",
    title: "Soft Beige — интериорен проект | Atelier by Doli",
    description:
      "Двустаен апартамент в нежни бежови тонове с дървени акценти. Интелигентни решения за мебели и гардероби, които дават място на всичко.",
    assert: { text: "позволяват всичко да има своето място" },
  },

  {
    path: "/blog",
    title: "Блог — полезни съвети от интериорния свят | Atelier by Doli",
    description:
      "Статии за интериорния проект — етапи на работа, цени, функционална кухня и осветление. Полезни съвети от интериорния свят.",
    assert: { text: "Полезни съвети от интериорния свят" },
  },
  {
    path: "/blog/etapite-na-interiorniya-proekt",
    title: "Етапите на интериорния проект: от идея до реализация | Atelier by Doli",
    description:
      "Всеки успешен интериорен проект минава през ясни и структурирани етапи. Как протича работата от първата среща до реализацията.",
    assert: { text: "Процесът започва с първа среща" },
  },
  {
    path: "/blog/kuhnya-funktsionalna",
    title: "Как да направиш кухнята красива и функционална | Atelier by Doli",
    description:
      "Правилото на триъгълника в интериорния дизайн е малък трик, който променя начина, по който ползваш кухнята си. Как се прилага на практика.",
    assert: { text: "Какво е правилото на триъгълника в кухнята" },
  },
  {
    path: "/blog/kolko-struva-interioren-proekt",
    title: "Колко струва интериорен проект в София през 2026 | Atelier by Doli",
    description:
      "Реална ценова рамка за интериорен проект в София през 2026 — какви са цените, от какво зависят и за какво всъщност плащаш.",
    assert: { text: "Средна цена за интериорен проект в София" },
  },
  {
    path: "/blog/osvetlenie-v-interiora",
    title: "Осветление в интериора: защо една лампа не е достатъчна | Atelier by Doli",
    description:
      "В много домове осветлението се свежда до централна лампа на тавана. Защо това е един от най-честите проблеми в интериора и как се решава.",
    assert: { text: "Тя се включва, когато влезеш в стаята" },
  },
];

export const routePaths = routes.map((r) => r.path);

/**
 * Canonical absolute URL. GitHub Pages serves docs/<route>/index.html directly
 * at the trailing-slash form and 301s the slash-less form to it, so the
 * trailing-slash URL is the one that does not redirect.
 */
export const canonicalUrl = (p) =>
  p === "/" ? `${SITE_ORIGIN}/` : `${SITE_ORIGIN}${p}/`;

/** docs/-relative output file for a route's snapshot. */
export const outputFile = (p) =>
  p === "/" ? "index.html" : `${p.replace(/^\//, "")}/index.html`;
