const projectHostPattern = /(?:^|--)eds-demo--gonsaje\.aem\.(?:page|live)$/;

/**
 * Converts links authored against this site's AEM hosts to relative paths.
 * @param {HTMLAnchorElement} link Authored navigation link
 */
function normalizeProjectLink(link) {
  try {
    const url = new URL(link.href);
    if (projectHostPattern.test(url.hostname)) {
      link.setAttribute('href', `${url.pathname}${url.search}${url.hash}`);
    }
  } catch (e) {
    // Leave malformed or non-URL authored values unchanged.
  }
}

/**
 * Decorates the authored Nav block as a simple site-wide navigation bar.
 *
 * The first authored heading becomes the brand label. Any authored links are
 * rendered as navigation items on the right.
 * @param {HTMLElement} block The Nav block element
 */
export default function decorate(block) {
  const heading = block.querySelector('h1, h2, h3, h4, h5, h6');
  const brandSource = heading || [...block.children]
    .find((row) => row.textContent.trim() && !row.querySelector('a'));
  const brandLabel = brandSource?.textContent.trim() || 'Demo Nav';
  const authoredLinks = [...block.querySelectorAll('a')]
    .filter((link) => !brandSource?.contains(link))
    .map((link) => {
      const clone = link.cloneNode(true);
      normalizeProjectLink(clone);
      return clone;
    });

  const nav = document.createElement('nav');
  nav.className = 'nav-bar';
  nav.setAttribute('aria-label', 'Main navigation');

  const brand = document.createElement('a');
  brand.className = 'nav-brand-link';
  brand.href = '/';
  brand.setAttribute('aria-label', `${brandLabel} home`);

  const logo = document.createElement('img');
  logo.className = 'nav-logo';
  logo.src = '/favicon.ico';
  logo.alt = '';
  logo.width = 36;
  logo.height = 36;

  const name = document.createElement('span');
  name.className = 'nav-brand-name';
  name.textContent = brandLabel;

  brand.append(logo, name);
  nav.append(brand);

  if (authoredLinks.length) {
    const links = document.createElement('ul');
    links.className = 'nav-links';
    authoredLinks.forEach((link) => {
      const item = document.createElement('li');
      link.className = '';
      item.append(link);
      links.append(item);
    });
    nav.append(links);
  }

  block.replaceChildren(nav);
}
