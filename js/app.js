// Sequence Cloud Gateway & 360dialog Multi-Mode SaaS App Controller

class WhatsAppMarketingApp {
  constructor() {
    this.currentMode = 'web'; // 'web' (Public Website by default) or 'app' (Dashboard)
    this.activeTab = 'dashboard';
    
    // Explicitly set light theme
    this.currentTheme = 'light';
    localStorage.setItem('app_theme', 'light');
    
    this.currentUser = { ...DASHBOARD_DATA.currentUser };
    this.contactGroups = [...DASHBOARD_DATA.contactGroups];
    this.detailedLogs = [...DASHBOARD_DATA.detailedLogs];
    this.campaignsData = [...DASHBOARD_DATA.campaigns];
    this.integrationsData = [...DASHBOARD_DATA.integrations];
    this.liveChatsData = [...DASHBOARD_DATA.liveChats];
    this.activeChatId = this.liveChatsData[0]?.id;
    this.activeCategory = 'all';
    this.isDispatching = false;
    
    this.init();
  }

  init() {
    this.applyTheme(this.currentTheme);
    this.setMode(this.currentMode);
    this.bindEvents();
    this.renderUserCredits();
    this.renderKPIs();
    this.renderContactGroups();
    this.renderDetailedLogs();
    this.renderIndustryPresets();
    this.renderPricingTiers();
    this.renderIntegrations();
    this.renderCampaigns();
    this.renderLiveChats();
    this.initCharts();
    this.updateBulkPreview();
  }

  setMode(mode) {
    this.currentMode = mode;
    const webView = document.getElementById('view-public-website');
    const appView = document.getElementById('view-app-dashboard');
    const btnWeb = document.getElementById('btn-view-web');
    const btnApp = document.getElementById('btn-view-app');

    if (mode === 'web') {
      webView?.classList.add('active');
      appView?.classList.remove('active');
      btnWeb?.classList.add('active');
      btnApp?.classList.remove('active');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      appView?.classList.add('active');
      webView?.classList.remove('active');
      btnApp?.classList.add('active');
      btnWeb?.classList.remove('active');
    }
  }

  applyTheme(theme) {
    this.currentTheme = theme;
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('app_theme', theme);
    
    const themeIcon = document.getElementById('theme-icon');
    if (themeIcon) {
      themeIcon.innerHTML = theme === 'dark' ? `
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <circle cx="12" cy="12" r="5"></circle>
          <line x1="12" y1="1" x2="12" y2="3"></line>
          <line x1="12" y1="21" x2="12" y2="23"></line>
        </svg>
      ` : `
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
        </svg>
      `;
    }
  }

  toggleTheme() {
    this.applyTheme(this.currentTheme === 'dark' ? 'light' : 'dark');
    this.showToast(`Switched to ${this.currentTheme} mode`, 'info');
  }

