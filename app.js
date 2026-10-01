/**
 * ============================================================
 * MAISON CÉLESTE — Application Script
 * SPA interativa: Cardápio, Carrinho, WhatsApp, Admin Dashboard
 * ============================================================
 */

'use strict';

/* ----------------------------------------------------------
   CONFIGURAÇÃO DA MARCA
   ---------------------------------------------------------- */
const CONFIG = {
  brandName: 'Maison Céleste',
  adminPassword: 'celeste2026', // Master Key — altere em produção
  whatsappNumber: '5511999999999', // Substitua pelo número real (DDI+DDD+número)
  deliveryFee: 25.00,
};

/* ----------------------------------------------------------
   CATÁLOGO DE PRODUTOS
   ---------------------------------------------------------- */
const PRODUCTS = [
  // —— Bolos Assinados ——
  {
    id: 'bolo-pistache',
    category: 'bolos',
    name: 'Bolo de Pistache Siciliano com Infusão de Rosas',
    ingredients: 'Pistache Bronte DOP, creme de damasco, pétalas de rosa cristalizadas, génoise de amêndoas',
    price: 320.00,
    tags: ['sem-gluten'],
    image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=600&q=80',
  },
  {
    id: 'bolo-chocolate',
    category: 'bolos',
    name: 'Noire Absolute — Chocolate 72% & Flor de Sal',
    ingredients: 'Cacau Valrhona Guanaja, ganache de caramelo salé, praliné de avelãs, biscuit joconde',
    price: 298.00,
    tags: [],
    image: 'https://images.unsplash.com/photo-1606890737304-57a1ca8a5b62?w=600&q=80',
  },
  {
    id: 'bolo-limao',
    category: 'bolos',
    name: 'Citrus Céleste — Limão-Siciliano & Manjericão',
    ingredients: 'Creme de limão siciliano, óleo de manjericão, merengue italiano, base sablée',
    price: 265.00,
    tags: ['vegano', 'zero-acucar'],
    image: 'https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?w=600&q=80',
  },
  {
    id: 'bolo-frutas',
    category: 'bolos',
    name: 'Jardin d\'Été — Frutas Vermelhas & Baunilha Bourbon',
    ingredients: 'Mousselines de framboesa e morango, baunilha de Madagascar, dacquoise de amêndoas',
    price: 310.00,
    tags: ['sem-gluten'],
    image: 'https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=600&q=80',
  },
  {
    id: 'bolo-matcha',
    category: 'bolos',
    name: 'Vert Impérial — Matcha Uji & Yuzu',
    ingredients: 'Matcha cerimonial japonês, curd de yuzu, chantilly de coco, génoise leve',
    price: 285.00,
    tags: ['vegano'],
    image: 'https://images.unsplash.com/photo-1588195538326-c5b1e9f80a1b?w=600&q=80',
  },
  {
    id: 'bolo-caramelo',
    category: 'bolos',
    name: 'Ambre — Caramelo Beurre Salé & Nozes',
    ingredients: 'Caramelo de manteiga salgada, nozes tostadas, creme diplomate, pâte sablée',
    price: 275.00,
    tags: [],
    image: 'https://images.unsplash.com/photo-1621303837174-89787a7d4729?w=600&q=80',
  },
  // —— Elixires / Sucos ——
  {
    id: 'elixir-verde',
    category: 'sucos',
    name: 'Éclat Vert — Couve, Maçã Verde & Gengibre',
    ingredients: 'Couve kale, maçã granny smith, gengibre fresco, limão, spirulina',
    price: 38.00,
    tags: ['vegano', 'zero-acucar', 'sem-gluten'],
    image: 'https://images.unsplash.com/photo-1610970881699-44a5587cabec?w=600&q=80',
  },
  {
    id: 'elixir-rubi',
    category: 'sucos',
    name: 'Rubis — Beterraba, Laranja & Cardamomo',
    ingredients: 'Beterraba orgânica, laranja bahia, cardamomo verde, cenoura',
    price: 36.00,
    tags: ['vegano', 'sem-gluten'],
    image: 'https://images.unsplash.com/photo-1622597467836-f3285f2131b8?w=600&q=80',
  },
  {
    id: 'elixir-dourado',
    category: 'sucos',
    name: 'Soleil — Abacaxi, Cúrcuma & Pimenta Rosa',
    ingredients: 'Abacaxi pérola, cúrcuma fresca, pimenta rosa, limão-taiti, mel de florada',
    price: 42.00,
    tags: ['sem-gluten'],
    image: 'https://images.unsplash.com/photo-1600271886742-f049cd451bba?w=600&q=80',
  },
  {
    id: 'elixir-violeta',
    category: 'sucos',
    name: 'Violette — Uva Concord, Hibisco & Lavanda',
    ingredients: 'Uva concord, hibisco seco, flor de lavanda, limão, água de coco',
    price: 45.00,
    tags: ['vegano', 'zero-acucar', 'sem-gluten'],
    image: 'https://images.unsplash.com/photo-1622597467836-f3285f2131b8?w=600&q=80',
  },
  {
    id: 'elixir-citrus',
    category: 'sucos',
    name: 'Citrus Pure — Laranja, Tangerina & Hortelã',
    ingredients: 'Laranja pera, tangerina ponkan, hortelã fresca, gengibre',
    price: 34.00,
    tags: ['vegano', 'sem-gluten'],
    image: 'https://images.unsplash.com/photo-1621506289937-a8e4df240d0b?w=600&q=80',
  },
  {
    id: 'elixir-detox',
    category: 'sucos',
    name: 'Détox Céleste — Pepino, Aipo & Limão',
    ingredients: 'Pepino japonês, aipo, limão siciliano, salsa, água de coco',
    price: 40.00,
    tags: ['vegano', 'zero-acucar', 'sem-gluten'],
    image: 'https://images.unsplash.com/photo-1613478223719-2ab802602423?w=600&q=80',
  },
];

