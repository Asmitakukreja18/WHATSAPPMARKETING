/* ==========================================================================
   MOBILE STATION │ INTERACTIVE SHOWROOM LOGIC & 3D STAGE ENGINE
   ========================================================================== */

// 1. Flagship Devices Database
const SHOWROOM_DEVICES = [
  {
    id: "iphone18promax",
    brand: "apple",
    name: "iPhone 18 Pro Max",
    spanText: "Pro Max",
    image: "images/Screenshot 2026-09-16 163951.png",
    subtitle: "Aerospace Titanium. Quantum A20 Pro Silicon. Beyond Perception.",
    basePrice: 179900,
    emiText: "₹8,490/mo",
    badge: "IN STOCK • SHIP TODAY",
    specs: {
      chip: "A20 Pro",
      chipSub: "2nm Silicon Engine",
      display: "120Hz",
      displaySub: "ProMotion Super Retina",
      camera: "48MP",
      cameraSub: "Fusion Photonic Sensor",
      battery: "33 Hrs",
      batterySub: "All-Day Video Playback"
    },
    colors: {
      red: {
        title: "Deep Crimson Edition",
        bodyGrad: "linear-gradient(135deg, #7a0b1c 0%, #dc143c 45%, #2a0308 100%)",
        wallGrad: "radial-gradient(circle at 50% 40%, #590d19 0%, #150205 60%, #050608 100%)",
        haloColor: "rgba(255, 30, 66, 0.45)",
        reflColor: "rgba(255, 30, 66, 0.3)"
      },
      desert: {
        title: "Desert Titanium",
        bodyGrad: "linear-gradient(135deg, #b8936f 0%, #ecd5ba 45%, #6a4f32 100%)",
        wallGrad: "radial-gradient(circle at 50% 40%, #5c4125 0%, #1a120b 60%, #050608 100%)",
        haloColor: "rgba(217, 163, 102, 0.45)",
        reflColor: "rgba(217, 163, 102, 0.3)"
      },
      silver: {
        title: "Natural Titanium",
        bodyGrad: "linear-gradient(135deg, #88929e 0%, #e2e8f0 45%, #475569 100%)",
        wallGrad: "radial-gradient(circle at 50% 40%, #334155 0%, #0f172a 60%, #050608 100%)",
        haloColor: "rgba(203, 213, 225, 0.45)",
        reflColor: "rgba(203, 213, 225, 0.3)"
      },
      obsidian: {
        title: "Obsidian Black",
        bodyGrad: "linear-gradient(135deg, #1e293b 0%, #334155 45%, #05070a 100%)",
        wallGrad: "radial-gradient(circle at 50% 40%, #1e293b 0%, #090c10 60%, #000000 100%)",
        haloColor: "rgba(100, 116, 139, 0.45)",
        reflColor: "rgba(100, 116, 139, 0.3)"
      }
    }
  },
  {
    id: "s26ultra",
    brand: "samsung",
    name: "Galaxy Z Fold8 & S26 Series",
    spanText: "Fold8 & S26",
    image: "images/Screenshot 2026-09-16 164019.png",
    subtitle: "200MP Quad Telephoto. Foldable AI FlexCam. Snapdragon 8 Elite Gen 5.",
    basePrice: 139999,
    emiText: "₹6,890/mo",
    badge: "EXCLUSIVE FOLDABLE & S SERIES",
    specs: {
      chip: "SD 8 Elite",
      chipSub: "Galaxy Custom Core",
      display: "120Hz",
      displaySub: "Dynamic AMOLED 2X",
      camera: "200MP",
      cameraSub: "Space Zoom AI Matrix",
      battery: "5000 mAh",
      batterySub: "45W Super Fast 2.0"
    },
    colors: {
      red: {
        title: "Titanium Amber Red",
        bodyGrad: "linear-gradient(135deg, #881337 0%, #e11d48 45%, #31040f 100%)",
        wallGrad: "radial-gradient(circle at 50% 40%, #60081e 0%, #160206 60%, #050608 100%)",
        haloColor: "rgba(225, 29, 72, 0.45)",
        reflColor: "rgba(225, 29, 72, 0.3)"
      },
      desert: {
        title: "Titanium Gold",
        bodyGrad: "linear-gradient(135deg, #a16207 0%, #fde047 45%, #583303 100%)",
        wallGrad: "radial-gradient(circle at 50% 40%, #583303 0%, #1c0e00 60%, #050608 100%)",
        haloColor: "rgba(234, 179, 8, 0.45)",
        reflColor: "rgba(234, 179, 8, 0.3)"
      },
      silver: {
        title: "Titanium Silver",
        bodyGrad: "linear-gradient(135deg, #64748b 0%, #cbd5e1 45%, #334155 100%)",
        wallGrad: "radial-gradient(circle at 50% 40%, #334155 0%, #090d14 60%, #050608 100%)",
        haloColor: "rgba(148, 163, 184, 0.45)",
        reflColor: "rgba(148, 163, 184, 0.3)"
      },
      obsidian: {
        title: "Titanium Black",
        bodyGrad: "linear-gradient(135deg, #090d14 0%, #1e293b 45%, #020406 100%)",
        wallGrad: "radial-gradient(circle at 50% 40%, #0f172a 0%, #030712 60%, #000000 100%)",
        haloColor: "rgba(51, 65, 85, 0.45)",
        reflColor: "rgba(51, 65, 85, 0.3)"
      }
    }
  },
  {
    id: "pixel11pro",
    brand: "apple",
    name: "Apple Flagship Lineup",
    spanText: "Series 18 & 17",
    image: "images/Screenshot 2026-09-16 164102.png",
    subtitle: "iPhone 18 Pro Max, iPhone 18 Pro, & iPhone 17 Pro Max sealed in stock.",
    basePrice: 139900,
    emiText: "₹6,210/mo",
    badge: "BESTSELLER LINEUP",
    specs: {
      chip: "A20 Bionic",
      chipSub: "Next-Gen Silicon",
      display: "120Hz",
      displaySub: "Super Retina XDR",
      camera: "48MP",
      cameraSub: "Fusion Triple Optics",
      battery: "30+ Hrs",
      batterySub: "All-Day Video Power"
    },
    colors: {
      red: {
        title: "Rose Quartz Pro",
        bodyGrad: "linear-gradient(135deg, #9f1239 0%, #fb7185 45%, #3b0716 100%)",
        wallGrad: "radial-gradient(circle at 50% 40%, #700c25 0%, #190208 60%, #050608 100%)",
        haloColor: "rgba(251, 113, 133, 0.45)",
        reflColor: "rgba(251, 113, 133, 0.3)"
      },
      desert: {
        title: "Hazel Amber",
        bodyGrad: "linear-gradient(135deg, #854d0e 0%, #fef08a 45%, #422006 100%)",
        wallGrad: "radial-gradient(circle at 50% 40%, #422006 0%, #150a01 60%, #050608 100%)",
        haloColor: "rgba(254, 240, 138, 0.45)",
        reflColor: "rgba(254, 240, 138, 0.3)"
      },
      silver: {
        title: "Porcelain Silver",
        bodyGrad: "linear-gradient(135deg, #94a3b8 0%, #f8fafc 45%, #475569 100%)",
        wallGrad: "radial-gradient(circle at 50% 40%, #475569 0%, #0f172a 60%, #050608 100%)",
        haloColor: "rgba(241, 245, 249, 0.45)",
        reflColor: "rgba(241, 245, 249, 0.3)"
      },
      obsidian: {
        title: "Obsidian Slate",
        bodyGrad: "linear-gradient(135deg, #18181b 0%, #3f3f46 45%, #09090b 100%)",
        wallGrad: "radial-gradient(circle at 50% 40%, #27272a 0%, #09090b 60%, #000000 100%)",
        haloColor: "rgba(82, 82, 91, 0.45)",
        reflColor: "rgba(82, 82, 91, 0.3)"
      }
    }
  },
  {
    id: "showrooms",
    brand: "store",
    name: "Flagship Showrooms & BKC Studio",
    spanText: "Showrooms",
    image: "images/Screenshot 2026-09-16 164028.png",
    subtitle: "Amravati Flagship Lounge, Nagpur Experience Lounge, and Mumbai BKC Studio.",
    basePrice: 0,
    emiText: "Doorstep Delivery",
    badge: "VIP EXPERIENCE LOUNGES",
    specs: {
      chip: "30 Min",
      chipSub: "Express Repair Lab",
      display: "Live Demo",
      displaySub: "Hands-on Display Tables",
      camera: "Valet",
      cameraSub: "Parking & VIP Lounges",
      battery: "7 Days",
      batterySub: "Open 10 AM - 10 PM"
    },
    colors: {
      red: {
        title: "Amravati Flagship Lounge",
        bodyGrad: "linear-gradient(135deg, #18181b 0%, #3f3f46 45%, #09090b 100%)",
        wallGrad: "radial-gradient(circle at 50% 40%, #27272a 0%, #09090b 60%, #000000 100%)",
        haloColor: "rgba(255, 30, 66, 0.45)",
        reflColor: "rgba(255, 30, 66, 0.3)"
      }
    }
  }
];

