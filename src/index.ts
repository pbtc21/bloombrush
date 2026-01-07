import { Hono } from 'hono';
import { cors } from 'hono/cors';

type Bindings = {
  DB: D1Database;
};

const app = new Hono<{ Bindings: Bindings }>();

app.use('*', cors());

// B&W Elegant Layout - color only from wallpaper imagery
const layout = (content: string, title = 'Bloombrush | Hand Painted Wallpaper') => `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${title}</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Didot&family=Inter:wght@300;400;500&display=swap" rel="stylesheet">
  <style>
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }

    :root {
      --white: #FFFFFF;
      --off-white: #FAFAFA;
      --light-gray: #F5F5F5;
      --mid-gray: #999999;
      --dark-gray: #666666;
      --charcoal: #333333;
      --black: #000000;
    }

    body {
      font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
      font-weight: 300;
      background: var(--white);
      color: var(--black);
      line-height: 1.6;
      letter-spacing: 0.01em;
      -webkit-font-smoothing: antialiased;
    }

    h1, h2, h3, h4 {
      font-family: 'Didot', 'Times New Roman', serif;
      font-weight: 400;
      letter-spacing: 0.02em;
    }

    a {
      color: inherit;
      text-decoration: none;
    }

    /* Navigation */
    nav {
      position: fixed;
      top: 0;
      width: 100%;
      padding: 1.5rem 3rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
      background: rgba(255, 255, 255, 0.98);
      backdrop-filter: blur(10px);
      z-index: 1000;
      border-bottom: 1px solid var(--light-gray);
    }

    .logo {
      font-family: 'Didot', serif;
      font-size: 1.5rem;
      font-weight: 400;
      letter-spacing: 0.1em;
      text-transform: uppercase;
    }

    .nav-links {
      display: flex;
      gap: 2.5rem;
      align-items: center;
    }

    .nav-links a {
      font-size: 0.75rem;
      font-weight: 400;
      letter-spacing: 0.15em;
      text-transform: uppercase;
      color: var(--charcoal);
      transition: color 0.2s;
      position: relative;
    }

    .nav-links a:hover {
      color: var(--black);
    }

    /* Dropdown */
    .dropdown {
      position: relative;
    }

    .dropdown-content {
      display: none;
      position: absolute;
      top: 100%;
      left: 50%;
      transform: translateX(-50%);
      background: var(--white);
      min-width: 280px;
      padding: 1.5rem 0;
      border: 1px solid var(--light-gray);
      margin-top: 1rem;
      z-index: 100;
    }

    .dropdown:hover .dropdown-content {
      display: block;
    }

    .dropdown-item {
      display: flex;
      align-items: center;
      gap: 1rem;
      padding: 0.75rem 1.5rem;
      transition: background 0.2s;
    }

    .dropdown-item:hover {
      background: var(--off-white);
    }

    .dropdown-preview {
      width: 50px;
      height: 50px;
      object-fit: cover;
      border: 1px solid var(--light-gray);
    }

    .dropdown-text {
      font-size: 0.8rem;
      letter-spacing: 0.05em;
    }

    /* Hero */
    .hero {
      height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      text-align: center;
      padding: 2rem;
      background: var(--off-white);
    }

    .hero h1 {
      font-size: 4rem;
      font-weight: 400;
      margin-bottom: 1.5rem;
      line-height: 1.1;
    }

    .hero .tagline {
      font-size: 0.85rem;
      letter-spacing: 0.25em;
      text-transform: uppercase;
      color: var(--dark-gray);
      margin-bottom: 3rem;
    }

    .btn {
      display: inline-block;
      padding: 1rem 2.5rem;
      font-size: 0.7rem;
      font-weight: 500;
      letter-spacing: 0.2em;
      text-transform: uppercase;
      border: 1px solid var(--black);
      background: transparent;
      color: var(--black);
      cursor: pointer;
      transition: all 0.3s;
    }

    .btn:hover {
      background: var(--black);
      color: var(--white);
    }

    /* Sections */
    section {
      padding: 6rem 3rem;
      max-width: 1400px;
      margin: 0 auto;
    }

    .section-header {
      text-align: center;
      margin-bottom: 4rem;
    }

    .section-header h2 {
      font-size: 2.5rem;
      margin-bottom: 1rem;
    }

    .section-header p {
      font-size: 0.8rem;
      letter-spacing: 0.15em;
      text-transform: uppercase;
      color: var(--mid-gray);
    }

    /* Collection Grid */
    .collection-grid {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 3rem;
    }

    .collection-card {
      cursor: pointer;
      transition: transform 0.3s;
    }

    .collection-card:hover {
      transform: translateY(-4px);
    }

    .collection-image {
      aspect-ratio: 4/3;
      overflow: hidden;
      margin-bottom: 1.5rem;
      background: var(--light-gray);
    }

    .collection-image img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition: transform 0.6s;
    }

    .collection-card:hover .collection-image img {
      transform: scale(1.03);
    }

    .collection-name {
      font-family: 'Didot', serif;
      font-size: 1.5rem;
      margin-bottom: 0.5rem;
    }

    .collection-desc {
      font-size: 0.85rem;
      color: var(--dark-gray);
      line-height: 1.7;
    }

    /* Design Detail */
    .design-hero {
      height: 80vh;
      position: relative;
      overflow: hidden;
    }

    .design-hero img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    .design-hero-overlay {
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      padding: 4rem;
      background: linear-gradient(transparent, rgba(0,0,0,0.7));
      color: var(--white);
    }

    .design-hero-overlay h1 {
      font-size: 3rem;
      margin-bottom: 0.5rem;
    }

    .design-info {
      padding: 4rem 3rem;
      max-width: 800px;
      margin: 0 auto;
      text-align: center;
    }

    .design-description {
      font-size: 1rem;
      line-height: 1.9;
      color: var(--charcoal);
      margin-bottom: 3rem;
    }

    /* Panel Images */
    .panel-grid {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 2rem;
      padding: 0 3rem 4rem;
      max-width: 1200px;
      margin: 0 auto;
    }

    .panel-item {
      text-align: center;
    }

    .panel-item img {
      width: 100%;
      aspect-ratio: 3/4;
      object-fit: cover;
      margin-bottom: 1rem;
    }

    .panel-name {
      font-size: 0.85rem;
      letter-spacing: 0.1em;
      color: var(--charcoal);
    }

    /* Colorways */
    .colorways {
      padding: 4rem 3rem;
      background: var(--off-white);
    }

    .colorways h3 {
      text-align: center;
      font-size: 1.5rem;
      margin-bottom: 2rem;
    }

    .colorway-grid {
      display: flex;
      gap: 2rem;
      justify-content: center;
      flex-wrap: wrap;
      max-width: 1000px;
      margin: 0 auto;
    }

    .colorway-item {
      text-align: center;
      cursor: pointer;
      transition: transform 0.2s;
    }

    .colorway-item:hover {
      transform: scale(1.05);
    }

    .colorway-swatch {
      width: 120px;
      height: 120px;
      border: 1px solid var(--light-gray);
      margin-bottom: 0.75rem;
      object-fit: cover;
    }

    .colorway-name {
      font-size: 0.75rem;
      letter-spacing: 0.1em;
      text-transform: uppercase;
      color: var(--charcoal);
    }

    /* Color Palette */
    .palette {
      padding: 3rem;
      max-width: 800px;
      margin: 0 auto;
    }

    .palette h4 {
      font-size: 1rem;
      letter-spacing: 0.1em;
      text-transform: uppercase;
      margin-bottom: 1.5rem;
      text-align: center;
    }

    .palette-colors {
      display: flex;
      justify-content: center;
      gap: 1.5rem;
      flex-wrap: wrap;
    }

    .palette-color {
      text-align: center;
    }

    .palette-dot {
      width: 40px;
      height: 40px;
      border-radius: 50%;
      margin: 0 auto 0.5rem;
      border: 1px solid var(--light-gray);
    }

    .palette-label {
      font-size: 0.65rem;
      letter-spacing: 0.05em;
      color: var(--dark-gray);
      max-width: 80px;
    }

    /* Slider */
    .slider-container {
      position: relative;
      max-width: 1000px;
      margin: 0 auto;
      padding: 2rem 3rem;
    }

    .slider-toggle {
      display: flex;
      justify-content: center;
      gap: 2rem;
      margin-bottom: 2rem;
    }

    .slider-toggle button {
      padding: 0.75rem 1.5rem;
      font-size: 0.7rem;
      letter-spacing: 0.15em;
      text-transform: uppercase;
      background: transparent;
      border: 1px solid var(--light-gray);
      cursor: pointer;
      transition: all 0.2s;
    }

    .slider-toggle button.active {
      background: var(--black);
      color: var(--white);
      border-color: var(--black);
    }

    .slider-image {
      width: 100%;
      aspect-ratio: 16/10;
      object-fit: cover;
    }

    /* Install Gallery */
    .install-gallery {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 1.5rem;
      padding: 4rem 3rem;
      max-width: 1400px;
      margin: 0 auto;
    }

    .install-gallery img {
      width: 100%;
      aspect-ratio: 4/3;
      object-fit: cover;
      cursor: pointer;
      transition: opacity 0.2s;
    }

    .install-gallery img:hover {
      opacity: 0.9;
    }

    /* Inspiration */
    .inspiration {
      padding: 4rem 3rem;
      background: var(--off-white);
    }

    .inspiration h3 {
      text-align: center;
      font-size: 1.5rem;
      margin-bottom: 2rem;
    }

    .inspiration-grid {
      display: flex;
      gap: 1rem;
      justify-content: center;
      flex-wrap: wrap;
      max-width: 1000px;
      margin: 0 auto;
    }

    .inspiration-grid img {
      width: 150px;
      height: 150px;
      object-fit: cover;
      border: 1px solid var(--light-gray);
    }

    /* Process Page */
    .process-hero {
      height: 70vh;
      background: var(--off-white);
      display: flex;
      align-items: center;
      justify-content: center;
      text-align: center;
    }

    .process-section {
      padding: 6rem 3rem;
      max-width: 1200px;
      margin: 0 auto;
    }

    .process-grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 2rem;
    }

    .process-item img {
      width: 100%;
      aspect-ratio: 1;
      object-fit: cover;
      margin-bottom: 1rem;
    }

    .process-item h4 {
      font-size: 1rem;
      margin-bottom: 0.5rem;
    }

    .process-item p {
      font-size: 0.85rem;
      color: var(--dark-gray);
    }

    .video-container {
      padding: 4rem 3rem;
      max-width: 1000px;
      margin: 0 auto;
    }

    .video-container video {
      width: 100%;
      aspect-ratio: 16/9;
      background: var(--light-gray);
    }

    /* About Page */
    .about-content {
      max-width: 700px;
      margin: 0 auto;
      padding: 8rem 3rem;
      text-align: center;
    }

    .about-content h1 {
      font-size: 2.5rem;
      margin-bottom: 2rem;
    }

    .about-content p {
      font-size: 1rem;
      line-height: 2;
      color: var(--charcoal);
      margin-bottom: 1.5rem;
    }

    /* Contact */
    .contact-page {
      min-height: 80vh;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 8rem 3rem;
    }

    .contact-content {
      text-align: center;
      max-width: 500px;
    }

    .contact-content h1 {
      font-size: 2.5rem;
      margin-bottom: 2rem;
    }

    .contact-content p {
      font-size: 0.9rem;
      line-height: 1.8;
      color: var(--charcoal);
      margin-bottom: 1rem;
    }

    .contact-email {
      font-size: 1.1rem;
      letter-spacing: 0.05em;
      margin: 2rem 0;
    }

    /* Footer */
    footer {
      padding: 3rem;
      text-align: center;
      border-top: 1px solid var(--light-gray);
    }

    footer .logo {
      margin-bottom: 1rem;
      display: block;
    }

    footer p {
      font-size: 0.7rem;
      letter-spacing: 0.1em;
      color: var(--mid-gray);
    }

    /* Responsive */
    @media (max-width: 768px) {
      nav {
        padding: 1rem 1.5rem;
      }

      .nav-links {
        display: none;
      }

      .hero h1 {
        font-size: 2.5rem;
      }

      section {
        padding: 4rem 1.5rem;
      }

      .collection-grid {
        grid-template-columns: 1fr;
      }

      .panel-grid {
        grid-template-columns: 1fr;
      }

      .install-gallery {
        grid-template-columns: 1fr;
      }

      .process-grid {
        grid-template-columns: 1fr;
      }
    }
  </style>
</head>
<body>
  ${content}
</body>
</html>
`;

