/**
 * Scrolls an element into view with smooth behavior
 * @param element - The element to scroll into view
 * @param options - Scroll options (optional)
 */
export const scrollIntoView = (
  element: Element | null,
  options: ScrollIntoViewOptions = { behavior: "smooth", block: "center" },
): void => {
  if (element) {
    element.scrollIntoView(options);
  }
};
