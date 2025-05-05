export type StyleProperty = CSSStyleRule["style"][number];

export type Target = HTMLElement;

export type CSSMatcherSnapshot = { [key in StyleProperty]?: Set<CSSStyleRule> };

export interface CSSMatcherOptions {
    properties: StyleProperty[];
}
