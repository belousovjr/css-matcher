import { CSSRulesMatcherSnapshot, StyleProperty, Target } from "./types.ts";

export abstract class CSSRulesMatcherCache {
  static #rulesSnapshot: CSSRulesMatcherSnapshot = {};

  static addProperties(properties: StyleProperty[]) {
    for (const property of properties) {
      if (!this.#rulesSnapshot[property]) {
        this.#rulesSnapshot[property] = new Set();
      }
    }
    this.updateSnapshot(true);
  }
  static updateSnapshot(byNewProps = false) {
    const properties = Object.keys(this.#rulesSnapshot) as StyleProperty[];
    if (properties.length) {
      const newSnapshot = Object.fromEntries(
        properties.map((key) => [
          key,
          (byNewProps && this.#rulesSnapshot[key]) || new Set(),
        ]),
      ) as CSSRulesMatcherSnapshot;

      for (const styleSheet of document.styleSheets) {
        for (const cssRule of styleSheet.cssRules) {
          if (cssRule instanceof CSSStyleRule) {
            for (let i = 0; i < cssRule.style.length; i++) {
              const value = cssRule.style[i] as StyleProperty;
              newSnapshot[value]?.add(cssRule);
            }
          }
        }
      }
      this.#rulesSnapshot = newSnapshot;
    }
  }

  static getMatchedCSSRules(properties: Set<StyleProperty>, target: Target) {
    const matchedRules = new Set<CSSStyleRule>();

    for (const property of properties) {
      for (const rule of this.#rulesSnapshot[property]!) {
        if (target.matches(rule.selectorText)) {
          matchedRules.add(rule);
        }
      }
    }
    return Array.from(matchedRules);
  }
}

function observeCSS() {
  function monkeyPathStyleSheet() {
    const methods = [
      "addRule",
      "deleteRule",
      "insertRule",
      "removeRule",
      "replace",
      "replaceSync",
    ] as const;

    for (const methodName of methods) {
      const original = CSSStyleSheet.prototype[methodName] as Function;

      CSSStyleSheet.prototype[methodName] = function (
        this: CSSStyleSheet,
        ...args
      ) {
        const result = original.apply(this, args);
        CSSRulesMatcherCache.updateSnapshot();
        return result;
      };
    }
  }
  function observeAllStyleTags(callback: () => void) {
    const observer = new MutationObserver((mutations) => {
      for (const m of mutations) {
        if (m.type === "childList") {
          for (const node of m.addedNodes) {
            if (node.nodeName === "STYLE" || node.nodeName === "LINK") {
              if (node.nodeName === "LINK") {
                node.addEventListener("load", callback);
              } else {
                callback();
              }
              break;
            }
          }
          for (const node of m.removedNodes) {
            if (node.nodeName === "STYLE" || node.nodeName === "LINK") {
              callback();
              break;
            }
          }
          if (m.target.nodeName === "STYLE") {
            callback();
          }
        } else if (m.type === "characterData") {
          const parent = m.target.parentNode;
          if (parent && parent.nodeName === "STYLE") {
            callback();
          }
        } else if (
          m.type === "attributes" &&
          (m.target.nodeName === "STYLE" || m.target.nodeName === "LINK")
        ) {
          callback();
        }
      }
    });

    observer.observe(document.documentElement, {
      childList: true,
      subtree: true,
      characterData: true,
      attributes: true,
      attributeFilter: [
        "media",
        "type",
        "crossorigin",
        "href",
        "hreflang",
        "referrerpolicy",
        "rel",
        "sizes",
        "title",
      ],
    });

    return observer;
  }

  monkeyPathStyleSheet();
  observeAllStyleTags(() => {
    CSSRulesMatcherCache.updateSnapshot();
  });
}

observeCSS();