// 2. State Variables
let currentDeviceIndex = 0;
let currentColorKey = "red";
let currentStorageKey = "256GB";
let currentPrice = 179900;
let cart = JSON.parse(localStorage.getItem("mobileStationCart")) || [];

// Helper Selectors
const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => [...document.querySelectorAll(selector)];

function formatINR(amount) {
  return "₹" + Number(amount).toLocaleString("en-IN");
}

// 3. Update Hero Device
function selectHeroDevice(index) {
  currentDeviceIndex = index;
  const device = SHOWROOM_DEVICES[index];

  // Update Texts
  $("#heroTitle").innerHTML = `${device.name.split(" ")[0]} ${device.name.split(" ")[1]} <span class="text-gradient-red">${device.spanText}</span>`;
  $("#heroSubtitle").textContent = device.subtitle;
  $("#cardTitle").textContent = device.name;
  $("#cardBadge").textContent = device.badge;

  // Update Specs HUD
  $("#specChip").textContent = device.specs.chip;
  $("#specDisplay").textContent = device.specs.display;
  $("#specCamera").textContent = device.specs.camera;
  $("#specBattery").textContent = device.specs.battery;

  // Update Price
  updateCalculatedPrice();

  // Update Color Finish
  updateColorTheme(currentColorKey);

  // Update Active Dock Button
  $$(".device-dock-btn").forEach((btn, i) => {
    btn.classList.toggle("active", i === index);
  });
}