/* ----------------------------------------------------------
   STATE — Carrinho
   ---------------------------------------------------------- */
const cart = {
  items: new Map(), // id → { product, qty }

  add(productId) {
    const product = PRODUCTS.find((p) => p.id === productId);
    if (!product) return;
    const existing = this.items.get(productId);
    if (existing) {
      existing.qty += 1;
    } else {
      this.items.set(productId, { product, qty: 1 });
    }
    this.persist();
    this.render();
  },

  remove(productId) {
    this.items.delete(productId);
    this.persist();
    this.render();
  },

  setQty(productId, qty) {
    if (qty < 1) {
      this.remove(productId);
      return;
    }
    const entry = this.items.get(productId);
    if (entry) {
      entry.qty = qty;
      this.persist();
      this.render();
    }
  },

  get subtotal() {
    let sum = 0;
    this.items.forEach(({ product, qty }) => {
      sum += product.price * qty;
    });
    return sum;
  },

  get total() {
    return this.items.size === 0 ? 0 : this.subtotal + CONFIG.deliveryFee;
  },

  get count() {
    let n = 0;
    this.items.forEach(({ qty }) => { n += qty; });
    return n;
  },

  persist() {
    const data = [];
    this.items.forEach(({ product, qty }) => {
      data.push({ id: product.id, qty });
    });
    try {
      localStorage.setItem('mc_cart', JSON.stringify(data));
    } catch (_) { /* silent */ }
  },

  restore() {
    try {
      const raw = localStorage.getItem('mc_cart');
      if (!raw) return;
      const data = JSON.parse(raw);
      data.forEach(({ id, qty }) => {
        const product = PRODUCTS.find((p) => p.id === id);
        if (product && qty > 0) {
          this.items.set(id, { product, qty });
        }
      });
    } catch (_) { /* silent */ }
  },

  render() {
    const countEl = document.getElementById('cart-count');
    const itemsEl = document.getElementById('cart-items');
    const subtotalEl = document.getElementById('cart-subtotal');
    const deliveryEl = document.getElementById('cart-delivery');
    const totalEl = document.getElementById('cart-total');

    // Contador
    const n = this.count;
    if (n > 0) {
      countEl.hidden = false;
      countEl.textContent = n > 99 ? '99+' : String(n);
    } else {
      countEl.hidden = true;
    }

    // Lista de itens
    if (this.items.size === 0) {
      itemsEl.innerHTML = '<p class="cart-empty">Sua sacola está vazia.<br>Explore a coleção e adicione peças especiais.</p>';
    } else {
      let html = '';
      this.items.forEach(({ product, qty }) => {
        html += `
          <div class="cart-item" data-id="${product.id}">
            <img class="cart-item__img" src="${product.image}" alt="${escapeHtml(product.name)}" loading="lazy" />
            <div class="cart-item__info">
              <p class="cart-item__name">${escapeHtml(product.name)}</p>
              <p class="cart-item__price">${formatPrice(product.price)}</p>
              <div class="cart-item__controls">
                <button type="button" class="qty-btn" data-action="dec" aria-label="Diminuir">−</button>
                <span class="qty-value">${qty}</span>
                <button type="button" class="qty-btn" data-action="inc" aria-label="Aumentar">+</button>
                <button type="button" class="cart-item__remove" data-action="remove">Remover</button>
              </div>
            </div>
          </div>`;
      });
      itemsEl.innerHTML = html;
    }

    // Totais
    const hasItems = this.items.size > 0;
    subtotalEl.textContent = formatPrice(this.subtotal);
    deliveryEl.textContent = hasItems ? formatPrice(CONFIG.deliveryFee) : 'R$ 0,00';
    totalEl.textContent = formatPrice(this.total);
  },
};

