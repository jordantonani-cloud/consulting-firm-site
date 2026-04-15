import { useEffect } from "react";

type SeoProps = {
  title: string;
  description: string;
  path: string;
  schema?: Record<string, unknown> | Array<Record<string, unknown>>;
};

const SITE_NAME = "Northwest Onchain";
const BASE_URL = "https://www.northwestonchain.com";
const OG_IMAGE = `${BASE_URL}/opengraph.jpg`;

function setMetaAttribute(selector: string, attribute: "name" | "property", value: string) {
  let tag = document.head.querySelector(`meta[${attribute}='${selector}']`) as HTMLMetaElement | null;
  if (!tag) {
    tag = document.createElement("meta");
    tag.setAttribute(attribute, selector);
    document.head.appendChild(tag);
  }
  tag.setAttribute("content", value);
}

export function Seo({ title, description, path, schema }: SeoProps) {
  useEffect(() => {
    const pageTitle = `${title} | ${SITE_NAME}`;
    const canonicalUrl = `${BASE_URL}${path}`;

    document.title = pageTitle;
    setMetaAttribute("description", "name", description);
    setMetaAttribute("og:title", "property", pageTitle);
    setMetaAttribute("og:description", "property", description);
    setMetaAttribute("og:type", "property", "website");
    setMetaAttribute("og:url", "property", canonicalUrl);
    setMetaAttribute("og:image", "property", OG_IMAGE);
    setMetaAttribute("twitter:card", "name", "summary_large_image");
    setMetaAttribute("twitter:title", "name", pageTitle);
    setMetaAttribute("twitter:description", "name", description);
    setMetaAttribute("twitter:image", "name", OG_IMAGE);

    let canonical = document.head.querySelector("link[rel='canonical']") as HTMLLinkElement | null;
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.setAttribute("rel", "canonical");
      document.head.appendChild(canonical);
    }
    canonical.setAttribute("href", canonicalUrl);

    const existingScripts = document.querySelectorAll("script[data-seo-schema='true']");
    existingScripts.forEach((script) => script.remove());

    if (schema) {
      const schemas = Array.isArray(schema) ? schema : [schema];
      schemas.forEach((item) => {
        const script = document.createElement("script");
        script.type = "application/ld+json";
        script.dataset.seoSchema = "true";
        script.text = JSON.stringify(item);
        document.head.appendChild(script);
      });
    }
  }, [title, description, path, schema]);

  return null;
}

export const sharedOrganizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Northwest Onchain",
  url: BASE_URL,
  logo: `${BASE_URL}/logo.png`,
  sameAs: ["https://www.linkedin.com"],
  areaServed: ["Seattle", "Pacific Northwest", "Global"],
  description:
    "Institutional onchain strategy, DeFi business development, onchain treasury and yield advisory for fintechs, crypto-native teams, and wealth platforms.",
};

export const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Jordan Tonani",
  jobTitle: "Founder, Northwest Onchain",
  worksFor: { "@type": "Organization", name: "Northwest Onchain" },
  address: { "@type": "PostalAddress", addressLocality: "Seattle", addressRegion: "WA", addressCountry: "US" },
  description:
    "TradFi-to-DeFi operator. Former Morgan Stanley and former institutional lead at Index Coop. Currently building in onchain credit.",
};
