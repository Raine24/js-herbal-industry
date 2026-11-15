/**
 * JS HERBAL INDUSTRY — TIBICO FERMENTARY INTERACTIVE STOREFRONT ENGINE
 * Implements all transitions, animations, keyboard-first accessibility,
 * hero slider, scroll reveals (AOS), progress indicator, and WhatsApp ordering.
 */

document.addEventListener("DOMContentLoaded", () => {
  /* --------------------------------------------------------------------------
   * 1. PAGE LOADER FADE-OUT (Exact Tibico .page-loader behavior)
   * -------------------------------------------------------------------------- */
  const pageLoader = document.getElementById("pageLoader");
  if (pageLoader) {
    setTimeout(() => {
      pageLoader.classList.add("is-hidden");
    }, 550);
  }

  /* --------------------------------------------------------------------------
   * 2. SCROLL PROGRESS BAR, STICKY HEADER & BACK-TO-TOP BUTTON
   * -------------------------------------------------------------------------- */
  const scrollProgress = document.getElementById("scrollProgress");
  const stickyHeader = document.getElementById("stickyHeader");
  const backToTopBtn = document.getElementById("ButtonBackToTop");
  const floatingButtons = document.querySelector(".floating-buttons");

  const handleScroll = () => {
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const docHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const pct = docHeight > 0 ? Math.min(100, Math.max(0, (scrollTop / docHeight) * 100)) : 0;

    if (scrollProgress) {
      scrollProgress.style.width = `${pct}%`;
    }

    if (stickyHeader) {
      stickyHeader.classList.toggle("is-scrolled", scrollTop > 24);
    }

    if (floatingButtons) {
      floatingButtons.classList.toggle("is-visible", scrollTop > 320);
    }

    if (backToTopBtn) {
      backToTopBtn.classList.toggle("is-visible", scrollTop > 420);
    }
  };

  window.addEventListener("scroll", handleScroll, { passive: true });
  handleScroll();

  if (backToTopBtn) {
    backToTopBtn.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  /* --------------------------------------------------------------------------
   * 3. AOS SCROLL REVEAL OBSERVER ([data-aos="fade-up"])
   * -------------------------------------------------------------------------- */
  const aosElements = document.querySelectorAll('[data-aos="fade-up"]');
  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("aos-animate");
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );
    aosElements.forEach((el) => observer.observe(el));
  } else {
    aosElements.forEach((el) => el.classList.add("aos-animate"));
  }

  /* --------------------------------------------------------------------------
   * 4. HERO SLIDER CAROUSEL (Keyboard, Pointer, Touch & Auto-Cycle)
   * -------------------------------------------------------------------------- */
  const slides = Array.from(document.querySelectorAll(".hero-slider__cell"));
  const dots = Array.from(document.querySelectorAll(".hero-slider__dot"));
  const prevBtn = document.getElementById("heroPrev");
  const nextBtn = document.getElementById("heroNext");
  const heroSlider = document.getElementById("heroSlider");
  let currentSlide = 0;
  let slideTimer = null;

  const goToSlide = (index) => {
    if (!slides.length) return;
    currentSlide = (index + slides.length) % slides.length;
    slides.forEach((slide, idx) => {
      slide.classList.toggle("is-selected", idx === currentSlide);
    });
    dots.forEach((dot, idx) => {
      dot.setAttribute("aria-selected", idx === currentSlide ? "true" : "false");
    });
  };

  const startAutoplay = () => {
    stopAutoplay();
    slideTimer = setInterval(() => {
      goToSlide(currentSlide + 1);
    }, 9000);
  };

  const stopAutoplay = () => {
    if (slideTimer) {
      clearInterval(slideTimer);
      slideTimer = null;
    }
  };

  if (prevBtn) {
    prevBtn.addEventListener("click", () => {
      goToSlide(currentSlide - 1);
      startAutoplay();
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener("click", () => {
      goToSlide(currentSlide + 1);
      startAutoplay();
    });
  }

  dots.forEach((dot) => {
    dot.addEventListener("click", () => {
      const target = parseInt(dot.getAttribute("data-slide-to") || "0", 10);
      goToSlide(target);
      startAutoplay();
    });
  });

  if (heroSlider) {
    heroSlider.addEventListener("mouseenter", stopAutoplay);
    heroSlider.addEventListener("mouseleave", startAutoplay);
    heroSlider.addEventListener("focusin", stopAutoplay);
    heroSlider.addEventListener("focusout", startAutoplay);

    // Touch swipe support
    let touchStartX = 0;
    heroSlider.addEventListener(
      "touchstart",
      (e) => {
        touchStartX = e.changedTouches[0].screenX;
      },
      { passive: true }
    );
    heroSlider.addEventListener(
      "touchend",
      (e) => {
        const diff = e.changedTouches[0].screenX - touchStartX;
        if (Math.abs(diff) > 45) {
          goToSlide(diff < 0 ? currentSlide + 1 : currentSlide - 1);
          startAutoplay();
        }
      },
      { passive: true }
    );
  }

  startAutoplay();

  /* --------------------------------------------------------------------------
   * 5. INTERACTIVE WHATSAPP ORDER LIST DRAWER (.cart-drawer-panel)
   * -------------------------------------------------------------------------- */
  const inquiryState = [
    { id: "herbal", name: "1. Herbal Products", desc: "Botanical ingredients and herbal formulations", qty: 1 },
    { id: "skincare", name: "2. Skincare Products", desc: "Skin nourishment and personal grooming", qty: 1 },
    { id: "wellness", name: "3. Wellness Products", desc: "Healthy lifestyle and personal wellness", qty: 1 }
  ];

  const drawerOverlay = document.getElementById("drawerOverlay");
  const cartDrawer = document.getElementById("cartDrawer");
  const searchDrawer = document.getElementById("searchDrawer");
  const mobileDrawer = document.getElementById("mobileDrawer");
  const openCartBtn = document.getElementById("openCartBtn");
  const closeCartBtn = document.getElementById("closeCartBtn");
  const openSearchBtn = document.getElementById("openSearchBtn");
  const closeSearchBtn = document.getElementById("closeSearchBtn");
  const mobileMenuBtn = document.getElementById("mobileMenuBtn");
  const closeMobileMenuBtn = document.getElementById("closeMobileMenuBtn");
  const drawerItemsList = document.getElementById("drawerItemsList");
  const cartCountBubble = document.getElementById("cartCountBubble");
  const checkoutWhatsAppBtn = document.getElementById("checkoutWhatsAppBtn");

  const renderDrawerItems = () => {
    if (!drawerItemsList) return;
    const totalQty = inquiryState.reduce((sum, item) => sum + item.qty, 0);
    if (cartCountBubble) {
      cartCountBubble.textContent = String(totalQty);
    }

    drawerItemsList.innerHTML = inquiryState
      .map(
        (item, idx) => `
      <div style="background: var(--color-surface-raised); padding: 14px 16px; border-radius: var(--radius-panel); display: flex; align-items: center; justify-content: space-between; gap: 12px;">
        <div>
          <strong style="display: block; font-size: 15px;">${item.name}</strong>
          <span style="font-size: 12.5px; color: var(--color-text-muted);">${item.desc}</span>
        </div>
        <div style="display: inline-flex; align-items: center; gap: 8px; background: #fff; padding: 4px 8px; border-radius: 999px; border: 1px solid var(--color-border-subtle);">
          <button type="button" class="js-qty-btn" data-index="${idx}" data-delta="-1" aria-label="Decrease quantity for ${item.name}" style="border:0;background:none;cursor:pointer;font-weight:900;font-size:16px;width:24px;height:24px;">−</button>
          <span style="font-size: 14px; font-weight: 700; min-width: 18px; text-align: center;">${item.qty}</span>
          <button type="button" class="js-qty-btn" data-index="${idx}" data-delta="1" aria-label="Increase quantity for ${item.name}" style="border:0;background:none;cursor:pointer;font-weight:900;font-size:16px;width:24px;height:24px;">+</button>
        </div>
      </div>
    `
      )
      .join("");

    drawerItemsList.querySelectorAll(".js-qty-btn").forEach((btn) => {
      btn.addEventListener("click", () => {
        const idx = parseInt(btn.getAttribute("data-index") || "0", 10);
        const delta = parseInt(btn.getAttribute("data-delta") || "0", 10);
        inquiryState[idx].qty = Math.max(0, inquiryState[idx].qty + delta);
        renderDrawerItems();
      });
    });
  };

  const openDrawer = (drawerEl) => {
    if (!drawerEl || !drawerOverlay) return;
    drawerOverlay.classList.add("is-open");
    drawerEl.classList.add("is-open");
    drawerEl.focus();
  };

  const closeAllDrawers = () => {
    if (drawerOverlay) drawerOverlay.classList.remove("is-open");
    if (cartDrawer) cartDrawer.classList.remove("is-open");
    if (searchDrawer) searchDrawer.classList.remove("is-open");
    if (mobileDrawer) mobileDrawer.classList.remove("is-open");
    if (mobileMenuBtn) mobileMenuBtn.setAttribute("aria-expanded", "false");
  };

  if (openCartBtn) openCartBtn.addEventListener("click", () => openDrawer(cartDrawer));
  if (closeCartBtn) closeCartBtn.addEventListener("click", closeAllDrawers);
  if (openSearchBtn) openSearchBtn.addEventListener("click", () => openDrawer(searchDrawer));
  if (closeSearchBtn) closeSearchBtn.addEventListener("click", closeAllDrawers);
  if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener("click", () => {
      mobileMenuBtn.setAttribute("aria-expanded", "true");
      openDrawer(mobileDrawer);
    });
  }
  if (closeMobileMenuBtn) closeMobileMenuBtn.addEventListener("click", closeAllDrawers);
  document.querySelectorAll(".js-mobile-nav-link").forEach((link) => {
    link.addEventListener("click", closeAllDrawers);
  });
  if (drawerOverlay) drawerOverlay.addEventListener("click", closeAllDrawers);

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      closeAllDrawers();
    }
  });

  document.querySelectorAll(".js-add-inquiry").forEach((btn) => {
    btn.addEventListener("click", () => {
      const prodName = btn.getAttribute("data-product") || "";
      const found = inquiryState.find((i) => i.name === prodName);
      if (found) {
        found.qty += 1;
      }
      renderDrawerItems();
      openDrawer(cartDrawer);
    });
  });

  if (checkoutWhatsAppBtn) {
    checkoutWhatsAppBtn.addEventListener("click", () => {
      const selected = inquiryState.filter((i) => i.qty > 0);
      const lines = selected.length
        ? selected.map((i) => `- ${i.name} (Qty: ${i.qty})`).join("\n")
        : "- General Product & Price Inquiry";
      const text = encodeURIComponent(
        `Hello JS Herbal Industry!\n\nI would like to inquire about and place an order for the following products:\n${lines}\n\nPlease guide me regarding pricing and the ordering process.`
      );
      window.open(`https://wa.me/923427940339?text=${text}`, "_blank", "noopener");
    });
  }

  renderDrawerItems();

  /* --------------------------------------------------------------------------
   * 6. WHATSAPP ORDER BUILDER FORM (Validation, Loading & Error States)
   * -------------------------------------------------------------------------- */
  const waForm = document.getElementById("whatsappOrderForm");
  if (waForm) {
    waForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const cat = document.getElementById("waCategory");
      const prodName = document.getElementById("waProductName");
      const qty = document.getElementById("waQuantity");
      const notes = document.getElementById("waNotes");
      const prodErr = document.getElementById("waProductError");
      const qtyErr = document.getElementById("waQtyError");
      const submitBtn = document.getElementById("waSubmitBtn");

      let valid = true;
      if (prodName && !prodName.value.trim()) {
        prodName.setAttribute("aria-invalid", "true");
        if (prodErr) prodErr.classList.add("is-visible");
        valid = false;
      } else if (prodName) {
        prodName.removeAttribute("aria-invalid");
        if (prodErr) prodErr.classList.remove("is-visible");
      }

      if (qty && (Number(qty.value) < 1 || Number.isNaN(Number(qty.value)))) {
        qty.setAttribute("aria-invalid", "true");
        if (qtyErr) qtyErr.classList.add("is-visible");
        valid = false;
      } else if (qty) {
        qty.removeAttribute("aria-invalid");
        if (qtyErr) qtyErr.classList.remove("is-visible");
      }

      if (!valid) return;

      if (submitBtn) {
        submitBtn.classList.add("is-loading");
      }

      setTimeout(() => {
        if (submitBtn) {
          submitBtn.classList.remove("is-loading");
        }
        const message = encodeURIComponent(
          `Hello JS Herbal Industry!\n\n` +
            `Category: ${cat ? cat.value : ""}\n` +
            `Required Product: ${prodName ? prodName.value.trim() : ""}\n` +
            `Quantity: ${qty ? qty.value : "1"}\n` +
            (notes && notes.value.trim() ? `Notes: ${notes.value.trim()}\n` : "") +
            `\nPlease guide me regarding pricing and the ordering process.`
        );
        window.open(`https://wa.me/923427940339?text=${message}`, "_blank", "noopener");
      }, 250);
    });
  }

  /* --------------------------------------------------------------------------
   * 7. CONTACT INQUIRY FORM (Validation & WhatsApp Dispatch)
   * -------------------------------------------------------------------------- */
  const contactForm = document.getElementById("contactInquiryForm");
  if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const nameInput = document.getElementById("senderName");
      const phoneInput = document.getElementById("senderPhone");
      const emailInput = document.getElementById("senderEmail");
      const msgInput = document.getElementById("senderMessage");
      const nameError = document.getElementById("nameError");
      const phoneError = document.getElementById("phoneError");
      const msgError = document.getElementById("msgError");
      const statusEl = document.getElementById("contactFormStatus");

      let valid = true;
      if (nameInput && !nameInput.value.trim()) {
        nameInput.setAttribute("aria-invalid", "true");
        if (nameError) nameError.classList.add("is-visible");
        valid = false;
      } else if (nameInput) {
        nameInput.removeAttribute("aria-invalid");
        if (nameError) nameError.classList.remove("is-visible");
      }

      if (phoneInput && !phoneInput.value.trim()) {
        phoneInput.setAttribute("aria-invalid", "true");
        if (phoneError) phoneError.classList.add("is-visible");
        valid = false;
      } else if (phoneInput) {
        phoneInput.removeAttribute("aria-invalid");
        if (phoneError) phoneError.classList.remove("is-visible");
      }

      if (msgInput && !msgInput.value.trim()) {
        msgInput.setAttribute("aria-invalid", "true");
        if (msgError) msgError.classList.add("is-visible");
        valid = false;
      } else if (msgInput) {
        msgInput.removeAttribute("aria-invalid");
        if (msgError) msgError.classList.remove("is-visible");
      }

      if (!valid) return;

      if (statusEl) {
        statusEl.style.display = "block";
        statusEl.style.color = "var(--color-status-success)";
        statusEl.textContent = "Opening your message on WhatsApp...";
      }

      const text = encodeURIComponent(
        `Hello JS Herbal Industry!\n\n` +
          `Name: ${nameInput.value.trim()}\n` +
          `Phone: ${phoneInput.value.trim()}\n` +
          (emailInput && emailInput.value.trim() ? `Email: ${emailInput.value.trim()}\n` : "") +
          `Message: ${msgInput.value.trim()}`
      );
      window.open(`https://wa.me/923427940339?text=${text}`, "_blank", "noopener");
    });
  }

  /* --------------------------------------------------------------------------
   * 8. SITE SEARCH DRAWER FILTER
   * -------------------------------------------------------------------------- */
  const searchCatalog = [
    { title: "1. Herbal Products", desc: "Pure botanical ingredients and time-honored herbal formulations", href: "#our-products" },
    { title: "2. Skincare Products", desc: "Radiant skin nourishment and refined personal grooming", href: "#our-products" },
    { title: "3. Wellness Products", desc: "Healthy lifestyle, vitality, and personal wellness solutions", href: "#our-products" },
    { title: "About Us", desc: "JS Herbal Industry – The Perfect Synergy of Nature and Modern Technology", href: "#about-us" },
    { title: "Our Manufacturing Plant", desc: "Karachi Chowrangi, Karachi — Hygienic Extraction, Modern Blending & Packaging", href: "#manufacturing" },
    { title: "Mission & Vision", desc: "Bringing Natural Quality to Every Home & Benchmark of Trust", href: "#mission-vision" },
    { title: "Why Choose Us", desc: "Why Choose JS Herbal Industry? 6 Core Strengths", href: "#why-choose-us" },
    { title: "WhatsApp Ordering (0342-7940339)", desc: "Order Your Favorite Products Directly on WhatsApp", href: "#whatsapp-ordering" },
    { title: "Frequently Asked Questions (FAQs)", desc: "6 Essential Questions and Clear Guidance", href: "#faqs" }
  ];

  const siteSearchInput = document.getElementById("siteSearchInput");
  const searchResultsList = document.getElementById("searchResultsList");

  const renderSearch = (query = "") => {
    if (!searchResultsList) return;
    const q = query.trim().toLowerCase();
    const matches = searchCatalog.filter(
      (item) => !q || item.title.toLowerCase().includes(q) || item.desc.toLowerCase().includes(q)
    );
    searchResultsList.innerHTML = matches
      .map(
        (m) => `
      <a href="${m.href}" class="js-search-link" style="display:block;padding:12px 16px;background:var(--color-surface-raised);border-radius:var(--radius-panel);text-decoration:none;color:var(--color-text-primary);">
        <strong style="display:block;font-size:14.5px;">${m.title}</strong>
        <span style="font-size:12.5px;color:var(--color-text-muted);">${m.desc}</span>
      </a>
    `
      )
      .join("");

    searchResultsList.querySelectorAll(".js-search-link").forEach((link) => {
      link.addEventListener("click", closeAllDrawers);
    });
  };

  if (siteSearchInput) {
    siteSearchInput.addEventListener("input", () => renderSearch(siteSearchInput.value));
    renderSearch();
  }
});