/* ----------------------------------------------------------
   HELPERS
   ---------------------------------------------------------- */
function formatPrice(value) {
  return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}

function escapeHtml(str) {
  const div = document.createElement('div');
  div.textContent = str;
  return div.innerHTML;
}

/* ----------------------------------------------------------
   RENDER PRODUTOS
   ---------------------------------------------------------- */
let currentTab = 'bolos';
let currentFilter = 'all';

function renderProducts() {
  const grid = document.getElementById('products-grid');
  const filtered = PRODUCTS.filter((p) => {
    if (p.category !== currentTab) return false;
    if (currentFilter === 'all') return true;
    return p.tags.includes(currentFilter);
  });

  if (filtered.length === 0) {
    grid.innerHTML = '<p style="grid-column:1/-1;text-align:center;color:var(--color-text-muted);padding:48px 0;">Nenhum item nesta seleção no momento.</p>';
    return;
  }

  grid.innerHTML = filtered.map((p) => {
    const badge = p.tags.length
      ? `<span class="product-card__badge">${p.tags[0].replace('-', ' ')}</span>`
      : '';
    return `
      <article class="product-card" data-id="${p.id}" data-category="${p.category}" data-tags="${p.tags.join(' ')}">
        <div class="product-card__image">
          <img src="${p.image}" alt="${escapeHtml(p.name)}" loading="lazy" />
          ${badge}
        </div>
        <div class="product-card__body">
          <h3 class="product-card__name">${escapeHtml(p.name)}</h3>
          <p class="product-card__ingredients">${escapeHtml(p.ingredients)}</p>
          <div class="product-card__footer">
            <span class="product-card__price">${formatPrice(p.price)}</span>
            <button type="button" class="product-card__add" data-add="${p.id}">Adicionar à Sacola</button>
          </div>
        </div>
      </article>`;
  }).join('');
}

/* ----------------------------------------------------------
   CART DRAWER UI
   ---------------------------------------------------------- */
function openCart() {
  document.getElementById('cart-drawer').classList.add('is-open');
  document.getElementById('cart-overlay').classList.add('is-open');
  document.getElementById('cart-drawer').setAttribute('aria-hidden', 'false');
  document.getElementById('cart-overlay').hidden = false;
  document.body.classList.add('is-locked');
}

function closeCart() {
  document.getElementById('cart-drawer').classList.remove('is-open');
  document.getElementById('cart-overlay').classList.remove('is-open');
  document.getElementById('cart-drawer').setAttribute('aria-hidden', 'true');
  setTimeout(() => {
    document.getElementById('cart-overlay').hidden = true;
  }, 350);
  document.body.classList.remove('is-locked');
}

/* ----------------------------------------------------------
   WHATSAPP CHECKOUT
   ---------------------------------------------------------- */
function checkoutWhatsApp() {
  if (cart.items.size === 0) {
    alert('Sua sacola está vazia. Adicione itens da coleção antes de finalizar.');
    return;
  }

  let lines = [];
  cart.items.forEach(({ product, qty }) => {
    lines.push(`• ${product.name} × ${qty} — ${formatPrice(product.price * qty)}`);
  });

  const message = [
    `Saudações Boutique! Gostaria de encomendar os seguintes itens de sua coleção:`,
    '',
    ...lines,
    '',
    `Valor Total da Experiência: ${formatPrice(cart.total)}`,
    '',
    `Aguardando instruções para o agendamento da entrega.`,
  ].join('\n');

  const url = `https://wa.me/${CONFIG.whatsappNumber}?text=${encodeURIComponent(message)}`;
  window.open(url, '_blank', 'noopener,noreferrer');
}

