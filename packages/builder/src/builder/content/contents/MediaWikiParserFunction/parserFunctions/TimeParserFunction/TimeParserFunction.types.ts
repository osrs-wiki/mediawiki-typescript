export type TimeParserFunctionOptions = {
  /** The date/time object to format (e.g. "now", "+2 hours", an absolute date). Defaults to the current timestamp. */
  dateTime?: string;
  /** The ISO 639-3 language code to render the formatted string in. */
  language?: string;
};
