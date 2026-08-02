/* 嬴惑守心官网 · 交互 */
(function () {
  "use strict";

  /* ---------- 导航滚动态 ---------- */
  const nav = document.querySelector(".site-nav");
  const backTop = document.getElementById("backTop");
  const onScroll = () => {
    const y = window.scrollY;
    nav.classList.toggle("scrolled", y > 40);
    backTop.classList.toggle("show", y > 600);
  };
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();
  backTop.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));

  /* ---------- 滚动渐显 ---------- */
  const revealEls = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("in-view");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );
    revealEls.forEach((el) => io.observe(el));
  } else {
    revealEls.forEach((el) => el.classList.add("in-view"));
  }

  /* ---------- 截图画廊 ---------- */
  const slides = Array.from(document.querySelectorAll(".g-slide"));
  const dotsWrap = document.getElementById("gDots");
  let current = 0;
  if (slides.length > 0) {
    slides.forEach((_, i) => {
      const dot = document.createElement("button");
      dot.setAttribute("aria-label", "第 " + (i + 1) + " 张");
      if (i === 0) dot.classList.add("is-active");
      dot.addEventListener("click", () => go(i));
      dotsWrap.appendChild(dot);
    });
    const dots = Array.from(dotsWrap.children);
    const go = (i) => {
      current = (i + slides.length) % slides.length;
      slides.forEach((s, idx) => s.classList.toggle("is-active", idx === current));
      dots.forEach((d, idx) => d.classList.toggle("is-active", idx === current));
    };
    document.getElementById("gPrev").addEventListener("click", () => go(current - 1));
    document.getElementById("gNext").addEventListener("click", () => go(current + 1));
    // 键盘左右切换
    document.addEventListener("keydown", (e) => {
      if (e.key === "ArrowLeft") go(current - 1);
      if (e.key === "ArrowRight") go(current + 1);
    });
  }

  /* ---------- 正式版 Toast ---------- */
  const toast = document.getElementById("toast");
  let toastTimer = null;
  function showToast(msg) {
    toast.textContent = msg;
    toast.classList.add("show");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toast.classList.remove("show"), 2400);
  }
  document.getElementById("fullVersion").addEventListener("click", (e) => {
    e.preventDefault();
    showToast("正式版敬请期待 · 含修炼体系与蛊市交易");
  });

  /* ---------- 标题字逐字缀墨（视觉点缀） ---------- */
  const titleSpans = document.querySelectorAll(".hero-title-vertical span");
  titleSpans.forEach((s, i) => {
    s.style.setProperty("--i", i);
  });
})();
