import { Lexer as ChevrotainLexer } from "chevrotain";
import { allTokens } from "./tokens";

export const WikitextLexer = new ChevrotainLexer(allTokens);
