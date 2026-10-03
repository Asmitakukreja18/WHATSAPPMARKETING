/**
 * Marketiqx & WhatsApp Marketing - 100% WhatsApp Direct Lead Engine
 * Directs all form submissions instantly to WhatsApp (+91 74991 81193) with complete formatted details
 */

const WHATSAPP_NUMBER = "917499181193";

window.MarketiqxAPI = {
  
  // 1. Submit Free Growth Audit / Lead
  async submitAudit(data) {
    // Save locally
    try {
      const stored = JSON.parse(localStorage.getItem('marketiqx_leads') || '[]');
      stored.unshift({
        ...data,
        id: 'LEAD_' + Date.now(),
        timestamp: new Date().toISOString()
      });
      localStorage.setItem('marketiqx_leads', JSON.stringify(stored));
    } catch(e) {}

    // Save to local backend if running
    try {
      fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      }).catch(() => {});
    } catch(e) {}

    return { success: true };
  },

  // 2. Submit Direct Contact Inquiries
  async submitContact(data) {
    try {
      const stored = JSON.parse(localStorage.getItem('marketiqx_contacts') || '[]');
      stored.unshift({
        ...data,
        id: 'MSG_' + Date.now(),
        timestamp: new Date().toISOString()
      });
      localStorage.setItem('marketiqx_contacts', JSON.stringify(stored));
    } catch(e) {}

    try {
      fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      }).catch(() => {});
    } catch(e) {}

    return { success: true };
  },

  // 3. Format ALL Details for WhatsApp Message
  createWhatsAppAuditUrl(data) {
    const text = 
`🚀 *NEW GROWTH AUDIT LEAD (Marketiqx)*
━━━━━━━━━━━━━━━━━━━━━━
👤 *Full Name:* ${data.name || 'Not provided'}
📧 *Email Address:* ${data.email || 'Not provided'}
📱 *Phone / WhatsApp:* ${data.phone || 'Not provided'}
🌐 *Company Website:* ${data.website || 'Not provided'}
💰 *Monthly Ad Spend:* ${data.ad_spend || 'Not provided'}
🏢 *Business Model:* ${data.model || 'Not provided'}
⚠️ *Pipeline Bottleneck:* ${data.bottleneck || 'Not provided'}
━━━━━━━━━━━━━━━━━━━━━━
Hi Marketiqx Team, I have submitted the Growth Audit form. Please review my account details.`;
    return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
  },

  createWhatsAppContactUrl(data) {
    const text = 
`💬 *NEW DIRECT MESSAGE (Marketiqx)*
━━━━━━━━━━━━━━━━━━━━━━
👤 *Full Name:* ${data.name || 'Not provided'}
📧 *Email Address:* ${data.email || 'Not provided'}
📱 *Phone / WhatsApp:* ${data.phone || 'Not provided'}
📝 *Message / Query:* ${data.message || 'Not provided'}
━━━━━━━━━━━━━━━━━━━━━━
Hi Marketiqx Team, I would like to connect regarding growth marketing services.`;
    return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
  },

  showToast(message) {
    let container = document.querySelector('.toast-container');
    if (!container) {
      container = document.createElement('div');
      container.className = 'toast-container';
      container.style.cssText = 'position: fixed; bottom: 85px; right: 24px; z-index: 99999; display: flex; flex-direction: column; gap: 10px; max-width: 380px; pointer-events: none;';
      document.body.appendChild(container);
    }

    const toast = document.createElement('div');
    toast.style.cssText = `
      background: #001a3d;
      color: #ffffff;
      padding: 14px 18px;
      border-radius: 12px;
      border: 1.5px solid #ff6b00;
      box-shadow: 0 10px 30px rgba(0,0,0,0.3);
      font-size: 0.88rem;
      font-weight: 600;
      line-height: 1.4;
      pointer-events: auto;
      transition: all 0.3s ease;
      transform: translateY(10px);
      opacity: 0;
    `;
    toast.innerHTML = message;
    container.appendChild(toast);

    requestAnimationFrame(() => {
      toast.style.transform = 'translateY(0)';
      toast.style.opacity = '1';
    });

    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateY(10px)';
      setTimeout(() => toast.remove(), 300);
    }, 4000);
  }
};

// Automatic Form Binding on DOM Load
document.addEventListener('DOMContentLoaded', () => {
  
  // 1. Audit Form Handler (audit.html)
  const auditForm = document.getElementById('auditForm');
  if (auditForm) {
    auditForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const submitBtn = auditForm.querySelector('button[type="submit"]');
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<span>⚡ Redirecting to WhatsApp...</span>';
      }

      const formData = new FormData(auditForm);
      const data = {
        name: formData.get('name') || '',
        email: formData.get('email') || '',
        phone: formData.get('phone') || '',
        website: formData.get('website') || '',
        ad_spend: formData.get('ad_spend') || '',
        model: formData.get('model') || '',
        bottleneck: formData.get('bottleneck') || '',
        service: '90-Day Free Revenue & Pipeline Audit'
      };

      // Save locally in background
      MarketiqxAPI.submitAudit(data);

      // Generate formatted WhatsApp message URL
      const waUrl = MarketiqxAPI.createWhatsAppAuditUrl(data);

      // Redirect immediately to WhatsApp
      window.location.href = waUrl;
    });
  }

  // 2. Contact Form Handler (contact.html)
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const submitBtn = contactForm.querySelector('button[type="submit"]');
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<span>⚡ Redirecting to WhatsApp...</span>';
      }

      const formData = new FormData(contactForm);
      const data = {
        name: formData.get('name') || '',
        email: formData.get('email') || '',
        phone: formData.get('phone') || '',
        message: formData.get('message') || ''
      };

      // Save locally in background
      MarketiqxAPI.submitContact(data);

      // Generate WhatsApp Link
      const waUrl = MarketiqxAPI.createWhatsAppContactUrl(data);

      // Redirect immediately to WhatsApp
      window.location.href = waUrl;
    });
  }

});
