// ---------- Build the page from content.js ----------
// el() makes an element, link() makes an <a>. External links open in a new tab.
function el(tag, cls, text) {
  var e = document.createElement(tag);
  if (cls) e.className = cls;
  if (text) e.textContent = text;
  return e;
}
function link(cls, label, url) {
  var a = el("a", cls, label);
  a.href = url;
  if (/^https?:/.test(url)) { a.target = "_blank"; a.rel = "noopener"; }
  return a;
}

var C = PORTFOLIO;
document.title = C.title;
document.getElementById("brand").textContent = C.title;
document.getElementById("title").textContent = C.title;
document.getElementById("tagline").textContent = C.tagline;
document.getElementById("heading").textContent = C.heading;
document.getElementById("footer").textContent = C.footer;
document.getElementById("contactTitle").textContent = C.contact.title;
document.getElementById("contactText").textContent = C.contact.text;

// Nav links at the top
C.nav.forEach(function (n) {
  document.getElementById("links").appendChild(link("", n[0], "#" + n[1]));
});

// Contact buttons (first one is the solid blue button)
C.contact.buttons.forEach(function (b, i) {
  document.getElementById("actions").appendChild(link(i === 0 ? "all" : "ghost", b.label, b.url));
});

// Dropdown sections
C.sections.forEach(function (s) {
  var item = el("div", "item");
  item.id = s.id;

  var btn = el("button", null, s.title);
  btn.setAttribute("aria-expanded", "false");
  btn.setAttribute("aria-controls", "p-" + s.id);
  btn.appendChild(el("span", "plus"));

  var panel = el("div", "panel");
  panel.id = "p-" + s.id;
  var wrap = el("div");
  var inner = el("div", "inner");

  if (s.type === "text") {
    s.paragraphs.forEach(function (p) { inner.appendChild(el("p", null, p)); });
  } else if (s.type === "projects") {
    s.items.forEach(function (p) {
      var row = el("div", "proj"), d = el("div");
      d.appendChild(el("h3", null, p.name));
      d.appendChild(el("p", null, p.text));
      row.appendChild(d);
      row.appendChild(link("", p.linkLabel || "View on GitHub", p.link));
      inner.appendChild(row);
    });
  } else {
    var ul = el("ul");
    s.items.forEach(function (i) {
      var li = el("li");
      if (i.title) { li.appendChild(el("strong", null, i.title)); li.appendChild(el("br")); }
      li.appendChild(document.createTextNode(i.text || ""));
      ul.appendChild(li);
    });
    inner.appendChild(ul);
  }
  if (s.button) inner.appendChild(link("all", s.button.label, s.button.url));

  wrap.appendChild(inner);
  panel.appendChild(wrap);
  item.appendChild(btn);
  item.appendChild(panel);
  document.getElementById("sections").appendChild(item);
});

// ---------- Behaviour: theme, particles, dropdowns, scroll ----------
// Theme toggle: flip the data-theme attribute and remember the choice
document.getElementById("theme").addEventListener("click", function () {
  var root = document.documentElement;
  var next = root.dataset.theme === "dark" ? "light" : "dark";
  root.dataset.theme = next;
  try { localStorage.setItem("theme", next); } catch (e) {}
});

// Particle beam: a steady stream of tiny dots flowing out from under a button's text
var cv = document.getElementById("fx"), ctx = cv.getContext("2d");
var parts = [], beams = new Map(), running = false;
var calm = matchMedia("(prefers-reduced-motion: reduce)").matches;

// ---- Beam settings: play with these! ----
var TUCK    = 0.18;    // how far up the beam sits inside the text's bottom edge (bigger = closer to the letters)
var LIFT    = 0.10;    // the starting upward angle of each dot (0 = flat)
var CURL    = 0.003;   // upward pull every frame; this is what bends the wings into a smile
var SMILE   = 0.05;    // how much the start line curves up at the text's ends (as a fraction of font size)
var DENSITY = 6;       // dots released per frame

function fit() {
  var d = devicePixelRatio || 1;
  cv.width = innerWidth * d; cv.height = innerHeight * d;
  ctx.setTransform(d, 0, 0, d, 0, 0);
}
fit(); addEventListener("resize", fit);

// Find where the words sit, so the beam starts right under the text
function textRect(el) {
  var n = el.firstChild;
  while (n && n.nodeType !== 3) n = n.firstChild;
  if (!n) return el.getBoundingClientRect();
  var r = document.createRange();
  r.selectNodeContents(n);
  return r.getBoundingClientRect();
}

// Start a beam. Give ms for a timed beam, or leave it out to run until stopBeam()
function beam(el, ms) {
  if (calm) return;
  beams.set(el, ms ? performance.now() + ms : Infinity);
  if (!running) { running = true; requestAnimationFrame(tick); }
}
function stopBeam(el) { beams.delete(el); }

