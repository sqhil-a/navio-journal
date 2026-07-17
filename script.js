document.documentElement.classList.add("motion-ready");

document.querySelectorAll("[data-word-reveal]").forEach((heading) => {
  const text = heading.textContent.trim();
  heading.setAttribute("aria-label", text);
  heading.textContent = "";
  text.split(/\s+/).forEach((word, index, words) => {
    const span = document.createElement("span");
    span.className = "word";
    span.style.setProperty("--i", index);
    span.setAttribute("aria-hidden", "true");
    span.textContent = word;
    heading.append(span, index < words.length - 1 ? " " : "");
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

const menu = document.querySelector(".menu-button");
const nav = document.querySelector(".nav");
menu?.addEventListener("click", () => {
  const open = nav.classList.toggle("open");
  menu.setAttribute("aria-expanded", String(open));
  menu.textContent = open ? "Close" : "Menu";
});
nav?.querySelectorAll("a").forEach((link) => link.addEventListener("click", () => {
  nav.classList.remove("open");
  menu?.setAttribute("aria-expanded", "false");
  if (menu) menu.textContent = "Menu";
}));

const progress = document.querySelector(".progress");
if (progress) {
  const update = () => {
    const height = document.documentElement.scrollHeight - innerHeight;
    progress.style.transform = `scaleX(${height > 0 ? scrollY / height : 0})`;
  };
  addEventListener("scroll", update, { passive: true });
  update();
}