/* ----------------------------------------------------------
   ADMIN
   ---------------------------------------------------------- */
const MOCK_ORDERS = [
  { date: '29/09/2026', id: '#MC-1842', client: 'Helena M.', items: 'Noire Absolute ×1', channel: 'WhatsApp', value: 298.00, status: 'Aprovado' },
  { date: '29/09/2026', id: '#MC-1841', client: 'Ricardo S.', items: 'Éclat Vert ×2, Rubis ×1', channel: 'WhatsApp', value: 112.00, status: 'Preparando' },
  { date: '28/09/2026', id: '#MC-1840', client: 'Ana Beatriz', items: 'Pistache Siciliano ×1', channel: 'WhatsApp', value: 320.00, status: 'Enviado' },
  { date: '28/09/2026', id: '#MC-1839', client: 'Lucas F.', items: 'Jardin d\'Été ×1, Soleil ×3', channel: 'WhatsApp', value: 436.00, status: 'Aprovado' },
  { date: '27/09/2026', id: '#MC-1838', client: 'Mariana C.', items: 'Vert Impérial ×1', channel: 'WhatsApp', value: 285.00, status: 'Enviado' },
  { date: '27/09/2026', id: '#MC-1837', client: 'Pedro H.', items: 'Détox Céleste ×4', channel: 'WhatsApp', value: 160.00, status: 'Preparando' },
  { date: '26/09/2026', id: '#MC-1836', client: 'Sofia R.', items: 'Ambre ×1, Citrus Pure ×2', channel: 'WhatsApp', value: 343.00, status: 'Enviado' },
  { date: '26/09/2026', id: '#MC-1835', client: 'Gabriel T.', items: 'Citrus Céleste ×1', channel: 'WhatsApp', value: 265.00, status: 'Aprovado' },
];

function openAdminLogin() {
  const overlay = document.getElementById('admin-overlay');
  overlay.hidden = false;
  requestAnimationFrame(() => overlay.classList.add('is-open'));
  document.body.classList.add('is-locked');
  document.getElementById('admin-password').value = '';
  document.getElementById('admin-error').hidden = true;
  setTimeout(() => document.getElementById('admin-password').focus(), 100);
}

function closeAdminLogin() {
  const overlay = document.getElementById('admin-overlay');
  overlay.classList.remove('is-open');
  setTimeout(() => { overlay.hidden = true; }, 350);
  document.body.classList.remove('is-locked');
}

function openDashboard() {
  closeAdminLogin();
  const dash = document.getElementById('admin-dashboard');
  dash.hidden = false;
  dash.classList.add('is-open');
  document.body.classList.add('is-locked');
  renderOrdersTable();
}

function closeDashboard() {
  const dash = document.getElementById('admin-dashboard');
  dash.classList.remove('is-open');
  dash.hidden = true;
  document.body.classList.remove('is-locked');
}

function renderOrdersTable() {
  const tbody = document.getElementById('orders-tbody');
  tbody.innerHTML = MOCK_ORDERS.map((o) => {
    const statusClass = {
      Aprovado: 'status-badge--aprovado',
      Preparando: 'status-badge--preparando',
      Enviado: 'status-badge--enviado',
    }[o.status] || '';
    return `
      <tr>
        <td>${o.date}</td>
        <td>${o.id}</td>
        <td>${escapeHtml(o.client)}</td>
        <td>${escapeHtml(o.items)}</td>
        <td>${o.channel}</td>
        <td>${formatPrice(o.value)}</td>
        <td><span class="status-badge ${statusClass}">${o.status}</span></td>
      </tr>`;
  }).join('');
}

/* ----------------------------------------------------------
   REVEAL ON SCROLL
   ---------------------------------------------------------- */
function initReveal() {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
  );
  document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));
}

/* ----------------------------------------------------------
   ACCORDION
   ---------------------------------------------------------- */
