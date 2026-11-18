import { useCallback, useEffect, useRef, useState } from "react";

const Arrow = ({ left = false }: { left?: boolean }) => (
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <path
      d={left ? "M19 12H5m5-5-5 5 5 5" : "M5 12h14m-5-5 5 5-5 5"}
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.8"
    />
  </svg>
);

const pods = [
  {
    name: "Creative Pod",
    kicker: "Brand & content",
    price: "$3,000",
    credit: "120 credits / month",
    copy: "The baseline pod for businesses that need to look and sound consistent, every week.",
    tags: ["Design systems", "Editorial", "Motion"],
    image: "/gc3/ribbon.webp",
  },
  {
    name: "Digital Pod",
    kicker: "Growth & performance",
    price: "$6,000",
    credit: "240 credits / month",
    copy: "Creative plus the growth engine: media, lifecycle, analytics, SEO and community.",
    tags: ["Paid media", "Analytics", "Lifecycle"],
    image: "/gc3/earth.webp",
  },
  {
    name: "Strategy Pod",
    kicker: "Direction & transformation",
    price: "$9,000",
    credit: "360 credits / month",
    copy: "Senior strategic capability with creative and digital delivery built into the same room.",
    tags: ["Research", "Go-to-market", "Operating model"],
    image: "/gc3/aurora.webp",
  },
  {
    name: "Automation Pod",
    kicker: "AI & workflow",
    price: "$8,000",
    credit: "Scoped to your systems",
    copy: "Process audit, workflow builds and auditable AI agents, scoped around the way your teams already work.",
    tags: ["AI agents", "Workflows", "Governance"],
    image: "/gc3/automation.webp",
  },
  {
    name: "Interactive Pod",
    kicker: "Interactive & XR",
    price: "$8,000",
    credit: "Scoped to the build",
    copy: "For work that cannot be described in a deck: 3D, XR, configurators and interactive experiences.",
    tags: ["3D experiences", "Configurators", "XR"],
    image: "/gc3/interactive.webp",
  },
  {
    name: "REMAU",
    kicker: "Real estate",
    price: "$8,000",
    credit: "240 hours / month",
    copy: "Real estate marketing and automation, with creative, digital, 3D and XR capability in one pod.",
    tags: ["Property marketing", "3D & XR", "Automation"],
    image: "/gc3/remau.webp",
  },
];

const icons: Record<string, string> = {
  sparkle: "M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8zM19 16l.8 2.2L22 19l-2.2.8L19 22l-.8-2.2L16 19l2.2-.8z",
  home: "M4 11l8-7 8 7M6 10v10h12V10M10 20v-6h4v6",
  globe:
    "M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18zM3 12h18M12 3c2.5 2.5 3.5 5.5 3.5 9s-1 6.5-3.5 9c-2.5-2.5-3.5-5.5-3.5-9s1-6.5 3.5-9z",
  nodes: "M12 8a2 2 0 1 0 0-4 2 2 0 0 0 0 4zM6 20a2 2 0 1 0 0-4 2 2 0 0 0 0 4zM18 20a2 2 0 1 0 0-4 2 2 0 0 0 0 4zM12 8v4M12 12l-5 4M12 12l5 4",
  target:
    "M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18zM12 8a4 4 0 1 0 0 8 4 4 0 0 0 0-8zM12 11.2a.8.8 0 1 0 0 1.6.8.8 0 0 0 0-1.6z",
  cursor: "M5 3l14 7-6 2-2 6z",
};

const hubNodes = [
  { cls: "n-creative", icon: "sparkle", title: "Creative", line: "From $3,000/month" },
  { cls: "n-remau", icon: "home", title: "REMAU", line: "$8,000/month · Real estate" },
  { cls: "n-digital", icon: "globe", title: "Digital", line: "From $6,000/month" },
  { cls: "n-automation", icon: "nodes", title: "Automation", line: "$8,000/month" },
  { cls: "n-strategy", icon: "target", title: "Strategy", line: "From $9,000/month" },
  { cls: "n-interactive", icon: "cursor", title: "Interactive", line: "$8,000/month" },
];