// Navigation component
const nav = (active = '') => `
  <nav>
    <a href="/" class="logo">Bloombrush</a>
    <div class="nav-links">
      <div class="dropdown">
        <a href="/collection" class="${active === 'collection' ? 'active' : ''}">Collection</a>
        <div class="dropdown-content">
          <a href="/collection/chinoiserie" class="dropdown-item">
            <img src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=100&h=100&fit=crop" class="dropdown-preview" alt="Chinoiserie">
            <span class="dropdown-text">Chinoiserie</span>
          </a>
          <a href="/collection/botanicals" class="dropdown-item">
            <img src="https://images.unsplash.com/photo-1490750967868-88aa4486c946?w=100&h=100&fit=crop" class="dropdown-preview" alt="Botanicals">
            <span class="dropdown-text">Botanicals</span>
          </a>
          <a href="/collection/scenic" class="dropdown-item">
            <img src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=100&h=100&fit=crop" class="dropdown-preview" alt="Scenic">
            <span class="dropdown-text">Scenic</span>
          </a>
          <a href="/collection/abstract" class="dropdown-item">
            <img src="https://images.unsplash.com/photo-1541701494587-cb58502866ab?w=100&h=100&fit=crop" class="dropdown-preview" alt="Abstract">
            <span class="dropdown-text">Abstract</span>
          </a>
        </div>
      </div>
      <a href="/process" class="${active === 'process' ? 'active' : ''}">Process</a>
      <a href="/about" class="${active === 'about' ? 'active' : ''}">About</a>
      <a href="/contact" class="${active === 'contact' ? 'active' : ''}">Contact</a>
    </div>
  </nav>
`;

