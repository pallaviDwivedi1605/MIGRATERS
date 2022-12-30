console.clear();

const { gsap, imagesLoaded } = window;

const buttons = {
  prev: document.querySelector(".btn-backward"),
  next: document.querySelector(".btn--forward"),
};
const cardsContainerEl = document.querySelector(".destination__cards");
const appBgContainerEl = document.querySelector(".destination__background");

const cardInfosContainerEl = document.querySelector(".destination__informacoes");

buttons.next.addEventListener("click", () => swapCards("right"));

buttons.prev.addEventListener("click", () => swapCards("left"));

function swapCards(direction) {
  const currentCardEl = cardsContainerEl.querySelector(".card--current");
  const previousCardEl = cardsContainerEl.querySelector(".card--next1");
  const previousCardE2 = cardsContainerEl.querySelector(".card--next2");
  const nextCardEl = cardsContainerEl.querySelector(".card--previous1");
  const nextCardE2 = cardsContainerEl.querySelector(".card--previous2");

  const currentBgImageEl = appBgContainerEl.querySelector(".imagem--current");
  const previousBgImageEl = appBgContainerEl.querySelector(".imagem--next1");
  const nextBgImageEl = appBgContainerEl.querySelector(".imagem--previous1");
  const previousBgImageE2 = appBgContainerEl.querySelector(".imagem--next2");
  const nextBgImageE2 = appBgContainerEl.querySelector(".imagem--previous2");

  changeInfo(direction);
  swapCardsClass();

  removeCardEvents(currentCardEl);

  function swapCardsClass() {
    currentCardEl.classList.remove("card--current");
    previousCardEl.classList.remove("card--next1");
    nextCardEl.classList.remove("card--previous1");
    previousCardE2.classList.remove("card--next2");
    nextCardE2.classList.remove("card--previous2");

    currentBgImageEl.classList.remove("imagem--current");
    previousBgImageEl.classList.remove("imagem--next1");
    nextBgImageEl.classList.remove("imagem--previous1");
    previousBgImageE2.classList.remove("imagem--next2");
    nextBgImageE2.classList.remove("imagem--previous2");

    currentCardEl.style.zIndex = "50";
    currentBgImageEl.style.zIndex = "-2";

    if (direction === "right") {
      previousCardEl.style.zIndex = "20";
      nextCardEl.style.zIndex = "30";

      nextBgImageEl.style.zIndex = "-1";

      currentCardEl.classList.add("card--previous1");
      previousCardEl.classList.add("card--current");
      previousCardE2.classList.add("card--next1");
      nextCardEl.classList.add("card--previous2");
      nextCardE2.classList.add("card--next2");

      currentBgImageEl.classList.add("imagem--previous1");
      previousBgImageEl.classList.add("imagem--current");
      previousBgImageE2.classList.add("imagem--next1");
      nextBgImageEl.classList.add("imagem--previous2");
      nextBgImageE2.classList.add("imagem--next2");
    } else if (direction === "left") {
      previousCardEl.style.zIndex = "30";
      nextCardEl.style.zIndex = "20";

      previousBgImageEl.style.zIndex = "-1";

      currentCardEl.classList.add("card--next1");
      previousCardEl.classList.add("card--next2");
      nextCardEl.classList.add("card--current");
      previousCardE2.classList.add("card--previous2");
      nextCardE2.classList.add("card--previous1");

      currentBgImageEl.classList.add("imagem--next1");
      previousBgImageEl.classList.add("imagem--next2");
      nextBgImageEl.classList.add("imagem--current");
      previousBgImageE2.classList.add("imagem--previous2");
      nextBgImageE2.classList.add("imagem--previous1");
    }
  }
}

