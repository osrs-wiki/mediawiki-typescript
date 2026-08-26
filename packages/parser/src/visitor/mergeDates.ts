import { MediaWikiContent, MediaWikiDate, MediaWikiLink } from "@mediawiki-typescript/builder";

const MONTH_NAMES = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const DAY_MONTH_PATTERN = /^(\d{1,2}) ([A-Za-z]+)$/;
const YEAR_PATTERN = /^\d{4}$/;

const isBareLink = (content: MediaWikiContent): content is MediaWikiLink =>
  content instanceof MediaWikiLink && !content.label;

const isWhitespaceOnly = (content: MediaWikiContent): boolean => /^\s+$/.test(content.build());

/**
 * Merges an adjacent `[[D Month]] [[YYYY]]` link pair — the exact shape produced by
 * `MediaWikiDate.build()` with its default `{day, month, year}` options — back into a single
 * `MediaWikiDate`. Day-only or year-only dates are not merged back: on their own they're
 * indistinguishable from an ordinary link to a day/year page, so attempting it would be too
 * prone to false positives.
 */
export const mergeDates = (contents: MediaWikiContent[]): MediaWikiContent[] => {
  const result: MediaWikiContent[] = [];
  for (let i = 0; i < contents.length; i++) {
    const dayMonthLink = contents[i];
    const gap = contents[i + 1];
    const yearLink = contents[i + 2];

    if (
      isBareLink(dayMonthLink) &&
      gap &&
      isWhitespaceOnly(gap) &&
      yearLink &&
      isBareLink(yearLink) &&
      YEAR_PATTERN.test(yearLink.link)
    ) {
      const dayMonthMatch = DAY_MONTH_PATTERN.exec(dayMonthLink.link);
      const monthIndex = dayMonthMatch ? MONTH_NAMES.indexOf(dayMonthMatch[2]) : -1;
      if (dayMonthMatch && monthIndex !== -1) {
        const day = Number(dayMonthMatch[1]);
        const year = Number(yearLink.link);
        result.push(new MediaWikiDate(new Date(year, monthIndex, day)));
        i += 2;
        continue;
      }
    }

    result.push(dayMonthLink);
  }
  return result;
};