/* Node centres in the 560 x 640 diagram space, used to draw the connector lines. */
const hubLines: [number, number][] = [
  [280, 46],
  [106, 168],
  [454, 168],
  [106, 472],
  [454, 472],
  [280, 594],
];

function HubDiagram() {
  return (
    <div className="hub" aria-label="GC3 capability pods">
      <svg className="hub-svg" viewBox="0 0 560 640" aria-hidden="true">
        <defs>
          <radialGradient id="hubGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#dcae51" stopOpacity="0.28" />
            <stop offset="100%" stopColor="#dcae51" stopOpacity="0" />
          </radialGradient>
        </defs>
        <circle cx="280" cy="320" r="170" fill="url(#hubGlow)" />
        {[88, 128, 172].map((r, i) => (
          <circle
            key={r}
            className={`ring r${i}`}
            cx="280"
            cy="320"
            r={r}
            fill="none"
            stroke={i === 1 ? "rgba(56,189,248,.28)" : "rgba(220,174,81,.3)"}
            strokeDasharray={i === 1 ? "2 7" : undefined}
          />
        ))}
        <line x1="280" y1="46" x2="280" y2="594" stroke="rgba(255,255,255,.14)" />
        {hubLines.map(([x, y]) => (
          <g key={`${x}-${y}`}>
            <line x1="280" y1="320" x2={x} y2={y} stroke="rgba(220,174,81,.35)" />
            <circle cx={x} cy={y} r="3" fill="#f3d48b" />
          </g>
        ))}
      </svg>
      {hubNodes.map((n) => (
        <a className={`hub-node ${n.cls}`} href="#match" key={n.title}>
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path
              d={icons[n.icon]}
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <b>{n.title}</b>
          <small>{n.line}</small>
        </a>
      ))}
      <div className="hub-core">
        <b>
          GC<sup>3</sup>
        </b>
        <small>Global capability</small>
      </div>
    </div>
  );
}

function ScrollProgress() {
  const bar = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const update = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      if (bar.current) bar.current.style.transform = `scaleX(${max > 0 ? window.scrollY / max : 0})`;
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);
  return <div id="px-progress" ref={bar} aria-hidden="true" />;
}

function Header() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };

    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, []);

  return (
    <>
      <div className="utility">
        <div className="shell">
          <span>GC³ by Quantocos</span>
          <div>
            <a href="https://quantocos.com/insights.html">Newsroom</a>
            <a href="https://quantocos.com/careers.html">Careers</a>
            <a href="mailto:hello@quantocos.com">Contact us</a>
          </div>
        </div>
      </div>
      <header>
        <div className="shell nav">
          <a className="brand" href="#top">
            <b>GC³</b>
            <i />
            <small>by Quantocos</small>
          </a>
          <button
            className={`menu ${open ? "open" : ""}`}
            onClick={() => setOpen(!open)}
            aria-expanded={open}
            aria-controls="primary-navigation"
            aria-label={open ? "Close navigation" : "Open navigation"}
          >
            <span />
            <span />
          </button>
          <nav id="primary-navigation" className={open ? "open" : ""} aria-label="Primary">
            {["Industries", "Capabilities", "Solutions", "Products", "Insights", "Company"].map(
              (item) => (
                <a href={`#${item.toLowerCase()}`} onClick={() => setOpen(false)} key={item}>
                  {item}
                </a>
              ),
            )}
          </nav>
          <a className="button dark nav-cta" href="#match">
            Start a conversation <Arrow />
          </a>
        </div>
      </header>
    </>
  );
}

