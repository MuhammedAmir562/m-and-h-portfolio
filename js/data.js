// Expanded Blog Posts Dataset for M and H Portfolio
const authorsData = {
  m: { name: "M & H Journal", shortName: "M & H", role: "Editorial Studio", avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80" },
  h: { name: "M & H Journal", shortName: "M & H", role: "Editorial Studio", avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=300&q=80" },
  duo: { name: "M & H Journal", shortName: "M & H", role: "Editorial Studio", avatar: "https://images.unsplash.com/photo-1522071823991-b9671f9d7f1f?auto=format&fit=crop&w=300&q=80" }
};

const blogPosts = [
  {
    id: "ambient-computing-architecture",
    title: "The Architecture of Ambient Computing: Beyond Flat Screens",
    slug: "ambient-computing-architecture",
    category: "Tech & AI",
    authorKey: "m",
    publishedDate: "Sep 18, 2026",
    readTime: "6 min read",
    featured: true,
    coverImage: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=85",
    tags: ["Ambient AI", "Spatial UI", "Hardware", "Future"],
    claps: 342,
    excerpt: "How intelligence is dissolving into our physical periphery, and why the next digital revolution won't be trapped behind glass rectangles.",
    content: `
      <p class="lead text-lg md:text-xl text-neutral-300 font-light leading-relaxed mb-6">
        For four decades, human interaction with computing has been an exercise in focal confinement: sitting in front of a monitor, squinting at a pocket rectangle, or tapping on a tactile pane. But the next paradigm is not a better screen; it is the absence of one.
      </p>

      <h3 class="text-2xl font-bold text-white mt-8 mb-4">The Dissolution of the Interface</h3>
      <p class="text-neutral-300 leading-relaxed mb-6">
        When computation becomes sufficiently dense and perceptive, the interface becomes an atmosphere rather than a destination. Spatial sensors, localized audio transducers, and context-aware machine learning models operate in the periphery of our consciousness until summoned by intention.
      </p>

      <div class="my-8 p-6 rounded-2xl bg-neutral-900 border border-violet-500/20 shadow-inner">
        <blockquote class="text-lg italic text-violet-300 border-l-4 border-violet-500 pl-4 my-2">
          "The most profound technologies are those that disappear. They weave themselves into the fabric of everyday life until they are indistinguishable from it."
        </blockquote>
        <span class="text-xs text-neutral-400 font-mono tracking-wider block mt-2">— Mark Weiser, The Computer for the 21st Century</span>
      </div>

      <h3 class="text-2xl font-bold text-white mt-8 mb-4">Predictive Context vs. Explicit Commands</h3>
      <p class="text-neutral-300 leading-relaxed mb-6">
        In ambient environments, user intent is synthesized from behavioral context. Instead of filing structured database queries, our spaces calibrate temperature, synthesize task queues, and stream context-relevant notes onto physical surfaces as natural extensions of our workflow.
      </p>
    `
  },
  {
    id: "neural-rendering-3d-revolution",
    title: "Neural Rendering & The Death of Traditional 3D Pipelines",
    slug: "neural-rendering-3d-revolution",
    category: "Tech & AI",
    authorKey: "m",
    publishedDate: "Sep 16, 2026",
    readTime: "7 min read",
    featured: false,
    coverImage: "https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?auto=format&fit=crop&w=1200&q=85",
    tags: ["Neural Radiance", "NeRF", "3D Graphics", "AI"],
    claps: 278,
    excerpt: "How real-time Gaussian splatting and neural radiance fields are rendering traditional polygonal modeling obsolete.",
    content: `
      <p class="lead text-lg md:text-xl text-neutral-300 font-light leading-relaxed mb-6">
        Polygon counts and UV unwrapping were necessary compromises of 1990s hardware constraints. Today, neural implicit representations allow photorealistic 3D lightfield reconstruction directly from raw sensor captures at 120 FPS.
      </p>

      <h3 class="text-2xl font-bold text-white mt-8 mb-4">From Polygons to Volumetric Splats</h3>
      <p class="text-neutral-300 leading-relaxed mb-6">
        By modeling light rays as continuous neural networks rather than rigid geometric meshes, interactive spatial scenes capture sub-millimeter reflections, translucency, and atmospheric scatter effortlessly.
      </p>
    `
  },
  {
    id: "local-first-llms-sovereignty",
    title: "Local-First LLMs: Privacy and Sovereign Personal Cognition",
    slug: "local-first-llms-sovereignty",
    category: "Tech & AI",
    authorKey: "m",
    publishedDate: "Sep 14, 2026",
    readTime: "8 min read",
    featured: false,
    coverImage: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=1200&q=85",
    tags: ["Local AI", "Privacy", "LLM", "Sovereignty"],
    claps: 412,
    excerpt: "Why running quantized 7B and 14B models on consumer silicon is essential for intellectual freedom and zero-latency thinking.",
    content: `
      <p class="lead text-lg md:text-xl text-neutral-300 font-light leading-relaxed mb-6">
        Sending your private thoughts, code drafts, and financial journals over remote API sockets is a Faustian bargain. Small, hyper-optimized local models running on unified device memory give users instant, private intelligence.
      </p>

      <h3 class="text-2xl font-bold text-white mt-8 mb-4">Zero-Latency Feedback Loops</h3>
      <p class="text-neutral-300 leading-relaxed mb-6">
        When an AI model responds in 4 milliseconds without network packet delays, it shifts from being a distant web utility into a real-time coprocessor for human thought.
      </p>
    `
  },
  {
    id: "synthetic-web-signal-filtering",
    title: "The Synthetic Web: Filtering Signal From Algorithmic Noise",
    slug: "synthetic-web-signal-filtering",
    category: "Tech & AI",
    authorKey: "m",
    publishedDate: "Sep 10, 2026",
    readTime: "5 min read",
    featured: false,
    coverImage: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1200&q=85",
    tags: ["Web Architecture", "Information Quality", "Curation"],
    claps: 350,
    excerpt: "As automated content floods search indexes, human curation protocols become the ultimate digital filter.",
    content: `
      <p class="lead text-lg md:text-xl text-neutral-300 font-light leading-relaxed mb-6">
        When the cost of generating text and video drops to absolute zero, web crawlers become choked with low-grade synthetic rehashes. The future of discovery is rooted in web-of-trust human curation networks.
      </p>
    `
  },
  {
    id: "digital-brutalism-and-editorial-soul",
    title: "Digital Brutalism and the Soul of Modern Web Design",
    slug: "digital-brutalism-and-editorial-soul",
    category: "Culture & Design",
    authorKey: "h",
    publishedDate: "Sep 12, 2026",
    readTime: "5 min read",
    featured: false,
    coverImage: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=85",
    tags: ["Typography", "Aesthetics", "Web Culture", "Brutalism"],
    claps: 289,
    excerpt: "Why sterile SaaS templates are collapsing under their own monotony, and how raw, high-contrast digital craft is reclaiming creative territory.",
    content: `
      <p class="lead text-lg md:text-xl text-neutral-300 font-light leading-relaxed mb-6">
        Open ten modern startup landing pages and you will notice a haunting sameness: the same rounded pastel buttons, the same friendly sans-serif heading. We have optimized for conversions at the catastrophic expense of emotion.
      </p>

      <h3 class="text-2xl font-bold text-white mt-8 mb-4">The Rebellion Against Sameness</h3>
      <p class="text-neutral-300 leading-relaxed mb-6">
        Digital brutalism is not an excuse for bad usability; it is a declaration of presence. Drawing from architectural brutalism, it prioritizes honest materials, exposed structure, unvarnished grid lines, and monumental typography over decorative gloss.
      </p>
    `
  },
  {
    id: "kinetic-typography-speed",
    title: "Kinetic Typography and the Micro-Interactions of Speed",
    slug: "kinetic-typography-speed",
    category: "Culture & Design",
    authorKey: "h",
    publishedDate: "Sep 05, 2026",
    readTime: "6 min read",
    featured: false,
    coverImage: "https://images.unsplash.com/photo-1541701494587-cb58502866ab?auto=format&fit=crop&w=1200&q=85",
    tags: ["Kinetic Type", "Micro-Interactions", "Motion"],
    claps: 310,
    excerpt: "How animated variable fonts and velocity-sensitive type scale transform digital reading into tactile motion.",
    content: `
      <p class="lead text-lg md:text-xl text-neutral-300 font-light leading-relaxed mb-6">
        Static letterforms are a remnant of print presses. In dynamic viewports, font weight and optical width can morph fluidly in response to scroll velocity and cursor proximity.
      </p>
    `
  },
  {
    id: "tactile-digital-interfaces-weight",
    title: "Tactile Digital Interfaces: Bringing Physical Weight to Pixels",
    slug: "tactile-digital-interfaces-weight",
    category: "Culture & Design",
    authorKey: "h",
    publishedDate: "Aug 30, 2026",
    readTime: "5 min read",
    featured: false,
    coverImage: "https://images.unsplash.com/photo-1513542789411-b6a5d4f31634?auto=format&fit=crop&w=1200&q=85",
    tags: ["Tactile UI", "Haptics", "Design Physics"],
    claps: 265,
    excerpt: "Designing digital interfaces with mass, spring inertia, and physical feedback that readers intuitively feel.",
    content: `
      <p class="lead text-lg md:text-xl text-neutral-300 font-light leading-relaxed mb-6">
        When UI elements respond with natural physical inertia—accelerating, snapping, and dampening like real objects—cognitive fatigue vanishes because the screen matches real-world expectations.
      </p>
    `
  },
  {
    id: "solopreneur-renaissance-synthetic-era",
    title: "The 100x Solopreneur: Synthesizing Code, Strategy & Instinct",
    slug: "solopreneur-renaissance-synthetic-era",
    category: "Deep Dives",
    authorKey: "duo",
    publishedDate: "Aug 28, 2026",
    readTime: "8 min read",
    featured: false,
    coverImage: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=1200&q=85",
    tags: ["Future of Work", "Automation", "Strategy", "Solopreneur"],
    claps: 512,
    excerpt: "Dissecting how modern cognitive tooling, multi-agent frameworks, and aesthetic discipline allow single individuals to rival enterprise output.",
    content: `
      <p class="lead text-lg md:text-xl text-neutral-300 font-light leading-relaxed mb-6">
        In 2015, shipping a high-availability software service required a product manager, three backend engineers, two frontend devs, a QA tester, and an SEO specialist. Today, a solo thinker armed with calibrated agent swarms can deploy the same system before breakfast.
      </p>
    `
  },
  {
    id: "typography-spatial-architecture",
    title: "Typography as Spatial Architecture in Interactive Storytelling",
    slug: "typography-spatial-architecture",
    category: "Culture & Design",
    authorKey: "h",
    publishedDate: "Aug 15, 2026",
    readTime: "4 min read",
    featured: false,
    coverImage: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=1200&q=85",
    tags: ["Typography", "Editorial", "Reading Experience"],
    claps: 194,
    excerpt: "Letters are not mere static data carriers; they set pacing, rhythmic cadence, and psychological comfort across the reader's journey.",
    content: `
      <p class="lead text-lg md:text-xl text-neutral-300 font-light leading-relaxed mb-6">
        When an architect designs a cathedral, they control the aperture of light, the compression of hallways, and the reverberation of sound. In digital publishing, your type scale and line pacing perform the exact same physical role.
      </p>
    `
  },
  {
    id: "autonomous-agents-renaissance-craft",
    title: "Autonomous Agents and the Renaissance of Human Craft",
    slug: "autonomous-agents-renaissance-craft",
    category: "Tech & AI",
    authorKey: "m",
    publishedDate: "Jul 30, 2026",
    readTime: "7 min read",
    featured: false,
    coverImage: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&w=1200&q=85",
    tags: ["AI", "Agents", "Craftsmanship", "Philosophy"],
    claps: 418,
    excerpt: "When generic synthesis becomes zero-cost, human discernment, idiosyncratic flaws, and distinctive perspective become the ultimate luxury.",
    content: `
      <p class="lead text-lg md:text-xl text-neutral-300 font-light leading-relaxed mb-6">
        Whenever a technology automates an art form, doomsayers predict its extinction. When photography emerged, painters feared the death of painting—instead, it birthed Impressionism and Cubism by liberating artists from mere mimicry.
      </p>
    `
  },
  {
    id: "slow-thought-hyper-velocity-ecology",
    title: "Slow Thought in a Hyper-Velocity Information Ecology",
    slug: "slow-thought-hyper-velocity-ecology",
    category: "Mindset",
    authorKey: "duo",
    publishedDate: "Jul 14, 2026",
    readTime: "5 min read",
    featured: false,
    coverImage: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=85",
    tags: ["Focus", "Philosophy", "Deep Work", "Mindset"],
    claps: 605,
    excerpt: "Why the rarest and most profitable cognitive edge in modern creative work is deliberate, uninterrupted stillness.",
    content: `
      <p class="lead text-lg md:text-xl text-neutral-300 font-light leading-relaxed mb-6">
        We are drowning in algorithmic feeds engineered by thousands of PhDs to capture micro-slices of our dopamine. The default state of the modern professional is chronic, fragmented hyper-arousal. True synthesis requires incubation.
      </p>
    `
  },
  {
    id: "deep-focus-attention-battlefield",
    title: "Deep Focus in an Attention-Economy Battlefield",
    slug: "deep-focus-attention-battlefield",
    category: "Mindset",
    authorKey: "duo",
    publishedDate: "Jul 02, 2026",
    readTime: "6 min read",
    featured: false,
    coverImage: "https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&w=1200&q=85",
    tags: ["Attention", "Deep Work", "Mindset", "Focus"],
    claps: 388,
    excerpt: "Tactical cognitive hygiene protocols for reclaiming 4-hour deep focus blocks in a hyper-interrupted work environment.",
    content: `
      <p class="lead text-lg md:text-xl text-neutral-300 font-light leading-relaxed mb-6">
        Attention is the foundational currency of human agency. Guarding your primary morning focus window from notification intrusions is the single highest ROI habit in modern knowledge work.
      </p>
    `
  },
  {
    id: "creative-direction-generative-media",
    title: "Creative Direction in the Age of Generative Synthetic Media",
    slug: "creative-direction-generative-media",
    category: "Creative Direction",
    authorKey: "h",
    publishedDate: "Jun 25, 2026",
    readTime: "6 min read",
    featured: false,
    coverImage: "https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=1200&q=85",
    tags: ["Creative Direction", "Visual Media", "Taste"],
    claps: 275,
    excerpt: "How art directors navigate the spectrum between infinite automated variations and coherent brand worldbuilding.",
    content: `
      <p class="lead text-lg md:text-xl text-neutral-300 font-light leading-relaxed mb-6">
        Generating ten thousand high-resolution cinematic frames now costs fractions of a cent. But ten thousand frames without an editorial compass is merely sensory noise.
      </p>
    `
  },
  {
    id: "zero-latency-engineering-philosophy",
    title: "The Zero-Latency Engineering Philosophy: Building for Instant Flow",
    slug: "zero-latency-engineering-philosophy",
    category: "Tech & AI",
    authorKey: "m",
    publishedDate: "Jun 08, 2026",
    readTime: "9 min read",
    featured: false,
    coverImage: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=85",
    tags: ["Engineering", "Web Perf", "Architecture"],
    claps: 382,
    excerpt: "Optimizing software systems not for arbitrary synthetic benchmarks, but for the uninterrupted psychological flow state of the user.",
    content: `
      <p class="lead text-lg md:text-xl text-neutral-300 font-light leading-relaxed mb-6">
        A 100 millisecond delay is the threshold where a human brain perceives lag as a disconnect in causality. When software responds under 16 milliseconds, it feels like an organic extension of thought itself.
      </p>
    `
  }
];

const categoriesList = [
  "All",
  "Tech & AI",
  "Culture & Design",
  "Deep Dives",
  "Mindset",
  "Creative Direction"
];
