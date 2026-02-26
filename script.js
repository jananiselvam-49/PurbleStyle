/**
 * PurpleStyle – Women & Girls Fashion E-Commerce
 * script.js | Vanilla JavaScript | Clean & Modular
 */

'use strict';

/* ============================================================
   1. PRODUCT DATA
   ============================================================ */
const PRODUCTS = [
  // --- SAREE ---
  {
    id: 1,
    name: 'Kanjivaram Silk Saree – Royal Purple',
    category: 'saree',
    price: 1299,
    mrp: 2499,
    rating: 4.8,
    reviews: 1240,
    badge: 'Bestseller',
    image: 'saree.png',
  },
  {
    id: 2,
    name: 'Banarasi Georgette Saree – Golden Zari',
    category: 'saree',
    price: 899,
    mrp: 1799,
    rating: 4.6,
    reviews: 876,
    badge: 'Sale',
    image: 'saree1.png',
  },
  {
    id: 3,
    name: 'Chiffon Printed Saree – Floral Bliss',
    category: 'saree',
    price: 549,
    mrp: 999,
    rating: 4.3,
    reviews: 432,
    badge: '',
    image: 'saree3.png',
  },
  {
    id: 4,
    name: 'Linen Cotton Saree – Pastel Lavender',
    category: 'saree',
    price: 749,
    mrp: 1299,
    rating: 4.5,
    reviews: 654,
    badge: 'New',
    image: 'saree2.png',
  },

  // --- CHUDI / SALWAR ---
  {
    id: 5,
    name: 'Anarkali Churidar Set – Embroidered Violet',
    category: 'chudi',
    price: 699,
    mrp: 1299,
    rating: 4.7,
    reviews: 983,
    badge: 'Trending',
    image: 'dress1.png',
  },
  {
    id: 6,
    name: 'Palazzo Kurti Set – Printed Ethnic',
    category: 'chudi',
    price: 599,
    mrp: 1199,
    rating: 4.4,
    reviews: 712,
    badge: '',
    image: 'dress2.png',
  },
  {
    id: 7,
    name: 'A-Line Salwar Suit – Cotton Soft Pink',
    category: 'chudi',
    price: 849,
    mrp: 1499,
    rating: 4.6,
    reviews: 534,
    badge: 'Sale',
    image: 'dress3.png',
  },
  {
    id: 8,
    name: 'Straight Kurti Pants Set – Block Print',
    category: 'chudi',
    price: 479,
    mrp: 899,
    rating: 4.2,
    reviews: 298,
    badge: 'New',
    image: 'dress4.png',
  },

  // --- COSMETICS ---
  {
    id: 9,
    name: 'Matte Lipstick Set – 6 Berry Shades',
    category: 'cosmetics',
    price: 399,
    mrp: 699,
    rating: 4.9,
    reviews: 2134,
    badge: 'Top Rated',
    image: 'lipstick.png',
  },
  {
    id: 10,
    name: 'Rose & Saffron Glow Face Serum',
    category: 'cosmetics',
    price: 549,
    mrp: 999,
    rating: 4.7,
    reviews: 1567,
    badge: 'Bestseller',
    image: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=400&q=80',
  },
  {
    id: 11,
    name: 'Kajal + Eyeliner Duo – Smudge Free',
    category: 'cosmetics',
    price: 199,
    mrp: 349,
    rating: 4.5,
    reviews: 887,
    badge: 'Sale',
    image: 'https://images.unsplash.com/photo-1512496015851-a90fb38ba796?w=400&q=80',
  },

  // --- BABY GIRL DRESSES ---
  {
    id: 12,
    name: 'Fairy Princess Tutu – Baby Pink (0-3yrs)',
    category: 'baby',
    price: 449,
    mrp: 799,
    rating: 4.9,
    reviews: 1043,
    badge: 'Bestseller',
    image: 'https://images.unsplash.com/photo-1518831959646-742c3a14ebf7?w=400&q=80',
  },
  {
    id: 13,
    name: 'Floral Frock Set – Cotton Soft (1-5yrs)',
    category: 'baby',
    price: 349,
    mrp: 649,
    rating: 4.7,
    reviews: 721,
    badge: 'New',
    image: 'https://images.unsplash.com/photo-1522771930-78848d9293e8?w=400&q=80',
  },
  {
    id: 14,
    name: 'Baby Ethnic Lehenga – Wedding Wear',
    category: 'baby',
    price: 799,
    mrp: 1499,
    rating: 4.8,
    reviews: 456,
    badge: 'Trending',
    image: 'https://images.unsplash.com/photo-1476234251651-f353703a034d?w=400&q=80',
  },
  {
    id: 15,
    name: 'Rainbow Jumpsuit – Playful Everyday',
    category: 'baby',
    price: 299,
    mrp: 549,
    rating: 4.6,
    reviews: 334,
    badge: '',
    image: 'https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?w=400&q=80',
  },
  {
    id: 16,
    name: 'Foundation & BB Cream Kit – Dewy Finish',
    category: 'cosmetics',
    price: 649,
    mrp: 1199,
    rating: 4.4,
    reviews: 603,
    badge: 'New',
    image: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=400&q=80',
  },
];