  bindEvents() {
    // Nav Items Tab Switching in Dashboard
    document.querySelectorAll('.sidebar .nav-item').forEach(item => {
      item.addEventListener('click', () => {
        const tabId = item.getAttribute('data-tab');
        if (tabId) {
          this.switchTab(tabId);
          document.querySelector('.sidebar')?.classList.remove('mobile-open');
        }
      });
    });

    // Mobile Sidebar Toggle
    const mobileToggle = document.getElementById('mobile-toggle');
    if (mobileToggle) {
      mobileToggle.addEventListener('click', () => {
        document.querySelector('.sidebar').classList.toggle('mobile-open');
      });
    }

    // Theme Switcher
    const themeBtn = document.getElementById('theme-toggle-btn');
    if (themeBtn) {
      themeBtn.addEventListener('click', () => this.toggleTheme());
    }

    // Composer Input Listeners
    const bulkMsgText = document.getElementById('bulk-msg-text');
    const bulkHeaderMedia = document.getElementById('bulk-media-url');
    const bulkBtn1 = document.getElementById('bulk-btn-1');
    const bulkBtn2 = document.getElementById('bulk-btn-2');
    const bulkFooterText = document.getElementById('bulk-footer-text');

    [bulkMsgText, bulkHeaderMedia, bulkBtn1, bulkBtn2, bulkFooterText].forEach(el => {
      if (el) {
        el.addEventListener('input', () => this.updateBulkPreview());
      }
    });

    // Variable Tag Buttons
    document.querySelectorAll('.var-tag-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const varText = btn.getAttribute('data-var');
        const textarea = document.getElementById('bulk-msg-text');
        if (textarea && varText) {
          const start = textarea.selectionStart;
          const end = textarea.selectionEnd;
          const text = textarea.value;
          textarea.value = text.substring(0, start) + varText + text.substring(end);
          textarea.focus();
          textarea.selectionStart = textarea.selectionEnd = start + varText.length;
          this.updateBulkPreview();
        }
      });
    });

    // Launch Campaign Trigger
    const startDispatchBtn = document.getElementById('btn-start-dispatch');
    if (startDispatchBtn) {
      startDispatchBtn.addEventListener('click', () => this.startBulkDispatch());
    }

    // Number Filter Tool
    const runFilterBtn = document.getElementById('btn-run-filter');
    if (runFilterBtn) {
      runFilterBtn.addEventListener('click', () => this.runNumberFilter());
    }

    // Volume Range Slider
    const volumeSlider = document.getElementById('volume-range-slider');
    if (volumeSlider) {
      volumeSlider.addEventListener('input', (e) => this.calculateVolumeCost(e.target.value));
    }

    // Chat input
    const chatInput = document.getElementById('chat-msg-input');
    const chatSendBtn = document.getElementById('chat-send-btn');
    if (chatInput && chatSendBtn) {
      chatSendBtn.addEventListener('click', () => this.sendChatMessage());
      chatInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') this.sendChatMessage();
      });
    }
  }

  switchTab(tabId) {
    this.activeTab = tabId;
    
    document.querySelectorAll('.sidebar .nav-item').forEach(item => {
      if (item.getAttribute('data-tab') === tabId) {
        item.classList.add('active');
      } else {
        item.classList.remove('active');
      }
    });

    document.querySelectorAll('.tab-pane').forEach(pane => {
      pane.classList.remove('active');
    });

    const activePane = document.getElementById(`tab-${tabId}`);
    if (activePane) {
      activePane.classList.add('active');
    }

    const titleMap = {
      'dashboard': { title: 'Dashboard Overview & Analytics', subtitle: 'Live campaign delivery summary, credit usage tracking, and Meta API health' },
      'contacts': { title: 'Contact Management & Lists', subtitle: 'Upload Excel/CSV contacts, segment target groups, and manage blacklist' },
      'composer': { title: 'WhatsApp Message Composer', subtitle: 'Prepare rich text, multimedia headers, CTA buttons, and Meta templates' },
      'campaigns': { title: 'Campaign Execution & History', subtitle: 'Manage active broadcasts, 1-click execution, and conversion ROI' },
      'logs': { title: 'Delivery Reports & Number Logs', subtitle: 'Per-number delivery audit (Delivered, Failed, Read) and Excel export' },
      'credits': { title: 'Credits Tracking & Billing', subtitle: 'Available balance, usage history, and instant credit recharge' },
      'inbox': { title: 'Live Shared Team Inbox', subtitle: '2-Way WhatsApp messaging with smart AI chatbot handoff' },
      'integrations': { title: 'Integrations Hub (360dialog)', subtitle: 'Connect CRM, Shopify, Zapier, Webhooks, and REST APIs' },
      'filter': { title: 'Number Filter & Cleaner Tool', subtitle: 'Verify and clean active WhatsApp numbers before launching broadcasts' },
      'settings': { title: 'Account & WhatsApp API Settings', subtitle: 'Manage WABA tokens, Phone IDs, Webhook secrets, and messaging tiers' }
    };

    const info = titleMap[tabId] || { title: 'WhatsApp Marketing Dashboard', subtitle: 'Next-Gen Messaging Workspace' };
    const h1 = document.getElementById('header-title');
    const p = document.getElementById('header-subtitle');
    if (h1) h1.textContent = info.title;
    if (p) p.textContent = info.subtitle;
  }

  renderUserCredits() {
    const cred = this.currentUser.credits;
    const sideVal = document.getElementById('sidebar-credits-val');
    const headCred = document.getElementById('header-remaining-credits');
    const billingRemain = document.getElementById('billing-remaining-credits');
    const billingUsed = document.getElementById('billing-used-credits');
    const billingWallet = document.getElementById('billing-wallet-val');

    if (sideVal) sideVal.textContent = cred.remaining.toLocaleString();
    if (headCred) headCred.textContent = `${(cred.remaining / 100000).toFixed(1)} Lakh Credits`;
    if (billingRemain) billingRemain.textContent = cred.remaining.toLocaleString();
    if (billingUsed) billingUsed.textContent = cred.totalUsed.toLocaleString();
    if (billingWallet) billingWallet.textContent = cred.walletBalance;
  }

  renderKPIs() {
    const container = document.getElementById('kpi-container');
    if (!container) return;

    container.innerHTML = DASHBOARD_DATA.kpiStats.map(stat => `
      <div class="kpi-card">
        <div class="kpi-top">
          <span class="kpi-title">${stat.title}</span>
          <div class="kpi-icon-wrap ${stat.color}">
            ${this.getIconSvg(stat.icon)}
          </div>
        </div>
        <div class="kpi-value">${stat.value}</div>
        <div class="kpi-bottom">
          <span style="color: ${stat.isPositive ? 'var(--brand-emerald)' : 'var(--brand-coral)'}; font-weight:600;">${stat.change}</span>
        </div>
      </div>
    `).join('');
  }

  renderContactGroups() {
    const table = document.getElementById('contact-groups-table-body');
    const selectEl = document.getElementById('composer-target-group');
    if (table) {
      table.innerHTML = this.contactGroups.map(grp => `
        <tr>
          <td><strong>${grp.name}</strong></td>
          <td><span class="stat-pill">${grp.totalContacts.toLocaleString()}</span></td>
          <td><span style="color: var(--brand-emerald); font-weight: 700;">${grp.validWhatsApp.toLocaleString()}</span></td>
          <td><span style="color: var(--brand-coral); font-weight: 600;">${grp.invalid}</span></td>
          <td>${grp.created}</td>
          <td>
            <div style="display: flex; gap: 4px;">
              ${grp.tags.map(t => `<span class="feature-tag">${t}</span>`).join('')}
            </div>
          </td>
          <td>
            <button class="btn-secondary" style="padding: 4px 8px; font-size: 0.75rem;" onclick="app.selectGroupInComposer('${grp.id}')">Use in Composer 🚀</button>
          </td>
        </tr>
      `).join('');
    }

    if (selectEl) {
      selectEl.innerHTML = this.contactGroups.map(grp => `
        <option value="${grp.id}">${grp.name} (${grp.validWhatsApp.toLocaleString()} valid contacts)</option>
      `).join('');
    }
  }

  selectGroupInComposer(groupId) {
    const grp = this.contactGroups.find(g => g.id === groupId);
    if (!grp) return;
    this.switchTab('composer');
    const select = document.getElementById('composer-target-group');
    if (select) select.value = groupId;
    this.showToast(`Selected contact list: ${grp.name}`, 'info');
  }

  renderDetailedLogs() {
    const tbody = document.getElementById('detailed-logs-table-body');
    if (!tbody) return;

    tbody.innerHTML = this.detailedLogs.map(log => `
      <tr>
        <td><code>${log.phone}</code></td>
        <td><strong>${log.recipient}</strong></td>
        <td><span class="stat-pill" style="font-size: 0.75rem;">${log.campaign}</span></td>
        <td>
          <span class="app-badge-pill ${log.status.includes('Read') ? 'badge-featured' : log.status === 'Delivered' ? 'badge-emerald' : 'badge-hot'}">
            ${log.status}
          </span>
        </td>
        <td><strong>${log.credits} Credit</strong></td>
        <td><span style="color: ${log.error === 'None' ? 'var(--text-subtle)' : 'var(--brand-coral)'}; font-size: 0.8rem;">${log.error}</span></td>
        <td style="color: var(--text-subtle); font-size: 0.75rem;">${log.time}</td>
      </tr>
    `).join('');
  }

  renderCampaigns() {
    const tableBody = document.getElementById('campaigns-table-body');
    if (!tableBody) return;

    tableBody.innerHTML = this.campaignsData.map(c => `
      <tr>
        <td class="campaign-name-cell">
          <div>${c.name}</div>
          <div class="campaign-sub">Channel: <code>${c.channel}</code></div>
        </td>
        <td><span class="stat-pill">${c.audience}</span></td>
        <td>
          <span class="badge-${c.statusType === 'success' ? 'emerald' : c.statusType === 'active' ? 'hot' : 'info'} app-badge-pill">
            ${c.status}
          </span>
        </td>
        <td><strong>${c.sentCount > 0 ? c.sentCount.toLocaleString() : '-'}</strong></td>
        <td><span style="color: var(--brand-emerald); font-weight: 600;">${c.deliveredRate}</span></td>
        <td><span style="color: var(--brand-coral); font-weight: 600;">${c.failedCount || 0}</span></td>
        <td><strong style="color: var(--brand-cyan);">${c.creditsSpent ? c.creditsSpent.toLocaleString() : 0}</strong></td>
        <td><span style="color: var(--brand-emerald); font-weight: 700;">${c.revenue}</span></td>
        <td>
          <button class="btn-secondary" style="padding: 4px 8px; font-size: 0.75rem;" onclick="app.showToast('Exporting campaign report to Excel...', 'success')">
            Export 📊
          </button>
        </td>
      </tr>
    `).join('');
  }

  updateBulkPreview() {
    const rawText = document.getElementById('bulk-msg-text')?.value || "Hi {Name}, check out our exclusive offers today!";
    const mediaUrl = document.getElementById('bulk-media-url')?.value;
    const footerText = document.getElementById('bulk-footer-text')?.value || "Sequence Cloud Gateway • Reply STOP to opt out";
    const btn1Text = document.getElementById('bulk-btn-1')?.value || "Shop 50% Off 🛍️";
    const btn2Text = document.getElementById('bulk-btn-2')?.value || "Store Location 📍";

    const sampleRender = rawText
      .replace(/\{Name\}|\{\{1\}\}/g, 'Rahul Sharma')
      .replace(/\{Code\}|\{\{2\}\}/g, 'FESTIVE50')
      .replace(/\{Amount\}|\{\{3\}\}/g, '₹2,500')
      .replace(/\{Custom1\}|\{\{4\}\}/g, 'VIP Retail')
      .replace(/\n/g, '<br>');

    const bodyEl = document.getElementById('preview-wa-body');
    const footerEl = document.getElementById('preview-wa-footer');
    const mediaContainer = document.getElementById('preview-wa-media');
    const buttonsContainer = document.getElementById('preview-wa-buttons');

    if (bodyEl) bodyEl.innerHTML = sampleRender;
    if (footerEl) footerEl.textContent = footerText;

    if (mediaContainer) {
      if (mediaUrl && mediaUrl.trim().length > 5) {
        mediaContainer.style.display = 'block';
        mediaContainer.innerHTML = `<img src="${mediaUrl}" alt="Media Header" onerror="this.src='https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=600&auto=format&fit=crop&q=80'" style="width:100%; height:130px; object-fit:cover; display:block;">`;
      } else {
        mediaContainer.style.display = 'none';
        mediaContainer.innerHTML = '';
      }
    }

    if (buttonsContainer) {
      const btns = [];
      if (btn1Text.trim()) btns.push(btn1Text.trim());
      if (btn2Text.trim()) btns.push(btn2Text.trim());

      if (btns.length > 0) {
        buttonsContainer.style.display = 'flex';
        buttonsContainer.innerHTML = btns.map(b => `
          <div class="wa-btn-item">
            <span>🔘 ${b}</span>
          </div>
        `).join('');
      } else {
        buttonsContainer.style.display = 'none';
      }
    }
  }

  startBulkDispatch() {
    if (this.isDispatching) return;

    const groupSelect = document.getElementById('composer-target-group');
    const selectedGroup = this.contactGroups.find(g => g.id === groupSelect?.value) || this.contactGroups[0];
    const total = selectedGroup.validWhatsApp;

    // Check credits
    if (this.currentUser.credits.remaining < total) {
      this.showToast(`Insufficient credits! Required: ${total}, Available: ${this.currentUser.credits.remaining}. Please recharge.`, 'warning');
      this.switchTab('credits');
      return;
    }

    this.isDispatching = true;
    const progressContainer = document.getElementById('dispatch-progress-card');
    const progressBar = document.getElementById('dispatch-progress-bar');
    const progressText = document.getElementById('dispatch-progress-text');
    const btn = document.getElementById('btn-start-dispatch');

    if (progressContainer) progressContainer.style.display = 'block';
    if (btn) {
      btn.disabled = true;
      btn.innerHTML = `<span>Dispatching ${total.toLocaleString()} Messages... ⏳</span>`;
    }

    let sent = 0;
    const interval = setInterval(() => {
      sent += Math.ceil(total / 10);
      if (sent >= total) {
        sent = total;
        clearInterval(interval);
        this.isDispatching = false;
        
        if (progressBar) progressBar.style.width = '100%';
        if (progressText) progressText.textContent = `Completed! ${sent.toLocaleString()} messages dispatched with 99.2% Delivery SLA.`;
        if (btn) {
          btn.disabled = false;
          btn.innerHTML = `<span>🚀 1-Click Send Campaign to Contacts</span>`;
        }

        // Deduct credits
        this.currentUser.credits.remaining -= sent;
        this.currentUser.credits.totalUsed += sent;
        this.renderUserCredits();

        // Add to logs & campaigns
        const campTitle = document.getElementById('bulk-campaign-name')?.value || 'Bulk Campaign';
        const newCamp = {
          id: `camp_${Date.now()}`,
          name: campTitle,
          channel: "Bulk WhatsApp",
          audience: selectedGroup.name,
          contactsCount: total,
          status: "Completed",
          statusType: "success",
          sentCount: total,
          deliveredCount: Math.floor(total * 0.992),
          failedCount: Math.floor(total * 0.008),
          readCount: Math.floor(total * 0.91),
          creditsSpent: total,
          deliveredRate: "99.2%",
          readRate: "91.0%",
          ctr: "36.5%",
          revenue: "₹38,500",
          date: "Just now"
        };
        this.campaignsData.unshift(newCamp);
        this.renderCampaigns();

        this.detailedLogs.unshift({
          phone: "+91 95993 00365",
          recipient: "Campaign Batch #1",
          campaign: campTitle,
          status: "Delivered",
          credits: sent,
          error: "None",
          time: new Date().toLocaleTimeString()
        });
        this.renderDetailedLogs();

        this.showToast(`🎉 Campaign Executed! ${sent.toLocaleString()} messages delivered. ${sent.toLocaleString()} credits deducted.`, 'success');
      } else {
        const pct = Math.round((sent / total) * 100);
        if (progressBar) progressBar.style.width = `${pct}%`;
        if (progressText) progressText.textContent = `Executing Campaign: ${sent.toLocaleString()} / ${total.toLocaleString()} (${pct}% dispatched) - Anti-ban delay active...`;
      }
    }, 300);
  }

  addNewContactGroup() {
    const name = document.getElementById('new-group-name')?.value || 'New Uploaded List';
    const numbers = document.getElementById('new-group-numbers')?.value || '';
    const lines = numbers.split('\n').map(n => n.trim()).filter(n => n.length > 5);

    if (lines.length === 0) {
      this.showToast('Please paste at least one phone number.', 'warning');
      return;
    }

    const validCount = Math.floor(lines.length * 0.96);
    const invalidCount = lines.length - validCount;

    const newGroup = {
      id: `grp_${Date.now()}`,
      name: name,
      totalContacts: lines.length,
      validWhatsApp: validCount,
      invalid: invalidCount,
      created: new Date().toISOString().split('T')[0],
      tags: ["Uploaded", "Verified"]
    };

    this.contactGroups.unshift(newGroup);
    this.renderContactGroups();
    this.closeModal('upload-contacts-modal');
    this.showToast(`✅ Contact Group "${name}" created with ${validCount} active WhatsApp numbers!`, 'success');
  }

  rechargeCredits(packAmount, creditCount) {
    this.currentUser.credits.remaining += creditCount;
    this.currentUser.credits.totalPurchased += creditCount;
    this.renderUserCredits();
    this.showToast(`🎉 Payment of ${packAmount} Successful! Added ${creditCount.toLocaleString()} WhatsApp Credits.`, 'success');
  }

  renderIndustryPresets() {
    const grid = document.getElementById('industry-presets-grid');
    if (!grid) return;

    grid.innerHTML = DASHBOARD_DATA.industryTemplates.map(ind => `
      <div class="panel-card" style="display: flex; flex-direction: column; justify-content: space-between;">
        <div>
          <div style="display: flex; align-items: center; gap: 10px; margin-bottom: 10px;">
            <span style="font-size: 1.6rem;">${ind.icon}</span>
            <div>
              <h3 style="font-size: 1rem; font-weight: 700;">${ind.industry}</h3>
              <div style="font-size: 0.75rem; color: var(--brand-cyan); font-weight: 600;">${ind.title}</div>
            </div>
          </div>

          <div style="background: var(--bg-card-subtle); border-radius: var(--radius-sm); padding: 10px; font-size: 0.82rem; line-height: 1.4; margin-bottom: 12px; border: 1px solid var(--border-subtle);">
            ${ind.templateText}
          </div>

          <div style="display: flex; gap: 6px; flex-wrap: wrap; margin-bottom: 12px;">
            <span class="stat-pill" style="font-size: 0.7rem;">🔘 ${ind.btn1}</span>
            <span class="stat-pill" style="font-size: 0.7rem;">🔘 ${ind.btn2}</span>
          </div>
        </div>

        <button class="btn-secondary" style="width: 100%; justify-content: center; font-size: 0.8rem;" onclick="app.loadIndustryPreset('${ind.id}')">
          Load into Message Composer ⚡
        </button>
      </div>
    `).join('');
  }

  loadIndustryPreset(presetId) {
    const preset = DASHBOARD_DATA.industryTemplates.find(p => p.id === presetId);
    if (!preset) return;

    this.setMode('app');
    this.switchTab('composer');
    const msgText = document.getElementById('bulk-msg-text');
    const mediaUrl = document.getElementById('bulk-media-url');
    const btn1 = document.getElementById('bulk-btn-1');
    const btn2 = document.getElementById('bulk-btn-2');
    const campName = document.getElementById('bulk-campaign-name');

    if (msgText) msgText.value = preset.templateText;
    if (mediaUrl) mediaUrl.value = preset.media;
    if (btn1) btn1.value = preset.btn1;
    if (btn2) btn2.value = preset.btn2;
    if (campName) campName.value = `${preset.industry} Campaign - ${new Date().toLocaleDateString()}`;

    this.updateBulkPreview();
    this.showToast(`Loaded ${preset.industry} preset into Composer!`, 'success');
  }

  renderPricingTiers() {
    const grid = document.getElementById('pricing-tiers-grid');
    if (!grid) return;

    grid.innerHTML = DASHBOARD_DATA.pricingTiers.map(tier => `
      <div class="panel-card" style="display: flex; flex-direction: column; justify-content: space-between; position: relative; ${tier.popular ? 'border-color: var(--brand-cyan); box-shadow: 0 0 20px var(--brand-cyan-glow);' : ''}">
        ${tier.popular ? `<span class="app-badge-pill badge-hot" style="position: absolute; top: -10px; right: 16px;">Most Popular</span>` : ''}
        
        <div>
          <h3 style="font-size: 1.15rem; font-weight: 800; margin-bottom: 4px;">${tier.volume}</h3>
          <div style="font-size: 1.8rem; font-weight: 800; color: var(--brand-cyan); margin-bottom: 2px;">
            ${tier.pricePerMsg} <span style="font-size: 0.85rem; color: var(--text-muted); font-weight: 500;">/ message</span>
          </div>
          <div style="font-size: 0.85rem; color: var(--brand-emerald); font-weight: 600; margin-bottom: 16px;">
            Total: ${tier.totalCost}
          </div>

          <div style="display: flex; flex-direction: column; gap: 8px; margin-bottom: 20px;">
            ${tier.features.map(f => `
              <div style="font-size: 0.82rem; display: flex; align-items: center; gap: 6px;">
                <span style="color: var(--brand-emerald);">✓</span>
                <span>${f}</span>
              </div>
            `).join('')}
          </div>
        </div>

        <button class="btn-primary" style="width: 100%; justify-content: center;" onclick="app.openQuotationModal('${tier.volume}')">
          Get Instant Quotation 📑
        </button>
      </div>
    `).join('');
  }

  calculateVolumeCost(val) {
    const count = parseInt(val, 10);
    const countLabel = document.getElementById('slider-volume-label');
    const totalEst = document.getElementById('slider-cost-estimate');
    const rateLabel = document.getElementById('slider-rate-label');

    let rate = 0.14;
    if (count >= 5000000) rate = 0.085;
    else if (count >= 1000000) rate = 0.10;
    else if (count >= 400000) rate = 0.12;

    const total = Math.round(count * rate);

    if (countLabel) countLabel.textContent = `${count.toLocaleString()} Messages`;
    if (rateLabel) rateLabel.textContent = `₹${rate.toFixed(3)} / msg`;
    if (totalEst) totalEst.textContent = `₹${total.toLocaleString()}`;
  }

  renderIntegrations() {
    const grid = document.getElementById('integrations-grid');
    if (!grid) return;

    grid.innerHTML = this.integrationsData.map(item => `
      <div class="integration-card">
        <div>
          <div class="card-top">
            <div class="app-icon-wrap">${item.name.substring(0,2).toUpperCase()}</div>
            <span class="app-badge-pill badge-${item.badgeType}">${item.badge}</span>
          </div>
          <div class="card-body">
            <div class="card-category">${item.categoryName}</div>
            <h3>${item.name}</h3>
            <p class="card-desc">${item.description}</p>
          </div>
        </div>
        <div class="card-footer">
          <span class="status-badge connected"><span class="status-dot"></span> Connected</span>
          <button class="btn-secondary" style="padding: 4px 10px; font-size: 0.8rem;" onclick="app.showToast('Integration Sync Active', 'success')">Configure ⚙️</button>
        </div>
      </div>
    `).join('');
  }

  renderLiveChats() {
    const list = document.getElementById('inbox-contacts-list');
    if (!list) return;

    list.innerHTML = this.liveChatsData.map(chat => `
      <div class="contact-item active">
        <div class="contact-avatar" style="background: ${chat.avatarBg};">${chat.avatar}</div>
        <div class="contact-meta">
          <div class="contact-name-row">
            <span class="contact-name">${chat.customerName}</span>
            <span class="contact-time">${chat.timestamp}</span>
          </div>
          <div class="contact-last-msg">${chat.lastMessage}</div>
        </div>
      </div>
    `).join('');

    const container = document.getElementById('chat-messages-body');
    if (container && this.liveChatsData[0]) {
      container.innerHTML = this.liveChatsData[0].messages.map(m => `
        <div class="chat-bubble ${m.sender === 'customer' ? 'in' : 'out'}">
          <div>${m.text}</div>
          <div class="bubble-time">${m.time} ${m.sender === 'bot' ? '✓✓' : ''}</div>
        </div>
      `).join('');
    }
  }

  sendChatMessage() {
    const input = document.getElementById('chat-msg-input');
    if (!input || !input.value.trim()) return;

    const text = input.value.trim();
    input.value = '';

    const chat = this.liveChatsData[0];
    if (!chat) return;

    chat.messages.push({
      id: Date.now(),
      sender: 'bot',
      text: text,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      status: 'delivered'
    });
    this.renderLiveChats();

    setTimeout(() => {
      chat.messages.push({
        id: Date.now() + 1,
        sender: 'customer',
        text: "Thank you for the prompt assistance! Really love the dashboard.",
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        status: 'read'
      });
      this.renderLiveChats();
      this.showToast('Customer reply received in Live Inbox', 'info');
    }, 1500);
  }

  runNumberFilter() {
    const raw = document.getElementById('filter-raw-numbers')?.value || '';
    const lines = raw.split('\n').map(l => l.trim()).filter(l => l.length > 5);

    if (lines.length === 0) {
      this.showToast('Please paste a list of numbers to filter.', 'warning');
      return;
    }

    const validList = [];
    const invalidList = [];

    lines.forEach(num => {
      if (Math.random() > 0.12 && num.replace(/\D/g, '').length >= 10) {
        validList.push(num);
      } else {
        invalidList.push(num);
      }
    });

    const validArea = document.getElementById('filter-valid-numbers');
    const invalidArea = document.getElementById('filter-invalid-numbers');
    const validCount = document.getElementById('filter-valid-count');
    const invalidCount = document.getElementById('filter-invalid-count');

    if (validArea) validArea.value = validList.join('\n');
    if (invalidArea) invalidArea.value = invalidList.join('\n');
    if (validCount) validCount.textContent = validList.length;
    if (invalidCount) invalidCount.textContent = invalidList.length;

    this.showToast(`Filtered ${lines.length} numbers: ${validList.length} Active WhatsApp numbers found!`, 'success');
  }

  openQuotationModal(tierName = '4,00,000 Messages') {
    const modal = document.getElementById('quotation-modal');
    const input = document.getElementById('quote-tier-input');
    if (input) input.value = tierName;
    modal?.classList.add('open');
  }

  openUploadContactsModal() {
    document.getElementById('upload-contacts-modal')?.classList.add('open');
  }

  submitQuotationRequest() {
    const phone = document.getElementById('quote-phone')?.value;
    if (!phone) {
      this.showToast('Please enter your phone number.', 'warning');
      return;
    }
    this.closeModal('quotation-modal');
    this.showToast('🎉 Quotation request submitted! Our Delhi/Dubai team will contact you shortly.', 'success');
  }

  closeModal(modalId) {
    document.getElementById(modalId)?.classList.remove('open');
  }

  initCharts() {
    const canvas = document.getElementById('hourly-chart-canvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    const width = canvas.width = canvas.parentElement.clientWidth || 600;
    const height = canvas.height = 220;

    const data = [
      { hour: "00:00", volume: 15000 },
      { hour: "04:00", volume: 22000 },
      { hour: "08:00", volume: 185000 },
      { hour: "12:00", volume: 440000 },
      { hour: "16:00", volume: 680000 },
      { hour: "20:00", volume: 890000 }
    ];
    const maxVal = Math.max(...data.map(d => d.volume));
    const padding = 30;

    ctx.clearRect(0, 0, width, height);
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.05)';
    ctx.lineWidth = 1;

    for (let i = 0; i < 4; i++) {
      const y = padding + (height - 2 * padding) * (i / 3);
      ctx.beginPath();
      ctx.moveTo(padding, y);
      ctx.lineTo(width - padding, y);
      ctx.stroke();
    }

    const gradient = ctx.createLinearGradient(0, padding, 0, height - padding);
    gradient.addColorStop(0, 'rgba(6, 182, 212, 0.35)');
    gradient.addColorStop(1, 'rgba(6, 182, 212, 0.0)');

    ctx.beginPath();
    const stepX = (width - 2 * padding) / (data.length - 1);

    data.forEach((pt, idx) => {
      const x = padding + idx * stepX;
      const y = height - padding - ((pt.volume / maxVal) * (height - 2 * padding));
      if (idx === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    });

    ctx.lineTo(width - padding, height - padding);
    ctx.lineTo(padding, height - padding);
    ctx.closePath();
    ctx.fillStyle = gradient;
    ctx.fill();

    ctx.beginPath();
    data.forEach((pt, idx) => {
      const x = padding + idx * stepX;
      const y = height - padding - ((pt.volume / maxVal) * (height - 2 * padding));
      if (idx === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    });
    ctx.strokeStyle = '#0891b2';
    ctx.lineWidth = 3;
    ctx.stroke();
  }

  handleDemoRegistration(event) {
    const name = document.getElementById('demo-name')?.value || 'Valued Partner';
    const email = document.getElementById('demo-email')?.value || '';
    const phone = document.getElementById('demo-phone')?.value || '';
    const company = document.getElementById('demo-company')?.value || 'Enterprise';
    
    this.currentUser.name = name;
    this.currentUser.company = company;
    this.currentUser.email = email;
    this.currentUser.phone = phone;
    this.currentUser.credits.remaining += 100; // Grant 100 test credits

    this.renderUserCredits();
    this.showToast(`🎉 Welcome ${name}! 100 Free Demo Credits activated. Opening Live Dashboard...`, 'success');

    setTimeout(() => {
      this.setMode('app');
      this.switchTab('composer');
    }, 1200);
  }

  handleContactSubmit(event) {
    const name = document.getElementById('contact-name')?.value || 'Friend';
    const phone = document.getElementById('contact-phone')?.value || '';
    
    this.showToast(`✅ Thank you ${name}! Our WhatsApp Marketing specialist (+91 98201 44521) will call you within 15 minutes.`, 'success');
  }

  showToast(message, type = 'info') {
    const container = document.getElementById('toast-container');
    if (!container) return;

    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.innerHTML = `
      <span>${type === 'success' ? '✅' : type === 'warning' ? '⚠️' : 'ℹ️'}</span>
      <span>${message}</span>
    `;

    container.appendChild(toast);

    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateY(10px)';
      toast.style.transition = 'all 0.3s ease';
      setTimeout(() => toast.remove(), 300);
    }, 4000);
  }

  getIconSvg(iconName) {
    const map = {
      'send': `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>`,
      'check-circle': `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>`,
      'alert-circle': `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>`,
      'database': `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><ellipse cx="12" cy="5" rx="9" ry="3"></ellipse><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"></path><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"></path></svg>`
    };
    return map[iconName] || map['send'];
  }
}

let app;
document.addEventListener('DOMContentLoaded', () => {
  app = new WhatsAppMarketingApp();
});