function SwipeDeck() {
  const [active, setActive] = useState(0);
  const [x, setX] = useState(0);
  const [dragging, setDragging] = useState(false);
  const [exit, setExit] = useState<"left" | "right" | null>(null);
  const start = useRef(0);

  const swipe = useCallback(
    (direction: "left" | "right") => {
      if (exit) return;
      setExit(direction);
      window.setTimeout(() => {
        setActive((n) => (n + 1) % pods.length);
        setExit(null);
        setX(0);
      }, 380);
    },
    [exit],
  );

  return (
    <div
      className="deck-area"
      role="region"
      aria-label="GC3 capability pod selector"
      tabIndex={0}
      onKeyDown={(event) => {
        if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
          event.preventDefault();
          swipe(event.key === "ArrowLeft" ? "left" : "right");
        }
      }}
    >
      <div className="deck" aria-live="polite">
        {[2, 1, 0].map((offset) => {
          const pod = pods[(active + offset) % pods.length];
          const top = offset === 0;
          const transform = top
            ? `translateX(${exit ? (exit === "right" ? 720 : -720) : x}px) rotate(${exit ? (exit === "right" ? 19 : -19) : x / 22}deg)`
            : `translateY(${offset * 14}px) scale(${1 - offset * 0.035}) rotate(${offset === 1 ? 2 : -2}deg)`;
          return (
            <article
              className={`swipe-card ${top ? "top" : ""}`}
              style={{
                transform,
                zIndex: top ? 4 : 3 - offset,
                transition: dragging ? "none" : undefined,
              }}
              key={`${active}-${offset}`}
              onPointerDown={
                top
                  ? (e) => {
                      start.current = e.clientX;
                      setDragging(true);
                      e.currentTarget.setPointerCapture(e.pointerId);
                    }
                  : undefined
              }
              onPointerMove={top && dragging ? (e) => setX(e.clientX - start.current) : undefined}
              onPointerUp={
                top
                  ? () => {
                      setDragging(false);
                      if (Math.abs(x) > 95) swipe(x > 0 ? "right" : "left");
                      else setX(0);
                    }
                  : undefined
              }
              onPointerCancel={
                top
                  ? () => {
                      setDragging(false);
                      setX(0);
                    }
                  : undefined
              }
            >
              <img src={pod.image} alt="" draggable="false" decoding="async" />
              <div className="scrim" />
              {top && x !== 0 && (
                <span className={`stamp ${x > 0 ? "yes" : "no"}`}>{x > 0 ? "MATCH" : "PASS"}</span>
              )}
              <div className="card-content">
                <span className="kicker">{pod.kicker}</span>
                <div className="pod-title">
                  <h3>{pod.name}</h3>
                  <strong>
                    {pod.price}
                    <small>{pod.price === "Custom" ? "" : "/mo"}</small>
                  </strong>
                </div>
                <p>{pod.copy}</p>
                <div className="tags">
                  {pod.tags.map((tag) => (
                    <span key={tag}>{tag}</span>
                  ))}
                </div>
                <div className="credits">
                  <i />
                  {pod.credit}
                </div>
              </div>
            </article>
          );
        })}
      </div>
      <div className="deck-actions">
        <button type="button" onClick={() => swipe("left")} aria-label="Pass on this pod">
          <Arrow left />
        </button>
        <span>
          {String(active + 1).padStart(2, "0")} / {String(pods.length).padStart(2, "0")}
          <small>Swipe or use arrow keys</small>
        </span>
        <button type="button" onClick={() => swipe("right")} aria-label="Match with this pod">
          <Arrow />
        </button>
      </div>
      <div className="progress" aria-label="Choose a pod">
        {pods.map((p, i) => (
          <button
            type="button"
            className={i === active ? "active" : ""}
            onClick={() => {
              if (!exit) {
                setActive(i);
                setX(0);
              }
            }}
            aria-label={`Show ${p.name}`}
            aria-current={i === active ? "true" : undefined}
            key={p.name}
          />
        ))}
      </div>
    </div>
  );
}

const features = [
  ["Human judgment", "Named specialists set the direction, make the calls and own quality."],
  ["Agent velocity", "Repeatable production moves faster without handing the decision to AI."],
  ["Visible credits", "Know the cost before work starts and track the balance as it moves."],
];

const capabilities = [
  [
    "01",
    "Creative",
    "Content, design, copy, short-form video and decks, on a calendar rather than on request.",
  ],
  [
    "02",
    "Digital marketing",
    "SEO, answer-engine visibility, paid media, landing pages, analytics and lifecycle.",
  ],
  [
    "03",
    "Strategy",
    "Positioning, research, pricing, sales enablement, IT and AI roadmaps, operating model design.",
  ],
  [
    "04",
    "Interactive & XR",
    "3D and real-estate visualisation, configurators, microsites, VR showrooms and XR training.",
  ],
  [
    "05",
    "AI & automation",
    "Process audit, workflow builds, retrieval chatbots, voice agents and role-specific agents.",
  ],
  [
    "06",
    "Back office",
    "Business operations, finance support, HR operations, compliance and data work.",
  ],
];

