import { siteConfig } from "./site-config";

export function getPsychologistJsonLd() {
  const { psychologist, url, name } = siteConfig;

  return {
    "@context": "https://schema.org",
    "@type": "Psychologist",
    "@id": `${url}/#psychologist`,
    name: psychologist.name,
    jobTitle: psychologist.jobTitle,
    description: psychologist.description,
    url,
    image: `${url}/og-image.jpg`,
    sameAs: psychologist.sameAs,
    worksFor: {
      "@type": "Organization",
      name,
      url,
    },
    knowsAbout: [
      "Психотерапия",
      "Супервизия",
      "Обучение психологов",
      "Индивидуальная терапия",
      "Парная терапия",
    ],
  };
}

export function getCoursesJsonLd() {
  const { courses, url, psychologist } = siteConfig;

  return courses.map((course) => ({
    "@context": "https://schema.org",
    "@type": "Course",
    name: course.name,
    description: course.description,
    provider: {
      "@type": "Person",
      name: psychologist.name,
      jobTitle: psychologist.jobTitle,
      url,
      sameAs: psychologist.sameAs,
    },
    hasCourseInstance: {
      "@type": "CourseInstance",
      courseMode: course.courseMode,
      startDate: course.startDate,
      endDate: course.endDate,
      location: {
        "@type": "VirtualLocation",
        url,
      },
    },
    inLanguage: "ru",
    offers: {
      "@type": "Offer",
      category: "Paid",
      url: `${url}/#about`,
    },
  }));
}

export function getWebPageJsonLd() {
  const { url, title, description, name } = siteConfig;

  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${url}/#webpage`,
    url,
    name: title,
    description,
    isPartOf: {
      "@type": "WebSite",
      "@id": `${url}/#website`,
      name,
      url,
      inLanguage: "ru",
    },
    about: {
      "@id": `${url}/#psychologist`,
    },
  };
}

export function getAllJsonLd() {
  return [getWebPageJsonLd(), getPsychologistJsonLd(), ...getCoursesJsonLd()];
}
