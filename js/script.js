// SEARCH BOX LOGIC

const searchBox = document.getElementById("search_box");
const searchBtn = document.getElementById("search_btn");
const navMenuList = document.querySelector("nav ul");

const showSearchBox = (e) => {
  if (searchBox.style.display === "" || searchBox.style.display === "none") {
    navMenuList.style.display = "none";
    searchBox.style.display = "block";
  } else {
    navMenuList.style.display = "block";
    searchBox.style.display = "none";
  }
};

searchBtn.addEventListener("click", showSearchBox);

// THUMBNAIL GALLARY LOGIN

let currentImage = null;
const images = [
  "thumbnail_1",
  "thumbnail_2",
  "thumbnail_3",
  "thumbnail_4",
  "product_thumbnail_1",
  "product_thumbnail_2",
  "product_thumbnail_3",
  "product_thumbnail_4",
];
const thumbnailImage = document.getElementById("thumbnail_image");
const gallarySliderLeft = document.getElementById("gallary_slider_left");
const gallarySliderRight = document.getElementById("gallary_slider_right");
const sliderDots = document.getElementById("gallary_dots");
const thumbnails = document.querySelectorAll(".thumbnail");

const markCircleAndImage = () => {
  circles = sliderDots.children;
  for (let i = 0; i < circles.length; i++) {
    circles[i].style.backgroundColor = "white";
  }
  circles[currentImage % 4].style.backgroundColor = "black";
  thumbnailImage.src = `assets/images/${images[currentImage]}.jpg`;
};

const slideImage = (e, message) => {
  switch (message) {
    case "right":
      if (currentImage === null) currentImage = 0;
      else if (currentImage === images.length - 1) {
        currentImage = 0;
      } else currentImage += 1;
      break;
    case "left":
      if (currentImage === null) currentImage = images.length - 1;
      else if (currentImage === 0) {
        currentImage = images.length - 1;
      } else currentImage -= 1;
      break;
    case "dot":
      const id = e.target.id;
      switch (id) {
        case "circle_1":
          currentImage = 4;
          break;
        case "circle_2":
          currentImage = 5;
          break;
        case "circle_3":
          currentImage = 6;
          break;
        case "circle_4":
          currentImage = 7;
          break;
      }
  }
  markCircleAndImage();
};

gallarySliderRight.addEventListener("click", (e) => slideImage(e, "right"));
gallarySliderLeft.addEventListener("click", (e) => slideImage(e, "left"));
sliderDots.addEventListener("click", (e) => slideImage(e, "dot"));

for (let i = 0; i < thumbnails.length; i++) {
  thumbnails[i].addEventListener("click", (e) => {
    currentImage = i;
    markCircleAndImage();
  });
}

//  ADD TO CART LINK LOGIC

const flavourRadioBtns = document.querySelectorAll('input[name="flavour"]');
const planRadioBtns = document.querySelectorAll('input[name="plan"]');

const addLinkToCart = (e) => {
  const flavour = document.querySelector('input[name="flavour"]:checked').value;
  const plan = document.querySelector('input[name="plan"]:checked').value;
  const cartBtn = document.getElementById("cart_btn");

  cartBtn.href = `?flavour=${flavour}&plan=${plan}`;
};

addLinkToCart();

flavourRadioBtns.forEach((radio) => {
  radio.addEventListener("change", addLinkToCart);
});

planRadioBtns.forEach((radio) => {
  radio.addEventListener("change", addLinkToCart);
});

//  PERCENT INCREMENT ON LOAD LOGIC

document.addEventListener("DOMContentLoaded", () => {
  function animateCounter(element, target) {
    let start = 0;
    let duration = 1500;
    let increment = target / (duration / 16);

    function updateCounter() {
      start += increment;
      if (start < target) {
        element.textContent = Math.floor(start) + "%";
        requestAnimationFrame(updateCounter);
      } else {
        element.textContent = target + "%";
      }
    }

    updateCounter();
  }

  function startCounting(entries, observer) {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        let counter = entry.target.querySelector("h2");
        let targetNumber = parseInt(counter.textContent);
        animateCounter(counter, targetNumber);
        observer.unobserve(entry.target);
      }
    });
  }

  let observer = new IntersectionObserver(startCounting, { threshold: 0.5 });

  document.querySelectorAll(".percent-section > div").forEach((div) => {
    observer.observe(div);
  });
});

// FAQ ACCORDIAN LOGIC

let openAccordianIndex = null;
const accordian = document.querySelectorAll(".accordian");
const accordianSolution = document.querySelectorAll(".accordian-solution");

const renderAccordian = () => {
  accordianSolution.forEach((acc) => (acc.style.display = "none"));

  if (openAccordianIndex !== null)
    accordianSolution[openAccordianIndex].style.display = "block";
};

accordian.forEach((acc, index) =>
  acc.addEventListener("click", () => {
    if (openAccordianIndex === index) openAccordianIndex = null;
    else openAccordianIndex = index;
    renderAccordian();
  })
);

// TESTIMONY SECTION LOGIN

const wrapper = document.querySelector(".testimony-card-wrapper");
const slideLeft = document.getElementById("testimony_slide_left");
const slideRight = document.getElementById("testimony_slide_right");

let currentIndex = 0;
const totalCards = document.querySelectorAll(".testimony-card").length;
const cardsPerView = 3;
const maxIndex = Math.ceil(totalCards / cardsPerView) - 1;
const sliderCircle = document.querySelectorAll(
  ".testimonial-section >.slider-circle-container > .slider-circle"
);
sliderCircle[0].style.backgroundColor = "black";

const markSliderCircle = () => {
  sliderCircle.forEach((circle) => (circle.style.backgroundColor = "white"));
  console.log(currentIndex);
  sliderCircle[currentIndex].style.backgroundColor = "black";
};

const updateSlider = () => {
  const translateX = -(currentIndex * 103);
  wrapper.style.transform = `translateX(${translateX}%)`;
  markSliderCircle();
};

slideRight.addEventListener("click", () => {
  if (currentIndex < maxIndex) {
    currentIndex++;
    updateSlider();
  }
});

slideLeft.addEventListener("click", () => {
  if (currentIndex > 0) {
    currentIndex--;
    updateSlider();
  }
});
