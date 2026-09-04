// Next ReachDMS - Enterprise CPaaS & Conversational Marketing Platform Store

const DASHBOARD_DATA = {
  // Current Logged-in Account Profile
  currentUser: {
    name: "Rajesh Kumar",
    company: "Apex Global Enterprises",
    email: "rajesh@reachdms.io",
    phone: "+91 98201 44521",
    role: "Director of Growth",
    avatar: "RK",
    avatarBg: "#0891b2",
    credits: {
      totalPurchased: 5000000,
      totalUsed: 1150000,
      remaining: 3850000,
      walletBalance: "₹46,200.00",
      tier: "ReachDMS Enterprise Tier (Unlimited Throughput)",
      perMsgRate: "₹0.11 / msg"
    },
    wabaStatus: {
      wabaId: "RDMS-WABA-88492019",
      phoneId: "RDMS-PHID-77291038",
      number: "+91 98201 44521",
      verified: true,
      greenBadge: true,
      qualityScore: "EXCELLENT (99.9%)",
      sla: "99.4% Delivery SLA"
    }
  },

  // ReachDMS Customer Impact Case Studies
  caseStudies: [
    {
      id: "cs_retail",
      industry: "Omnichannel Retail",
      client: "Nova Luxe Apparel",
      metric: "+48% Revenue Spike & 5.2x ROI",
      challenge: "Customer drop-off on traditional SMS promotions with low click-through rates.",
      solution: "Deployed Next ReachDMS SmartQueue with interactive catalog carousels and personalized 1-tap checkout links.",
      results: ["52,000 WhatsApp broadcasts dispatched in 10 mins", "99.6% inbox delivery with 94.2% read rate", "₹24.6 Lakhs in sales unlocked in the first 48 hours"],
      tag: "5.2x ROI"
    },
    {
      id: "cs_ecom",
      industry: "D2C Brands & E-Commerce",
      client: "UrbanBlend Direct",
      metric: "41% Automated Cart Recovery",
      challenge: "High cart abandonment rates on Shopify store with generic email follow-ups ignored.",
      solution: "Implemented Next ReachDMS Event Webhooks triggering dynamic WhatsApp reminders with time-sensitive discount codes.",
      results: ["8,420 abandoned carts recovered on autopilot", "46.8% button click engagement rate", "₹6.8 Lakhs added to monthly recurring revenue"],
      tag: "41% Recovered"
    },
    {
      id: "cs_realestate",
      industry: "Prime Real Estate",
      client: "Skyline & Apex Living Dubai",
      metric: "185+ Private Site Bookings",
      challenge: "Engaging global high-net-worth property investors across India and the GCC without spam flags.",
      solution: "Leveraged ReachDMS HyperRoute with HD video walkthroughs, digital payment tokens, and WhatsApp instant calendar booking.",
      results: ["12,400 qualified investors reached with zero bans", "185 chauffeured site visits confirmed", "AED 6.4M in property token advances collected"],
      tag: "185+ Bookings"
    },
    {
      id: "cs_edtech",
      industry: "Higher Ed & Institutions",
      client: "AeroTech National Academy",
      metric: "95,000 Instant Hall Tickets",
      challenge: "Critical need for real-time exam admit card distribution with absolute zero delay or failure.",
      solution: "Utilized ReachDMS High-Speed Turbo Dispatch with dynamic PDF generation and real-time delivery audit logs.",
      results: ["95,000 PDF admit cards delivered in 14 minutes", "100% verified inbox placement with blue-tick tracking", "Zero support ticket escalations"],
      tag: "99.9% Delivered"
    }
  ],

  // Contact Groups & Lists
  contactGroups: [
    { id: "grp_01", name: "Premium VIP Buyers (Delhi NCR)", totalContacts: 48000, validWhatsApp: 47250, invalid: 750, created: "2026-08-28", tags: ["VIP", "High LTV"] },
    { id: "grp_02", name: "Shopify Abandoned Carts (7-Day Drip)", totalContacts: 14200, validWhatsApp: 13980, invalid: 220, created: "2026-09-01", tags: ["Automated", "D2C"] },
    { id: "grp_03", name: "Dubai & GCC Luxury Investors", totalContacts: 9600, validWhatsApp: 9480, invalid: 120, created: "2026-08-15", tags: ["High Net Worth", "UAE"] },
    { id: "grp_04", name: "National Entrance Candidates 2026", totalContacts: 95000, validWhatsApp: 94100, invalid: 900, created: "2026-09-02", tags: ["Transactional", "Students"] }
  ],

  // Detailed Per-Number Delivery Logs
  detailedLogs: [
    { phone: "+91 98201 44521", recipient: "Amit Verma", campaign: "Festive Flash Sale 50%", status: "Read (Blue Tick)", credits: 1, error: "None", time: "12:05:14 PM" },
    { phone: "+91 95993 00365", recipient: "Rahul Sharma", campaign: "Festive Flash Sale 50%", status: "Delivered", credits: 1, error: "None", time: "12:05:12 PM" },
    { phone: "+91 99887 76655", recipient: "Priya Patel", campaign: "Festive Flash Sale 50%", status: "Read (Blue Tick)", credits: 1, error: "None", time: "12:05:10 PM" },
    { phone: "+91 98765 43210", recipient: "Vikas Gupta", campaign: "Festive Flash Sale 50%", status: "Delivered", credits: 1, error: "None", time: "12:05:08 PM" },
    { phone: "+91 88001 23456", recipient: "Suresh Mehra", campaign: "Festive Flash Sale 50%", status: "Failed", credits: 0, error: "Non-WhatsApp Number", time: "12:05:06 PM" },
    { phone: "+971 50 123 4567", recipient: "Vikram Malhotra", campaign: "Dubai Luxury Living Launch", status: "Read (Blue Tick)", credits: 1, error: "None", time: "11:42:19 AM" },
    { phone: "+1 415 892 3021", recipient: "Sarah Jenkins", campaign: "Cart Recovery Follow-up", status: "Read (Blue Tick)", credits: 1, error: "None", time: "11:38:00 AM" },
    { phone: "+44 7700 900142", recipient: "Marcus Vance", campaign: "Dispatch Tracking & OTP", status: "Delivered", credits: 1, error: "None", time: "10:15:30 AM" }
  ],

  // Overview KPIs
  kpiStats: [
    { id: "total_sent", title: "Total Broadcasts Dispatched", value: "1,150,000", change: "+21.4% this month", isPositive: true, icon: "send", color: "cyan" },
    { id: "delivered", title: "Successfully Delivered", value: "1,143,650", change: "99.4% Delivery SLA Guaranteed", isPositive: true, icon: "check-circle", color: "emerald" },
    { id: "failed", title: "Failed / Non-WhatsApp", value: "6,350", change: "Credits 100% refunded automatically", isPositive: false, icon: "alert-circle", color: "coral" },
    { id: "active_balance", title: "Remaining ReachCredits", value: "3,850,000", change: "Wallet Balance: ₹46,200.00", isPositive: true, icon: "database", color: "violet" }
  ],

  // Recent Campaigns
  campaigns: [
    { id: "cmp_01", name: "Festive Flash Sale 50%", type: "Promotional", group: "Premium VIP Buyers", target: 48000, delivered: 47250, readRate: "93.4%", date: "Today, 11:30 AM", status: "Completed" },
    { id: "cmp_02", name: "Shopify Cart Recovery Drip", type: "Dynamic Trigger", group: "Shopify Abandoned Carts", target: 14200, delivered: 13980, readRate: "89.1%", date: "Sep 03, 04:15 PM", status: "Active" },
    { id: "cmp_03", name: "Dubai Luxury Living Launch", type: "Rich Media & Video", group: "Dubai & GCC Luxury Investors", target: 9600, delivered: 9480, readRate: "95.8%", date: "Sep 02, 10:00 AM", status: "Completed" },
    { id: "cmp_04", name: "National Entrance Admit Cards", type: "Transactional OTP", group: "National Candidates", target: 95000, delivered: 94100, readRate: "99.1%", date: "Sep 01, 09:00 AM", status: "Completed" }
  ],

  // Industry Composer Presets
  industryPresets: [
    {
      category: "retail",
      name: "Retail & Festive Flash Sale",
      headerMedia: "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=600&q=80",
      mediaType: "image",
      body: "Hi {{Name}}! 🎉\n\nEnjoy an EXCLUSIVE *50% OFF* on our new Festive Collection at *Nova Luxe*.\n\nUse Code: *FESTIVE50* at checkout.\nValid till midnight this Sunday only! 🛍️✨",
      footer: "Next ReachDMS • Reply STOP to unsubscribe",
      button1: "Claim 50% Off 🛍️",
      button2: "Store Directions 📍"
    },
    {
      category: "ecom",
      name: "D2C Abandoned Cart Recovery",
      headerMedia: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&q=80",
      mediaType: "image",
      body: "Hello {{Name}}, you left items in your shopping bag! 🛒\n\nComplete your order in the next 15 minutes and get an *Extra 10% OFF* + FREE Express Delivery.\n\nYour Bag: {{ItemName}}\nDiscount Code: *RECOVER10*",
      footer: "Next ReachDMS Direct Checkout",
      button1: "Complete Order Now ⚡",
      button2: "Chat with Support 💬"
    },
    {
      category: "realestate",
      name: "Luxury Real Estate Private Launch",
      headerMedia: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=600&q=80",
      mediaType: "image",
      body: "Dear {{Name}},\n\nIntroducing *Skyline Residences* — Ultra-luxury 3 & 4 BHK apartments with private sky pools in Business Bay, Dubai.\n\nPre-launch token bookings now open with an exclusive 5-year post-handover payment plan.",
      footer: "ReachDMS Prime Properties",
      button1: "Download HD Brochure 📑",
      button2: "Book VIP Chauffeur Visit 🚗"
    },
    {
      category: "edtech",
      name: "Urgent Admit Card & Exam Alert",
      headerMedia: "",
      mediaType: "none",
      body: "Dear {{Name}},\n\nYour Admit Card for the *National Scholarship Exam 2026* is ready for download.\n\n• Roll No: {{RollNumber}}\n• Center: {{ExamCenter}}\n• Reporting Time: 08:30 AM\n\nPlease carry a printed copy with valid ID proof.",
      footer: "ReachDMS Fast Alert System",
      button1: "Download PDF Hall Ticket 📥",
      button2: "Exam Guidelines 📝"
    }
  ],

  // Volume Pricing Tiers
  pricingTiers: [
    {
      name: "Starter Boost",
      volume: "1,00,000 Messages",
      ratePerMsg: "₹0.13",
      totalCost: "₹13,000",
      features: ["Next ReachDMS FlowEngine", "Virtual Anti-Ban Throttling", "100% Non-WhatsApp Credit Refund", "Real-Time Blue Tick Reports", "Standard Email & Chat Support"],
      isPopular: false,
      btnText: "Choose Starter"
    },
    {
      name: "Growth Pro",
      volume: "5,00,000 Messages",
      ratePerMsg: "₹0.10",
      totalCost: "₹50,000",
      features: ["Everything in Starter", "Official Meta Green Tick Fast-Track", "Turbo Parallel Dispatch (500 msg/sec)", "Dynamic CSV Variable Personalization", "Shopify & WooCommerce Webhooks", "Dedicated Account Manager"],
      isPopular: true,
      btnText: "Choose Growth Pro"
    },
    {
      name: "Enterprise HyperScale",
      volume: "20,00,000+ Messages",
      ratePerMsg: "₹0.075",
      totalCost: "₹1,50,000",
      features: ["Unlimited Daily Sending Throughput", "Direct Tier-1 Telecom Pipes", "Custom REST API & Webhooks", "Multi-Agent Live Support Inbox", "Custom AI Chatbot Automation", "99.9% Uptime SLA Guarantee"],
      isPopular: false,
      btnText: "Contact Enterprise"
    }
  ],

  // Integrations Hub
  integrations: [
    { name: "Shopify Direct", desc: "Automate abandoned cart recovery, order dispatch alerts, and customer notifications.", icon: "🛍️", status: "Connected", category: "E-Commerce" },
    { name: "HubSpot CRM", desc: "Sync leads, trigger WhatsApp drip sequences from HubSpot workflow stages.", icon: "🎯", status: "Connected", category: "CRM" },
    { name: "Zapier & Make", desc: "Connect Next ReachDMS with 5,000+ cloud apps and databases in seconds.", icon: "⚡", status: "Connected", category: "Automation" },
    { name: "Razorpay & Stripe", desc: "Send WhatsApp payment links with automated instant receipt generation.", icon: "💳", status: "Connected", category: "Payments" },
    { name: "OpenAI GPT-4o", desc: "Deploy intelligent 24/7 conversational support bots with smart lead qualification.", icon: "🤖", status: "Active", category: "AI Bots" },
    { name: "WooCommerce & Magento", desc: "Trigger transactional delivery tracking and review request sequences.", icon: "📦", status: "Available", category: "E-Commerce" }
  ],

  // Live Inbox Chats
  liveChats: [
    {
      id: "chat_01",
      name: "Amit Verma",
      phone: "+91 98201 44521",
      avatar: "AV",
      unread: 1,
      lastTime: "12:10 PM",
      status: "online",
      messages: [
        { sender: "user", text: "Hi! I received the 50% discount code FESTIVE50 on WhatsApp.", time: "12:08 PM", isOut: false },
        { sender: "agent", text: "Hello Amit! Yes, it is active on all online and store purchases till Sunday.", time: "12:09 PM", isOut: true },
        { sender: "user", text: "Great! Can you also send me the Connaught Place store location?", time: "12:10 PM", isOut: false }
      ]
    },
    {
      id: "chat_02",
      name: "Vikram Malhotra",
      phone: "+971 50 123 4567",
      avatar: "VM",
      unread: 0,
      lastTime: "11:45 AM",
      status: "offline",
      messages: [
        { sender: "user", text: "Interested in the 3 BHK skyline apartment with private pool.", time: "11:40 AM", isOut: false },
        { sender: "agent", text: "Thank you Vikram! I have scheduled a private chauffeur site visit for tomorrow at 3:00 PM.", time: "11:45 AM", isOut: true }
      ]
    },
    {
      id: "chat_03",
      name: "Sarah Jenkins",
      phone: "+1 415 892 3021",
      avatar: "SJ",
      unread: 0,
      lastTime: "10:30 AM",
      status: "offline",
      messages: [
        { sender: "user", text: "Thanks for the checkout link, just placed my order!", time: "10:28 AM", isOut: false },
        { sender: "agent", text: "Awesome! Your tracking link has been sent to your WhatsApp.", time: "10:30 AM", isOut: true }
      ]
    }
  ]
};
