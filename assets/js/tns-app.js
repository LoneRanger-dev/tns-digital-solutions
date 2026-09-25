/**
 * TnS Digital Solutions - Interactive Web Application Core
 * Powers service filtering, interactive WhatsApp phone simulation,
 * dynamic ROI calculator, native dialog modal, and AI assistant drawer.
 */

document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  initServiceFilters();
  initWhatsAppSimulator();
  initRoiCalculator();
  initConsultationModal();
  initAiAssistant();
});

/* ==========================================================================
   1. Navbar & Header Scroll State
   ========================================================================== */
function initNavbar() {
  const header = document.querySelector('.site-header');
  const toggleBtn = document.querySelector('.mobile-toggle');
  const navMenu = document.querySelector('.nav-menu');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      header?.classList.add('scrolled');
    } else {
      header?.classList.remove('scrolled');
    }
  });

  if (toggleBtn && navMenu) {
    toggleBtn.addEventListener('click', () => {
      navMenu.classList.toggle('open');
      const isOpen = navMenu.classList.contains('open');
      toggleBtn.setAttribute('aria-expanded', isOpen);
    });

    // Close mobile menu on link click
    document.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => navMenu.classList.remove('open'));
    });
  }
}

/* ==========================================================================
   2. Interactive Service Filter System
   ========================================================================== */
function initServiceFilters() {
  const filterTabs = document.querySelectorAll('.filter-tab');
  const serviceCards = document.querySelectorAll('.service-card');

  filterTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      filterTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      const filterValue = tab.getAttribute('data-filter');

      serviceCards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filterValue === 'all' || category.includes(filterValue)) {
          card.style.display = 'flex';
          card.style.animation = 'fadeIn 0.35s ease-out';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
}

/* ==========================================================================
   3. Interactive WhatsApp & AI Phone Simulator
   ========================================================================== */
function initWhatsAppSimulator() {
  const chatBody = document.getElementById('phoneChatBody');
  const quickReplies = document.querySelectorAll('.chat-chip');

  const responses = {
    'ai-auto': {
      user: 'Automate lead processing & CRM syncing',
      bot: '⚡ Instant Match! Our Autonomous AI Pipelines sync incoming leads directly into your CRM, trigger custom AI enrichment, and notify sales reps in under 12 seconds. That reduces manual ops by 78%!',
      cta: 'Book 15-Min AI Architecture Demo'
    },
    'whatsapp': {
      user: 'I need WhatsApp Business API & 24/7 Chatbot',
      bot: '💬 Excellent choice! We deploy official WhatsApp Cloud API with multi-agent inbox, broadcast drip funnels, and 24/7 automated qualification. Boosts conversion by 3.2x!',
      cta: 'Get WhatsApp Setup Blueprint'
    },
    'linkedin': {
      user: 'Scale B2B LinkedIn Lead Generation',
      bot: '👔 Locked in. Our LinkedIn B2B outbound engine targets verified decision-makers, sends hyper-personalized AI icebreakers, and books calls directly to your calendar.',
      cta: 'View LinkedIn Case Study'
    },
    'website': {
      user: 'Build a high-converting premium website',
      bot: '💎 Perfect. We build ultra-luxurious, sub-second loading web applications with 3D/glassmorphism design engineered for aggressive customer acquisition.',
      cta: 'Request Web Proposal'
    }
  };

  quickReplies.forEach(chip => {
    chip.addEventListener('click', () => {
      const key = chip.getAttribute('data-action');
      const data = responses[key];
      if (!data || !chatBody) return;

      // Add user bubble
      const userBubble = document.createElement('div');
      userBubble.className = 'chat-bubble user';
      userBubble.textContent = data.user;
      chatBody.appendChild(userBubble);
      chatBody.scrollTop = chatBody.scrollHeight;

      // Simulate bot thinking and reply
      setTimeout(() => {
        const botBubble = document.createElement('div');
        botBubble.className = 'chat-bubble bot';
        botBubble.innerHTML = `<strong>TnS AI Agent:</strong><br>${data.bot}<br><br><a href="#contact" class="chat-chip" style="display:inline-block; margin-top:4px;">→ ${data.cta}</a>`;
        chatBody.appendChild(botBubble);
        chatBody.scrollTop = chatBody.scrollHeight;
      }, 500);
    });
  });
}

/* ==========================================================================
   4. Interactive ROI & Growth Calculator
   ========================================================================== */
