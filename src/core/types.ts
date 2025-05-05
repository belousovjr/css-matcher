export type StyleProperty = CSSStyleRule["style"][number];

export type Target = HTMLElement;

export type CSSRulesMatcherSnapshot = { [key in StyleProperty]?: Set<CSSStyleRule> };

export interface CSSRulesMatcherOptions {
    properties: StyleProperty[];
}
