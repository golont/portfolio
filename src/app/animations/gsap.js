import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import ScrollTo from "gsap/ScrollToPlugin";

gsap.registerPlugin(ScrollTrigger, ScrollTo);

const init = () => {
  const timeline = gsap.timeline({
    defaults: { duration: 0.5, stagger: 0.1, ease: "slow(0.7, 0.7, false)" },
  });
  timeline
    .from(".header", { duration: 1, y: "-100%" })
    .from(".about__skill", { opacity: 0, delay: 0.2 }, "<")
    .from(".about__photo", { x: "-300%" }, "<")
    .from(".about__description", { x: "-300%" }, "<");
};

const projects = () => {
  gsap.from([".title-projects", ".bar-projects"], {
    scrollTrigger: ".projects__items",
    duration: 0.4,
    stagger: 0.2,
    x: "-300%",
  });
  gsap.from(".projects__item", {
    scrollTrigger: ".projects__items",
    opacity: 0,
    delay: 0.2,
    duration: 0.4,
    stagger: 0.2,
  });

  const cards = document.querySelectorAll(".card");

  for (const card of cards) {
    const timeline = gsap.timeline({
      defaults: { duration: 0.4 },
      paused: true,
    });
    const title = card.querySelector(".title");
    const more = card.querySelector(".card__more");

    timeline
      .to(card, { opacity: 1 })
      .from(title, { y: "-120%", ease: "power4.out", opacity: 0 })
      .from(more, { y: "+150%", ease: "power4.out", opacity: 0 }, "<");

    card.addEventListener("mouseenter", () => {
      timeline.play();
    });
    card.addEventListener("mouseleave", () => {
      timeline.reverse();
    });
  }
};

const header = () => {
  const headerLinks = document.querySelectorAll(
    ".header__links-left .header__link"
  );
  for (const link of headerLinks) {
    link.addEventListener("click", () => {
      gsap.to(window, {
        duration: 0.6,
        scrollTo: `.${link.dataset.to}`,
        ease: "expo.inOut",
      });
    });
    console.log(link.dataset.to);
  }
};

init();
projects();
header();