function initRoiCalculator() {
  const trafficInput = document.getElementById('calcTraffic');
  const trafficVal = document.getElementById('calcTrafficVal');
  const convInput = document.getElementById('calcConv');
  const convVal = document.getElementById('calcConvVal');
  const dealInput = document.getElementById('calcDeal');
  const dealVal = document.getElementById('calcDealVal');

  const outLeads = document.getElementById('outProjectedLeads');
  const outRevenue = document.getElementById('outProjectedRevenue');
  const outGrowth = document.getElementById('outGrowthMultiplier');

  function calculate() {
    if (!trafficInput || !convInput || !dealInput) return;

    const traffic = parseInt(trafficInput.value, 10);
    const conv = parseFloat(convInput.value);
    const deal = parseInt(dealInput.value, 10);

    trafficVal.textContent = traffic.toLocaleString();
    convVal.textContent = conv.toFixed(1) + '%';
    dealVal.textContent = '$' + deal.toLocaleString();

    // Baseline leads
    const baseLeads = (traffic * (conv / 100));

    // TnS AI-Enhanced Conversion (estimated 2.6x to 3.4x improvement with AI automation + WhatsApp instant capture)
    const multiplier = 2.8;
    const projectedLeads = Math.round(baseLeads * multiplier);
    const projectedDeals = Math.round(projectedLeads * 0.22); // average close rate 22%
    const projectedRevenueGain = projectedDeals * deal;

    if (outLeads) outLeads.textContent = projectedLeads.toLocaleString();
    if (outRevenue) outRevenue.textContent = '+$' + projectedRevenueGain.toLocaleString();
    if (outGrowth) outGrowth.textContent = '+' + Math.round((multiplier - 1) * 100) + '%';
  }

  [trafficInput, convInput, dealInput].forEach(slider => {
    slider?.addEventListener('input', calculate);
  });

  calculate();
}

/* ==========================================================================
   5. Native Consultation Modal Dialog (<dialog>)
   ========================================================================== */
function initConsultationModal() {
  const modal = document.getElementById('consultation-modal');
  const openButtons = document.querySelectorAll('[data-open-modal="consultation"]');
  const closeBtn = document.querySelector('.modal-close-btn');
  const form = document.getElementById('consultationForm');

  if (!modal) return;

  openButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      modal.showModal();
    });
  });

  closeBtn?.addEventListener('click', () => {
    modal.close();
  });

  // Light dismiss on clicking backdrop
  modal.addEventListener('click', (e) => {
    const dialogDimensions = modal.getBoundingClientRect();
    if (
      e.clientX < dialogDimensions.left ||
      e.clientX > dialogDimensions.right ||
      e.clientY < dialogDimensions.top ||
      e.clientY > dialogDimensions.bottom
    ) {
      modal.close();
    }
  });

  // Handle consultation form submission
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const formData = new FormData(form);
      const name = formData.get('fullName') || 'Partner';
      const company = formData.get('companyName') || 'Company';
      const budget = formData.get('budget') || 'Growth';

      const selectedServices = [];
      formData.getAll('services').forEach(s => selectedServices.push(s));
      const servicesText = selectedServices.length > 0 ? selectedServices.join(', ') : 'AI Automation & Digital Marketing';

      const waMessage = encodeURIComponent(
        `Hi TnS Digital Solutions team! My name is ${name} from ${company}. I am interested in your solutions for: ${servicesText}. Budget tier: ${budget}. Let's discuss an implementation plan!`
      );

      modal.close();

      // Launch WhatsApp chat with pre-filled message
      window.open(`https://wa.me/13097503899?text=${waMessage}`, '_blank');
    });
  }
}

/* ==========================================================================
   6. Floating AI Assistant Widget
   ========================================================================== */
function initAiAssistant() {
  const toggle = document.getElementById('aiAssistantToggle');
  const drawer = document.getElementById('aiAssistantDrawer');
  const closeBtn = document.getElementById('closeAssistantBtn');
  const chatInput = document.getElementById('assistantInput');
  const sendBtn = document.getElementById('assistantSendBtn');
  const messagesBox = document.getElementById('assistantMessages');

  if (!toggle || !drawer) return;

  toggle.addEventListener('click', () => {
    drawer.classList.toggle('active');
  });

  closeBtn?.addEventListener('click', () => {
    drawer.classList.remove('active');
  });

  function appendMessage(sender, text) {
    const bubble = document.createElement('div');
    bubble.className = `chat-bubble ${sender}`;
    bubble.innerHTML = text;
    messagesBox.appendChild(bubble);
    messagesBox.scrollTop = messagesBox.scrollHeight;
  }

  function handleSend() {
    const text = chatInput.value.trim();
    if (!text) return;
    appendMessage('user', text);
    chatInput.value = '';

    setTimeout(() => {
      const lower = text.toLowerCase();
      let reply = "Thanks for asking! TnS Digital Solutions specializes in end-to-end AI automations, WhatsApp API bots, LinkedIn lead engines, and premium web systems. How can we best help you scale?";
      
      if (lower.includes('price') || lower.includes('pricing') || lower.includes('cost')) {
        reply = "Our pricing starts at $1,499 for Starter Launchpad, $3,499 for our full AI Growth Engine, and custom packages for enterprise voice & app scaling. Check out our Pricing section above!";
      } else if (lower.includes('whatsapp') || lower.includes('watsup')) {
        reply = "Our WhatsApp automation integrates directly with Meta's Official Cloud API, featuring 24/7 lead qualification, automated drip follow-ups, and calendar booking in seconds!";
      } else if (lower.includes('voice') || lower.includes('call')) {
        reply = "TnS Voice Agents conduct human-like inbound & outbound calls, answer customer questions, qualify intent, and sync records into your CRM automatically!";
      } else if (lower.includes('contact') || lower.includes('talk') || lower.includes('hire')) {
        reply = "You can chat with our founders directly via WhatsApp by clicking the green button or using our consultation booking modal!";
      }

      appendMessage('bot', reply);
    }, 450);
  }

  sendBtn?.addEventListener('click', handleSend);
  chatInput?.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') handleSend();
  });
}
