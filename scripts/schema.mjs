/**
 * Builds the JSON-LD graph for each route.
 *
 * scripts/prerender.mjs calls schemaFor(route, ctx) and injects the result into
 * <head> as a single <script type="application/ld+json"> before serializing.
 *
 * Everything here is derived from data the site already states — src/data/*.js
 * and the route manifest. Nothing is invented. Three deliberate omissions:
 *
 *   - No aggregateRating, and Review carries no reviewRating. The testimonials
 *     have no stars; inventing them would be fabricating data. This forfeits
 *     Google review rich results, which is the correct trade.
 *   - No telephone / address / openingHours. None exist. That is also why the
 *     studio is typed Organization: ProfessionalService and the other
 *     LocalBusiness subtypes require an address, so using one would both assert
 *     a physical local presence the site never claims and fail Google's
 *     validation for a rich result that is unreachable without it anyway.
 *   - No foundingDate. "над пет години опит" is relative, not a year.
 */

import { SITE_ORIGIN, canonicalUrl, routes } from "../src/data/routes.js";
import { studio } from "../src/data/studio.js";
import { testimonials } from "../src/data/testimonials.js";
import { faqItems, faqAnswerText } from "../src/data/faq.js";
import blogPosts from "../src/data/blogPosts.json" with { type: "json" };

const ID = {
  org: `${SITE_ORIGIN}/#organization`,
  founder: `${SITE_ORIGIN}/#doli`,
  website: `${SITE_ORIGIN}/#website`,
};

const isBlogPost = (p) => p.startsWith("/blog/");
const isProject = (p) => p.startsWith("/projects/");

/** The route manifest entry for a path. */
const routeFor = (p) => routes.find((r) => r.path === p);

/** Breadcrumb label for an ancestor path, from its manifest title. */
function crumbName(path) {
  if (path === "/") return "Начало";
  return routeFor(path)?.title?.split("—")[0].trim() || path;
}

function breadcrumb(route, ctx) {
  if (route.path === "/") return null;

  const segments = route.path.split("/").filter(Boolean);
  const items = [{ path: "/", name: "Начало" }];

  let acc = "";
  for (const seg of segments) {
    acc += `/${seg}`;
    // Intermediate segments that aren't real routes (none today) are skipped.
    if (acc !== route.path && !routeFor(acc)) continue;
    items.push({
      path: acc,
      name: acc === route.path ? ctx.heading || crumbName(acc) : crumbName(acc),
    });
  }

  return {
    "@type": "BreadcrumbList",
    "@id": `${canonicalUrl(route.path)}#breadcrumb`,
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      // The final crumb is the current page and carries no `item`, per Google.
      ...(i < items.length - 1 ? { item: canonicalUrl(item.path) } : {}),
    })),
  };
}

/** The studio itself. Referenced by @id from every other page's graph. */
function studioNode() {
  return {
    "@type": "Organization",
    "@id": ID.org,
    name: studio.name,
    url: `${SITE_ORIGIN}/`,
    email: studio.email,
    inLanguage: "bg",
    founder: { "@id": ID.founder },
    sameAs: [studio.social.instagram, studio.social.linkedin],
    areaServed: [{ "@type": "Country", name: "България" }],
    priceRange: studio.pricing.range,
    currenciesAccepted: studio.pricing.currency,
    knowsLanguage: ["bg", "en"],
    review: testimonials.map((t) => ({
      "@type": "Review",
      author: { "@type": "Person", name: t.author },
      reviewBody: t.text,
      inLanguage: "bg",
      // No reviewRating on purpose — see the file header.
    })),
    makesOffer: [
      {
        "@type": "Offer",
        name: "Цялостен интериорен проект",
        description: `Базов пакет от ${studio.pricing.basePackageFromPerSqm}-${studio.pricing.basePackageToPerSqm} €/кв.м, при минимална площ ${studio.pricing.minimumAreaSqm} кв.м.`,
        priceCurrency: studio.pricing.currency,
        priceSpecification: {
          "@type": "UnitPriceSpecification",
          priceCurrency: studio.pricing.currency,
          minPrice: studio.pricing.basePackageFromPerSqm,
          maxPrice: studio.pricing.basePackageToPerSqm,
          unitText: "кв.м",
        },
      },
      {
        "@type": "Offer",
        name: "Консултация",
        priceCurrency: studio.pricing.currency,
        priceSpecification: {
          "@type": "UnitPriceSpecification",
          priceCurrency: studio.pricing.currency,
          price: studio.pricing.hourlyRate,
          unitText: "час",
        },
      },
      {
        "@type": "Offer",
        name: "Авторски надзор",
        // Supervision is offered only in these cities; the org-level areaServed
        // must not be read as covering it nationwide.
        areaServed: studio.areaServed.supervision.map((city) => ({ "@type": "City", name: city })),
        priceCurrency: studio.pricing.currency,
        priceSpecification: {
          "@type": "UnitPriceSpecification",
          priceCurrency: studio.pricing.currency,
          price: studio.pricing.hourlyRate,
          unitText: "час",
        },
      },
    ],
  };
}