// 4. Update Color Theme & Visuals
function updateColorTheme(colorKey) {
  currentColorKey = colorKey;
  const device = SHOWROOM_DEVICES[currentDeviceIndex];
  const colorData = device.colors[colorKey] || device.colors.red;

  // Update label
  $("#colorName").textContent = colorData.title;

  // Update Phone chassis & Screen wallpaper
  const heroPhone = $("#heroPhone");
  if (heroPhone) {
    heroPhone.style.background = colorData.bodyGrad;
  }
  const screenWallpaper = $("#screenWallpaper");
  if (screenWallpaper) {
    screenWallpaper.style.background = colorData.wallGrad;
  }

  // Update Halo & Floor Reflection
  const portalHalo = $("#portalHalo");
  if (portalHalo) {
    portalHalo.style.borderColor = colorData.haloColor;
    portalHalo.style.boxShadow = `0 0 70px ${colorData.haloColor}, inset 0 0 50px ${colorData.haloColor}`;
  }
  const floorReflection = $("#floorReflection");
  if (floorReflection) {
    floorReflection.style.background = `radial-gradient(ellipse, ${colorData.reflColor} 0%, transparent 80%)`;
  }
  const phoneReflection = $("#phoneReflection");
  if (phoneReflection) {
    phoneReflection.style.background = `linear-gradient(180deg, ${colorData.reflColor} 0%, transparent 80%)`;
  }

  // Update Swatch Active State
  $$(".swatch-btn").forEach((btn) => {
    btn.classList.toggle("active", btn.dataset.color === colorKey);
  });
}

// 5. Update Storage & Price Calculation
function updateCalculatedPrice() {
  const device = SHOWROOM_DEVICES[currentDeviceIndex];
  let price = device.basePrice;

  if (currentStorageKey === "512GB") price += 20000;
  if (currentStorageKey === "1TB") price += 40000;
  if (currentStorageKey === "2TB") price += 70000;

  currentPrice = price;
  $("#cardPrice").textContent = formatINR(price);
}