/* ============================================================
   2. STATE
   ============================================================ */
let cart   = loadFromStorage('ps_cart',   []);   // Array of { product, qty }
let orders = loadFromStorage('ps_orders', []);   // Array of order objects
let currentUser = loadFromStorage('ps_user', null); // { name, email }
let activeFilter = 'all';
let searchQuery  = '';
let wishlist     = loadFromStorage('ps_wishlist', []);

/* ============================================================
   3. UTILITY HELPERS
   ============================================================ */

/** Generic localStorage save */
function saveToStorage(key, value) {
  try { localStorage.setItem(key, JSON.stringify(value)); }
  catch(e) { console.warn('localStorage not available:', e); }
}

/** Generic localStorage load */
function loadFromStorage(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch(e) { return fallback; }
}

/** Format price as ₹1,299 */
function fmt(price) {
  return '₹' + price.toLocaleString('en-IN');
}

/** Calculate discount percentage */
function discountPct(price, mrp) {
  return Math.round(((mrp - price) / mrp) * 100);
}

/** Generate star HTML */
function starsHTML(rating) {
  const full  = Math.floor(rating);
  const half  = rating % 1 >= 0.5 ? 1 : 0;
  const empty = 5 - full - half;
  let html = '';
  for (let i = 0; i < full;  i++) html += '<i class="fa-solid fa-star"></i>';
  if (half)                        html += '<i class="fa-solid fa-star-half-stroke"></i>';
  for (let i = 0; i < empty; i++) html += '<i class="fa-regular fa-star"></i>';
  return html;
}

/** Generate a short order ID */
function generateOrderId() {
  return 'PS' + Date.now().toString(36).toUpperCase();
}

/** Format date as "22 Feb 2025, 02:30 PM" */
function formatDate(isoString) {
  const d = new Date(isoString);
  return d.toLocaleString('en-IN', {
    day: '2-digit', month: 'short', year: 'numeric',
    hour: '2-digit', minute: '2-digit', hour12: true,
  });
}

/* ============================================================
   4. TOAST NOTIFICATIONS
   ============================================================ */
function showToast(message, type = 'success', duration = 3000) {
  const container = document.getElementById('toast-container');

  const icons = {
    success: 'fa-solid fa-circle-check',
    error:   'fa-solid fa-circle-xmark',
    info:    'fa-solid fa-circle-info',
  };

  const toast = document.createElement('div');
  toast.className = `toast ${type}`;
  toast.innerHTML = `<i class="${icons[type] || icons.info}"></i> ${message}`;
  container.appendChild(toast);

  setTimeout(() => {
    toast.classList.add('removing');
    toast.addEventListener('animationend', () => toast.remove());
  }, duration);
}

