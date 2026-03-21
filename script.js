document.addEventListener('DOMContentLoaded', () => {

  const mailForm = document.getElementById('mail-form');
  const nameInput = document.getElementById('name-input');
  const emailInput = document.getElementById('email-input');
  const messageInput = document.getElementById('message-input');
  const toast = document.getElementById('toast');
  const submitBtn = document.querySelector('.mail-btn');

  // Handle Form Submission
  mailForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = nameInput.value.trim();
    const email = emailInput.value.trim();
    const message = messageInput.value.trim();

    if (name && email && message) {
      // Provide UI feedback indicating the message is processing
      const originalText = submitBtn.innerHTML;
      submitBtn.innerHTML = '<i class="fa-solid fa-circle-notch fa-spin"></i> Sending...';
      submitBtn.disabled = true;

      const webhookUrl = "https://discord.com/api/webhooks/1484799897097080882/eISrZH29gRkvpq7Z_rOOAojl1Dn9_cM2xr4V8DT86bxjZn-pye6I3Mcf3mS2ZXQfdw_3";
      
      const payload = {
        embeds: [{
          title: "New Contact Message",
          color: 3447003, // Discord blue
          fields: [
            { name: "Name", value: name, inline: true },
            { name: "Email", value: email, inline: true },
            { name: "Message", value: message }
          ],
          timestamp: new Date().toISOString()
        }]
      };

      fetch(webhookUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      })
      .then(response => {
        if (response.ok) {
          showToast("Message Sent Successfully! 🚀");
          mailForm.reset();
        } else {
          showToast("Failed to send message.");
          console.error("Discord webhook error:", response.statusText);
        }
      })
      .catch(error => {
        showToast("Network error.");
        console.error("Error:", error);
      })
      .finally(() => {
        // Restore button state
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
      });
    }
  });

  function showToast(message) {
    if(message) {
      toast.innerText = message;
    }
    toast.classList.add('show');
    
    setTimeout(() => {
      toast.classList.remove('show');
    }, 4000);
  }

  // Staggered appearance animation for social link cards upon load
  const links = document.querySelectorAll('.link-card');
  links.forEach((link, index) => {
    // Setting initial state
    link.style.opacity = '0';
    link.style.transform = 'translateY(20px)';
    
    // Injecting CSS animation delay directly via JS
    link.style.animation = `slideUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards ${0.2 + (index * 0.1)}s`;
  });
});