// 6. Interactive 3D Phone Mouse Tracking & Parallax
let targetRotX = 0;
let targetRotY = 0;
let currentRotX = 0;
let currentRotY = 0;

window.addEventListener("pointermove", (e) => {
  const normX = e.clientX / window.innerWidth - 0.5;
  const normY = e.clientY / window.innerHeight - 0.5;

  targetRotY = normX * 28; // Yaw
  targetRotX = -normY * 18; // Pitch
});

function animate3DStage() {
  currentRotX += (targetRotX - currentRotX) * 0.08;
  currentRotY += (targetRotY - currentRotY) * 0.08;

  const phoneWrap = $("#heroPhoneWrap");
  if (phoneWrap) {
    phoneWrap.style.transform = `
      rotateY(${-18 + currentRotY}deg)
      rotateX(${10 + currentRotX}deg)
      rotateZ(-4deg)
      translateY(-15px)
    `;
  }

  requestAnimationFrame(animate3DStage);
}
animate3DStage();

// 7. Scroll-driven Showroom Rotation
window.addEventListener("scroll", () => {
  const hero = $(".hero-showroom");
  if (!hero) return;

  const rect = hero.getBoundingClientRect();
  const progress = Math.max(0, Math.min(1, -rect.top / (hero.offsetHeight * 0.75)));
  const scrollRotate = progress * 70;
  const scrollTranslate = progress * 90;

  const phone = $("#heroPhone");
  if (phone) {
    phone.style.transform = `
      rotateY(${-18 + currentRotY + scrollRotate}deg)
      rotateX(${10 + currentRotX}deg)
      rotateZ(${-4 + progress * 8}deg)
      translateY(-${15 + scrollTranslate}px)
    `;
  }

  // Navbar scrolled class
  const navbar = $("#siteNav");
  if (navbar) {
    navbar.classList.toggle("scrolled", window.scrollY > 50);
  }
});

// 8. Shopping Bag & WhatsApp Checkout
function toast(message) {
  const toastEl = $("#toast");
  if (!toastEl) return;
  toastEl.textContent = message;
  toastEl.classList.add("show");
  setTimeout(() => {
    toastEl.classList.remove("show");
  }, 2400);
}

function addToBag(item) {
  const existing = cart.find(
    (c) => c.name === item.name && c.color === item.color && c.storage === item.storage
  );

  if (existing) {
    existing.qty += 1;
  } else {
    cart.push({ ...item, qty: 1 });
  }

  saveCart();
  toast(`✓ ${item.name} (${item.storage}) added to bag!`);
  openCartDrawer();
}

function saveCart() {
  localStorage.setItem("mobileStationCart", JSON.stringify(cart));
  renderCart();
}

function renderCart() {
  const totalCount = cart.reduce((acc, item) => acc + item.qty, 0);
  $("#cartCount").textContent = totalCount;
  $("#drawerItemCount").textContent = `${totalCount} Items`;

  const cartContainer = $("#cartItems");
  if (!cart.length) {
    cartContainer.innerHTML = `
      <div class="cart-empty-state">
        <span class="empty-icon">🛍️</span>
        <h4>Your Bag is Empty</h4>
        <p>Explore our latest flagships and add devices to your order.</p>
        <button type="button" class="btn-buy-primary" onclick="document.getElementById('closeCart').click();" style="width: auto; margin-top: 14px; padding: 10px 22px;">Explore Devices →</button>
      </div>
    `;
    $("#subtotal").textContent = "₹0";
    return;
  }

  cartContainer.innerHTML = cart
    .map(
      (item, index) => `
      <div class="cart-item-row">
        <div>
          <div class="cart-item-name">${item.name}</div>
          <div class="cart-item-meta">${item.color} • ${item.storage} • Qty: ${item.qty}</div>
          <div class="cart-item-price">${formatINR(item.price * item.qty)}</div>
        </div>
        <button type="button" class="btn-remove-item" onclick="removeCartItem(${index})">Remove</button>
      </div>
    `
    )
    .join("");

  const subtotal = cart.reduce((acc, item) => acc + item.price * item.qty, 0);
  $("#subtotal").textContent = formatINR(subtotal);
}

