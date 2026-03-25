window.HELP_IMPROVE_VIDEOJS = false;

function initNavbarBurger() {
  $(".navbar-burger").on("click", function() {
    $(".navbar-burger").toggleClass("is-active");
    $(".navbar-menu").toggleClass("is-active");
  });
}

function initBulmaComponents() {
  if (typeof bulmaCarousel !== "undefined") {
    bulmaCarousel.attach(".carousel", {
      slidesToScroll: 1,
      slidesToShow: 3,
      loop: true,
      infinite: true,
      autoplay: false,
      autoplaySpeed: 3000
    });
  }

  if (typeof bulmaSlider !== "undefined") {
    bulmaSlider.attach();
  }
}

function bindHorizontalPanel(panel) {
  var container = panel.querySelector(".js-scroll-container");
  var thumb = panel.querySelector(".js-scroll-thumb");
  var leftBtn = panel.querySelector(".js-scroll-left");
  var rightBtn = panel.querySelector(".js-scroll-right");

  if (!container || !thumb || !leftBtn || !rightBtn) {
    return;
  }

  var isDragging = false;
  var startX = 0;
  var initialLeft = 0;

  function updateThumb() {
    var scrollWidth = container.scrollWidth;
    var clientWidth = container.clientWidth;
    var currentLeft = container.scrollLeft;
    var maxScroll = Math.max(1, scrollWidth - clientWidth);
    var thumbWidth = Math.max(8, (clientWidth / scrollWidth) * 100);
    var leftPercent = (currentLeft / maxScroll) * (100 - thumbWidth);

    thumb.style.width = thumbWidth + "%";
    thumb.style.left = leftPercent + "%";
  }

  function getStep() {
    var firstCard = panel.querySelector(".video-item");
    return firstCard ? firstCard.offsetWidth + 20 : 300;
  }

  container.addEventListener("scroll", updateThumb);
  window.addEventListener("resize", updateThumb);

  thumb.addEventListener("mousedown", function(e) {
    isDragging = true;
    startX = e.pageX;
    initialLeft = container.scrollLeft;
  });

  document.addEventListener("mousemove", function(e) {
    if (!isDragging) {
      return;
    }
    e.preventDefault();
    var scrollBarWidth = thumb.parentElement.clientWidth;
    var thumbWidthPx = thumb.clientWidth;
    var deltaX = e.pageX - startX;
    var ratio = (container.scrollWidth - container.clientWidth) / Math.max(1, scrollBarWidth - thumbWidthPx);
    container.scrollLeft = initialLeft + deltaX * ratio;
  });

  document.addEventListener("mouseup", function() {
    isDragging = false;
  });

  leftBtn.addEventListener("click", function() {
    container.scrollBy({ left: -getStep(), behavior: "smooth" });
  });

  rightBtn.addEventListener("click", function() {
    container.scrollBy({ left: getStep(), behavior: "smooth" });
  });

  updateThumb();
}

$(document).ready(function() {
  initNavbarBurger();
  initBulmaComponents();

  document.querySelectorAll(".video-section").forEach(function(panel) {
    bindHorizontalPanel(panel);
  });
});
