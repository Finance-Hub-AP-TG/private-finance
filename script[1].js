// ===== CONFIG =====
const WHATSAPP_NUMBER = "916281299866"; // update if needed
const PHONE_NUMBER = "+916281299866";

// ===== Mobile nav toggle =====
document.addEventListener("DOMContentLoaded", function () {
  const toggle = document.querySelector(".menu-toggle");
  const nav = document.querySelector(".main-nav");
  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      nav.classList.toggle("open");
    });
    nav.querySelectorAll("a").forEach(function (a) {
      a.addEventListener("click", function () {
        nav.classList.remove("open");
      });
    });
  }

  // ===== FAQ accordion =====
  document.querySelectorAll(".faq-item").forEach(function (item) {
    const q = item.querySelector(".faq-q");
    const ans = item.querySelector(".faq-a");
    if (!q || !ans) return;
    q.addEventListener("click", function () {
      const isOpen = item.classList.contains("open");
      document.querySelectorAll(".faq-item.open").forEach(function (o) {
        o.classList.remove("open");
        o.querySelector(".faq-a").style.maxHeight = null;
      });
      if (!isOpen) {
        item.classList.add("open");
        ans.style.maxHeight = ans.scrollHeight + "px";
      }
    });
  });

  // ===== Scroll reveal =====
  const revealEls = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window && revealEls.length) {
    const obs = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("in");
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );
    revealEls.forEach(function (el) {
      obs.observe(el);
    });
  } else {
    revealEls.forEach(function (el) {
      el.classList.add("in");
    });
  }

  // ===== Tab switcher (Borrower / Financer forms) =====
  const tabBtns = document.querySelectorAll(".tab-btn");
  if (tabBtns.length) {
    tabBtns.forEach(function (btn) {
      btn.addEventListener("click", function () {
        const target = btn.getAttribute("data-tab");
        tabBtns.forEach(function (b) {
          b.classList.remove("active");
          b.setAttribute("aria-selected", "false");
        });
        btn.classList.add("active");
        btn.setAttribute("aria-selected", "true");
        document.querySelectorAll(".tab-panel").forEach(function (panel) {
          panel.style.display = panel.getAttribute("data-panel") === target ? "grid" : "none";
        });
      });
    });

    const wantedTab = sessionStorage.getItem("openTab");
    if (wantedTab) {
      sessionStorage.removeItem("openTab");
      const targetBtn = document.querySelector('.tab-btn[data-tab="' + wantedTab + '"]');
      if (targetBtn) targetBtn.click();
    }
  }

  // ===== Loan enquiry form =====
  const loanForm = document.getElementById("loanForm");
  if (loanForm) {
    loanForm.addEventListener("submit", function (e) {
      e.preventDefault();
      const name = loanForm.querySelector("#name").value.trim();
      const phone = loanForm.querySelector("#phone").value.trim();
      const amount = loanForm.querySelector("#amount").value.trim();
      const location = loanForm.querySelector("#location").value.trim();
      const purpose = loanForm.querySelector("#purpose").value.trim();
      const phonePattern = /^[0-9]{10}$/;

      if (!name || !phone || !amount || !location || !purpose) {
        alert("Please fill all the fields.");
        return;
      }
      if (!phonePattern.test(phone)) {
        alert("Please enter a valid 10 digit phone number.");
        return;
      }
      if (Number(amount) <= 0) {
        alert("Please enter a valid loan amount.");
        return;
      }

      const message =
        "*NEW LOAN ENQUIRY*\n" +
        "---------------------------\n" +
        "Name: " + name + "\n" +
        "Phone: " + phone + "\n" +
        "Amount Required: Rs. " + amount + "\n" +
        "Location: " + location + "\n" +
        "Purpose: " + purpose + "\n" +
        "---------------------------\n" +
        "Sent from Website";

      const encoded = encodeURIComponent(message);
      window.open("https://wa.me/" + WHATSAPP_NUMBER + "?text=" + encoded, "_blank");
      loanForm.reset();
    });
  }

  // ===== Financer registration form =====
  const financerForm = document.getElementById("financerForm");
  if (financerForm) {
    financerForm.addEventListener("submit", function (e) {
      e.preventDefault();
      const fname = financerForm.querySelector("#fname").value.trim();
      const fphone = financerForm.querySelector("#fphone").value.trim();
      const fcapacity = financerForm.querySelector("#fcapacity").value.trim();
      const flocation = financerForm.querySelector("#flocation").value.trim();
      const finterest = financerForm.querySelector("#finterest").value.trim();
      const phonePattern = /^[0-9]{10}$/;

      if (!fname || !fphone || !fcapacity || !flocation || !finterest) {
        alert("Please fill all the fields.");
        return;
      }
      if (!phonePattern.test(fphone)) {
        alert("Please enter a valid 10 digit phone number.");
        return;
      }
      if (Number(fcapacity) <= 0) {
        alert("Please enter a valid funding capacity.");
        return;
      }

      const message =
        "*NEW FINANCER REGISTRATION*\n" +
        "---------------------------\n" +
        "Name: " + fname + "\n" +
        "Phone: " + fphone + "\n" +
        "Funding Capacity: Rs. " + fcapacity + "\n" +
        "Service Location: " + flocation + "\n" +
        "Interest Rate: " + finterest + "%\n" +
        "---------------------------\n" +
        "Sent from Website";

      const encoded = encodeURIComponent(message);
      window.open("https://wa.me/" + WHATSAPP_NUMBER + "?text=" + encoded, "_blank");
      financerForm.reset();
    });
  }

  // ===== Generic contact form (Contact page) =====
  const contactForm = document.getElementById("contactForm");
  if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
      e.preventDefault();
      const name = contactForm.querySelector("#cname").value.trim();
      const phone = contactForm.querySelector("#cphone").value.trim();
      const email = contactForm.querySelector("#cemail").value.trim();
      const message = contactForm.querySelector("#cmessage").value.trim();
      const phonePattern = /^[0-9]{10}$/;

      if (!name || !phone || !message) {
        alert("Please fill all required fields.");
        return;
      }
      if (!phonePattern.test(phone)) {
        alert("Please enter a valid 10 digit phone number.");
        return;
      }

      const text =
        "*NEW CONTACT ENQUIRY*\n" +
        "---------------------------\n" +
        "Name: " + name + "\n" +
        "Phone: " + phone + "\n" +
        "Email: " + (email || "N/A") + "\n" +
        "Message: " + message + "\n" +
        "---------------------------\n" +
        "Sent from Website";

      const encoded = encodeURIComponent(text);
      window.open("https://wa.me/" + WHATSAPP_NUMBER + "?text=" + encoded, "_blank");
      contactForm.reset();
    });
  }

  // ===== Set call links dynamically =====
  document.querySelectorAll("[data-call]").forEach(function (el) {
    el.href = "tel:" + PHONE_NUMBER;
  });
  document.querySelectorAll("[data-whatsapp]").forEach(function (el) {
    el.href =
      "https://wa.me/" +
      WHATSAPP_NUMBER +
      "?text=" +
      encodeURIComponent("Hi, I visited your finance website and want to know more details.");
  });
});
