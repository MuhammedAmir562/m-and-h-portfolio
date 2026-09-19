// Blog Posts and Author Data for "M and H" Portfolio Website
const authorsData = {
  m: {
    name: "Marcus Vance",
    shortName: "M",
    role: "Systems Architect & Tech Essayist",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80",
    bio: "Focusing on ambient computing, AI cognition, and zero-latency digital systems. Exploring how machines amplify human capability.",
    handle: "@marcus_v",
    articlesCount: 48
  },
  h: {
    name: "Helena Chen",
    shortName: "H",
    role: "Creative Director & Cultural Critic",
    avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=300&q=80",
    bio: "Obsessed with editorial design, typography as architecture, and how emerging media reshapes modern culture and storytelling.",
    handle: "@helena_c",
    articlesCount: 54
  },
  duo: {
    name: "M & H Collective",
    shortName: "M & H",
    role: "Editorial Collaboration",
    avatar: "https://images.unsplash.com/photo-1522071823991-b9671f9d7f1f?auto=format&fit=crop&w=300&q=80",
    bio: "Joint explorations synthesizing hard engineering rigor with artistic intuition and humanistic critique.",
    handle: "@mandh_journal",
    articlesCount: 22
  }
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

      <div class="my-8 p-6 rounded-2xl bg-neutral-900/80 border border-violet-500/20 shadow-inner">
        <blockquote class="text-lg italic text-violet-300 border-l-4 border-violet-500 pl-4 my-2">
          "The most profound technologies are those that disappear. They weave themselves into the fabric of everyday life until they are indistinguishable from it."
        </blockquote>
        <span class="text-xs text-neutral-400 font-mono tracking-wider block mt-2">— Mark Weiser, The Computer for the 21st Century</span>
      </div>

      <h3 class="text-2xl font-bold text-white mt-8 mb-4">Predictive Context vs. Explicit Commands</h3>
      <p class="text-neutral-300 leading-relaxed mb-6">
        In ambient environments, user intent is synthesized from behavioral context. Instead of filing structured database queries, our spaces calibrate temperature, synthesize task queues, and stream context-relevant notes onto physical surfaces as natural extensions of our workflow.
      </p>

      <h3 class="text-2xl font-bold text-white mt-8 mb-4">Key Takeaways for Designers</h3>
      <ul class="list-disc list-inside space-y-3 text-neutral-300 mb-6">
        <li><strong class="text-white">Design for the Periphery:</strong> Notification density must decline as cognitive fidelity increases.</li>
        <li><strong class="text-white">Embrace Physical Anchors:</strong> Real objects act as intuitive mnemonic tokens for complex data streams.</li>
        <li><strong class="text-white">Latency is the Product:</strong> Sub-5ms response times are essential to avoid uncanny psychological friction.</li>
      </ul>

      <p class="text-neutral-300 leading-relaxed">
        As creators and builders, our responsibility is to ensure that as technology recedes into the background, human agency remains squarely in the foreground.
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
        Open ten modern startup landing pages and you will notice a haunting sameness: the same rounded pastel buttons, the same friendly sans-serif heading, the same generic 3D clay figurines float across the screen. We have optimized for conversions at the catastrophic expense of emotion.
      </p>

      <h3 class="text-2xl font-bold text-white mt-8 mb-4">The Rebellion Against Sameness</h3>
      <p class="text-neutral-300 leading-relaxed mb-6">
        Digital brutalism is not an excuse for bad usability; it is a declaration of presence. Drawing from architectural brutalism of the mid-20th century, it prioritizes honest materials, exposed structure, unvarnished grid lines, and monumental typography over decorative gloss.
      </p>

      <div class="my-8 p-6 rounded-2xl bg-neutral-900/80 border border-emerald-500/20">
        <blockquote class="text-lg italic text-emerald-300 border-l-4 border-emerald-500 pl-4 my-2">
          "When every website looks like an insurance app, daring to look like an underground art zine is the ultimate competitive advantage."
        </blockquote>
      </div>

      <h3 class="text-2xl font-bold text-white mt-8 mb-4">Structure as Ornament</h3>
      <p class="text-neutral-300 leading-relaxed mb-6">
        By exposing coordinate markers, visible border rules, and oversized monospace numerals, we remind the reader that the web is a constructed medium. It invites the visitor to touch, explore, and remember what they just witnessed.
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
    featured: true,
    coverImage: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=1200&q=85",
    tags: ["Future of Work", "Automation", "Strategy", "Solopreneur"],
    claps: 512,
    excerpt: "Dissecting how modern cognitive tooling, multi-agent frameworks, and aesthetic discipline allow single individuals to rival enterprise output.",
    content: `
      <p class="lead text-lg md:text-xl text-neutral-300 font-light leading-relaxed mb-6">
        In 2015, shipping a high-availability software service required a product manager, three backend engineers, two frontend devs, a QA tester, and an SEO specialist. Today, a solo thinker armed with calibrated agent swarms and architectural clarity can deploy the same system before breakfast.
      </p>

      <h3 class="text-2xl font-bold text-white mt-8 mb-4">Cognitive Leverage vs. Headcount</h3>
      <p class="text-neutral-300 leading-relaxed mb-6">
        Scale in the modern economy is no longer defined by payroll count. It is determined by the speed of the cognitive feedback loop: how rapidly can an insight transition into production code, user testing, and refined narrative?
      </p>

      <h3 class="text-2xl font-bold text-white mt-8 mb-4">The Triple Threat Operator</h3>
      <p class="text-neutral-300 leading-relaxed mb-6">
        The individuals thriving in this paradigm master three converging disciplines:
      </p>
      <ul class="list-disc list-inside space-y-3 text-neutral-300 mb-6">
        <li><strong class="text-white">Systems Engineering:</strong> Understanding invariants, data flows, and fault tolerances.</li>
        <li><strong class="text-white">Editorial Taste:</strong> The ruthless ability to edit, curate, and craft emotionally magnetic narratives.</li>
        <li><strong class="text-white">Prompt & Agent Architecture:</strong> Directing synthetic intelligence as an orchestra conductor rather than a code monkey.</li>
      </ul>
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

      <h3 class="text-2xl font-bold text-white mt-8 mb-4">Vertical Rhythm and Cognitive Rest</h3>
      <p class="text-neutral-300 leading-relaxed mb-6">
        Eye strain is not just a symptom of blue light; it is caused by erratic horizontal jumps and uncalibrated line lengths. By bounding reading columns between 65 and 75 characters and tuning line-height proportionally to viewport scale, the reading experience transforms into a state of effortless flow.
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
        Whenever a technology automates an art form, doomsayers predict its extinction. When photography emerged, painters feared the death of painting—instead, it birthed Impressionism, Cubism, and Abstract Expressionism by liberating artists from mere mimicry.
      </p>

      <h3 class="text-2xl font-bold text-white mt-8 mb-4">The Value of the Unpromptable</h3>
      <p class="text-neutral-300 leading-relaxed mb-6">
        What cannot be generated with a generic prompt? Lived trauma, idiosyncratic humor, hyper-local cultural nuances, and radical artistic bravery. As average quality rises to a high statistical baseline, the extraordinary will be defined by human signature.
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
        We are drowning in algorithmic feeds engineered by thousands of PhDs to capture micro-slices of our dopamine. The default state of the modern professional is chronic, fragmented hyper-arousal.
      </p>

      <h3 class="text-2xl font-bold text-white mt-8 mb-4">The Asymmetric Advantage of Stillness</h3>
      <p class="text-neutral-300 leading-relaxed mb-6">
        If you consume what everyone else consumes, you will produce what everyone else produces. True synthesis requires incubation: hours where zero new inputs enter your cortex, allowing subconscious associations to crystallize into original theorems.
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

      <h3 class="text-2xl font-bold text-white mt-8 mb-4">Curation as Creative Supremacy</h3>
      <p class="text-neutral-300 leading-relaxed mb-6">
        The modern creative director is no longer just a maker of raw assets. They are an editor of reality, setting the aesthetic boundaries, the moral tone, and the emotional resonance that binds disparate artifacts into an enduring universe.
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

      <h3 class="text-2xl font-bold text-white mt-8 mb-4">Local-First and Optimistic Mutations</h3>
      <p class="text-neutral-300 leading-relaxed mb-6">
        Waiting on round-trip network packets before updating client interfaces is a relic of legacy architecture. Modern apps must execute mutations optimistically on local state, reconciliation happening asynchronously in background channels.
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