/* ============================================================
   5. PRODUCT RENDERING
   ============================================================ */

/** Filter products based on category and search text */
function getFilteredProducts() {
  return PRODUCTS.filter(p => {
    const matchCat    = activeFilter === 'all' || p.category === activeFilter;
    const matchSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase())
                     || p.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCat && matchSearch;
  });
}

/** Build the HTML for a single product card */
function buildProductCard(product) {
  const isWishlisted = wishlist.includes(product.id);
  const discount     = discountPct(product.price, product.mrp);
  const badgeHTML    = product.badge
    ? `<span class="product-badge">${product.badge}</span>` : '';
  const catLabels    = { saree:'Saree', chudi:'Chudi / Salwar', cosmetics:'Cosmetics', baby:'Baby Girl' };

  const card = document.createElement('article');
  card.className = 'product-card';
  card.dataset.id = product.id;
  card.innerHTML = `
    <div class="product-img-wrap">
      <img src="${product.image}" alt="${product.name}" loading="lazy" />
      ${badgeHTML}
      <button
        class="product-wishlist ${isWishlisted ? 'liked' : ''}"
        data-id="${product.id}"
        aria-label="Add to wishlist"
        title="${isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'}"
      >
        <i class="fa-${isWishlisted ? 'solid' : 'regular'} fa-heart"></i>
      </button>
    </div>
    <div class="product-info">
      <span class="product-cat-tag">${catLabels[product.category] || product.category}</span>
      <h3 class="product-name">${product.name}</h3>
      <div class="product-rating">
        <span class="stars">${starsHTML(product.rating)}</span>
        <span class="review-count">(${product.reviews.toLocaleString()})</span>
      </div>
      <div class="product-pricing">
        <span class="product-price">${fmt(product.price)}</span>
        <span class="product-mrp">${fmt(product.mrp)}</span>
        <span class="product-discount">${discount}% off</span>
      </div>
      <button class="add-to-cart-btn" data-id="${product.id}" aria-label="Add ${product.name} to cart">
        <i class="fa-solid fa-bag-shopping"></i> Add to Cart
      </button>
    </div>
  `;
  return card;
}

/** Render products to the grid */
function renderProducts() {
  const grid       = document.getElementById('product-grid');
  const noResults  = document.getElementById('no-results');
  const subtitle   = document.getElementById('products-subtitle');
  const filtered   = getFilteredProducts();

  grid.innerHTML = '';

  if (filtered.length === 0) {
    noResults.classList.remove('hidden');
    subtitle.textContent = '0 products found';
    return;
  }

  noResults.classList.add('hidden');

  const catName = activeFilter === 'all' ? 'all categories' : activeFilter;
  subtitle.textContent = searchQuery
    ? `${filtered.length} result(s) for "${searchQuery}"`
    : `Showing ${filtered.length} products in ${catName}`;

  filtered.forEach((product, i) => {
    const card = buildProductCard(product);
    card.style.animationDelay = `${i * 40}ms`;
    grid.appendChild(card);
  });
}

/* ============================================================
   6. CATEGORY FILTER
   ============================================================ */
function initFilterBar() {
  const filterBar = document.getElementById('filter-bar');

  filterBar.addEventListener('click', e => {
    const btn = e.target.closest('.filter-btn');
    if (!btn) return;

    // Update active state
    filterBar.querySelectorAll('.filter-btn').forEach(b => {
      b.classList.remove('active');
      b.setAttribute('aria-selected', 'false');
    });
    btn.classList.add('active');
    btn.setAttribute('aria-selected', 'true');

    activeFilter = btn.dataset.filter;
    renderProducts();
  });
}

