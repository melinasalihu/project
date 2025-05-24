document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("contactForm");

  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();

      const name = document.getElementById("name").value.trim();
      const email = document.getElementById("email").value.trim();
      const message = document.getElementById("message").value.trim();

      if (!name || !email || !message) {
        alert("Please fill in all fields.");
        return;
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        alert("Please enter a valid email address.");
        return;
      }

      alert("Your message has been sent successfully!");
      form.reset();
    });
  }
});
function showText(id) {
  // Hide all info text sections
  document.querySelectorAll('.info-text').forEach(section => {
    section.classList.add('hidden');
  });

  // Show the selected text
  const element = document.getElementById(id);
  if (element) {
    element.classList.remove('hidden');
    // Scroll into view smoothly
    element.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }
}

function closeText(id) {
  const element = document.getElementById(id);
  if (element) {
    element.classList.add('hidden');
  }
}
function showDetails(serviceId) {
  // Mbyll të gjitha pjesët e detajeve
  const details = document.querySelectorAll('.service-details');
  details.forEach(detail => {
    detail.classList.add('hidden');
  });

  // Shfaq vetëm detajin e selektuar
  const selected = document.getElementById(serviceId);
  if (selected) {
    selected.classList.remove('hidden');
    // Scroll poshtë tek detaji i shfaqur për fokus më të mirë
    selected.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}

function closeDetails(serviceId) {
  const detail = document.getElementById(serviceId);
  if (detail) {
    detail.classList.add('hidden');
  }
}

