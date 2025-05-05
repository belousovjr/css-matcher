import { CSSRulesMatcherOptions, StyleProperty, Target } from "./types.ts";
import { CSSRulesMatcherCache } from "./cache.ts";

export default class CSSRulesMatcher {
  #properties: Set<StyleProperty>;
  constructor({ properties }: CSSRulesMatcherOptions) {
    if (properties?.length) {
      CSSRulesMatcherCache.addProperties(properties);
      this.#properties = new Set(properties);
    } else {
      throw new Error("CSSRulesMatcher initialization failed: 'properties' array is required and cannot be empty.");
    }
  }
  getMatchedCSSRules(target: Target) {
    if (target instanceof HTMLElement) {
      return CSSRulesMatcherCache.getMatchedCSSRules(this.#properties, target);
    } else {
      throw new Error("Invalid target provided: expected a DOM element.");
    }
  }
}
