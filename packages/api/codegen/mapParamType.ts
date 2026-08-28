import { ParamInfoParameter } from "./paraminfo.types";

/**
 * Maps a single MediaWiki paraminfo primitive type name to a TypeScript type.
 * @param type A primitive paraminfo type string (e.g. "boolean", "integer", "upload").
 */
const mapPrimitiveType = (type: string): string => {
  switch (type) {
    case "boolean":
      return "boolean";
    case "integer":
    case "limit":
    case "namespace":
      return "number";
    case "upload":
      return "Blob";
    default:
      // "string", "text", "user", "title", "timestamp", "raw", "password", "tags", "expiry", etc.
      // all round-trip as plain strings on the wire.
      return "string";
  }
};

/**
 * Renders a discrete set of allowed string values (an enum-like param) as a TS union type,
 * falling back to `string` for very large value sets to avoid unwieldy generated unions.
 * @param values The allowed literal values, as reported by paraminfo's `type: string[]`.
 */
const mapEnumType = (values: string[]): string =>
  values.length > 0 && values.length <= 40 ? values.map((value) => JSON.stringify(value)).join(" | ") : "string";

/**
 * Maps a single paraminfo parameter definition to the TypeScript type of its field, accounting
 * for enum (`type: string[]`) vs. primitive (`type: string`) values and `multi` (array) params.
 * @param param The parameter definition to map.
 */
export const mapParamType = (param: ParamInfoParameter): string => {
  const isEnum = Array.isArray(param.type);
  const baseType = isEnum ? mapEnumType(param.type as string[]) : mapPrimitiveType((param.type as string) ?? "string");
  // Only parenthesize when baseType actually rendered as a union — large enums collapse to plain "string".
  const unionNeedsParens = baseType.includes(" | ");
  const elementType = unionNeedsParens ? `(${baseType})` : baseType;
  return param.multi ? `${elementType}[] | ${elementType}` : baseType;
};
