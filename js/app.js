// Application Logic for "M and H" Portfolio
(function () {
  function init() {
    // State
    let currentCategory = "All";
    let searchQuery = "";
    let authorFilter = null;
    let bookmarkedIds = JSON.parse(localStorage.getItem("mandh_bookmarks") || "[]");
    let clappedIds = JSON.parse(localStorage.getItem("mandh_claps") || "{}");
    let activeArticleId = null;

    // Main Views
    const homePageView = document.getElementById("home-page-view");
    const articlePageView = document.getElementById("article-page-view");

    // Elements
    const blogGrid = document.getElementById("blog-grid");
    const categoryFilters = document.getElementById("category-filters");
    const searchInput = document.getElementById("search-input");
    const clearSearchBtn = document.getElementById("clear-search-btn");
    const postsCountBadge = document.getElementById("posts-count-badge");
    const emptyState = document.getElementById("empty-state");
    const resetFiltersBtn = document.getElementById("reset-filters-btn");
    const heroFeaturedCard = document.getElementById("hero-featured-card");

    // Article Page Elements
    const articleBackBtn = document.getElementById("article-back-btn");
    const pageArticleCategory = document.getElementById("page-article-category");
    const pageArticleTitle = document.getElementById("page-article-title");
    const pageArticleDate = document.getElementById("page-article-date");
    const pageArticleReadtime = document.getElementById("page-article-readtime");
    const pageArticleAuthorAvatar = document.getElementById("page-article-author-avatar");
    const pageArticleAuthorName = document.getElementById("page-article-author-name");
    const pageArticleAuthorRole = document.getElementById("page-article-author-role");
    const pageArticleCover = document.getElementById("page-article-cover");
    const pageArticleTags = document.getElementById("page-article-tags");
    const pageArticleContent = document.getElementById("page-article-content");
    const pageArticleClapBtn = document.getElementById("page-article-clap-btn");
    const pageArticleClapCount = document.getElementById("page-article-clap-count");
    const pageArticleShareBtn = document.getElementById("page-article-share-btn");

    // Theme Switcher
    const themeToggleBtn = document.getElementById("theme-toggle-btn");
    const themeIconDark = document.getElementById("theme-icon-dark");
    const themeIconLight = document.getElementById("theme-icon-light");

    // Navigation
    const mobileMenuBtn = document.getElementById("mobile-menu-btn");
    const mobileMenuDrawer = document.getElementById("mobile-menu-drawer");
    const brandLogoLink = document.getElementById("brand-logo-link");
    const newsletterForm = document.getElementById("newsletter-form");
    const contactForm = document.getElementById("contact-form");
    const toastContainer = document.getElementById("toast-container");
    const readingProgressBar = document.getElementById("reading-progress-bar");

    // Initialize
    initTheme();
    initCategories();
    renderFeaturedStory();
    renderArticles();
    bindEvents();
    checkHashRoute();

    // -------------------------------------------------------------
    // View Switcher: Home View vs Dedicated Article Page View
    // -------------------------------------------------------------
    function showHomePage() {
      if (articlePageView) articlePageView.classList.add("hidden");
      if (homePageView) homePageView.classList.remove("hidden");
      activeArticleId = null;
      window.scrollTo({ top: 0, behavior: "instant" });
    }

    function showArticlePage(id) {
      const post = blogPosts.find((p) => p.id === id);
      if (!post || !articlePageView) return;

      activeArticleId = id;
      const author = authorsData[post.authorKey] || authorsData.duo;
      const dynamicClaps = (clappedIds[post.id] || 0) + post.claps;

      if (pageArticleCategory) pageArticleCategory.textContent = post.category;
      if (pageArticleTitle) pageArticleTitle.textContent = post.title;
      if (pageArticleDate) pageArticleDate.textContent = post.publishedDate;
      if (pageArticleReadtime) pageArticleReadtime.textContent = post.readTime;
      if (pageArticleAuthorAvatar) {
        pageArticleAuthorAvatar.src = author.avatar;
        pageArticleAuthorAvatar.alt = author.name;
      }
      if (pageArticleAuthorName) pageArticleAuthorName.textContent = author.name;
      if (pageArticleAuthorRole) pageArticleAuthorRole.textContent = author.role;
      if (pageArticleCover) {
        pageArticleCover.src = post.coverImage;
        pageArticleCover.alt = post.title;
      }
      if (pageArticleClapCount) pageArticleClapCount.textContent = dynamicClaps;

      if (pageArticleTags) {
        pageArticleTags.innerHTML = post.tags
          .map(
            (tag) => `
            <span class="text-xs font-mono px-2.5 py-1 rounded-full bg-neutral-800 text-neutral-300 border border-neutral-700">
              #${tag}
            </span>
          `
          )
          .join("");
      }

      if (pageArticleContent) pageArticleContent.innerHTML = post.content;

      // Switch screens
      if (homePageView) homePageView.classList.add("hidden");
      articlePageView.classList.remove("hidden");

      window.scrollTo({ top: 0, behavior: "instant" });
      window.location.hash = `#article/${id}`;
    }

    function checkHashRoute() {
      const hash = window.location.hash;
      if (hash.startsWith("#article/")) {
        const id = hash.replace("#article/", "");
        showArticlePage(id);
      }
    }

    // -------------------------------------------------------------
    // Toast Notifications
    // -------------------------------------------------------------
    function showToast(message, type = "info") {
      if (!toastContainer) return;
      const toast = document.createElement("div");
      toast.className = `
        px-4 py-3 rounded-xl bg-neutral-900 border border-neutral-700 shadow-2xl 
        text-xs font-medium flex items-center gap-3 transition-all duration-200 transform translate-y-2 opacity-0
      `;

      const dotColor =
        type === "success"
          ? "bg-emerald-400"
          : type === "error"
          ? "bg-rose-400"
          : "bg-violet-400";

      toast.innerHTML = `
        <span class="w-2 h-2 rounded-full ${dotColor} shrink-0"></span>
        <span class="text-neutral-200">${message}</span>
      `;

      toastContainer.appendChild(toast);

      requestAnimationFrame(() => {
        toast.classList.remove("translate-y-2", "opacity-0");
      });

      setTimeout(() => {
        toast.classList.add("translate-y-2", "opacity-0");
        setTimeout(() => toast.remove(), 200);
      }, 2500);
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
        showToast("Switched to Light Theme", "info");
      } else {
        if (themeIconDark) themeIconDark.classList.add("hidden");
        if (themeIconLight) themeIconLight.classList.remove("hidden");
        showToast("Switched to Dark Theme", "info");
      }
    }

    // -------------------------------------------------------------
    // Category & Search Filters
    // -------------------------------------------------------------
    function initCategories() {
      if (!categoryFilters) return;
      categoryFilters.innerHTML = categoriesList
        .map(
          (cat) => `
          <button 
            data-category="${cat}"
            class="category-pill px-4 py-1.5 rounded-full text-xs font-medium transition-all duration-150 cursor-pointer border active:scale-95 ${
              cat === currentCategory
                ? "bg-white text-black border-white font-semibold"
                : "bg-neutral-900 text-neutral-400 border-neutral-800 hover:text-white hover:border-neutral-700"
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
      if (!categoryFilters) return;
      categoryFilters.querySelectorAll(".category-pill").forEach((pill) => {
        const isSelected = pill.dataset.category === currentCategory && !authorFilter;
        if (isSelected) {
          pill.className =
            "category-pill px-4 py-1.5 rounded-full text-xs font-semibold transition-all duration-150 cursor-pointer border bg-white text-black border-white active:scale-95";
        } else {
          pill.className =
            "category-pill px-4 py-1.5 rounded-full text-xs font-medium transition-all duration-150 cursor-pointer border bg-neutral-900 text-neutral-400 border-neutral-800 hover:text-white hover:border-neutral-700 active:scale-95";
        }
      });
    }

    // -------------------------------------------------------------
    // Featured Hero Story
    // -------------------------------------------------------------
    function renderFeaturedStory() {
      if (!heroFeaturedCard) return;
      const featured = blogPosts.find((p) => p.featured) || blogPosts[0];
      const author = authorsData[featured.authorKey] || authorsData.duo;

      heroFeaturedCard.innerHTML = `
        <div class="relative overflow-hidden rounded-3xl bg-neutral-900 border border-neutral-800 hover:border-violet-500/40 transition-all duration-200 group cursor-pointer active:scale-[0.99]">
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

              <div class="pt-4 border-t border-neutral-800 flex items-center justify-between">
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
                class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent lg:bg-gradient-to-r lg:from-[#11131c] lg:via-transparent lg:to-transparent"></div>
            </div>
          </div>
        </div>
      `;

      heroFeaturedCard.addEventListener("click", () => {
        showArticlePage(featured.id);
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
            class="bg-neutral-900 rounded-2xl overflow-hidden flex flex-col justify-between border border-neutral-800 hover:border-violet-500/40 group cursor-pointer active:scale-[0.99] transition-all"
          >
            <div class="relative overflow-hidden aspect-[16/10]">
              <img 
                src="${post.coverImage}" 
                alt="${post.title}" 
                loading="lazy"
                class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              
              <span class="absolute top-3 left-3 px-2.5 py-1 text-[10px] font-mono uppercase tracking-wider rounded-lg bg-black/80 text-neutral-200 border border-neutral-700 font-medium">
                ${post.category}
              </span>

              <button 
                data-bookmark="${post.id}"
                title="Bookmark article"
                class="bookmark-btn absolute top-3 right-3 w-8 h-8 rounded-full bg-black/80 border border-neutral-700 flex items-center justify-center text-neutral-300 hover:text-white hover:bg-neutral-800 transition-colors z-10 active:scale-90"
              >
                <svg class="w-4 h-4 ${isBookmarked ? "text-violet-400 fill-violet-400" : ""}" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"/>
                </svg>
              </button>

              <span class="absolute bottom-3 right-3 text-[10px] text-neutral-300 font-mono bg-black/80 px-2 py-0.5 rounded">
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
                    <span class="text-[10px] font-mono px-2 py-0.5 rounded bg-neutral-800 text-neutral-400 border border-neutral-700">
                      #${tag}
                    </span>
                  `
                    )
                    .join("")}
                </div>

                <div class="pt-3 border-t border-neutral-800 flex items-center justify-between text-xs">
                  <div class="flex items-center gap-2">
                    <img src="${author.avatar}" alt="${author.name}" class="w-5 h-5 rounded-full object-cover border border-neutral-700" />
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

      // Bind article card click handlers
      blogGrid.querySelectorAll("article").forEach((card) => {
        card.addEventListener("click", (e) => {
          if (e.target.closest(".bookmark-btn")) {
            e.stopPropagation();
            toggleBookmark(card.dataset.id);
            return;
          }
          showArticlePage(card.dataset.id);
        });
      });
    }

    // -------------------------------------------------------------
    // Bookmarks & Claps
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

    function handleClap() {
      if (!activeArticleId) return;
      clappedIds[activeArticleId] = (clappedIds[activeArticleId] || 0) + 1;
      localStorage.setItem("mandh_claps", JSON.stringify(clappedIds));

      const currentPost = blogPosts.find((p) => p.id === activeArticleId);
      const newCount = currentPost.claps + clappedIds[activeArticleId];
      if (pageArticleClapCount) pageArticleClapCount.textContent = newCount;

      showToast("Clapped for story! 👏", "success");
      renderArticles();
    }

    // -------------------------------------------------------------
    // Event Binds
    // -------------------------------------------------------------
    function bindEvents() {
      // Logo click returns to homepage
      if (brandLogoLink) {
        brandLogoLink.addEventListener("click", (e) => {
          e.preventDefault();
          showHomePage();
          window.location.hash = "";
        });
      }

      // Back to stories button on Article Page
      if (articleBackBtn) {
        articleBackBtn.addEventListener("click", () => {
          showHomePage();
          const blogSection = document.getElementById("stories");
          if (blogSection) blogSection.scrollIntoView({ behavior: "smooth" });
        });
      }

      // Pillar Topic Buttons in Topics Section
      document.querySelectorAll(".topic-card-btn").forEach((btn) => {
        btn.addEventListener("click", () => {
          const topic = btn.dataset.topic;
          currentCategory = topic;
          authorFilter = null;
          updateCategoryPills();
          renderArticles();

          showHomePage();
          const blogSection = document.getElementById("stories");
          if (blogSection) blogSection.scrollIntoView({ behavior: "smooth" });
          showToast(`Filtered stories by ${topic}`, "info");
        });
      });

      // Author Bio filter buttons
      document.querySelectorAll(".author-filter-btn").forEach((btn) => {
        btn.addEventListener("click", () => {
          authorFilter = btn.dataset.author;
          currentCategory = "All";
          updateCategoryPills();
          renderArticles();

          showHomePage();
          const blogSection = document.getElementById("stories");
          if (blogSection) blogSection.scrollIntoView({ behavior: "smooth" });
          showToast(`Filtered articles by author`, "info");
        });
      });

      // Navigation section links
      document.querySelectorAll(".nav-section-link, .mobile-nav-link").forEach((link) => {
        link.addEventListener("click", () => {
          if (articlePageView && !articlePageView.classList.contains("hidden")) {
            showHomePage();
          }
        });
      });

      if (themeToggleBtn) themeToggleBtn.addEventListener("click", toggleTheme);

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

      if (pageArticleClapBtn) pageArticleClapBtn.addEventListener("click", handleClap);

      if (pageArticleShareBtn) {
        pageArticleShareBtn.addEventListener("click", () => {
          const url = window.location.href;
          navigator.clipboard?.writeText(url).then(() => {
            showToast("Copied article link to clipboard!", "success");
          });
        });
      }

      if (mobileMenuBtn && mobileMenuDrawer) {
        mobileMenuBtn.addEventListener("click", () => {
          mobileMenuDrawer.classList.toggle("hidden");
        });
        mobileMenuDrawer.querySelectorAll("a").forEach((link) => {
          link.addEventListener("click", () => mobileMenuDrawer.classList.add("hidden"));
        });
      }

      // Reading progress bar
      window.addEventListener("scroll", () => {
        if (!readingProgressBar) return;
        const scrolled =
          (window.scrollY /
            (document.documentElement.scrollHeight - window.innerHeight)) *
          100;
        readingProgressBar.style.width = scrolled + "%";
      }, { passive: true });

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

  // DOM ready execution
  if (document.readyState === "interactive" || document.readyState === "complete") {
    init();
  } else {
    document.addEventListener("DOMContentLoaded", init);
  }
})();
