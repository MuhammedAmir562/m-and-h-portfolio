// Emil Kowalski Inspired Application Logic for "M and H" Portfolio
(function () {
  function init() {
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

    // Modal Elements
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

    // Hero
    const heroFeaturedCard = document.getElementById("hero-featured-card");

    // Theme Switcher
    const themeToggleBtn = document.getElementById("theme-toggle-btn");
    const themeIconDark = document.getElementById("theme-icon-dark");
    const themeIconLight = document.getElementById("theme-icon-light");

    // Mobile Navigation
    const mobileMenuBtn = document.getElementById("mobile-menu-btn");
    const mobileMenuDrawer = document.getElementById("mobile-menu-drawer");

    // Forms
    const newsletterForm = document.getElementById("newsletter-form");
    const contactForm = document.getElementById("contact-form");
    const toastContainer = document.getElementById("toast-container");

    // Progress Bar
    const readingProgressBar = document.getElementById("reading-progress-bar");

    // Initialize Components
    initTheme();
    initCategories();
    renderFeaturedStory();
    renderArticles();
    bindEvents();

    // -------------------------------------------------------------
    // Sonner-Style Toast System
    // -------------------------------------------------------------
    function showToast(message, type = "info") {
      if (!toastContainer) return;

      const toast = document.createElement("div");
      toast.className = `
        toast-sonner flex items-center gap-3 px-4 py-3 rounded-xl 
        bg-[#12131e]/90 backdrop-blur-xl border border-white/10 shadow-2xl 
        text-xs font-medium transition-all duration-300 transform translate-y-4 opacity-0
      `;

      const dotColor =
        type === "success"
          ? "bg-emerald-400"
          : type === "error"
          ? "bg-rose-400"
          : "bg-violet-400";

      toast.innerHTML = `
        <span class="w-2 h-2 rounded-full ${dotColor} shrink-0 animate-pulse"></span>
        <span class="text-neutral-200 flex-1 leading-snug">${message}</span>
      `;

      toastContainer.appendChild(toast);

      // Trigger entrance frame
      requestAnimationFrame(() => {
        toast.classList.remove("translate-y-4", "opacity-0");
        toast.classList.add("translate-y-0", "opacity-100");
      });

      // Exit after 2.8s
      setTimeout(() => {
        toast.classList.remove("translate-y-0", "opacity-100");
        toast.classList.add("translate-y-2", "opacity-0");
        setTimeout(() => toast.remove(), 300);
      }, 2800);
    }

    // -------------------------------------------------------------
    // Theme Management
    // -------------------------------------------------------------
    function initTheme() {
      const savedTheme = localStorage.getItem("mandh_theme");
      if (savedTheme === "light") {
        document.documentElement.classList.add("light-theme");
        if (themeIconDark) themeIconDark.classList.remove("hidden");
        if (themeIconLight) themeIconLight.classList.add("hidden");
      } else {
        document.documentElement.classList.remove("light-theme");
        if (themeIconDark) themeIconDark.classList.add("hidden");
        if (themeIconLight) themeIconLight.classList.remove("hidden");
      }
    }

    function toggleTheme() {
      const isLight = document.documentElement.classList.toggle("light-theme");
      localStorage.setItem("mandh_theme", isLight ? "light" : "dark");
      if (isLight) {
        if (themeIconDark) themeIconDark.classList.remove("hidden");
        if (themeIconLight) themeIconLight.classList.add("hidden");
        showToast("Switched to Light Mode", "info");
      } else {
        if (themeIconDark) themeIconDark.classList.add("hidden");
        if (themeIconLight) themeIconLight.classList.remove("hidden");
        showToast("Switched to Dark Obsidian Mode", "info");
      }
    }

    // -------------------------------------------------------------
    // Categories
    // -------------------------------------------------------------
    function initCategories() {
      if (!categoryFilters) return;
      categoryFilters.innerHTML = categoriesList
        .map(
          (cat) => `
          <button 
            data-category="${cat}"
            class="category-pill px-4 py-1.5 rounded-full text-xs font-medium transition-all duration-200 cursor-pointer border active:scale-95 ${
              cat === currentCategory
                ? "bg-white text-black border-white font-semibold shadow-sm"
                : "bg-neutral-900/60 text-neutral-400 border-white/10 hover:text-white hover:border-white/20"
            }"
          >
            ${cat}
          </button>
        `
        )
        .join("");

      categoryFilters.querySelectorAll(".category-pill").forEach((pill) => {
        pill.addEventListener("click", () => {
          currentCategory = pill.dataset.category;
          authorFilter = null;
          updateCategoryPills();
          renderArticles();
        });
      });
    }

    function updateCategoryPills() {
      categoryFilters.querySelectorAll(".category-pill").forEach((pill) => {
        const isSelected = pill.dataset.category === currentCategory && !authorFilter;
        if (isSelected) {
          pill.className =
            "category-pill px-4 py-1.5 rounded-full text-xs font-semibold transition-all duration-200 cursor-pointer border bg-white text-black border-white shadow-sm active:scale-95";
        } else {
          pill.className =
            "category-pill px-4 py-1.5 rounded-full text-xs font-medium transition-all duration-200 cursor-pointer border bg-neutral-900/60 text-neutral-400 border-white/10 hover:text-white hover:border-white/20 active:scale-95";
        }
      });
    }

    // -------------------------------------------------------------
    // Featured Story
    // -------------------------------------------------------------
    function renderFeaturedStory() {
      if (!heroFeaturedCard) return;
      const featured = blogPosts.find((p) => p.featured) || blogPosts[0];
      const author = authorsData[featured.authorKey] || authorsData.duo;

      heroFeaturedCard.innerHTML = `
        <div class="relative overflow-hidden rounded-3xl glass-panel border border-white/10 hover:border-violet-500/40 transition-all duration-300 group cursor-pointer active:scale-[0.99]">
          <div class="grid grid-cols-1 lg:grid-cols-12 gap-0">
            <div class="lg:col-span-7 p-6 sm:p-8 md:p-10 flex flex-col justify-between">
              <div>
                <div class="flex items-center gap-3 mb-4">
                  <span class="px-3 py-1 text-[11px] font-mono font-semibold uppercase tracking-wider rounded-full bg-violet-500/20 text-violet-300 border border-violet-500/30">
                    Featured
                  </span>
                  <span class="text-xs text-neutral-400 font-mono">${featured.category}</span>
                  <span class="text-xs text-neutral-600">•</span>
                  <span class="text-xs text-neutral-400 font-mono">${featured.readTime}</span>
                </div>
                <h2 class="text-2xl sm:text-3xl md:text-4xl font-display font-bold text-white group-hover:text-violet-300 transition-colors leading-tight mb-4">
                  ${featured.title}
                </h2>
                <p class="text-neutral-300 text-sm sm:text-base leading-relaxed mb-6 line-clamp-3 font-light">
                  ${featured.excerpt}
                </p>
              </div>

              <div class="pt-4 border-t border-white/10 flex items-center justify-between">
                <div class="flex items-center gap-3">
                  <img src="${author.avatar}" alt="${author.name}" class="w-9 h-9 rounded-full object-cover border border-violet-400/40" />
                  <div>
                    <div class="text-xs font-semibold text-white">${author.name}</div>
                    <div class="text-[11px] text-neutral-400">${featured.publishedDate}</div>
                  </div>
                </div>
                <button 
                  class="px-4 py-2 text-xs font-semibold text-white bg-violet-600 hover:bg-violet-500 rounded-xl transition-all shadow-lg shadow-violet-600/20 flex items-center gap-2 active:scale-95"
                >
                  Read Article →
                </button>
              </div>
            </div>
            <div class="lg:col-span-5 relative min-h-[240px] lg:min-h-full overflow-hidden">
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
    // Articles Grid
    // -------------------------------------------------------------
    function getFilteredArticles() {
      return blogPosts.filter((post) => {
        const matchesCategory =
          currentCategory === "All" || post.category === currentCategory;
        const matchesAuthor = !authorFilter || post.authorKey === authorFilter;
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
        if (emptyState) emptyState.classList.remove("hidden");
        return;
      }

      if (emptyState) emptyState.classList.add("hidden");

      blogGrid.innerHTML = filtered
        .map((post) => {
          const author = authorsData[post.authorKey] || authorsData.duo;
          const isBookmarked = bookmarkedIds.includes(post.id);
          const dynamicClaps = (clappedIds[post.id] || 0) + post.claps;

          return `
          <article 
            data-id="${post.id}"
            class="card-hover-effect glass-panel rounded-2xl overflow-hidden flex flex-col justify-between border border-white/10 group cursor-pointer active:scale-[0.99] transition-all"
          >
            <div class="relative overflow-hidden aspect-[16/10]">
              <img 
                src="${post.coverImage}" 
                alt="${post.title}" 
                loading="lazy"
                class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-70"></div>
              
              <span class="absolute top-3 left-3 px-2.5 py-1 text-[10px] font-mono uppercase tracking-wider rounded-lg bg-black/70 backdrop-blur text-neutral-200 border border-white/10 font-medium">
                ${post.category}
              </span>

              <button 
                data-bookmark="${post.id}"
                title="Bookmark article"
                class="bookmark-btn absolute top-3 right-3 w-8 h-8 rounded-full bg-black/70 backdrop-blur border border-white/10 flex items-center justify-center text-neutral-300 hover:text-white hover:bg-neutral-800 transition-colors z-10 active:scale-90"
              >
                <svg class="w-4 h-4 ${isBookmarked ? "text-violet-400 fill-violet-400" : ""}" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"/>
                </svg>
              </button>

              <span class="absolute bottom-3 right-3 text-[10px] text-neutral-300 font-mono bg-black/70 backdrop-blur px-2 py-0.5 rounded">
                ${post.readTime}
              </span>
            </div>

            <div class="p-5 flex-1 flex flex-col justify-between">
              <div>
                <div class="flex items-center gap-2 text-xs text-neutral-400 mb-2 font-mono">
                  <span>${post.publishedDate}</span>
                  <span>•</span>
                  <span class="text-violet-400 font-medium">${author.name}</span>
                </div>

                <h3 class="text-lg font-display font-bold text-white group-hover:text-violet-300 transition-colors leading-snug mb-2 line-clamp-2">
                  ${post.title}
                </h3>

                <p class="text-xs text-neutral-400 leading-relaxed mb-4 line-clamp-3 font-light">
                  ${post.excerpt}
                </p>
              </div>

              <div>
                <div class="flex flex-wrap gap-1 mb-4">
                  ${post.tags
                    .slice(0, 3)
                    .map(
                      (tag) => `
                    <span class="text-[10px] font-mono px-2 py-0.5 rounded bg-white/5 text-neutral-400 border border-white/5">
                      #${tag}
                    </span>
                  `
                    )
                    .join("")}
                </div>

                <div class="pt-3 border-t border-white/10 flex items-center justify-between text-xs">
                  <div class="flex items-center gap-2">
                    <img src="${author.avatar}" alt="${author.name}" class="w-5 h-5 rounded-full object-cover border border-white/20" />
                    <span class="text-neutral-300 font-medium text-[11px]">${author.shortName}</span>
                  </div>

                  <div class="flex items-center gap-3">
                    <span class="flex items-center gap-1 text-neutral-400 font-mono text-[11px]">
                      👏 ${dynamicClaps}
                    </span>
                    <span class="text-violet-400 group-hover:translate-x-1 transition-transform inline-flex items-center gap-1 font-semibold text-[11px]">
                      Read →
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </article>
        `;
        })
        .join("");

      // Bind card actions
      blogGrid.querySelectorAll("article").forEach((card) => {
        card.addEventListener("click", (e) => {
          if (e.target.closest(".bookmark-btn")) {
            e.stopPropagation();
            toggleBookmark(card.dataset.id);
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
        showToast("Removed from bookmarks", "info");
      } else {
        bookmarkedIds.push(id);
        showToast("Saved to bookmarks", "success");
      }
      localStorage.setItem("mandh_bookmarks", JSON.stringify(bookmarkedIds));
      renderArticles();
    }

    // -------------------------------------------------------------
    // Article Modal
    // -------------------------------------------------------------
    function openArticleModal(id) {
      const post = blogPosts.find((p) => p.id === id);
      if (!post || !articleModal) return;

      activeModalArticleId = id;
      const author = authorsData[post.authorKey] || authorsData.duo;
      const dynamicClaps = (clappedIds[post.id] || 0) + post.claps;

      if (modalCategory) modalCategory.textContent = post.category;
      if (modalTitle) modalTitle.textContent = post.title;
      if (modalDate) modalDate.textContent = post.publishedDate;
      if (modalReadTime) modalReadTime.textContent = post.readTime;
      if (modalAuthorAvatar) {
        modalAuthorAvatar.src = author.avatar;
        modalAuthorAvatar.alt = author.name;
      }
      if (modalAuthorName) modalAuthorName.textContent = author.name;
      if (modalAuthorRole) modalAuthorRole.textContent = author.role;
      if (modalCover) {
        modalCover.src = post.coverImage;
        modalCover.alt = post.title;
      }
      if (modalClapCount) modalClapCount.textContent = dynamicClaps;

      if (modalTags) {
        modalTags.innerHTML = post.tags
          .map(
            (tag) => `
            <span class="text-xs font-mono px-2.5 py-1 rounded-full bg-white/5 text-neutral-300 border border-white/10">
              #${tag}
            </span>
          `
          )
          .join("");
      }

      if (modalContent) modalContent.innerHTML = post.content;

      articleModal.classList.remove("hidden");
      document.body.classList.add("overflow-hidden");

      const modalInner = articleModal.querySelector(".modal-scroll-body");
      if (modalInner) modalInner.scrollTop = 0;
    }

    function closeArticleModal() {
      if (!articleModal) return;
      articleModal.classList.add("hidden");
      document.body.classList.remove("overflow-hidden");
      activeModalArticleId = null;
    }

    // -------------------------------------------------------------
    // Claps
    // -------------------------------------------------------------
    function handleClap() {
      if (!activeModalArticleId) return;
      clappedIds[activeModalArticleId] =
        (clappedIds[activeModalArticleId] || 0) + 1;
      localStorage.setItem("mandh_claps", JSON.stringify(clappedIds));

      const currentPost = blogPosts.find((p) => p.id === activeModalArticleId);
      const newCount =
        currentPost.claps + clappedIds[activeModalArticleId];
      if (modalClapCount) modalClapCount.textContent = newCount;

      showToast("Clapped for story! 👏", "success");
      renderArticles();
    }

    // -------------------------------------------------------------
    // Event Binds
    // -------------------------------------------------------------
    function bindEvents() {
      if (themeToggleBtn) {
        themeToggleBtn.addEventListener("click", toggleTheme);
      }

      if (searchInput) {
        searchInput.addEventListener("input", (e) => {
          searchQuery = e.target.value;
          if (clearSearchBtn) {
            clearSearchBtn.classList.toggle("hidden", searchQuery.length === 0);
          }
          renderArticles();
        });
      }

      if (clearSearchBtn) {
        clearSearchBtn.addEventListener("click", () => {
          if (searchInput) searchInput.value = "";
          searchQuery = "";
          clearSearchBtn.classList.add("hidden");
          renderArticles();
        });
      }

      if (resetFiltersBtn) {
        resetFiltersBtn.addEventListener("click", () => {
          currentCategory = "All";
          searchQuery = "";
          authorFilter = null;
          if (searchInput) searchInput.value = "";
          if (clearSearchBtn) clearSearchBtn.classList.add("hidden");
          updateCategoryPills();
          renderArticles();
        });
      }

      if (modalCloseBtn) modalCloseBtn.addEventListener("click", closeArticleModal);

      if (articleModal) {
        articleModal.addEventListener("click", (e) => {
          if (e.target === articleModal) closeArticleModal();
        });
      }

      document.addEventListener("keydown", (e) => {
        if (e.key === "Escape" && activeModalArticleId) closeArticleModal();
      });

      if (modalClapBtn) modalClapBtn.addEventListener("click", handleClap);

      if (modalCopyLinkBtn) {
        modalCopyLinkBtn.addEventListener("click", () => {
          const url = window.location.origin + window.location.pathname + "#" + activeModalArticleId;
          navigator.clipboard?.writeText(url).then(() => {
            showToast("Copied link to clipboard!", "success");
          });
        });
      }

      document.querySelectorAll(".author-filter-btn").forEach((btn) => {
        btn.addEventListener("click", () => {
          authorFilter = btn.dataset.author;
          currentCategory = "All";
          updateCategoryPills();
          renderArticles();

          const blogSection = document.getElementById("stories");
          if (blogSection) blogSection.scrollIntoView({ behavior: "smooth" });
          showToast(`Filtered articles by author`, "info");
        });
      });

      if (mobileMenuBtn && mobileMenuDrawer) {
        mobileMenuBtn.addEventListener("click", () => {
          mobileMenuDrawer.classList.toggle("hidden");
        });
        mobileMenuDrawer.querySelectorAll("a").forEach((link) => {
          link.addEventListener("click", () => mobileMenuDrawer.classList.add("hidden"));
        });
      }

      window.addEventListener("scroll", () => {
        if (!readingProgressBar) return;
        const scrolled =
          (window.scrollY /
            (document.documentElement.scrollHeight - window.innerHeight)) *
          100;
        readingProgressBar.style.width = scrolled + "%";
      });

      if (newsletterForm) {
        newsletterForm.addEventListener("submit", (e) => {
          e.preventDefault();
          const email = newsletterForm.querySelector("input[type='email']");
          if (email && email.value) {
            showToast("Subscribed to M & H Dispatch! 🎉", "success");
            email.value = "";
          }
        });
      }

      if (contactForm) {
        contactForm.addEventListener("submit", (e) => {
          e.preventDefault();
          showToast("Message sent to M & H!", "success");
          contactForm.reset();
        });
      }
    }
  }

  // Reliable DOM ready execution
  if (document.readyState === "interactive" || document.readyState === "complete") {
    init();
  } else {
    document.addEventListener("DOMContentLoaded", init);
  }
})();