const footer = () => `
  <footer>
    <a href="/" class="logo">Bloombrush</a>
    <p>&copy; ${new Date().getFullYear()} Bloombrush. All rights reserved.</p>
  </footer>
`;

// Home page
app.get('/', (c) => {
  const html = layout(`
    ${nav()}

    <section class="hero">
      <div>
        <h1>Hand Painted<br>Wallpaper</h1>
        <p class="tagline">Bespoke artistry for distinguished interiors</p>
        <a href="/collection" class="btn">View Collection</a>
      </div>
    </section>

    <section>
      <div class="section-header">
        <h2>The Collection</h2>
        <p>Explore our designs</p>
      </div>
      <div class="collection-grid">
        <a href="/collection/chinoiserie" class="collection-card">
          <div class="collection-image">
            <img src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=600&fit=crop" alt="Chinoiserie Collection">
          </div>
          <h3 class="collection-name">Chinoiserie</h3>
          <p class="collection-desc">Delicate birds, flowering branches, and traditional Eastern motifs rendered in luminous detail.</p>
        </a>
        <a href="/collection/botanicals" class="collection-card">
          <div class="collection-image">
            <img src="https://images.unsplash.com/photo-1490750967868-88aa4486c946?w=800&h=600&fit=crop" alt="Botanicals Collection">
          </div>
          <h3 class="collection-name">Botanicals</h3>
          <p class="collection-desc">Lush florals and verdant foliage inspired by historic gardens and natural landscapes.</p>
        </a>
        <a href="/collection/scenic" class="collection-card">
          <div class="collection-image">
            <img src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop" alt="Scenic Collection">
          </div>
          <h3 class="collection-name">Scenic</h3>
          <p class="collection-desc">Panoramic landscapes and pastoral scenes that transform walls into windows.</p>
        </a>
        <a href="/collection/abstract" class="collection-card">
          <div class="collection-image">
            <img src="https://images.unsplash.com/photo-1541701494587-cb58502866ab?w=800&h=600&fit=crop" alt="Abstract Collection">
          </div>
          <h3 class="collection-name">Abstract</h3>
          <p class="collection-desc">Contemporary interpretations of color, form, and texture for modern spaces.</p>
        </a>
      </div>
    </section>

    ${footer()}
  `);

  return c.html(html);
});

