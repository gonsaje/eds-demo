/**
 * Decorates the authored Nav block as a simple site-wide navigation bar.
 *
 * The first authored heading becomes the brand label. Any authored links are
 * rendered as navigation items on the right.
 * @param {HTMLElement} block The Nav block element
 */
export default function decorate(block) {
  const heading = block.querySelector('h1, h2, h3, h4, h5, h6');
  const brandLabel = heading?.textContent.trim() || block.textContent.trim() || 'Demo Nav';
  const authoredLinks = [...block.querySelectorAll('a')].map((link) => link.cloneNode(true));

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