const proofPoints = [
  [
    "01",
    "Published prices",
    "Six pods, stated in dollars per month, with the credit pool printed beside each one.",
  ],
  [
    "02",
    "The credit arithmetic",
    "96 of 120 credits, line by line, so you can see what a month actually buys.",
  ],
  [
    "03",
    "The contract pack",
    "NDA, data-processing agreement, engagement letter and IP assignment — signed before the first invoice.",
  ],
  [
    "04",
    "The claims we don't make",
    "No turnaround-hour promises, no ROI figures, no invented benchmarks. Month to month is the only commitment we ask you to rely on.",
  ],
];

const assurances = [
  [
    "Business-day overlap",
    "Pods are staffed to overlap your business day, with a named manager who answers inside it.",
  ],
  [
    "Data protection",
    "An NDA and a data-processing agreement are signed before work starts, with storage and access stated plainly.",
  ],
  ["Your IP", "Copyright and intellectual property in everything we produce assign to you."],
  [
    "Month to month",
    "No lock-in beyond the notice period, no setup fee and no exit fee on subscription pods.",
  ],
  ["One monthly figure", "Invoiced in USD, with one point of contact and no per-seat uplift."],
];

const faqs = [
  [
    "What is GC³?",
    "GC³ is Quantocos's Global Cloud Capability Center: monthly subscription pods that pair named human specialists with AI agents to run creative, digital marketing, strategy, interactive, automation and back-office work inside your own tools.",
  ],
  [
    "How much does a pod cost?",
    "Work is priced in credits at $25 each. The Creative pod is $3,000 a month for 120 credits, Digital $6,000 for 240 and Strategy $9,000 for 360. There is no setup fee and no exit fee.",
  ],
  [
    "How does work get approved?",
    "Every deliverable passes five sign-offs: brief approval, direction selection, internal QA, client review and go-live approval. Nothing goes live without both the pod lead and client signatures.",
  ],
  [
    "Who owns the work?",
    "Copyright and intellectual property in everything produced assign to you. Work, source files and IP stay with you when the engagement ends.",
  ],
  [
    "Is there a minimum term?",
    "The three subscription pods run month to month. Custom pods and REMAU carry a three-month minimum because of the depth of the setup.",
  ],
];

const footerGroups = [
  {
    title: "Explore",
    links: [
      ["Industries", "#industries"],
      ["Capabilities", "#capabilities"],
      ["Solutions", "#solutions"],
      ["Products", "#products"],
    ],
  },
  {
    title: "Company",
    links: [
      ["Who we are", "#company"],
      ["Careers", "https://quantocos.com/careers.html"],
      ["Security", "https://quantocos.com/security.html"],
      ["Contact", "mailto:hello@quantocos.com"],
    ],
  },
  {
    title: "Connect",
    links: [
      ["LinkedIn", "https://www.linkedin.com/company/quantocos"],
      ["Instagram", "https://www.instagram.com/quantocos/"],
      ["hello@quantocos.com", "mailto:hello@quantocos.com"],
    ],
  },
];

