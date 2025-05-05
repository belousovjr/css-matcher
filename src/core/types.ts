import { StandardLonghandPropertiesHyphen } from "csstype";

export type StyleProperty = keyof StandardLonghandPropertiesHyphen;

export type Target = HTMLElement;

export type CSSRulesMatcherSnapshot = {
  [key in StyleProperty]?: Set<CSSStyleRule>;
};

export interface CSSRulesMatcherOptions {
  properties: StyleProperty[];
}