function initAccordion() {
  document.querySelectorAll('.accordion__trigger').forEach((btn) => {
    btn.addEventListener('click', () => {
      const item = btn.closest('.accordion__item');
      const panel = item.querySelector('.accordion__panel');
      const isOpen = btn.getAttribute('aria-expanded') === 'true';

      // Fecha todos
      document.querySelectorAll('.accordion__trigger').forEach((b) => {
        b.setAttribute('aria-expanded', 'false');
        b.closest('.accordion__item').querySelector('.accordion__panel').style.maxHeight = null;
      });

      if (!isOpen) {
        btn.setAttribute('aria-expanded', 'true');
        panel.style.maxHeight = panel.scrollHeight + 'px';
      }
    });
  });
}

/* ----------------------------------------------------------
   HEADER SCROLL
   ---------------------------------------------------------- */
function initHeaderScroll() {
  const header = document.getElementById('header');
  const onScroll = () => {
    header.classList.toggle('is-scrolled', window.scrollY > 20);
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
}

/* ----------------------------------------------------------
   EVENT BINDINGS
   ---------------------------------------------------------- */
function initEvents() {
  // Tabs
  document.querySelectorAll('.tabs__btn').forEach((btn) => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.tabs__btn').forEach((b) => {
        b.classList.remove('is-active');
        b.setAttribute('aria-selected', 'false');
      });
      btn.classList.add('is-active');
      btn.setAttribute('aria-selected', 'true');
      currentTab = btn.dataset.tab;
      renderProducts();
    });
  });

  // Filtros
  document.querySelectorAll('.filter-chip').forEach((chip) => {
    chip.addEventListener('click', () => {
      document.querySelectorAll('.filter-chip').forEach((c) => c.classList.remove('is-active'));
      chip.classList.add('is-active');
      currentFilter = chip.dataset.filter;
      renderProducts();
    });
  });

  // Add to cart (delegated)
  document.getElementById('products-grid').addEventListener('click', (e) => {
    const btn = e.target.closest('[data-add]');
    if (btn) {
      cart.add(btn.dataset.add);
      // Micro feedback
      btn.textContent = 'Adicionado ✓';
      setTimeout(() => { btn.textContent = 'Adicionar à Sacola'; }, 1400);
    }
  });

  // Cart open / close
  document.getElementById('btn-cart').addEventListener('click', openCart);
  document.getElementById('cart-close').addEventListener('click', closeCart);
  document.getElementById('cart-overlay').addEventListener('click', closeCart);

  // Cart item controls (delegated)
  document.getElementById('cart-items').addEventListener('click', (e) => {
    const item = e.target.closest('.cart-item');
    if (!item) return;
    const id = item.dataset.id;
    const action = e.target.dataset.action || e.target.closest('[data-action]')?.dataset.action;
    if (!action) return;
    const entry = cart.items.get(id);
    if (!entry) return;
    if (action === 'inc') cart.setQty(id, entry.qty + 1);
    else if (action === 'dec') cart.setQty(id, entry.qty - 1);
    else if (action === 'remove') cart.remove(id);
  });

  // Checkout
  document.getElementById('btn-checkout').addEventListener('click', checkoutWhatsApp);

  // Admin
  document.getElementById('btn-admin').addEventListener('click', openAdminLogin);
  document.getElementById('admin-close').addEventListener('click', closeAdminLogin);
  document.getElementById('admin-overlay').addEventListener('click', (e) => {
    if (e.target === e.currentTarget) closeAdminLogin();
  });
  document.getElementById('admin-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const pwd = document.getElementById('admin-password').value;
    const errEl = document.getElementById('admin-error');
    if (pwd === CONFIG.adminPassword) {
      errEl.hidden = true;
      openDashboard();
    } else {
      errEl.hidden = false;
      document.getElementById('admin-password').value = '';
      document.getElementById('admin-password').focus();
    }
  });
  document.getElementById('admin-logout').addEventListener('click', closeDashboard);

  // Contact form
  document.getElementById('contact-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const feedback = document.getElementById('form-feedback');
    feedback.hidden = false;
    feedback.textContent = 'Mensagem enviada. O Concierge responderá em breve.';
    e.target.reset();
    setTimeout(() => { feedback.hidden = true; }, 5000);
  });

  // Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeCart();
      closeAdminLogin();
    }
  });
}

/* ----------------------------------------------------------
   BOOT
   ---------------------------------------------------------- */
document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('year').textContent = new Date().getFullYear();
  cart.restore();
  cart.render();
  renderProducts();
  initReveal();
  initAccordion();
  initHeaderScroll();
  initEvents();
});
