/**
 * Business facts about the studio, in one place.
 *
 * Both the site and scripts/schema.mjs read from here, so the contact details
 * a visitor sees and the ones published as structured data cannot drift.
 * Keep free of JSX and asset imports — Node imports it directly.
 *
 * Deliberately absent, because none of it exists: telephone, postal address,
 * opening hours, founding year. Nothing here should be invented — every value
 * is something the site already states.
 */

export const studio = {
  name: "Atelier by Doli",
  url: "https://atelierbydoli.com",

  email: "atelierbydoli@gmail.com",
  inquiryFormUrl: "https://form.jotform.com/241855833689372",

  social: {
    instagram: "https://www.instagram.com/atelier_by_doli",
    linkedin: "https://www.linkedin.com/in/doli-likomanova",
  },

  founder: {
    name: "Доли Ликоманова",
    jobTitle: "Архитект и интериорен дизайнер",
    // From the About section on the homepage.
    description:
      "Архитект и интериорен дизайнер с над пет години опит в създаването на функционални и стилни пространства в София, Виена и Лондон.",
    worksIn: ["София", "Виена", "Лондон"],
  },

  /** From the "В кои населени места работите?" FAQ answer. */
  areaServed: {
    projects: "България и чужбина",
    supervision: ["София", "Бургас"],
  },

  /**
   * From the Services page. Note BlogPost1.jsx still quotes 25–30 €/кв.м,
   * which is stale — the Services figure is the current one.
   */
  pricing: {
    currency: "EUR",
    hourlyRate: 70,
    basePackageFromPerSqm: 30,
    basePackageToPerSqm: 35,
    minimumAreaSqm: 50,
    range: "30-35 €/кв.м",
  },
};
