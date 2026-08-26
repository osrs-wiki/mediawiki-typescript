export type SwitchCase = {
  /** The comparison value for this case, or `"#default"` for the default result. */
  case: string;
  /** The result if this case matches. Omit to "fall through" to the next case sharing a result. */
  result?: string;
};