function removeCartItem(index) {
  cart.splice(index, 1);
  saveCart();
}

function openCartDrawer() {
  $("#cartDrawer").classList.add("open");
  $("#overlay").classList.add("show");
}

function closeCartDrawer() {
  $("#cartDrawer").classList.remove("open");
  $("#overlay").classList.remove("show");
}

// 9. WhatsApp Order Builder
function openWhatsAppOrder(customText = "") {
  const phone = "917499181193";
  let message = customText;

  if (!message) {
    if (!cart.length) {
      const dev = SHOWROOM_DEVICES[currentDeviceIndex];
      message = `Hi Mobile Station, I'm interested in buying the *${dev.name}* (${currentStorageKey}, ${$("#colorName").textContent}).\nPlease share current showroom availability and VIP delivery details.`;
    } else {
      const itemsList = cart
        .map((it) => `• ${it.name} (${it.storage}, ${it.color}) x${it.qty} = ${formatINR(it.price * it.qty)}`)
        .join("\n");
      const subtotal = cart.reduce((acc, item) => acc + item.price * item.qty, 0);
      message = `Hi Mobile Station, I want to confirm my bag order:\n\n${itemsList}\n\n*Total:* ${formatINR(subtotal)}\n\nPlease proceed with VIP invoice and delivery slot.`;
    }
  }

  window.open(`https://wa.me/${phone}?text=${encodeURIComponent(message)}`, "_blank");
}

// 10. Trade-In Valuation Calculator
function calculateTrade() {
  const modelVal = Number($("#tradeModel").value) || 50000;
  const conditionMult = Number($("#tradeCondition").value) || 1.0;
  const estimated = Math.round(modelVal * conditionMult);

  $("#tradeEstimateVal").textContent = formatINR(estimated);
}