// Collection page
app.get('/collection', (c) => {
  const html = layout(`
    ${nav('collection')}

    <section style="padding-top: 10rem;">
      <div class="section-header">
        <h2>The Collection</h2>
        <p>Hand painted designs</p>
      </div>
      <div class="collection-grid">
        <a href="/collection/chinoiserie" class="collection-card">
          <div class="collection-image">
            <img src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=600&fit=crop" alt="Chinoiserie">
          </div>
          <h3 class="collection-name">Chinoiserie</h3>
          <p class="collection-desc">Delicate birds, flowering branches, and traditional Eastern motifs.</p>
        </a>
        <a href="/collection/botanicals" class="collection-card">
          <div class="collection-image">
            <img src="https://images.unsplash.com/photo-1490750967868-88aa4486c946?w=800&h=600&fit=crop" alt="Botanicals">
          </div>
          <h3 class="collection-name">Botanicals</h3>
          <p class="collection-desc">Lush florals and verdant foliage inspired by historic gardens.</p>
        </a>
        <a href="/collection/scenic" class="collection-card">
          <div class="collection-image">
            <img src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop" alt="Scenic">
          </div>
          <h3 class="collection-name">Scenic</h3>
          <p class="collection-desc">Panoramic landscapes that transform walls into windows.</p>
        </a>
        <a href="/collection/abstract" class="collection-card">
          <div class="collection-image">
            <img src="https://images.unsplash.com/photo-1541701494587-cb58502866ab?w=800&h=600&fit=crop" alt="Abstract">
          </div>
          <h3 class="collection-name">Abstract</h3>
          <p class="collection-desc">Contemporary interpretations for modern spaces.</p>
        </a>
      </div>
    </section>

    ${footer()}
  `, 'Collection | Bloombrush');

  return c.html(html);
});