/** Set filter programmatically (used by category cards and dropdown) */
function setFilter(cat) {
  activeFilter = cat;
  const filterBar = document.getElementById('filter-bar');
  filterBar.querySelectorAll('.filter-btn').forEach(b => {
    const isActive = b.dataset.filter === cat;
    b.classList.toggle('active', isActive);
    b.setAttribute('aria-selected', String(isActive));
  });

  // Scroll to products
  document.getElementById('products').scrollIntoView({ behavior: 'smooth' });
  renderProducts();
}

/* ============================================================
   7. SEARCH
   ============================================================ */
function initSearch() {
  const desktopInput = document.getElementById('search-input');
  const mobileInput  = document.getElementById('mobile-search-input');

  function handleSearch(val) {
    searchQuery = val.trim();
    // Sync both inputs
    desktopInput.value = searchQuery;
    mobileInput.value  = searchQuery;
    renderProducts();
  }

  desktopInput.addEventListener('input', e => handleSearch(e.target.value));
  mobileInput.addEventListener('input',  e => handleSearch(e.target.value));

  document.getElementById('search-btn').addEventListener('click', () => {
    handleSearch(desktopInput.value);
  });

  document.getElementById('mobile-search-btn').addEventListener('click', () => {
    handleSearch(mobileInput.value);
  });

  desktopInput.addEventListener('keydown', e => {
    if (e.key === 'Enter') handleSearch(e.target.value);
  });

  mobileInput.addEventListener('keydown', e => {
    if (e.key === 'Enter') handleSearch(e.target.value);
  });

  document.getElementById('clear-search-btn').addEventListener('click', () => {
    searchQuery = '';
    desktopInput.value = '';
    mobileInput.value  = '';
    renderProducts();
  });
}

/* ============================================================
   8. CART SYSTEM
   ============================================================ */

/** Find cart entry by product id */
function findCartItem(id) {
  return cart.find(item => item.product.id === id);
}

/** Add product to cart or increment quantity */
function addToCart(productId) {
  const product  = PRODUCTS.find(p => p.id === productId);
  if (!product) return;

  const existing = findCartItem(productId);

  if (existing) {
    existing.qty += 1;
    showToast(`${product.name.split('–')[0].trim()} quantity updated!`, 'info');
  } else {
    cart.push({ product, qty: 1 });
    showToast(`Added to cart! 🛍️`, 'success');
  }

  saveToStorage('ps_cart', cart);
  updateCartUI();

  // Bump cart count badge
  const badge = document.getElementById('cart-count');
  badge.classList.remove('bump');
  void badge.offsetWidth; // reflow
  badge.classList.add('bump');
}

/** Remove item from cart */
function removeFromCart(productId) {
  cart = cart.filter(item => item.product.id !== productId);
  saveToStorage('ps_cart', cart);
  updateCartUI();
  renderCartItems();
  showToast('Item removed from cart', 'error');
}

/** Change item quantity */
function changeQty(productId, delta) {
  const item = findCartItem(productId);
  if (!item) return;

  item.qty += delta;

  if (item.qty <= 0) {
    removeFromCart(productId);
    return;
  }

  saveToStorage('ps_cart', cart);
  updateCartUI();
  renderCartItems();
}

/** Calculate totals */
function getCartTotals() {
  const subtotal = cart.reduce((sum, item) => sum + item.product.price * item.qty, 0);
  const delivery = subtotal > 0 && subtotal < 499 ? 49 : 0;
  const total    = subtotal + delivery;
  return { subtotal, delivery, total };
}

/** Get total number of items */
function getCartCount() {
  return cart.reduce((sum, item) => sum + item.qty, 0);
}

