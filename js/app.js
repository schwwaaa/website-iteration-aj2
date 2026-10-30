/* Schwwaaa site. Content lives in data/content.js; this file only draws it.
   Text goes in with textContent, never innerHTML, so content is always plain text. */

(() => {
  "use strict";

  const $ = (selector, root = document) => root.querySelector(selector);
  const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];

  // Small element builder: h("a", { href, class, text }, child, "string child")
  function h(tag, props = {}, ...children) {
    const node = document.createElement(tag);
    for (const [key, value] of Object.entries(props)) {
      if (value === null || value === undefined || value === false) continue;
      if (key === "class") node.className = value;
      else if (key === "text") node.textContent = value;
      else if (key.startsWith("on")) node.addEventListener(key.slice(2), value);
      else node.setAttribute(key, value === true ? "" : value);
    }
    node.append(...children.filter((c) => c !== null && c !== undefined && c !== false));
    return node;
  }

  const isExternal = (url) => /^https?:\/\//.test(url);
  const linkProps = (url) => (isExternal(url) ? { href: url, target: "_blank", rel: "noopener" } : { href: url });
  const YT_ID = /^[\w-]{6,20}$/;

  // Full ISO dates (2025-08-15) read as "Aug 15, 2025". Anything else is shown as written.
  function formatDate(date) {
    if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) return date;
    const [y, m, d] = date.split("-").map(Number);
    return new Date(y, m - 1, d).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
  }

  /* ---------- tabs ---------- */

  function makeTabs(container, options, onSelect) {
    container.setAttribute("role", "tablist");
    const buttons = options.map((opt) =>
      h("button", {
        type: "button",
        class: "tab",
        role: "tab",
        "aria-selected": "false",
        text: opt.label,
        onclick: () => select(opt.value),
      })
    );
    container.replaceChildren(...buttons);

    function select(value) {
      options.forEach((opt, i) => buttons[i].setAttribute("aria-selected", String(opt.value === value)));
      onSelect(value);
    }

    select(options[0].value);
  }

  /* ---------- media dialog (productions and event replays) ---------- */

  const mediaDialog = $("#mediaDialog");
  const mediaFrame = $("#mediaFrame");
  const mediaTitle = $("#mediaTitle");
  const mediaNote = $("#mediaNote");

  function openMedia(youtubeId, title, note = "") {
    if (!YT_ID.test(youtubeId)) return;
    mediaTitle.textContent = title;
    mediaNote.textContent = note;
    mediaFrame.src = `https://www.youtube-nocookie.com/embed/${youtubeId}?autoplay=1`;
    mediaDialog.showModal();
  }

  // Clearing src stops playback when the dialog closes.
  mediaDialog.addEventListener("close", () => {
    mediaFrame.src = "";
  });
  $("#mediaClose").addEventListener("click", () => mediaDialog.close());
  mediaDialog.addEventListener("click", (e) => {
    if (e.target === mediaDialog) mediaDialog.close(); // click on the backdrop
  });

  /* ---------- rendering ---------- */

  function renderWhatsNew(items) {
    $("#whatsNew").replaceChildren(
      ...items.map((n) =>
        h("li", {},
          h("span", { class: "news-date", text: n.date }),
          h("a", { href: n.href, text: n.text })
        )
      )
    );
  }

  function renderSocials(socials) {
    $("#socialList").replaceChildren(
      ...socials.map((s) =>
        h("li", {},
          h("a", linkProps(s.url),
            h("span", { class: "social-name", text: s.label }),
            h("span", { class: "social-blurb", text: s.blurb }),
            h("span", { class: "social-go", "aria-hidden": "true", text: "Visit →" })
          )
        )
      )
    );
    $("#sideSocial").replaceChildren(
      ...socials.map((s) => h("li", {}, h("a", linkProps(s.url), s.label)))
    );
  }

  /* ---------- sidebar accordion (phones) and colour schemes ---------- */

  // On phones the sidebar panels fold away. On wider screens they stay open and the summaries do nothing.
  function setupAccordion() {
    const phone = window.matchMedia("(max-width: 800px)");
    const panels = $$(".sidebar details.panel");

    panels.forEach((p) => {
      $("summary", p).addEventListener("click", (e) => {
        if (!phone.matches) e.preventDefault();
      });
    });

    const apply = (isPhone) => panels.forEach((p) => (p.open = !isPhone));
    apply(phone.matches);
    phone.addEventListener("change", (e) => apply(e.matches));
  }

  const COLOURWAYS = ["navy", "slate", "olive", "oxblood"];

  function setupColourways() {
    const read = () => {
      try { return localStorage.getItem("schwwaaa-colourway"); } catch { return null; }
    };
    const write = (value) => {
      try { localStorage.setItem("schwwaaa-colourway", value); } catch { /* storage blocked: fine */ }
    };

    const choose = (name) => {
      const scheme = COLOURWAYS.includes(name) ? name : "slate";
      document.documentElement.dataset.colorway = scheme;
      $$("[data-colorway]").forEach((b) => b.setAttribute("aria-pressed", String(b.dataset.colorway === scheme)));
      write(scheme);
    };

    $$("[data-colorway]").forEach((b) => b.addEventListener("click", () => choose(b.dataset.colorway)));
    choose(read());
  }

  function projectCard(p) {
    const icon = p.icon
      ? h("img", { class: "card-icon", src: p.icon, alt: "", loading: "lazy" })
      : null;

    return h("article", { class: "card" },
      h("div", { class: "card-top" },
        icon,
        h("span", { class: `status status-${p.status}`, text: p.status })
      ),
      h("h3", { text: p.name }),
      h("p", { text: p.summary }),
      p.description
        ? h("details", { class: "card-more" },
            h("summary", { text: "About this project" }),
            h("p", { text: p.description })
          )
        : null,
      h("div", { class: "tag-row" }, ...p.tags.map((t) => h("span", { text: t }))),
      p.links.length
        ? h("div", { class: "card-links" }, ...p.links.map((l) => h("a", { ...linkProps(l.url), text: `${l.label} →` })))
        : null
    );
  }

  function renderProjects(projects) {
    const tags = [...new Set(projects.flatMap((p) => p.tags))].sort();
    const grid = $("#projectGrid");
    makeTabs(
      $("#projectTabs"),
      [{ value: "all", label: "All" }, ...tags.map((t) => ({ value: t, label: t }))],
      (value) => {
        const shown = projects.filter((p) => value === "all" || p.tags.includes(value));
        grid.replaceChildren(...shown.map(projectCard));
      }
    );
  }

  const KIND_LABELS = {
    "music-video": "Music video",
    "short-film": "Short film",
    vignette: "Vignette",
  };

  function mediaTile(item) {
    if (!item.youtube) {
      return h("div", { class: "media-tile is-empty" },
        h("div", { class: "thumb thumb-empty", "aria-hidden": "true", text: "Coming soon" }),
        h("strong", { text: item.title }),
        h("small", { text: item.blurb })
      );
    }
    return h("button", {
        type: "button",
        class: "media-tile",
        onclick: () => openMedia(item.youtube, item.title, item.blurb),
      },
      h("span", { class: "thumb" },
        h("img", {
          src: `https://img.youtube.com/vi/${item.youtube}/hqdefault.jpg`,
          alt: "",
          loading: "lazy",
        }),
        h("span", { class: "play", "aria-hidden": "true" })
      ),
      h("strong", { text: item.title }),
      h("small", { text: [KIND_LABELS[item.kind], item.year].filter(Boolean).join(" · ") })
    );
  }

  function renderProductions(items) {
    const grid = $("#productionGrid");
    const options = [
      { value: "all", label: "All" },
      ...Object.entries(KIND_LABELS).map(([value, label]) => ({ value, label: `${label}s` })),
    ];
    makeTabs($("#productionTabs"), options, (value) => {
      const shown = items.filter((i) => value === "all" || i.kind === value);
      grid.replaceChildren(...shown.map(mediaTile));
    });
  }

  function eventRow(e, actions) {
    return h("article", { class: "event" },
      h("div", { class: "event-date", text: formatDate(e.date) || "" }),
      h("div", {},
        h("h4", { text: e.title }),
        e.location ? h("p", { text: e.location }) : null,
        h("p", { text: e.blurb })
      ),
      h("div", { class: "card-links" }, ...actions)
    );
  }

  function renderEvents({ upcoming = [], past = [] }, socials) {
    const upcomingEl = $("#upcomingEvents");
    if (upcoming.length) {
      upcomingEl.replaceChildren(
        ...upcoming.map((e) =>
          eventRow(e, e.url ? [h("a", { ...linkProps(e.url), text: "Details →" })] : [])
        )
      );
    } else {
      const discord = socials.find((s) => s.label === "Discord");
      upcomingEl.replaceChildren(
        h("div", { class: "event-empty" },
          h("p", { text: "Nothing on the calendar yet. We announce in Discord first." }),
          discord ? h("p", {}, h("a", { ...linkProps(discord.url), text: "Join the Discord →" })) : null
        )
      );
    }

    $("#pastEvents").replaceChildren(
      ...past.map((e) => {
        const actions = [];
        if (e.youtube) {
          actions.push(h("button", {
            type: "button",
            class: "text-button",
            text: "Watch replay →",
            onclick: () => openMedia(e.youtube, e.title, e.blurb),
          }));
        }
        if (e.url) actions.push(h("a", { ...linkProps(e.url), text: "Info →" }));
        return eventRow(e, actions);
      })
    );
  }

  /* ---------- live player ---------- */

  function setupLive(live) {
    const start = $("#liveStart");
    const frame = $("#liveFrame");

    start.addEventListener("click", () => {
      frame.src = live.embed;
      frame.hidden = false;
      start.hidden = true;
    });

    // The embedded player reports its own height so the frame fits it.
    window.addEventListener("message", (event) => {
      if (event.data?.type === "resizeIframe" && event.data.height) {
        frame.style.height = `${event.data.height}px`;
      }
    });
  }

  /* ---------- newsletter ---------- */

  function setupNewsletter({ formAction, fields }) {
    const form = $("#newsletterForm");
    const status = $("#newsletterStatus");

    form.addEventListener("submit", async (e) => {
      e.preventDefault();
      if (!form.reportValidity()) return;

      // Map our field names onto the Google Form's entry IDs (see data/content.js).
      const body = new FormData();
      for (const input of $$("[data-field]", form)) {
        if (input.type === "checkbox" && !input.checked) continue;
        body.append(fields[input.dataset.field], input.value);
      }

      status.classList.remove("error");
      status.textContent = "Sending…";
      try {
        // Google Forms sends no CORS headers, so the response is opaque: a send that does not throw is the best we can know.
        await fetch(formAction, { method: "POST", mode: "no-cors", body });
        form.reset();
        status.textContent = "Thank you. You are on the list.";
      } catch {
        status.classList.add("error");
        status.textContent = "That did not send. Please try again, or find us on Discord.";
      }
    });
  }

  /* ---------- boot ---------- */

  function init() {
    const content = window.SCHWWAAA;
    if (!content) {
      const box = $("#contentError");
      box.textContent = "The site content did not load. Check that data/content.js sits next to index.html.";
      box.hidden = false;
      return;
    }

    const { site, projects, productions, events } = content;
    renderWhatsNew(site.whatsNew);
    renderSocials(site.socials);
    setupAccordion();
    setupColourways();
    renderProjects(projects);
    renderProductions(productions);
    renderEvents(events, site.socials);
    setupLive(site.live);
    setupNewsletter(site.newsletter);
  }

  init();
})();
