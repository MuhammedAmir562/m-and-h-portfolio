// Main Application Logic for "M and H" Blog Portfolio
document.addEventListener("DOMContentLoaded", () => {
  // State
  let currentCategory = "All";
  let searchQuery = "";
  let authorFilter = null;
  let bookmarkedIds = JSON.parse(localStorage.getItem("mandh_bookmarks") || "[]");
  let clappedIds = JSON.parse(localStorage.getItem("mandh_claps") || "{}");

  // DOM Elements
  const blogGrid = document.getElementById("blog-grid");
  const categoryFilters = document.getElementById("category-filters");
  const searchInput = document.getElementById("search-input");
  const clearSearchBtn = document.getElementById("clear-search-btn");
  const postsCountBadge = document.getElementById("posts-count-badge");
  const emptyState = document.getElementById("empty-state");
  const resetFiltersBtn = document.getElementById("reset-filters-btn");
  
  // Reader Modal Elements
  const articleModal = document.getElementById("article-modal");
  const modalCloseBtn = document.getElementById("modal-close-btn");
  const modalCategory = document.getElementById("modal-category");
  const modalTitle = document.getElementById("modal-title");
  const modalDate = document.getElementById("modal-date");
  const modalReadTime = document.getElementById("modal-read-time");
  const modalAuthorAvatar = document.getElementById("modal-author-avatar");
  const modalAuthorName = document.getElementById("modal-author-name");
  const modalAuthorRole = document.getElementById("modal-author-role");
  const modalCover = document.getElementById("modal-cover");
  const modalTags = document.getElementById("modal-tags");
  const modalContent = document.getElementById("modal-content");
  const modalClapBtn = document.getElementById("modal-clap-btn");
  const modalClapCount = document.getElementById("modal-clap-count");
  const modalCopyLinkBtn = document.getElementById("modal-copy-link-btn");
  let activeModalArticleId = null;

  // Hero Featured Story
  const heroFeaturedCard = document.getElementById("hero-featured-card");

  // Theme Toggle
  const themeToggleBtn = document.getElementById("theme-toggle-btn");
  const themeIconDark = document.getElementById("theme-icon-dark");
  const themeIconLight = document.getElementById("theme-icon-light");

  // Mobile Menu
  const mobileMenuBtn = document.getElementById("mobile-menu-btn");
  const mobileMenuDrawer = document.getElementById("mobile-menu-drawer");
  const mobileNavLinks = document.querySelectorAll(".mobile-nav-link");

  // Reading Progress Bar
  const readingProgressBar = document.getElementById("reading-progress-bar");

  // Newsletter & Contact
  const newsletterForm = document.getElementById("newsletter-form");
  const contactForm = document.getElementById("contact-form");
  const toastContainer = document.getElementById("toast-container");

  // Initialize
  initTheme();
  initCategories();
  renderFeaturedStory();
  renderArticles();
  setupEventListeners();

  // -------------------------------------------------------------
  // Theme Management
  // -------------------------------------------------------------
  function initTheme() {
    const savedTheme = localStorage.getItem("mandh_theme");
    if (savedTheme === "light") {
      document.documentElement.classList.add("light-theme");
      themeIconDark.classList.remove("hidden");
      themeIconLight.classList.add("hidden");
    } else {
      document.documentElement.classList.remove("light-theme");
      themeIconDark.classList.add("hidden");
      themeIconLight.classList.remove("hidden");
    }
  }

  function toggleTheme() {
    const isLight = document.documentElement.classList.toggle("light-theme");
    localStorage.setItem("mandh_theme", isLight ? "light" : "dark");
    if (isLight) {
      themeIconDark.classList.remove("hidden");
      themeIconLight.classList.add("hidden");
      showToast("Switched to Light Theme", "info");
    } else {
      themeIconDark.classList.add("hidden");
      themeIconLight.classList.remove("hidden");
      showToast("Switched to Obsidian Dark Theme", "info");
    }
  }

  // -------------------------------------------------------------
  // Category Filtering
  // -------------------------------------------------------------
  function initCategories() {
    if (!categoryFilters) return;
    categoryFilters.innerHTML = categoriesList
      .map(
        (cat) => `
        <button 
          data-category="${cat}"
          class="category-pill px-4 py-2 rounded-full text-xs md:text-sm font-medium transition-all duration-200 cursor-pointer border ${
            cat === currentCategory
              ? "bg-violet-600 text-white border-violet-500 shadow-md shadow-violet-600/30 font-semibold"
              : "bg-neutral-900/60 text-neutral-400 border-neutral-800 hover:text-white hover:border-neutral-700 hover:bg-neutral-800"
          }"
        >
          ${cat}
        </button>
      `
      )
      .join("");

    const pills = categoryFilters.querySelectorAll(".category-pill");
    pills.forEach((pill) => {
      pill.addEventListener("click", () => {
        currentCategory = pill.dataset.category;
        authorFilter = null; // reset author filter when choosing broad category
        updateActiveCategoryPill();
        renderArticles();
      });
    });
  }

  function updateActiveCategoryPill() {
    const pills = categoryFilters.querySelectorAll(".category-pill");
    pills.forEach((pill) => {
      const isSelected = pill.dataset.category === currentCategory && !authorFilter;
      if (isSelected) {
        pill.className =
          "category-pill px-4 py-2 rounded-full text-xs md:text-sm font-semibold transition-all duration-200 cursor-pointer border bg-violet-600 text-white border-violet-500 shadow-md shadow-violet-600/30";
      } else {
        pill.className =
          "category-pill px-4 py-2 rounded-full text-xs md:text-sm font-medium transition-all duration-200 cursor-pointer border bg-neutral-900/60 text-neutral-400 border-neutral-800 hover:text-white hover:border-neutral-700 hover:bg-neutral-800";
      }
    });
  }

  // -------------------------------------------------------------
  // Featured Story (Hero)
  // -------------------------------------------------------------
  function renderFeaturedStory() {
    if (!heroFeaturedCard) return;
    const featured = blogPosts.find((p) => p.featured) || blogPosts[0];
    const author = authorsData[featured.authorKey] || authorsData.duo;

    heroFeaturedCard.innerHTML = `
      <div class="relative overflow-hidden rounded-3xl glass-panel group cursor-pointer border border-neutral-800/80 hover:border-violet-500/50 transition-all duration-300">
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-0">
          <div class="lg:col-span-7 p-6 sm:p-8 md:p-10 flex flex-col justify-between">
            <div>
              <div class="flex items-center gap-3 mb-4">
                <span class="px-3 py-1 text-xs font-mono font-semibold uppercase tracking-wider rounded-full bg-violet-500/20 text-violet-300 border border-violet-500/30">
                  Featured Story
                </span>
                <span class="text-xs text-neutral-400 font-mono">${featured.category}</span>
                <span class="text-xs text-neutral-500">•</span>
                <span class="text-xs text-neutral-400 font-mono">${featured.readTime}</span>
              </div>
              <h2 class="text-2xl sm:text-3xl md:text-4xl font-display font-bold text-white group-hover:text-violet-300 transition-colors leading-tight mb-4">
                ${featured.title}
              </h2>
              <p class="text-neutral-300 text-sm sm:text-base leading-relaxed mb-6 line-clamp-3">
                ${featured.excerpt}
              </p>
            </div>

            <div class="pt-4 border-t border-neutral-800/80 flex items-center justify-between">
              <div class="flex items-center gap-3">
                <img src="${author.avatar}" alt="${author.name}" class="w-10 h-10 rounded-full object-cover border border-violet-400/40" />
                <div>
                  <div class="text-sm font-semibold text-white">${author.name}</div>
                  <div class="text-xs text-neutral-400">${featured.publishedDate}</div>
                </div>
              </div>
              <button 
                class="px-4 py-2 text-xs md:text-sm font-semibold text-white bg-violet-600 hover:bg-violet-500 rounded-xl transition-all shadow-lg shadow-violet-600/30 flex items-center gap-2"
              >
                Read Article
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"/>
                </svg>
              </button>
            </div>
          </div>
          <div class="lg:col-span-5 relative min-h-[260px] lg:min-h-full overflow-hidden">
            <img 
              src="${featured.coverImage}" 
              alt="${featured.title}" 
              class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 filter brightness-95"
            />
            <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent lg:bg-gradient-to-r lg:from-[#11131c] lg:via-transparent lg:to-transparent"></div>
          </div>
        </div>
      </div>
    `;

    heroFeaturedCard.addEventListener("click", () => {
      openArticleModal(featured.id);
    });
  }

  // -------------------------------------------------------------
  // Article Grid Rendering
  // -------------------------------------------------------------
  function getFilteredArticles() {
    return blogPosts.filter((post) => {
      // Category match
      const matchesCategory =
        currentCategory === "All" || post.category === currentCategory;

      // Author filter
      const matchesAuthor = !authorFilter || post.authorKey === authorFilter;

      // Search match
      const query = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !query ||
        post.title.toLowerCase().includes(query) ||
        post.excerpt.toLowerCase().includes(query) ||
        post.tags.some((t) => t.toLowerCase().includes(query)) ||
        (authorsData[post.authorKey] &&
          authorsData[post.authorKey].name.toLowerCase().includes(query));

      return matchesCategory && matchesAuthor && matchesSearch;
    });
  }

  function renderArticles() {
    const filtered = getFilteredArticles();

    if (postsCountBadge) {
      postsCountBadge.textContent = `${filtered.length} ${
        filtered.length === 1 ? "story" : "stories"
      }`;
    }

    if (filtered.length === 0) {
      blogGrid.innerHTML = "";
      emptyState.classList.remove("hidden");
      return;
    }

    emptyState.classList.add("hidden");

    blogGrid.innerHTML = filtered
      .map((post) => {
        const author = authorsData[post.authorKey] || authorsData.duo;
        const isBookmarked = bookmarkedIds.includes(post.id);
        const dynamicClaps = (clappedIds[post.id] || 0) + post.claps;

        return `
        <article 
          data-id="${post.id}"
          class="card-hover-effect glass-panel rounded-2xl overflow-hidden flex flex-col justify-between border border-neutral-800/80 group cursor-pointer"
        >
          <!-- Card Image & Badges -->
          <div class="relative overflow-hidden aspect-[16/10]">
            <img 
              src="${post.coverImage}" 
              alt="${post.title}" 
              loading="lazy"
              class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-80 group-hover:opacity-90 transition-opacity"></div>
            
            <!-- Category Badge -->
            <span class="absolute top-3 left-3 px-2.5 py-1 text-[11px] font-mono uppercase tracking-wider rounded-lg bg-neutral-900/80 backdrop-blur text-neutral-200 border border-neutral-700/60 font-semibold">
              ${post.category}
            </span>

            <!-- Bookmark Button -->
            <button 
              data-bookmark="${post.id}"
              title="Bookmark article"
              class="bookmark-btn absolute top-3 right-3 w-8 h-8 rounded-full bg-neutral-900/80 backdrop-blur border border-neutral-700/60 flex items-center justify-center text-neutral-300 hover:text-white hover:bg-neutral-800 transition-colors z-10"
            >
              <svg class="w-4 h-4 ${isBookmarked ? "text-violet-400 fill-violet-400" : ""}" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"/>
              </svg>
            </button>

            <!-- Read Time Pill -->
            <span class="absolute bottom-3 right-3 text-[11px] text-neutral-300 font-mono bg-black/60 backdrop-blur px-2 py-0.5 rounded">
              ${post.readTime}
            </span>
          </div>

          <!-- Card Body -->
          <div class="p-6 flex-1 flex flex-col justify-between">
            <div>
              <div class="flex items-center gap-2 text-xs text-neutral-400 mb-2 font-mono">
                <span>${post.publishedDate}</span>
                <span>•</span>
                <span class="text-violet-400 font-medium">${author.name}</span>
              </div>

              <h3 class="text-xl font-display font-bold text-white group-hover:text-violet-300 transition-colors leading-snug mb-3 line-clamp-2">
                ${post.title}
              </h3>

              <p class="text-sm text-neutral-400 leading-relaxed mb-4 line-clamp-3">
                ${post.excerpt}
              </p>
            </div>

            <div>
              <!-- Tag Pills -->
              <div class="flex flex-wrap gap-1.5 mb-5">
                ${post.tags
                  .slice(0, 3)
                  .map(
                    (tag) => `
                  <span class="text-[10px] font-mono px-2 py-0.5 rounded bg-neutral-800/80 text-neutral-300 border border-neutral-700/40">
                    #${tag}
                  </span>
                `
                  )
                  .join("")}
              </div>

              <!-- Footer Meta / Action -->
              <div class="pt-4 border-t border-neutral-800/80 flex items-center justify-between text-xs">
                <div class="flex items-center gap-2">
                  <img src="${author.avatar}" alt="${author.name}" class="w-6 h-6 rounded-full object-cover border border-neutral-700" />
                  <span class="text-neutral-300 font-medium">${author.shortName}</span>
                </div>

                <div class="flex items-center gap-3">
                  <span class="flex items-center gap-1 text-neutral-400 font-mono">
                    <svg class="w-3.5 h-3.5 text-neutral-500" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M2 10.5a1.5 1.5 0 113 0v6a1.5 1.5 0 01-3 0v-6zM6 10.333v5.43a2 2 0 001.106 1.79l.05.025A4 4 0 008.943 18h5.416a2 2 0 001.962-1.608l1.2-6A2 2 0 0015.56 8H12V4a2 2 0 00-2-2 1 1 0 00-1 1v.667a4 4 0 01-.8 2.4L6.8 7.933a4 4 0 00-.8 2.4z"/>
                    </svg>
                    ${dynamicClaps}
                  </span>
                  <span class="text-violet-400 group-hover:translate-x-1 transition-transform inline-flex items-center gap-1 font-semibold">
                    Read
                    <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
                    </svg>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </article>
      `;
      })
      .join("");

    // Attach card click handlers
    blogGrid.querySelectorAll("article").forEach((card) => {
      card.addEventListener("click", (e) => {
        // Prevent opening modal if bookmark button was clicked
        if (e.target.closest(".bookmark-btn")) {
          e.stopPropagation();
          const articleId = card.dataset.id;
          toggleBookmark(articleId);
          return;
        }
        openArticleModal(card.dataset.id);
      });
    });
  }

  // -------------------------------------------------------------
  // Bookmark Toggle
  // -------------------------------------------------------------
  function toggleBookmark(id) {
    if (bookmarkedIds.includes(id)) {
      bookmarkedIds = bookmarkedIds.filter((item) => item !== id);
      showToast("Removed from your bookmarks", "info");
    } else {
      bookmarkedIds.push(id);
      showToast("Saved to your bookmarks", "success");
    }
    localStorage.setItem("mandh_bookmarks", JSON.stringify(bookmarkedIds));
    renderArticles();
  }

  // -------------------------------------------------------------
  // Full Article Reader Modal
  // -------------------------------------------------------------
  function openArticleModal(id) {
    const post = blogPosts.find((p) => p.id === id);
    if (!post) return;

    activeModalArticleId = id;
    const author = authorsData[post.authorKey] || authorsData.duo;
    const dynamicClaps = (clappedIds[post.id] || 0) + post.claps;

    modalCategory.textContent = post.category;
    modalTitle.textContent = post.title;
    modalDate.textContent = post.publishedDate;
    modalReadTime.textContent = post.readTime;
    modalAuthorAvatar.src = author.avatar;
    modalAuthorAvatar.alt = author.name;
    modalAuthorName.textContent = author.name;
    modalAuthorRole.textContent = author.role;
    modalCover.src = post.coverImage;
    modalCover.alt = post.title;
    modalClapCount.textContent = dynamicClaps;

    // Tags
    modalTags.innerHTML = post.tags
      .map(
        (tag) => `
        <span class="text-xs font-mono px-2.5 py-1 rounded-full bg-neutral-800 text-neutral-300 border border-neutral-700">
          #${tag}
        </span>
      `
      )
      .join("");

    // Content
    modalContent.innerHTML = post.content;

    // Show modal & prevent background scrolling
    articleModal.classList.remove("hidden");
    document.body.classList.add("overflow-hidden");

    // Scroll modal view to top
    const modalInner = articleModal.querySelector(".modal-scroll-body");
    if (modalInner) modalInner.scrollTop = 0;
  }

  function closeArticleModal() {
    articleModal.classList.add("hidden");
    document.body.classList.remove("overflow-hidden");
    activeModalArticleId = null;
  }

  // -------------------------------------------------------------
  // Claps Handling
  // -------------------------------------------------------------
  function handleClap() {
    if (!activeModalArticleId) return;
    clappedIds[activeModalArticleId] =
      (clappedIds[activeModalArticleId] || 0) + 1;
    localStorage.setItem("mandh_claps", JSON.stringify(clappedIds));

    const currentPost = blogPosts.find((p) => p.id === activeModalArticleId);
    const newCount =
      currentPost.claps + clappedIds[activeModalArticleId];
    modalClapCount.textContent = newCount;

    // Visual button bounce
    modalClapBtn.classList.add("scale-110", "bg-violet-600");
    setTimeout(() => {
      modalClapBtn.classList.remove("scale-110", "bg-violet-600");
    }, 200);

    showToast("Clapped for this story! 👏", "success");
    renderArticles(); // keep grid sync'd
  }

  // -------------------------------------------------------------
  // Toast Notifications
  // -------------------------------------------------------------
  function showToast(message, type = "info") {
    if (!toastContainer) return;
    const toast = document.createElement("div");
    const bgClass =
      type === "success"
        ? "border-emerald-500/40 text-emerald-300"
        : type === "error"
        ? "border-rose-500/40 text-rose-300"
        : "border-violet-500/40 text-violet-300";

    toast.className = `toast-animate px-4 py-3 rounded-2xl glass-panel shadow-2xl flex items-center gap-3 text-sm border font-medium ${bgClass}`;
    toast.innerHTML = `
      <span class="w-2 h-2 rounded-full ${
        type === "success"
          ? "bg-emerald-400 animate-pulse"
          : type === "error"
          ? "bg-rose-400"
          : "bg-violet-400"
      }"></span>
      <span>${message}</span>
    `;

    toastContainer.appendChild(toast);

    setTimeout(() => {
      toast.style.opacity = "0";
      toast.style.transform = "translateY(10px)";
      toast.style.transition = "all 0.3s ease";
      setTimeout(() => toast.remove(), 300);
    }, 3000);
  }

  // -------------------------------------------------------------
  // Event Listeners
  // -------------------------------------------------------------
  function setupEventListeners() {
    // Theme Toggle
    if (themeToggleBtn) {
      themeToggleBtn.addEventListener("click", toggleTheme);
    }

    // Search Input
    if (searchInput) {
      searchInput.addEventListener("input", (e) => {
        searchQuery = e.target.value;
        if (clearSearchBtn) {
          if (searchQuery.length > 0) {
            clearSearchBtn.classList.remove("hidden");
          } else {
            clearSearchBtn.classList.add("hidden");
          }
        }
        renderArticles();
      });
    }

    if (clearSearchBtn) {
      clearSearchBtn.addEventListener("click", () => {
        searchInput.value = "";
        searchQuery = "";
        clearSearchBtn.classList.add("hidden");
        renderArticles();
      });
    }

    // Reset Filters Button
    if (resetFiltersBtn) {
      resetFiltersBtn.addEventListener("click", () => {
        currentCategory = "All";
        searchQuery = "";
        authorFilter = null;
        if (searchInput) searchInput.value = "";
        if (clearSearchBtn) clearSearchBtn.classList.add("hidden");
        updateActiveCategoryPill();
        renderArticles();
      });
    }

    // Modal Close
    if (modalCloseBtn) {
      modalCloseBtn.addEventListener("click", closeArticleModal);
    }

    if (articleModal) {
      // Close on clicking backdrop
      articleModal.addEventListener("click", (e) => {
        if (e.target === articleModal) {
          closeArticleModal();
        }
      });
    }

    // ESC key closes modal
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && activeModalArticleId) {
        closeArticleModal();
      }
    });

    // Modal Clap
    if (modalClapBtn) {
      modalClapBtn.addEventListener("click", handleClap);
    }

    // Modal Share Link
    if (modalCopyLinkBtn) {
      modalCopyLinkBtn.addEventListener("click", () => {
        const url = window.location.href.split("#")[0] + "#" + activeModalArticleId;
        if (navigator.clipboard) {
          navigator.clipboard.writeText(url).then(() => {
            showToast("Article link copied to clipboard!", "success");
          });
        } else {
          showToast("Link: " + url, "info");
        }
      });
    }

    // Author Filter buttons in Bio section
    document.querySelectorAll(".author-filter-btn").forEach((btn) => {
      btn.addEventListener("click", () => {
        const author = btn.dataset.author;
        authorFilter = author;
        currentCategory = "All";
        updateActiveCategoryPill();
        renderArticles();

        // Smooth scroll to articles section
        const blogSection = document.getElementById("stories");
        if (blogSection) {
          blogSection.scrollIntoView({ behavior: "smooth" });
        }
        const authorName = authorsData[author]?.name || author.toUpperCase();
        showToast(`Showing articles by ${authorName}`, "info");
      });
    });

    // Mobile Menu Toggle
    if (mobileMenuBtn && mobileMenuDrawer) {
      mobileMenuBtn.addEventListener("click", () => {
        mobileMenuDrawer.classList.toggle("hidden");
      });

      mobileNavLinks.forEach((link) => {
        link.addEventListener("click", () => {
          mobileMenuDrawer.classList.add("hidden");
        });
      });
    }

    // Reading Progress Bar on Scroll
    window.addEventListener("scroll", () => {
      if (!readingProgressBar) return;
      const winScroll =
        document.body.scrollTop || document.documentElement.scrollTop;
      const height =
        document.documentElement.scrollHeight -
        document.documentElement.clientHeight;
      const scrolled = (winScroll / height) * 100;
      readingProgressBar.style.width = scrolled + "%";
    });

    // Newsletter Form
    if (newsletterForm) {
      newsletterForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const emailInput = newsletterForm.querySelector("input[type='email']");
        if (emailInput && emailInput.value) {
          showToast("Welcome to M and H Dispatch! You're subscribed.", "success");
          emailInput.value = "";
        }
      });
    }

    // Contact Form
    if (contactForm) {
      contactForm.addEventListener("submit", (e) => {
        e.preventDefault();
        showToast("Your message was sent to M and H. Thank you!", "success");
        contactForm.reset();
      });
    }
  });
});