/** Update cart count badge and totals in footer */
function updateCartUI() {
  const count = getCartCount();
  document.getElementById('cart-count').textContent = count;

  const { subtotal, delivery, total } = getCartTotals();
  document.getElementById('cart-subtotal').textContent = fmt(subtotal);
  document.getElementById('cart-delivery').textContent = delivery > 0 ? fmt(delivery) : 'FREE';
  document.getElementById('cart-total').textContent    = fmt(total);

  const cartFooter = document.getElementById('cart-footer');
  const emptyCart  = document.getElementById('empty-cart');
  const cartItems  = document.getElementById('cart-items');

  if (count === 0) {
    emptyCart.classList.remove('hidden');
    cartItems.classList.add('hidden');
    cartFooter.classList.add('hidden');
  } else {
    emptyCart.classList.add('hidden');
    cartItems.classList.remove('hidden');
    cartFooter.classList.remove('hidden');
  }
}

/** Render cart item list inside sidebar */
function renderCartItems() {
  const container = document.getElementById('cart-items');
  container.innerHTML = '';

  if (cart.length === 0) {
    updateCartUI();
    return;
  }

  cart.forEach(item => {
    const { product, qty } = item;
    const el = document.createElement('div');
    el.className = 'cart-item';
    el.dataset.id = product.id;
    el.innerHTML = `
      <img src="${product.image}" alt="${product.name}" />
      <div class="cart-item-details">
        <p class="cart-item-name">${product.name}</p>
        <p class="cart-item-price">${fmt(product.price * qty)}</p>
        <div class="qty-control">
          <button class="qty-btn qty-dec" data-id="${product.id}" aria-label="Decrease quantity">−</button>
          <span class="qty-num">${qty}</span>
          <button class="qty-btn qty-inc" data-id="${product.id}" aria-label="Increase quantity">+</button>
        </div>
      </div>
      <button class="remove-item-btn" data-id="${product.id}" aria-label="Remove item">
        <i class="fa-solid fa-trash-can"></i>
      </button>
    `;
    container.appendChild(el);
  });
}

/** Open / Close cart sidebar */
function openCart() {
  renderCartItems();
  updateCartUI();
  document.getElementById('cart-sidebar').classList.add('open');
  document.getElementById('cart-overlay').classList.add('active');
  document.getElementById('cart-sidebar').setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
}

function closeCart() {
  document.getElementById('cart-sidebar').classList.remove('open');
  document.getElementById('cart-overlay').classList.remove('active');
  document.getElementById('cart-sidebar').setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
}

/** Attach cart event listeners */
function initCart() {
  document.getElementById('cart-btn').addEventListener('click', openCart);
  document.getElementById('close-cart-btn').addEventListener('click', closeCart);
  document.getElementById('cart-overlay').addEventListener('click', closeCart);
  document.getElementById('continue-shopping-btn').addEventListener('click', () => {
    closeCart();
    document.getElementById('products').scrollIntoView({ behavior: 'smooth' });
  });

  // Event delegation for qty controls and remove buttons
  document.getElementById('cart-items').addEventListener('click', e => {
    const id = parseInt(e.target.closest('[data-id]')?.dataset.id);
    if (!id) return;

    if (e.target.closest('.qty-inc'))         changeQty(id, +1);
    else if (e.target.closest('.qty-dec'))    changeQty(id, -1);
    else if (e.target.closest('.remove-item-btn')) removeFromCart(id);
  });
}

/* ============================================================
   9. ORDER SYSTEM
   ============================================================ */

/** Checkout – save order and show success modal */
function checkout() {
  if (cart.length === 0) {
    showToast('Your cart is empty!', 'error');
    return;
  }

  const { total } = getCartTotals();
  const order = {
    id:       generateOrderId(),
    date:     new Date().toISOString(),
    items:    cart.map(i => ({ name: i.product.name, qty: i.qty, price: i.product.price * i.qty })),
    total,
    status:   'Confirmed',
  };

  orders.unshift(order); // most recent first
  saveToStorage('ps_orders', orders);

  // Clear cart
  cart = [];
  saveToStorage('ps_cart', cart);
  updateCartUI();
  renderCartItems();
  closeCart();

  // Show success modal
  document.getElementById('order-modal-id').textContent    = `Order ID: ${order.id}`;
  document.getElementById('order-modal-total').textContent = `Total Paid: ${fmt(order.total)}`;
  document.getElementById('order-modal-overlay').classList.remove('hidden');

  renderOrders();
}