function tick(now) {
  ctx.clearRect(0, 0, innerWidth, innerHeight);
  var col = getComputedStyle(document.documentElement).getPropertyValue("--fx").trim();

  // Each frame, every active beam releases a few new dots
  beams.forEach(function (until, el) {
    if (now > until) { beams.delete(el); return; }
    var r = textRect(el);
    if (r.bottom < 0 || r.top > innerHeight) return;           // off screen, skip

    var fs = parseFloat(getComputedStyle(el).fontSize);        // font size, so everything scales with the text
    var cx = r.left + r.width / 2;                             // horizontal middle of the text
    var base = r.bottom + scrollY - fs * TUCK;                 // the line the beam starts on, tucked up to the letters

    for (var i = 0; i < DENSITY; i++) {
      var off = (Math.random() - 0.5) * r.width * 0.9;         // where along the text this dot is born (negative = left of middle)
      var dir = off < 0 ? -1 : 1;                              // born on the left? fly left. Born on the right? fly right.
      var edge = Math.abs(off) / (r.width / 2);                // 0 at the middle, close to 1 at the ends
      var speed = 0.5 + Math.random() * 3.2;                   // this dot's outward speed, picked once and reused

      parts.push({
        x: cx + off,
        y: base - edge * edge * fs * SMILE + (Math.random() - 0.5) * 3, // ends start higher, so the start line is a shallow smile
        vx: dir * speed,                                       // sideways speed
        vy: -speed * LIFT + (Math.random() - 0.5) * 0.08,      // upward in proportion to speed, plus a tiny wobble
        s: 0.8 + Math.random() * 1.4,                          // dot size in pixels
        life: 1, decay: 0.008 + Math.random() * 0.012,         // how fast it fades
        tw: Math.random() * 6.28                               // this dot's twinkle phase, so they don't all flicker together
      });
    }
  });

  // Move and draw every dot (page coordinates, so they scroll with the page)
  parts = parts.filter(function (p) { return p.life > 0; });
  ctx.fillStyle = col;
  parts.forEach(function (p) {
    p.x += p.vx; p.y += p.vy;                                  // move
    p.vx *= 0.988;                                             // sideways speed fades, so dots drift to a stop
    p.vy = p.vy * 0.99 - CURL;                                 // upward pull: this is the smile curl
    p.life -= p.decay;                                         // age the dot

    var twinkle = 0.75 + 0.25 * Math.sin(now * 0.012 + p.tw);  // soft flicker between 50% and 100%
    ctx.globalAlpha = Math.max(0, p.life) * Math.min(1, (1 - p.life) * 10) * twinkle;
    ctx.fillRect(p.x, p.y - scrollY, p.s, p.s);                // swap for ctx.arc(...) if you want round dots
  });

  if (parts.length || beams.size) requestAnimationFrame(tick);
  else { running = false; ctx.clearRect(0, 0, innerWidth, innerHeight); }
}

// Buttons and the big heading send a 2.5 second beam when clicked
document.querySelectorAll(".go, .all, .ghost").forEach(function (el) {
  el.addEventListener("click", function () { beam(el, 2500); });
});
var h1 = document.querySelector(".hero h1");
h1.addEventListener("click", function () { beam(h1, 2500); });

// Accordion: toggle .open on the clicked item and keep aria-expanded in sync
document.querySelectorAll(".item > button").forEach(function (btn) {
  btn.addEventListener("click", function () {
    var item = btn.parentElement;
    var open = item.classList.toggle("open");
    btn.setAttribute("aria-expanded", open);
    if (open) beam(btn); else stopBeam(btn);   // beam runs while the dropdown is open
  });
});

// If the URL hash points at a section (like #projects), open that section
function openFromHash() {
  var el = document.getElementById(location.hash.slice(1));
  if (el && el.classList.contains("item") && !el.classList.contains("open")) {
    el.classList.add("open");
    el.querySelector("button").setAttribute("aria-expanded", "true");
    beam(el.querySelector("button"));
  }
}
addEventListener("hashchange", openFromHash);
openFromHash();

// Nav gets a thin line once you scroll past the top
var nav = document.getElementById("nav");
addEventListener("scroll", function () {
  nav.classList.toggle("scrolled", scrollY > 8);
}, { passive: true });

// Reveal the section heading and list as they enter the screen
var io = new IntersectionObserver(function (entries) {
  entries.forEach(function (e) {
    if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); }
  });
}, { threshold: 0.15 });
document.querySelectorAll(".reveal").forEach(function (el) { io.observe(el); });