// 11. Initial DOM Load Event Listeners
document.addEventListener("DOMContentLoaded", () => {
  renderCart();

  // Render Mini Device Switchers in Hero Dock
  const dockContainer = $("#miniProducts");
  if (dockContainer) {
    dockContainer.innerHTML = SHOWROOM_DEVICES.map(
      (dev, i) => `
      <button type="button" class="device-dock-btn ${i === 0 ? "active" : ""}" onclick="selectHeroDevice(${i})">
        <span>${dev.brand === "apple" ? "" : dev.brand === "samsung" ? "✦" : "G"}</span>
        <span>${dev.name}</span>
      </button>
    `
    ).join("");
  }

  // Render Flagship Grid Catalog
  const gridContainer = $("#productGrid");
  if (gridContainer) {
    gridContainer.innerHTML = SHOWROOM_DEVICES.map(
      (dev, i) => `
      <article class="product-item-card" data-brand="${dev.brand}">
        <span class="product-tag-chip">${dev.badge}</span>
        <div class="card-product-stage" style="padding: 12px; background: rgba(0, 0, 0, 0.4); border-radius: var(--radius-lg); height: 210px; overflow: hidden; display: flex; align-items: center; justify-content: center;">
          <img src="${dev.image}" alt="${dev.name}" style="width: 100%; height: 100%; object-fit: cover; border-radius: var(--radius-md);">
        </div>
        <h3 class="card-item-title">${dev.name}</h3>
        <p class="card-item-desc">${dev.subtitle}</p>
        <div class="card-item-specs-row">
          <span class="spec-mini-pill">${dev.specs.chip}</span>
          <span class="spec-mini-pill">${dev.specs.display}</span>
          <span class="spec-mini-pill">${dev.specs.camera}</span>
        </div>
        <div class="card-item-footer">
          <div class="card-item-price">${dev.basePrice ? formatINR(dev.basePrice) : "VIP Lounge"}</div>
          <button type="button" class="btn-card-add" onclick="addCatalogDevice(${i})">Add to Bag +</button>
        </div>
      </article>
    `
    ).join("");
  }

  // Swatch Buttons Click
  $$(".swatch-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      updateColorTheme(btn.dataset.color);
    });
  });

  // Storage Buttons Click
  $$(".storage-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      $$(".storage-btn").forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      currentStorageKey = btn.dataset.storage;
      updateCalculatedPrice();
    });
  });

  // Add Hero Device to Bag
  $("#btnAddToBagHero").addEventListener("click", () => {
    const dev = SHOWROOM_DEVICES[currentDeviceIndex];
    addToBag({
      name: dev.name,
      storage: currentStorageKey,
      color: $("#colorName").textContent,
      price: currentPrice
    });
  });

  // Hero WhatsApp Quote
  $("#btnWaHero").addEventListener("click", () => {
    const dev = SHOWROOM_DEVICES[currentDeviceIndex];
    openWhatsAppOrder(
      `Hi Mobile Station, I want a best price VIP quote for *${dev.name}* (${currentStorageKey}, ${$("#colorName").textContent}).`
    );
  });

  // Drawer Open/Close
  $("#cartBtn").addEventListener("click", openCartDrawer);
  $("#closeCart").addEventListener("click", closeCartDrawer);
  $("#overlay").addEventListener("click", () => {
    closeCartDrawer();
    closeCallbackModal();
  });

  // Drawer WhatsApp Checkout
  $("#checkoutWa").addEventListener("click", () => {
    openWhatsAppOrder();
  });

  // Callback Modal Triggering
  $$(".callback-open").forEach((btn) => {
    btn.addEventListener("click", openCallbackModal);
  });
  $("#closeModal").addEventListener("click", closeCallbackModal);

  // Callback Form Submit
  $("#callbackForm").addEventListener("submit", (e) => {
    e.preventDefault();
    $("#successMsg").classList.add("show");
    e.target.reset();
    setTimeout(() => {
      closeCallbackModal();
      $("#successMsg").classList.remove("show");
    }, 2200);
  });

  // Trade Calculator Inputs
  $("#tradeModel").addEventListener("change", calculateTrade);
  $("#tradeCondition").addEventListener("change", calculateTrade);
  $("#btnLockExchange").addEventListener("click", () => {
    const brand = $("#tradeBrand").selectedOptions[0].text;
    const model = $("#tradeModel").selectedOptions[0].text;
    const estimate = $("#tradeEstimateVal").textContent;
    openWhatsAppOrder(
      `Hi Mobile Station, I want to lock in an exchange trade-in value for my *${brand} - ${model}*.\nEstimated valuation on website: *${estimate}*.\nPlease confirm inspection and exchange bonus.`
    );
  });

  // Category Filter Pills
  $$(".filter-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      $$(".filter-btn").forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      const filter = btn.dataset.filter;
      $$(".product-item-card").forEach((card) => {
        if (filter === "all" || card.dataset.brand === filter) {
          card.style.display = "flex";
        } else {
          card.style.display = "none";
        }
      });
    });
  });

  // Mobile Menu Toggle
  const menuBtn = $("#menuBtn");
  const navLinks = $(".nav-links");
  if (menuBtn && navLinks) {
    menuBtn.addEventListener("click", () => {
      const isVisible = navLinks.style.display === "flex";
      navLinks.style.display = isVisible ? "none" : "flex";
      if (!isVisible) {
        navLinks.style.position = "absolute";
        navLinks.style.top = "70px";
        navLinks.style.left = "0";
        navLinks.style.right = "0";
        navLinks.style.padding = "24px";
        navLinks.style.background = "#06070a";
        navLinks.style.flexDirection = "column";
        navLinks.style.borderBottom = "1px solid rgba(255,30,66,0.3)";
      }
    });
  }
});

function addCatalogDevice(index) {
  const dev = SHOWROOM_DEVICES[index];
  addToBag({
    name: dev.name,
    storage: "256GB",
    color: dev.colors.red.title,
    price: dev.basePrice
  });
}

function openCallbackModal() {
  $("#callbackModal").classList.add("open");
  const activeDev = SHOWROOM_DEVICES[currentDeviceIndex];
  $("#callbackDeviceInput").value = `${activeDev.name} (${currentStorageKey})`;
}

function closeCallbackModal() {
  $("#callbackModal").classList.remove("open");
}