// Design detail page (example: Chinoiserie)
app.get('/collection/:design', (c) => {
  const design = c.req.param('design');
  const designName = design.charAt(0).toUpperCase() + design.slice(1);

  const html = layout(`
    ${nav('collection')}

    <!-- Install Shot Hero -->
    <div class="design-hero" style="margin-top: 60px;">
      <img src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1600&h=900&fit=crop" alt="${designName} Installation">
      <div class="design-hero-overlay">
        <h1>${designName}</h1>
        <p style="font-size: 0.85rem; letter-spacing: 0.1em; opacity: 0.9;">Hand Painted Collection</p>
      </div>
    </div>

    <!-- Description -->
    <div class="design-info">
      <p class="design-description">
        Each ${designName.toLowerCase()} design is meticulously hand-painted on silk or paper grounds,
        using traditional techniques passed down through generations. The colors are
        mixed by hand to achieve subtle gradations impossible to replicate through
        mechanical means. Custom colorways are available for every design.
      </p>
    </div>

    <!-- Panel Images -->
    <div class="panel-grid">
      <div class="panel-item">
        <img src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&h=800&fit=crop" alt="${designName} Panel I">
        <p class="panel-name">${designName} I</p>
      </div>
      <div class="panel-item">
        <img src="https://images.unsplash.com/photo-1490750967868-88aa4486c946?w=600&h=800&fit=crop" alt="${designName} Panel II">
        <p class="panel-name">${designName} II</p>
      </div>
    </div>

    <!-- Design Mini / Product Toggle -->
    <div class="slider-container">
      <div class="slider-toggle">
        <button class="active" onclick="showSlide('mini')">Design Mini</button>
        <button onclick="showSlide('product')">Product Photography</button>
        <button onclick="showSlide('render')">Watercolor Rendering</button>
      </div>
      <img id="slider-image" class="slider-image" src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&h=750&fit=crop" alt="Design view">
    </div>

    <!-- Colorways -->
    <div class="colorways">
      <h3>Available Colorways</h3>
      <div class="colorway-grid">
        <div class="colorway-item">
          <img class="colorway-swatch" src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=200&h=200&fit=crop" alt="Dawn">
          <p class="colorway-name">Dawn</p>
        </div>
        <div class="colorway-item">
          <img class="colorway-swatch" src="https://images.unsplash.com/photo-1490750967868-88aa4486c946?w=200&h=200&fit=crop" alt="Twilight">
          <p class="colorway-name">Twilight</p>
        </div>
        <div class="colorway-item">
          <img class="colorway-swatch" src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=200&h=200&fit=crop" alt="Midnight">
          <p class="colorway-name">Midnight</p>
        </div>
        <div class="colorway-item">
          <img class="colorway-swatch" src="https://images.unsplash.com/photo-1541701494587-cb58502866ab?w=200&h=200&fit=crop" alt="Ivory">
          <p class="colorway-name">Ivory</p>
        </div>
      </div>
    </div>

    <!-- Color Palette -->
    <div class="palette">
      <h4>Color Palette — Dawn</h4>
      <div class="palette-colors">
        <div class="palette-color">
          <div class="palette-dot" style="background: #F5E6D3;"></div>
          <p class="palette-label">Antique Ivory</p>
        </div>
        <div class="palette-color">
          <div class="palette-dot" style="background: #E8D4C4;"></div>
          <p class="palette-label">Parchment</p>
        </div>
        <div class="palette-color">
          <div class="palette-dot" style="background: #C4A77D;"></div>
          <p class="palette-label">Aged Gold</p>
        </div>
        <div class="palette-color">
          <div class="palette-dot" style="background: #8B9A7C;"></div>
          <p class="palette-label">Celadon</p>
        </div>
        <div class="palette-color">
          <div class="palette-dot" style="background: #6B7B5C;"></div>
          <p class="palette-label">Sage Moss</p>
        </div>
        <div class="palette-color">
          <div class="palette-dot" style="background: #4A5568;"></div>
          <p class="palette-label">Slate</p>
        </div>
      </div>
    </div>

    <!-- Inspiration -->
    <div class="inspiration">
      <h3>Inspiration</h3>
      <div class="inspiration-grid">
        <img src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=200&h=200&fit=crop" alt="Inspiration 1">
        <img src="https://images.unsplash.com/photo-1490750967868-88aa4486c946?w=200&h=200&fit=crop" alt="Inspiration 2">
        <img src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=200&h=200&fit=crop" alt="Inspiration 3">
        <img src="https://images.unsplash.com/photo-1541701494587-cb58502866ab?w=200&h=200&fit=crop" alt="Inspiration 4">
      </div>
    </div>

    <!-- Install Gallery -->
    <section style="padding: 0;">
      <div class="section-header" style="padding: 4rem 3rem 2rem;">
        <h2>Installations</h2>
      </div>
      <div class="install-gallery">
        <img src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&h=450&fit=crop" alt="Installation 1">
        <img src="https://images.unsplash.com/photo-1490750967868-88aa4486c946?w=600&h=450&fit=crop" alt="Installation 2">
        <img src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&h=450&fit=crop" alt="Installation 3">
      </div>
    </section>

    <script>
      function showSlide(type) {
        const buttons = document.querySelectorAll('.slider-toggle button');
        buttons.forEach(btn => btn.classList.remove('active'));
        event.target.classList.add('active');

        const images = {
          mini: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&h=750&fit=crop',
          product: 'https://images.unsplash.com/photo-1490750967868-88aa4486c946?w=1200&h=750&fit=crop',
          render: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&h=750&fit=crop'
        };
        document.getElementById('slider-image').src = images[type];
      }
    </script>

    ${footer()}
  `, `${designName} | Bloombrush`);

  return c.html(html);
});

