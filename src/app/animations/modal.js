import gsap from "gsap";

const modal = () => {
  const timeline = gsap.timeline({
    paused: true,
    defaults: { duration: 0.2, stagger: 0.2 },
  });
  const modal = document.querySelector(".modal");
  timeline
    .to(modal, { opacity: 1, pointerEvents: "initial" })
    .to(".modal__info", { opacity: 1, scale: 0.9 });
  const close = modal.querySelector(".modal__close");

  close.addEventListener("click", () => {
    timeline.reverse();
  });

  modal.addEventListener("click", (event) => {
    if (event.target === modal) {
      timeline.reverse();
    }
  });

  return (item) => {
    item.addEventListener("click", () => {
      setModalContent(item.dataset.modal);
      timeline.play();
    });
  };
};

const modalContent = {
  teleport: {
    "title-modal": "Teleport",
    modal__technologies: "React/Redux, Teleport Api",
    modal__description: `Проект Телепорт, является тестовым заданием для компании MediaSoft. 
      Задачей данного задания была работа со сторонним Api, загрузка асинхронных данных в Redux, редактирование Redux стейта. `,
    "modal__link-view": { href: "https://teleport-aqrne.mongodbstitch.com/" },
    "modal__link-github": {
      href: "https://github.com/golont/media-soft",
      innerHTML: `<img src="/assets/img/github.svg" alt="GitHub" />`,
    },
  },
  fablab: {
    "title-modal": "FabLab",
    modal__technologies: "TypeScript, MERN - MongoDB, Express, React/Redux, NodeJS",
    modal__description: `Проект FabLab, является заданием на производственную практику: создание интерфейса для просмотра описания офлайн курсов/работы предприятия, разработка панели администратора, для редактирования описания курсов`,
    "modal__link-view": { href: "https://fablablab.herokuapp.com/" },
    "modal__link-github": "",
  },
  diary: {
    "title-modal": "Diary",
    modal__technologies: "MERN - MongoDB, Express, React/Redux, NodeJS",
    modal__description:
      "Идеей данного проекта, стала разработка личного дневника, в котором можно делать записи, и осуществлять поиск по ним.",
    "modal__link-view": {
      href: "https://mydiary-bitse.mongodbstitch.com/about",
    },
    "modal__link-github": {
      href: "https://github.com/golont/myDiary",
      innerHTML: `<img src="/assets/img/github.svg" alt="GitHub" />`,
    },
  },
  typeDiary: {
    "title-modal": "Diary V2",
    modal__technologies: "TypeScript, MERN - MongoDB, Express, React/Redux, NodeJS",
    modal__description:
      "Данный проект включает в себя функции переключения языка, цветовой темы. Основная задача данного проекта — создание авторизации с помощью токена авторизации, научится применять TypeScript в экосистеме React.",
    "modal__link-view": {
      href: "http://type-diary.herokuapp.com/",
    },
    "modal__link-github": {
      href: "https://github.com/golont/MyDiaryTS",
      innerHTML: `<img src="/assets/img/github.svg" alt="GitHub" />`,
    },
  },
  portfolio: {
    "title-modal": "PORTFOLIO",
    modal__technologies: "Native JavaScript, GSAP",
    modal__description:
      "Создание портфолио, включающе описание моей работы и разработанных проектов.",
    "modal__link-view": {
      href: "",
    },
    "modal__link-github": {
      href: "https://github.com/golont/portfolio",
      innerHTML: `<img src="/assets/img/github.svg" alt="GitHub" />`,
    },
  },
};

const setModalContent = (dataAttr) => {
  const object = modalContent[dataAttr];
  for (const key in object) {
    if (object.hasOwnProperty(key)) {
      const element = object[key];
      const block = document.querySelector(`.${key}`);
      if (typeof element === "string") {
        block.innerHTML = element;
      } else {
        for (const subKey in element) {
          if (element.hasOwnProperty(subKey)) {
            const data = element[subKey];
            block[subKey] = data;
          }
        }
      }
    }
  }
};

export default modal();
