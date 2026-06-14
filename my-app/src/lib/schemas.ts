// ─────────────────────────────────────────────────────────────────────────────
// Shared JSON-LD schema helpers for SyncRetreat
// Import these in any Server Component and pass to <Schema schema={...} />
// ─────────────────────────────────────────────────────────────────────────────

const BASE_URL = "https://syncretreat.com";
const ORG_ID   = `${BASE_URL}/#organization`;

// ── Types ────────────────────────────────────────────────────────────────────

export interface FaqItem {
  question: string;
  answer: string;
}

export interface ArticlePost {
  title: string;
  excerpt: string;
  /** Any date string parseable by `new Date()` */
  date: string;
  author: string;
  image: string;
  slug: string;
}

export interface EventData {
  name: string;
  description: string;
  /** ISO 8601 date string, e.g. "2026-07-06" */
  startDate: string;
  /** ISO 8601 date string, e.g. "2026-07-27" */
  endDate: string;
  locationName: string;
  locationLocality: string;
  locationRegion: string;
  url: string;
  /** Price in USD */
  price?: number;
  /** e.g. "InStock" | "SoldOut" | "PreOrder" */
  availability?: string;
}

export interface BreadcrumbItem {
  name: string;
  url: string;
}

// ── Helpers ──────────────────────────────────────────────────────────────────

/** Converts any human-readable or ISO date string to ISO 8601 safely */
function toISO(dateStr: string): string {
  try {
    return new Date(dateStr).toISOString();
  } catch {
    return dateStr;
  }
}

// ── Schema Factories ─────────────────────────────────────────────────────────

/**
 * FAQPage schema — makes each Q&A eligible for Google's FAQ rich result
 * (expandable accordion directly in the SERP).
 */
export function makeFAQSchema(items: FaqItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
}

/**
 * Article schema — makes blog posts eligible for Google's article rich result.
 */
export function makeArticleSchema(post: ArticlePost) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.excerpt,
    datePublished: toISO(post.date),
    dateModified: toISO(post.date),
    author: {
      "@type": "Person",
      name: post.author,
    },
    image: post.image.startsWith("http")
      ? post.image
      : `${BASE_URL}${post.image}`,
    publisher: {
      "@id": ORG_ID,
    },
    url: `${BASE_URL}/blog/${post.slug}`,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${BASE_URL}/blog/${post.slug}`,
    },
  };
}

/**
 * Event schema — makes retreat events eligible for Google's event rich result.
 * Google can show these as event cards with dates and prices in search results.
 * Pass `inGraph: true` when embedding inside a \`@graph\` array to omit the
 * duplicate \`@context\` (the root graph's context is inherited).
 */
export function makeEventSchema(event: EventData & { inGraph?: boolean }) {
  const schema: Record<string, unknown> = {
    ...(event.inGraph ? {} : { "@context": "https://schema.org" }),
    "@type": "Event",
    name: event.name,
    description: event.description,
    startDate: event.startDate,
    endDate: event.endDate,
    eventStatus: "https://schema.org/EventScheduled",
    eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
    location: {
      "@type": "Place",
      name: event.locationName,
      address: {
        "@type": "PostalAddress",
        addressLocality: event.locationLocality,
        addressRegion: event.locationRegion,
        addressCountry: "IN",
      },
    },
    organizer: {
      "@id": ORG_ID,
    },
    url: event.url,
  };

  if (event.price !== undefined) {
    schema.offers = {
      "@type": "Offer",
      price: event.price,
      priceCurrency: "USD",
      availability: event.availability
        ? `https://schema.org/${event.availability}`
        : "https://schema.org/InStock",
      url: event.url,
      validFrom: new Date().toISOString(),
    };
  }

  return schema;
}

/**
 * BreadcrumbList schema — helps Google display a breadcrumb trail in SERPs.
 * Pass crumbs from root to current page, e.g.:
 * [{ name: "Home", url: BASE_URL }, { name: "Ladakh", url: BASE_URL + "/locations/ladakh" }]
 */
export function makeBreadcrumbSchema(crumbs: BreadcrumbItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: crumbs.map((crumb, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: crumb.name,
      item: crumb.url,
    })),
  };
}

/**
 * Person schema — used on /about for the founder.
 */
export function makePersonSchema(opts: {
  name: string;
  jobTitle: string;
  url: string;
  image?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: opts.name,
    jobTitle: opts.jobTitle,
    url: opts.url,
    worksFor: { "@id": ORG_ID },
    ...(opts.image ? { image: opts.image } : {}),
  };
}
