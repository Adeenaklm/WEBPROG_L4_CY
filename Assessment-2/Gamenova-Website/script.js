// ✅ Email Validator Helper
function validateEmail(email) {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
}

// ✅ Toast UI Function (single unified version)
function showToast(message) {
  const toast = document.createElement("div");
  toast.className = "toast";
  toast.textContent = message;

  Object.assign(toast.style, {
    position: "fixed",
    bottom: "20px",
    left: "50%",
    transform: "translateX(-50%)",
    background: "#333",
    color: "#fff",
    padding: "10px 20px",
    borderRadius: "5px",
    zIndex: 9999,
    opacity: 0,
    transition: "opacity 0.3s ease",
    fontFamily: "Arial, sans-serif",
    fontSize: "14px",
    pointerEvents: "none",
  });

  document.body.appendChild(toast);
  setTimeout(() => (toast.style.opacity = 1), 50);
  setTimeout(() => {
    toast.style.opacity = 0;
    setTimeout(() => toast.remove(), 300);
  }, 2500);
}

// Main Script wrapped inside DOMContentLoaded
document.addEventListener("DOMContentLoaded", () => {
  // ===== Newsletter Submit Handler =====
  const newsletterForm = document.querySelector(".newsletter-form");
  if (newsletterForm) {
    newsletterForm.addEventListener("submit", function (e) {
      e.preventDefault();
      const emailInput = this.querySelector('input[type="email"]');
      const email = emailInput.value.trim();

      if (!validateEmail(email)) {
        showToast("❌ Please enter a valid email address.");
        return;
      }

      this.reset();
      showToast("✅ Thanks for subscribing to our newsletter!");
    });
  }

  // ===== Wishlist + Filter System =====
  const searchInput = document.querySelector(".filter-bar input[type='text']");
  const [platformFilter, genreFilter, sortFilter] = document.querySelectorAll(".filter-bar select");
  const gameCards = document.querySelectorAll(".game-card");
  const wishlistKey = "gamenova-wishlist";
  let wishlist = JSON.parse(localStorage.getItem(wishlistKey)) || [];

  gameCards.forEach(card => {
    const title = card.querySelector("h3")?.textContent.trim();
    const wishlistBtn = card.querySelector(".wishlist-btn");

    if (!title || !wishlistBtn) return;

    if (wishlist.includes(title)) {
      wishlistBtn.classList.add("added");
      wishlistBtn.textContent = "💖 Wishlisted";
    }

    wishlistBtn.addEventListener("click", () => {
      let message = "";
      if (wishlist.includes(title)) {
        wishlist = wishlist.filter(item => item !== title);
        wishlistBtn.classList.remove("added");
        wishlistBtn.textContent = "❤️ Wishlist";
        message = `❌ Removed "${title}" from Wishlist`;
      } else {
        wishlist.push(title);
        wishlistBtn.classList.add("added");
        wishlistBtn.textContent = "💖 Wishlisted";
        message = `✅ Added "${title}" to Wishlist`;
      }
      localStorage.setItem(wishlistKey, JSON.stringify(wishlist));
      showToast(message);
    });
  });

  // 📢 News "Read More" popup logic
document.querySelectorAll(".news-card").forEach((card) => {
  const readMoreBtn = card.querySelector(".read-more-btn");
  if(readMoreBtn) {
    readMoreBtn.addEventListener("click", () => {
      showToast("📰 Detailed reviews are coming soon! Stay tuned.");
    });
  }
});

function showToast(message) {
  const toast = document.createElement("div");
  toast.className = "toast";
  toast.textContent = message;
  document.body.appendChild(toast);

  setTimeout(() => {
    toast.classList.add("show");
  }, 100);

  setTimeout(() => {
    toast.classList.remove("show");
    setTimeout(() => document.body.removeChild(toast), 300);
  }, 3000);
}


  function filterCards(searchTerm, platform, genre) {
    gameCards.forEach(card => {
      const title = card.querySelector("h3")?.textContent.toLowerCase() || "";
      const genreText = card.querySelector(".genre")?.textContent.toLowerCase() || "";
      const platformText = card.querySelector(".platform")?.textContent.toLowerCase() || "";

      const matchesSearch = title.includes(searchTerm);
      const matchesPlatform = platform === "All Platforms" || platformText.includes(platform.toLowerCase());
      const matchesGenre = genre === "All Genres" || genreText.includes(genre.toLowerCase());

      card.style.display = (matchesSearch && matchesPlatform && matchesGenre) ? "block" : "none";
    });
  }

  if (searchInput) {
    searchInput.addEventListener("input", () => {
      filterCards(searchInput.value.toLowerCase(), platformFilter.value, genreFilter.value);
    });

    [platformFilter, genreFilter, sortFilter].forEach(select => {
      select.addEventListener("change", () => {
        filterCards(searchInput.value.toLowerCase(), platformFilter.value, genreFilter.value);
      });
    });
  }

  // ===== Star Ratings =====
  document.querySelectorAll(".rating").forEach(container => {
    const stars = container.querySelectorAll(".star");
    const gameKey = container.getAttribute("data-game");
    let savedRating = localStorage.getItem(`rating-${gameKey}`);

    if (savedRating) selectStars(stars, savedRating - 1);

    stars.forEach((star, index) => {
      star.title = `${index + 1} Star${index > 0 ? "s" : ""}`;

      star.addEventListener("mouseover", () => highlightStars(stars, index));
      star.addEventListener("mouseout", () => {
        resetStars(stars);
        if (savedRating) selectStars(stars, savedRating - 1);
      });

      star.addEventListener("click", () => {
        savedRating = index + 1;
        localStorage.setItem(`rating-${gameKey}`, savedRating);
        selectStars(stars, index);
        showToast(`${gameKey.toUpperCase()} rated ${savedRating}⭐`);
      });
    });
  });

  function highlightStars(stars, index) {
    stars.forEach((star, i) => {
      star.classList.toggle("hovered", i <= index);
    });
  }

  function resetStars(stars) {
    stars.forEach(star => star.classList.remove("hovered"));
  }

  function selectStars(stars, index) {
    stars.forEach((star, i) => {
      star.classList.toggle("selected", i <= index);
      if (i === index) {
        star.classList.add("pop");
        setTimeout(() => star.classList.remove("pop"), 300);
      }
    });
  }

  // ===== Contact Form Handler (About Us Page) =====
  const contactForm = document.getElementById("contactForm");
  if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
      e.preventDefault();

      const name = this.querySelector("#name").value;
      // ... your existing contact form code continues here if needed
    });
  }
});