/** Render order history list */
function renderOrders() {
  const list    = document.getElementById('order-list');
  const empty   = document.getElementById('empty-orders');
  list.innerHTML = '';

  if (orders.length === 0) {
    empty.classList.remove('hidden');
    return;
  }

  empty.classList.add('hidden');

  orders.forEach(order => {
    const card = document.createElement('div');
    card.className = 'order-card';

    const productsHTML = order.items.map(item => `
      <div class="order-product-row">
        <span class="order-product-name">${item.name}</span>
        <span class="order-product-qty">× ${item.qty}</span>
        <span class="order-product-price">${fmt(item.price)}</span>
      </div>
    `).join('');

    card.innerHTML = `
      <div class="order-card-header">
        <div>
          <div class="order-id"><i class="fa-solid fa-receipt"></i> Order <strong>${order.id}</strong></div>
          <div class="order-date"><i class="fa-regular fa-calendar"></i> ${formatDate(order.date)}</div>
        </div>
        <span class="order-status-badge">${order.status}</span>
      </div>
      <div class="order-products">${productsHTML}</div>
      <div class="order-card-footer">
        <span class="order-total-label">Order Total</span>
        <span class="order-total-amount">${fmt(order.total)}</span>
      </div>
    `;
    list.appendChild(card);
  });
}

/** Init order modal close */
function initOrderModal() {
  document.getElementById('checkout-btn').addEventListener('click', checkout);
  document.getElementById('close-order-modal-btn').addEventListener('click', () => {
    document.getElementById('order-modal-overlay').classList.add('hidden');
    document.getElementById('products').scrollIntoView({ behavior: 'smooth' });
  });

  // Close on overlay click
  document.getElementById('order-modal-overlay').addEventListener('click', e => {
    if (e.target === document.getElementById('order-modal-overlay')) {
      document.getElementById('order-modal-overlay').classList.add('hidden');
    }
  });
}

/* ============================================================
   10. WISHLIST
   ============================================================ */
function toggleWishlist(productId) {
  const idx = wishlist.indexOf(productId);
  if (idx === -1) {
    wishlist.push(productId);
    showToast('Added to wishlist 💜', 'info');
  } else {
    wishlist.splice(idx, 1);
    showToast('Removed from wishlist', 'info');
  }
  saveToStorage('ps_wishlist', wishlist);
  renderProducts();
}

/* ============================================================
   11. LOGIN MODAL
   ============================================================ */

function updateLoginBtn() {
  const label = document.getElementById('login-label');
  if (currentUser) {
    label.textContent = currentUser.name.split(' ')[0];
  } else {
    label.textContent = 'Login';
  }
}

function openLoginModal() {
  document.getElementById('login-modal-overlay').classList.remove('hidden');
  document.getElementById('login-view').classList.remove('hidden');
  document.getElementById('register-view').classList.add('hidden');
  document.body.style.overflow = 'hidden';
}

function closeLoginModal() {
  document.getElementById('login-modal-overlay').classList.add('hidden');
  document.body.style.overflow = '';
}