// Process page
app.get('/process', (c) => {
  const html = layout(`
    ${nav('process')}

    <div class="process-hero" style="margin-top: 60px;">
      <div style="text-align: center;">
        <h1 style="font-size: 3rem; margin-bottom: 1rem;">The Process</h1>
        <p style="font-size: 0.85rem; letter-spacing: 0.2em; text-transform: uppercase; color: var(--dark-gray);">From sketch to installation</p>
      </div>
    </div>

    <div class="process-section">
      <div class="process-grid">
        <div class="process-item">
          <img src="https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=400&h=400&fit=crop" alt="Studio">
          <h4>The Studio</h4>
          <p>A quiet space dedicated to the craft, filled with natural light and the tools of the trade.</p>
        </div>
        <div class="process-item">
          <img src="https://images.unsplash.com/photo-1452860606245-08befc0ff44b?w=400&h=400&fit=crop" alt="Materials">
          <h4>Materials</h4>
          <p>Hand-mixed pigments, fine silk and paper grounds, brushes crafted by master artisans.</p>
        </div>
        <div class="process-item">
          <img src="https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?w=400&h=400&fit=crop" alt="Inspiration">
          <h4>Inspiration</h4>
          <p>Historic archives, botanical specimens, and the natural world inform every design.</p>
        </div>
      </div>
    </div>

    <div class="video-container">
      <div class="section-header">
        <h2>The Art of Painting</h2>
        <p>Watch the process</p>
      </div>
      <video controls poster="https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?w=1000&h=563&fit=crop">
        <source src="/video/process.mp4" type="video/mp4">
        Your browser does not support the video tag.
      </video>
    </div>

    <div class="process-section">
      <div class="section-header">
        <h2>From Design to Installation</h2>
      </div>
      <div class="process-grid">
        <div class="process-item">
          <img src="https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=400&h=400&fit=crop" alt="Design">
          <h4>1. Design</h4>
          <p>Each commission begins with sketches and color studies tailored to your space.</p>
        </div>
        <div class="process-item">
          <img src="https://images.unsplash.com/photo-1452860606245-08befc0ff44b?w=400&h=400&fit=crop" alt="Painting">
          <h4>2. Painting</h4>
          <p>Panels are hand-painted over weeks, layer by delicate layer.</p>
        </div>
        <div class="process-item">
          <img src="https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?w=400&h=400&fit=crop" alt="Installation">
          <h4>3. Installation</h4>
          <p>Professional installation ensures a seamless, lasting result.</p>
        </div>
      </div>
    </div>

    ${footer()}
  `, 'Process | Bloombrush');

  return c.html(html);
});