export default function App() {
  return (
    <div id="top">
      <ScrollProgress />
      <Header />
      <main>
        <section className="hero">
          <div className="glow" />
          <div className="shell hero-grid">
            <div className="hero-copy">
              <div className="eyebrow light">Global Cloud Capability Center</div>
              <h1>
                Hire the output.
                <br />
                <span>Not the headcount.</span>
              </h1>
              <p>
                Creative, growth, strategy, interactive and automation — one pod of people and AI
                agents, embedded in your tools from week one.
              </p>
              <div className="hero-buttons">
                <a className="button gold" href="#match">
                  Find your pod <Arrow />
                </a>
                <a className="text-link" href="#capabilities">
                  Explore capabilities <Arrow />
                </a>
              </div>
              <div className="proof">
                <span>
                  <b>Month to month</b> no lock-in
                </span>
                <span>
                  <b>$25 a credit</b> one rate for everyone
                </span>
                <span>
                  <b>Yours to keep</b> IP assigns to you
                </span>
              </div>
            </div>
            <div className="hero-visual">
              <HubDiagram />
            </div>
          </div>
        </section>

        <section className="audience" id="industries">
          <div className="shell">
            <small>Built for ambitious teams</small>
            <div>
              {["Foreign SMBs", "Mid-market brands", "Agencies", "SaaS", "Real estate"].map((x) => (
                <span key={x}>{x}</span>
              ))}
            </div>
          </div>
        </section>

        <section className="intro" id="solutions">
          <div className="shell split">
            <div>
              <div className="eyebrow">A better operating model</div>
              <h2>A small team with agents, not a queue of tickets.</h2>
            </div>
            <div className="lead">
              <p>
                Each pod has a manager, human specialists and AI agents that handle the parts humans
                should not be doing. You approve the output rather than managing the process.
              </p>
              <a className="text-link" href="#match">
                See how the pod works <Arrow />
              </a>
            </div>
          </div>
          <div className="shell feature-grid">
            {features.map(([title, copy], i) => (
              <article key={title}>
                <span>0{i + 1}</span>
                <h3>{title}</h3>
                <p>{copy}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="match" id="match">
          <i className="spectral a" />
          <i className="spectral b" />
          <div className="shell match-grid">
            <div className="match-copy">
              <div className="eyebrow light">Find your capability match</div>
              <h2>Meet the pod your workload has been waiting for.</h2>
              <p>
                Swipe through GC³ pods. Pass on what you do not need, match with the model that fits
                the work in front of you.
              </p>
              <ul>
                {[
                  "Month-to-month subscription",
                  "Human review on every output",
                  "No setup fee or surprise add-ons",
                ].map((x, i) => (
                  <li key={x}>
                    <span>{i + 1}</span>
                    {x}
                  </li>
                ))}
              </ul>
            </div>
            <SwipeDeck />
          </div>
        </section>

        <section className="capability" id="capabilities">
          <div className="shell">
            <div className="section-head">
              <div>
                <div className="eyebrow">Connected capability</div>
                <h2>One center. Every skill your next move needs.</h2>
              </div>
              <p>
                Strategy, making and systems come out of the same room, on the same calendar,
                measured in the same numbers.
              </p>
            </div>
            <div className="cap-list">
              {capabilities.map(([n, title, copy]) => (
                <a className="cap-row" href="#match" key={n}>
                  <span>{n}</span>
                  <h3>{title}</h3>
                  <p>{copy}</p>
                  <i>
                    <Arrow />
                  </i>
                </a>
              ))}
            </div>
          </div>
        </section>

        <section className="process" id="products">
          <div className="shell process-grid">
            <div className="process-image">
              <img
                src="/gc3/wave.webp"
                alt="Abstract flowing blue fabric"
                width="1200"
                height="675"
                loading="lazy"
                decoding="async"
              />
              <div>
                <b>5</b>
                <span>quality gates</span>
              </div>
            </div>
            <div className="process-copy">
              <div className="eyebrow">How work moves</div>
              <h2>One brief. Five gates. One statement line.</h2>
              <p>
                Every deliverable moves through a visible system — from the approved brief to
                specialist review and your final go-live sign-off.
              </p>
              <div className="steps">
                {[
                  "Brief approved",
                  "Direction selected",
                  "Internal QA",
                  "Client review",
                  "Go live",
                ].map((x, i) => (
                  <div key={x}>
                    <span>0{i + 1}</span>
                    <b>{x}</b>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="evidence" id="proof">
          <div className="shell evidence-grid">
            <div className="evidence-intro">
              <div className="eyebrow light">Proof before promises</div>
              <h2>Evidence before logos.</h2>
              <p>
                Quantocos was incorporated in 2026. We have no client logos, case studies or
                testimonials to publish yet, and we will not invent them.
              </p>
              <p>
                Until we do, judge us on what a case study is normally used to prove: what the work
                costs, how credits are spent, who signs it off, and what the contract says when
                something goes wrong.
              </p>
            </div>
            <div className="proof-grid">
              {proofPoints.map(([number, title, copy]) => (
                <article key={number}>
                  <span>{number}</span>
                  <h3>{title}</h3>
                  <p>{copy}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="insights" id="insights">
          <div className="shell">
            <div className="section-head">
              <div>
                <div className="eyebrow">Latest thinking</div>
                <h2>Signals for the work ahead.</h2>
              </div>
              <a
                className="text-link"
                href="https://quantocos.com/insights.html"
                aria-label="View all GC3 insights"
              >
                View all insights <Arrow />
              </a>
            </div>
            <div className="insight-grid">
              {[
                ["The license problem is the real AI bottleneck", "Research", "/gc3/insight-1.jpg"],
                [
                  "What a pod actually costs against the alternatives",
                  "Perspective",
                  "/gc3/insight-2.jpg",
                ],
                [
                  "Human-in-the-loop is a delivery model, not a disclaimer",
                  "Field note",
                  "/gc3/insight-3.jpg",
                ],
              ].map(([title, tag, image]) => (
                <article key={title}>
                  <div>
                    <img src={image} alt="" loading="lazy" decoding="async" />
                    <span>{tag}</span>
                  </div>
                  <h3>{title}</h3>
                  <a href="https://quantocos.com/insights.html">
                    Read article <Arrow />
                  </a>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="assurance">
          <div className="shell">
            <div className="section-head">
              <div>
                <div className="eyebrow light">Ready across borders</div>
                <h2>Built to be bought from the US, the UK, the EU and ANZ.</h2>
              </div>
              <p>
                Everything a buyer outside India needs to clear before the first conversation,
                stated up front rather than in a proposal.
              </p>
            </div>
            <div className="assurance-list">
              {assurances.map(([title, copy], index) => (
                <article key={title}>
                  <span>0{index + 1}</span>
                  <h3>{title}</h3>
                  <p>{copy}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="faq">
          <div className="shell faq-grid">
            <div className="faq-intro">
              <div className="eyebrow">Before the first call</div>
              <h2>Questions buyers ask.</h2>
              <p>
                Answered from the published terms and the engagement letter, not from a sales deck.
              </p>
            </div>
            <div className="faq-list">
              {faqs.map(([question, answer], index) => (
                <details name="gc3-faq" open={index === 0} key={question}>
                  <summary>
                    <span>0{index + 1}</span>
                    {question}
                    <i aria-hidden="true" />
                  </summary>
                  <p>{answer}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        <section className="cta">
          <div className="shell">
            <div>
              <div className="eyebrow light">Your next capability center</div>
              <h2>Bring us the workload.</h2>
              <p>We will bring the pod, the agents and a clear way to get it shipped.</p>
            </div>
            <a className="button gold" href="mailto:hello@quantocos.com">
              Book a pod briefing <Arrow />
            </a>
          </div>
        </section>
      </main>

      <footer id="footer">
        <div className="shell footer-grid">
          <div className="footer-brand" id="company">
            <a className="brand" href="#top">
              <b>GC³</b>
              <i />
              <small>by Quantocos</small>
            </a>
            <p>Creative, growth, strategy and automation. One monthly capability center.</p>
          </div>
          {footerGroups.map((group) => (
            <div className="footer-col" key={group.title}>
              <b>{group.title}</b>
              {group.links.map(([label, href]) => (
                <a key={label} href={href}>
                  {label}
                </a>
              ))}
            </div>
          ))}
        </div>
        <div className="shell footer-bottom">
          <span>© 2026 Quantocos Global Systems LLP</span>
          <div>
            <a href="https://quantocos.com/legal.html">Privacy</a>
            <a href="https://quantocos.com/legal.html">Terms</a>
          </div>
        </div>
        <p className="shell legal-note">
          Quantocos Global Systems LLP is the parent entity of GC³ and is responsible for the
          services delivered through it. Services are provided under a written engagement letter.
          Products described as in development are not generally available, and no roadmap date
          should be read as a commitment.
        </p>
      </footer>
    </div>
  );
}