function initLoginModal() {
  const loginBtn         = document.getElementById('login-btn');
  const closeLoginBtn    = document.getElementById('close-login-modal-btn');
  const loginOverlay     = document.getElementById('login-modal-overlay');
  const goRegisterBtn    = document.getElementById('go-register-btn');
  const goLoginBtn       = document.getElementById('go-login-btn');
  const loginView        = document.getElementById('login-view');
  const registerView     = document.getElementById('register-view');
  const togglePwdBtn     = document.getElementById('toggle-pwd-btn');
  const togglePwdIcon    = document.getElementById('toggle-pwd-icon');
  const loginPassword    = document.getElementById('login-password');

  loginBtn.addEventListener('click', () => {
    if (currentUser) {
      // Logout
      currentUser = null;
      saveToStorage('ps_user', null);
      updateLoginBtn();
      showToast('Logged out successfully', 'info');
    } else {
      openLoginModal();
    }
  });

  closeLoginBtn.addEventListener('click',  closeLoginModal);
  loginOverlay.addEventListener('click', e => {
    if (e.target === loginOverlay) closeLoginModal();
  });

  goRegisterBtn.addEventListener('click', () => {
    loginView.classList.add('hidden');
    registerView.classList.remove('hidden');
  });

  goLoginBtn.addEventListener('click', () => {
    registerView.classList.add('hidden');
    loginView.classList.remove('hidden');
  });

  // Toggle password visibility
  togglePwdBtn.addEventListener('click', () => {
    const isText = loginPassword.type === 'text';
    loginPassword.type = isText ? 'password' : 'text';
    togglePwdIcon.className = isText ? 'fa-solid fa-eye' : 'fa-solid fa-eye-slash';
  });

  // === Login Form Submit ===
  document.getElementById('login-form').addEventListener('submit', e => {
    e.preventDefault();
    const email    = document.getElementById('login-email').value.trim();
    const password = document.getElementById('login-password').value;
    let valid = true;

    document.getElementById('login-email-error').textContent = '';
    document.getElementById('login-pwd-error').textContent   = '';

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      document.getElementById('login-email-error').textContent = 'Enter a valid email address.';
      valid = false;
    }

    if (!password || password.length < 6) {
      document.getElementById('login-pwd-error').textContent = 'Password must be at least 6 characters.';
      valid = false;
    }

    if (!valid) return;

    // Simulate login (frontend only)
    const storedUser = loadFromStorage('ps_registered_' + email, null);
    if (storedUser && storedUser.password === btoa(password)) {
      currentUser = { name: storedUser.name, email };
    } else {
      // Auto-create session for demo purposes
      currentUser = { name: email.split('@')[0], email };
    }

    saveToStorage('ps_user', currentUser);
    updateLoginBtn();
    closeLoginModal();
    showToast(`Welcome back, ${currentUser.name.split(' ')[0]}! 💜`, 'success');
    document.getElementById('login-form').reset();
  });

  // === Register Form Submit ===
  document.getElementById('register-form').addEventListener('submit', e => {
    e.preventDefault();
    const name     = document.getElementById('reg-name').value.trim();
    const email    = document.getElementById('reg-email').value.trim();
    const password = document.getElementById('reg-password').value;
    let valid = true;

    document.getElementById('reg-name-error').textContent  = '';
    document.getElementById('reg-email-error').textContent = '';
    document.getElementById('reg-pwd-error').textContent   = '';

    if (!name || name.length < 2) {
      document.getElementById('reg-name-error').textContent = 'Enter your full name.';
      valid = false;
    }
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      document.getElementById('reg-email-error').textContent = 'Enter a valid email address.';
      valid = false;
    }
    if (!password || password.length < 6) {
      document.getElementById('reg-pwd-error').textContent = 'Password must be at least 6 characters.';
      valid = false;
    }

    if (!valid) return;

    // Save registration data
    saveToStorage('ps_registered_' + email, { name, password: btoa(password) });
    currentUser = { name, email };
    saveToStorage('ps_user', currentUser);
    updateLoginBtn();
    closeLoginModal();
    showToast(`Welcome to PurpleStyle, ${name.split(' ')[0]}! 🌸`, 'success');
    document.getElementById('register-form').reset();
  });
}

/* ============================================================
   12. CATEGORY CARDS & DROPDOWN NAVIGATION
   ============================================================ */
