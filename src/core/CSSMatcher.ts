import { CSSMatcherOptions, StyleProperty, Target } from "./types.ts";
import { CSSMatcherCache } from "./cache.ts";

export default class CSSMatcher {
  #properties: Set<StyleProperty>;
  constructor({ properties }: CSSMatcherOptions) {
    if (properties?.length) {
      CSSMatcherCache.addProperties(properties);
      this.#properties = new Set(properties);
    } else {
      throw new Error("CSSMatcher initialization failed: 'properties' array is required and cannot be empty.");
    }
  }
  getMatchedCSSRules(target: Target) {
    if (target instanceof HTMLElement) {
      return CSSMatcherCache.getMatchedCSSRules(this.#properties, target);
    } else {
      throw new Error("Invalid target provided: expected a DOM element.");
    }
  }
}
