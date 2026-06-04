// include.js
/**
 * Fetches the specified file and injects its content into the given element.
 *
 * @param {HTMLElement} element - The DOM element to include the content into.
 * @returns {Promise<void>} A promise that resolves when the content is fetched and included.
 */
async function fetchAndInclude(element) {
  const file = element.getAttribute("w3-include-html");
  if (!file) return;
  try {
    const response = await fetch(file);
    if (!response.ok) throw new Error("Page not found.");
    element.innerHTML = await response.text();
  } catch (error) {
    element.innerHTML = error.message;
  } finally {
    element.removeAttribute("w3-include-html");
  }
}


/**
 * Asynchronously includes HTML content into all elements with the "w3-include-html" attribute.
 *
 * @returns {Promise<void>} A promise that resolves when all elements are processed.
 */
async function includeHTML() {
  const elements = document.querySelectorAll("[w3-include-html]");
  await Promise.all([...elements].map(fetchAndInclude));
}