/** Доли herself — the entity we most want models to resolve by name. */
function founderNode() {
  return {
    "@type": "Person",
    "@id": ID.founder,
    name: studio.founder.name,
    jobTitle: studio.founder.jobTitle,
    description: studio.founder.description,
    url: `${SITE_ORIGIN}/`,
    worksFor: { "@id": ID.org },
    sameAs: [studio.social.linkedin, studio.social.instagram],
  };
}

/**
 * @param {object} route  entry from src/data/routes.js
 * @param {object} ctx    { image, heading } resolved from the rendered page
 */
export function schemaFor(route, ctx = {}) {
  const url = canonicalUrl(route.path);
  const graph = [];
  const image = ctx.image ? [ctx.image] : undefined;

  if (route.path === "/") {
    graph.push(
      {
        "@type": "WebSite",
        "@id": ID.website,
        url: `${SITE_ORIGIN}/`,
        name: studio.name,
        inLanguage: "bg",
        publisher: { "@id": ID.org },
      },
      { ...studioNode(), ...(image ? { image } : {}) },
      founderNode()
    );
  } else {
    // Every other page carries a lightweight reference to the same entities.
    graph.push(
      { "@type": "Organization", "@id": ID.org, name: studio.name, url: `${SITE_ORIGIN}/` },
      { "@type": "Person", "@id": ID.founder, name: studio.founder.name }
    );
  }

  if (route.path === "/services") {
    graph.push({
      "@type": "FAQPage",
      "@id": `${url}#faq`,
      url,
      inLanguage: "bg",
      mainEntity: faqItems.map((item) => ({
        "@type": "Question",
        name: item.question,
        acceptedAnswer: { "@type": "Answer", text: faqAnswerText(item) },
      })),
    });
  }

  if (route.path === "/blog") {
    graph.push({
      "@type": "Blog",
      "@id": `${url}#blog`,
      url,
      name: route.title,
      description: route.description,
      inLanguage: "bg",
      publisher: { "@id": ID.org },
      blogPost: blogPosts.map((post) => ({
        "@type": "BlogPosting",
        "@id": `${canonicalUrl(post.link)}#post`,
        headline: post.title,
        url: canonicalUrl(post.link),
        datePublished: post.datePublished,
        author: { "@id": ID.founder },
      })),
    });
  }

  if (isBlogPost(route.path)) {
    const post = blogPosts.find((p) => p.link === route.path);
    graph.push({
      "@type": "BlogPosting",
      "@id": `${url}#post`,
      headline: post?.title ?? route.title,
      description: route.description,
      url,
      mainEntityOfPage: url,
      inLanguage: "bg",
      ...(post?.datePublished ? { datePublished: post.datePublished } : {}),
      ...(image ? { image } : {}),
      author: { "@id": ID.founder },
      publisher: { "@id": ID.org },
      isPartOf: { "@type": "Blog", "@id": `${SITE_ORIGIN}/blog/#blog` },
    });
  }

  if (route.path === "/projects") {
    const projectRoutes = routes.filter((r) => isProject(r.path));
    graph.push({
      "@type": "CollectionPage",
      "@id": `${url}#projects`,
      url,
      name: route.title,
      description: route.description,
      inLanguage: "bg",
      isPartOf: { "@id": ID.website },
      mainEntity: {
        "@type": "ItemList",
        numberOfItems: projectRoutes.length,
        // URL-only items: each target page declares its own name, which also
        // sidesteps the "Studio 24.5" vs "Studio 24,5" disagreement.
        itemListElement: projectRoutes.map((r, i) => ({
          "@type": "ListItem",
          position: i + 1,
          url: canonicalUrl(r.path),
        })),
      },
    });
  }

  if (isProject(route.path)) {
    graph.push({
      "@type": "CreativeWork",
      "@id": `${url}#project`,
      // The page's own <h1> is the source of truth for a project's name;
      // selectedProjects.json and Projects.jsx disagree for two of them.
      name: ctx.heading ?? route.title,
      description: route.description,
      url,
      inLanguage: "bg",
      ...(image ? { image } : {}),
      creator: { "@id": ID.founder },
      provider: { "@id": ID.org },
      about: "Интериорен дизайн",
      // Year and status are deliberately omitted: on the pages they are free
      // text with drifting labels, and the other sources disagree.
    });
  }

  const crumbs = breadcrumb(route, ctx);
  if (crumbs) graph.push(crumbs);

  return { "@context": "https://schema.org", "@graph": graph };
}