function initCategoryNavigation() {
  // Category strip cards
  document.querySelectorAll('.cat-card').forEach(card => {
    card.addEventListener('click', () => setFilter(card.dataset.cat));
  });

  // Navbar dropdown
  const dropdownBtn  = document.getElementById('dropdown-btn');
  const dropdownMenu = document.getElementById('dropdown-menu');

  dropdownBtn.addEventListener('click', e => {
    e.stopPropagation();
    const isOpen = dropdownMenu.classList.toggle('open');
    dropdownBtn.classList.toggle('open', isOpen);
    dropdownBtn.setAttribute('aria-expanded', String(isOpen));
  });

  dropdownMenu.addEventListener('click', e => {
    const link = e.target.closest('[data-cat]');
    if (!link) return;
    e.preventDefault();
    setFilter(link.dataset.cat);
    dropdownMenu.classList.remove('open');
    dropdownBtn.classList.remove('open');
    dropdownBtn.setAttribute('aria-expanded', 'false');
  });

  document.addEventListener('click', () => {
    dropdownMenu.classList.remove('open');
    dropdownBtn.classList.remove('open');
    dropdownBtn.setAttribute('aria-expanded', 'false');
  });
}

/* ============================================================
   13. PRODUCT INTERACTION DELEGATION
   ============================================================ */
function initProductGrid() {
  document.getElementById('product-grid').addEventListener('click', e => {
    // Add to Cart
    const addBtn = e.target.closest('.add-to-cart-btn');
    if (addBtn) {
      addToCart(parseInt(addBtn.dataset.id));
      return;
    }

    // Wishlist
    const wishBtn = e.target.closest('.product-wishlist');
    if (wishBtn) {
      toggleWishlist(parseInt(wishBtn.dataset.id));
    }
  });
}

/* ============================================================
   14. HERO "SHOP NOW" & NAVBAR SCROLL BEHAVIOUR
   ============================================================ */
function initHero() {
  document.getElementById('shop-now-btn').addEventListener('click', e => {
    e.preventDefault();
    document.getElementById('products').scrollIntoView({ behavior: 'smooth' });
  });
}

function initNavbarScroll() {
  const navbar = document.getElementById('navbar');
  let lastScroll = 0;
  window.addEventListener('scroll', () => {
    const current = window.scrollY;
    if (current > lastScroll && current > 80) {
      navbar.style.transform = 'translateY(-100%)';
    } else {
      navbar.style.transform = 'translateY(0)';
    }
    lastScroll = current;
  }, { passive: true });

  // Ensure navbar is styled for transition
  navbar.style.transition = 'transform 0.35s cubic-bezier(0.4,0,0.2,1), box-shadow 0.3s';
}

/* ============================================================
   15. MOBILE HAMBURGER
   ============================================================ */
function initHamburger() {
  const hamburger = document.getElementById('hamburger-btn');
  const dropdown  = document.getElementById('category-dropdown');

  hamburger.addEventListener('click', e => {
    e.stopPropagation();
    const isVisible = dropdown.style.display === 'block';
    dropdown.style.display = isVisible ? 'none' : 'block';
    hamburger.classList.toggle('open', !isVisible);
  });

  document.addEventListener('click', () => {
    dropdown.style.display = 'none';
    hamburger.classList.remove('open');
  });
}

/* ============================================================
   16. ESCAPE KEY HANDLER
   ============================================================ */
function initEscapeKey() {
  document.addEventListener('keydown', e => {
    if (e.key !== 'Escape') return;
    closeCart();
    closeLoginModal();
    document.getElementById('order-modal-overlay').classList.add('hidden');
  });
}

/* ============================================================
   17. INIT
   ============================================================ */
document.addEventListener('DOMContentLoaded', () => {
  renderProducts();
  renderOrders();
  updateCartUI();
  updateLoginBtn();

  initFilterBar();
  initSearch();
  initCart();
  initOrderModal();
  initLoginModal();
  initCategoryNavigation();
  initProductGrid();
  initHero();
  initNavbarScroll();
  initHamburger();
  initEscapeKey();

  console.log('🎀 PurpleStyle initialized successfully!');
});
