document.documentElement.classList.add("motion-ready");

document.querySelectorAll("[data-word-reveal]").forEach((heading) => {
  const text = heading.textContent.trim();
  heading.setAttribute("aria-label", text);
  heading.textContent = "";
  text.split(/\s+/).forEach((word, index, words) => {
    const clip = document.createElement("span");
    const wordElement = document.createElement("span");
    clip.className = "word-rise-clip";
    wordElement.className = "word-rise-word";
    wordElement.style.setProperty("--i", index);
    wordElement.setAttribute("aria-hidden", "true");
    wordElement.textContent = word;
    clip.append(wordElement);
    heading.append(clip, index < words.length - 1 ? " " : "");
  });
});

const reveals = document.querySelectorAll(".reveal");
if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add("visible");
      observer.unobserve(entry.target);
    });
  }, { threshold: 0.08, rootMargin: "0px 0px -30px" });
  reveals.forEach((element) => observer.observe(element));
} else {
  reveals.forEach((element) => element.classList.add("visible"));
}

const menu = document.querySelector(".menu-toggle");
const nav = document.querySelector(".mobile-menu");
menu?.addEventListener("click", () => {
  const open = nav.classList.toggle("is-open");
  menu.setAttribute("aria-expanded", String(open));
  menu.classList.toggle("is-open", open);
  nav.setAttribute("aria-hidden", String(!open));
  document.body.classList.toggle("menu-open", open);
  const label = menu.querySelector(".sr-only");
  if (label) label.textContent = `${open ? "Close" : "Open"} navigation menu`;
});
nav?.querySelectorAll("a").forEach((link) => link.addEventListener("click", () => {
  nav.classList.remove("is-open");
  nav.setAttribute("aria-hidden", "true");
  menu?.setAttribute("aria-expanded", "false");
  menu?.classList.remove("is-open");
  document.body.classList.remove("menu-open");
}));

addEventListener("keydown", (event) => {
  if (event.key !== "Escape" || !nav?.classList.contains("is-open")) return;
  nav.classList.remove("is-open");
  nav.setAttribute("aria-hidden", "true");
  menu?.setAttribute("aria-expanded", "false");
  menu?.classList.remove("is-open");
  document.body.classList.remove("menu-open");
  menu?.focus();
});

const header = document.querySelector(".site-header");
const updateHeader = () => header?.classList.toggle("is-scrolled", scrollY > 16);
addEventListener("scroll", updateHeader, { passive: true });
updateHeader();

const progress = document.querySelector(".progress");
if (progress) {
  const update = () => {
    const height = document.documentElement.scrollHeight - innerHeight;
    progress.style.transform = `scaleX(${height > 0 ? scrollY / height : 0})`;
  };
  addEventListener("scroll", update, { passive: true });
  update();
}