function changeInfo(direction) {
  let currentInfoEl = cardInfosContainerEl.querySelector(
    ".informacoes__current"
  );
  let previousInfoEl = cardInfosContainerEl.querySelector(
    ".informacoes__next1"
  );
  let nextInfoEl = cardInfosContainerEl.querySelector(".informacoes__previous1");
  let previousInfoE2 = cardInfosContainerEl.querySelector(
    ".informacoes__next2"
  );
  let nextInfoE2 = cardInfosContainerEl.querySelector(".informacoes__previous2");

  gsap
    .timeline()
    .to([buttons.prev, buttons.next], {
      duration: 0.2,
      opacity: 0.5,
      pointerEvents: "none",
    })
    .to(
      currentInfoEl.querySelectorAll(".text"),
      {
        duration: 0.4,
        stagger: 0.1,
        translateY: "-120px",
        opacity: 0,
      },
      "-="
    )
    .call(() => {
      swapInfosClass(direction);
    })
    .call(() => initCardEvents())
    .fromTo(
      direction === "right"
        ? nextInfoEl.querySelectorAll(".text")
        : previousInfoEl.querySelectorAll(".text"),
      {
        opacity: 0,
        translateY: "40px",
      },
      {
        duration: 0.4,
        stagger: 0.1,
        translateY: "0px",
        opacity: 1,
      }
    )
    .to([buttons.prev, buttons.next], {
      duration: 0.2,
      opacity: 1,
      pointerEvents: "all",
    });

  function swapInfosClass() {
    currentInfoEl.classList.remove("informacoes__current");
    previousInfoEl.classList.remove("informacoes__next1");
    nextInfoEl.classList.remove("informacoes__previous1");
    previousInfoE2.classList.remove("informacoes__next2");
    nextInfoE2.classList.remove("informacoes__previous2");

    if (direction === "right") {
      currentInfoEl.classList.add("informacoes__previous1");
      nextInfoEl.classList.add("informacoes__previous2");
      previousInfoEl.classList.add("informacoes__current");
      nextInfoE2.classList.add("informacoes__next2");
      previousInfoE2.classList.add("informacoes__next1");
    } else if (direction === "left") {
      currentInfoEl.classList.add("informacoes__next1");
      nextInfoEl.classList.add("informacoes__current");
      previousInfoEl.classList.add("informacoes__next2");
      nextInfoE2.classList.add("informacoes__previous1");
      previousInfoE2.classList.add("informacoes__previous2");
    }
  }
}

function updateCard(e) {
  const card = e.currentTarget;
  const box = card.getBoundingClientRect();
  const centerPosition = {
    x: box.left + box.width / 2,
    y: box.top + box.height / 2,
  };
  let angle = Math.atan2(e.pageX - centerPosition.x, 0) * (35 / Math.PI);
  gsap.set(card, {
    "--current-card-rotation-offset": `${angle}deg`,
  });
  const currentInfoEl = cardInfosContainerEl.querySelector(
    ".informacoes__current"
  );
  gsap.set(currentInfoEl, {
    rotateY: `${angle}deg`,
  });
}

function resetCardTransforms(e) {
  const card = e.currentTarget;
  const currentInfoEl = cardInfosContainerEl.querySelector(
    ".informacoes__current"
  );
  gsap.set(card, {
    "--current-card-rotation-offset": 0,
  });
  gsap.set(currentInfoEl, {
    rotateY: 0,
  });
}

function initCardEvents() {
  const currentCardEl = cardsContainerEl.querySelector(".card--current");
  currentCardEl.addEventListener("pointermove", updateCard);
  currentCardEl.addEventListener("pointerout", (e) => {
    resetCardTransforms(e);
  });
}

initCardEvents();

function removeCardEvents(card) {
  card.removeEventListener("pointermove", updateCard);
}

function init() {
  let tl = gsap.timeline();

  tl.to(cardsContainerEl.children, {
    delay: 0.15,
    duration: 0.5,
    stagger: {
      ease: "power4.inOut",
      from: "right",
      amount: 0.1,
    },
    "--card-translateY-offset": "0%",
  })
    .to(
      cardInfosContainerEl
        .querySelector(".informacoes__current")
        .querySelectorAll(".text"),
      {
        delay: 0.5,
        duration: 0.4,
        stagger: 0.1,
        opacity: 1,
        translateY: 0,
      }
    )
    .to(
      [buttons.prev, buttons.next],
      {
        duration: 0.4,
        opacity: 1,
        pointerEvents: "all",
      },
      "-=0.4"
    );
}

const waitForImages = () => {
  const images = [...document.querySelectorAll("img")];
  const totalImages = images.length;
  let loadedImages = 0;
  const loaderEl = document.querySelector(".loader span");

  gsap.set(cardsContainerEl.children, {
    "--card-translateY-offset": "100vh",
  });
  gsap.set(
    cardInfosContainerEl
      .querySelector(".informacoes__current")
      .querySelectorAll(".text"),
    {
      translateY: "40px",
      opacity: 0,
    }
  );
  gsap.set([buttons.prev, buttons.next], {
    pointerEvents: "none",
    opacity: "0",
  });

  images.forEach((image) => {
    imagesLoaded(image, (instance) => {
      if (instance.isComplete) {
        loadedImages++;
        let loadProgress = loadedImages / totalImages;

        gsap.to(loaderEl, {
          duration: 1,
          scaleX: loadProgress,
          backgroundColor: `hsl(${loadProgress * 120}, 100%, 50%`,
        });

        if (totalImages == loadedImages) {
          gsap
            .timeline()
            .to(".destination__carregamento", {
              duration: 0.8,
              opacity: 0,
              pointerEvents: "none",
            })
            .call(() => init());
        }
      }
    });
  });
};

waitForImages();