// About page
app.get('/about', (c) => {
  const html = layout(`
    ${nav('about')}

    <div class="about-content" style="padding-top: 12rem;">
      <h1>About Bloombrush</h1>
      <p>
        Bloombrush is dedicated to the art of hand-painted wallpaper —
        a tradition that transforms interiors into immersive environments
        of beauty and contemplation.
      </p>
      <p>
        Each design is conceived as a unique work of art, executed by skilled
        artisans using techniques refined over centuries. We work with the finest
        materials: hand-ground pigments, silk and paper grounds of exceptional
        quality, and brushes crafted by master toolmakers.
      </p>
      <p>
        Our mission is to create wallpapers that elevate spaces beyond the ordinary —
        pieces that will be cherished for generations, bringing daily moments of
        wonder to those who live with them.
      </p>
      <p>
        We collaborate closely with interior designers, architects, and private
        clients to realize bespoke visions. Every commission is an opportunity
        to create something unprecedented.
      </p>
      <a href="/contact" class="btn" style="margin-top: 2rem;">Begin a Commission</a>
    </div>

    ${footer()}
  `, 'About | Bloombrush');

  return c.html(html);
});

// Contact page
app.get('/contact', (c) => {
  const html = layout(`
    ${nav('contact')}

    <div class="contact-page">
      <div class="contact-content">
        <h1>Contact</h1>
        <p>
          For inquiries about commissions, trade pricing, or to schedule
          a consultation, please reach out via email.
        </p>
        <p class="contact-email">
          <a href="mailto:studio@bloombrush.com">studio@bloombrush.com</a>
        </p>
        <p style="margin-top: 3rem; font-size: 0.8rem; letter-spacing: 0.1em; text-transform: uppercase; color: var(--mid-gray);">
          Studio visits by appointment
        </p>
      </div>
    </div>

    ${footer()}
  `, 'Contact | Bloombrush');

  return c.html(html);
});

export default app;
