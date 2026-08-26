import { CstChildrenDictionary, CstElement, IToken } from "chevrotain";

const isToken = (element: CstElement): element is IToken => "image" in element;

const startOffsetOf = (element: CstElement): number =>
  isToken(element) ? element.startOffset : element.location?.startOffset ?? 0;

/**
 * Flattens a CST's children dictionary (which groups elements by rule/token name) back into
 * original document order, sorted by start offset. Chevrotain groups MANY/OR results by key,
 * so reconstructing left-to-right order across alternatives requires this extra step.
 */
export const orderedChildren = (
  children: CstChildrenDictionary
): Array<{ key: string; element: CstElement }> => {
  const entries: Array<{ key: string; element: CstElement; offset: number }> = [];
  for (const key of Object.keys(children)) {
    for (const element of children[key]) {
      entries.push({ key, element, offset: startOffsetOf(element) });
    }
  }
  entries.sort((a, b) => a.offset - b.offset);
  return entries.map(({ key, element }) => ({ key, element }));
};
