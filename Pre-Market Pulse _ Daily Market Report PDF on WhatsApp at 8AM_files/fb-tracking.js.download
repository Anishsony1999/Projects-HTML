// Framer-specific Facebook Tracking Implementation - Secure Version

// ===== CONFIGURATION =====
const FB_PIXEL_ID = '1423884372112569'; // This can stay as it's already public in the pixel code
const FB_PROXY_URL = 'https://premarketpulse.in/fb-tracking/fb-proxy.php';

// ===== EVENT TRACKING CONFIGURATION =====
window.PMP_TRACKING_CONFIG = {
  // ViewContent
  "https://premarketpulse.in/sample/Pre-Market-Pulse.pdf": {
    event: 'ViewContent',
    value: 0,
    content_type: 'document',
    content_name: 'Pre-Market Pulse Sample',
    content_category: 'Sample Content'
  },
  // AddToCart
  "https://www.premarketpulse.com/cart": {
    event: 'AddToCart',
    value: 0,
    content_type: 'subscription',
    content_category: 'Trading Subscription'
  },
  // InitiateCheckout - 3 month plan
  "https://pages.razorpay.com/premarketpulse-3month": {
    event: 'InitiateCheckout',
    value: 395,
    currency: 'INR',
    content_type: 'subscription',
    content_name: '3 Month Plan',
    content_category: 'Trading Subscription',
    num_items: 1,
    contents: [{
      id: 'sub-3month',
      quantity: 1,
      item_price: 395
    }]
  },
  // InitiateCheckout - 6 month plan
  "https://pages.razorpay.com/premarketpulse-6month": {
    event: 'InitiateCheckout',
    value: 595,
    currency: 'INR',
    content_type: 'subscription',
    content_name: '6 Month Plan',
    content_category: 'Trading Subscription',
    num_items: 1,
    contents: [{
      id: 'sub-6month',
      quantity: 1,
      item_price: 595
    }]
  },
  // InitiateCheckout - premium plan
  "https://pages.razorpay.com/pl_NMJLZCJY4OrlNO/view": {
    event: 'InitiateCheckout',
    value: 795,
    currency: 'INR',
    content_type: 'subscription',
    content_name: '1 Year Plan',
    content_category: 'Trading Subscription',
    num_items: 1,
    contents: [{
      id: 'sub-1year',
      quantity: 1,
      item_price: 795
    }]
  },
  // WhatsApp View Content
  "https://wa.link/qopkx5": {
    event: 'ViewContent',
    content_type: 'whatsapp_link',
    content_name: 'WhatsApp View Content',
    content_category: 'Contact'
  },
  // WhatsApp Contact
  "https://api.whatsapp.com/send?phone=918618318166": {
    event: 'Contact',
    content_type: 'whatsapp_contact',
    content_name: 'WhatsApp Contact',
    content_category: 'Contact'
  }
};

// ===== UTILITY FUNCTIONS =====

// Generate a unique but deterministic event ID
function generateEventId(url, eventName) {
  const timestamp = Math.floor(Date.now() / 1000);
  const urlHash = url.replace(/[^a-z0-9]/gi, '').substring(0, 10);
  const random = Math.random().toString(36).substring(2, 10);
  return `${eventName}_${urlHash}_${timestamp}_${random}`;
}

// Get cookie value
function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(';').shift();
  return '';
}

// Improved hashing function using SHA-256 when available
async function sha256Hash(str) {
  if (!str) return '';
  
  // Normalize: lowercase and trim
  str = str.toLowerCase().trim();
  
  // Use modern Web Crypto API if available
  if (window.crypto && window.crypto.subtle && typeof TextEncoder !== 'undefined') {
    try {
      const encoder = new TextEncoder();
      const data = encoder.encode(str);
      const hashBuffer = await window.crypto.subtle.digest('SHA-256', data);
      const hashArray = Array.from(new Uint8Array(hashBuffer));
      return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
    } catch (e) {
      console.error('Hashing error:', e);
      return str; // Fallback to normalized string
    }
  }
  
  return str; // Fallback to normalized string if no crypto API
}

// Synchronous hash function for non-critical contexts
function hashData(data) {
  if (!data) return '';
  return data.toLowerCase().trim(); // Simple normalization as fallback
}

// Get user identifiers from forms when available
async function getUserIdentifiers() {
  // Try to find email fields
  const emailFields = document.querySelectorAll('input[type="email"], input[name*="email"]');
  const phoneFields = document.querySelectorAll('input[type="tel"], input[name*="phone"], input[name*="mobile"]');
  
  let email = '';
  let phone = '';
  
  // Get email if available
  if (emailFields.length > 0) {
    email = emailFields[0].value;
  }
  
  // Get phone if available
  if (phoneFields.length > 0) {
    phone = phoneFields[0].value;
  }
  
  const identifiers = {};
  
  // Use SHA-256 for email (async)
  if (email) {
    try {
      identifiers.em = await sha256Hash(email);
    } catch (e) {
      identifiers.em = hashData(email); // Fallback
    }
  }
  
  // Use SHA-256 for phone (async)
  if (phone) {
    try {
      identifiers.ph = await sha256Hash(phone);
    } catch (e) {
      identifiers.ph = hashData(phone); // Fallback
    }
  }
  
  return identifiers;
}

// Get UTM parameters from URL
function getUTMParameters() {
  const utmParams = {};
  const urlParams = new URLSearchParams(window.location.search);
  
  // Track standard UTM parameters
  const utmSources = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content'];
  
  utmSources.forEach(param => {
    if(urlParams.has(param)) {
      utmParams[param] = urlParams.get(param);
    }
  });
  
  // Also grab the fbclid parameter if available (for Click ID)
  if (urlParams.has('fbclid')) {
    // Store in a cookie for future use
    const fbclid = urlParams.get('fbclid');
    document.cookie = `_fbc=fb.1.${Date.now()}.${fbclid}; path=/; max-age=7776000`; // 90 days
  }
  
  return utmParams;
}

// Get user data from browser
function getUserData() {
  const userData = {
    client_user_agent: navigator.userAgent,
    fbc: getCookie('_fbc') || '',
    fbp: getCookie('_fbp') || '',
    external_id: getCookie('pmp_user_id') || localStorage.getItem('pmp_user_id') || ''
  };
  
  // Generate FBP if it doesn't exist
  if (!userData.fbp) {
    const now = Date.now();
    const randNumber = Math.floor(Math.random() * 1000000000);
    userData.fbp = `fb.1.${now}.${randNumber}`;
    document.cookie = `_fbp=${userData.fbp}; path=/; max-age=7776000`; // 90 days
  }
  
  // Add IP address if we have it (will be added server-side otherwise)
  // Note: Client-side can't reliably get the actual IP, so this is best handled server-side
  
  return userData;
}

// Async version to get user data including identifiers
async function getUserDataComplete() {
  const baseData = getUserData();
  const identifiers = await getUserIdentifiers();
  return { ...baseData, ...identifiers };
}

// Track last click times by URL to prevent duplicates
const lastClickTimes = {};
const DEBOUNCE_TIME = 1000; // 1 second

// Track PageView on page load with both Pixel and Conversion API
async function trackPageView() {
  // Store UTM parameters in session storage for later use
  const utmParams = getUTMParameters();
  if (Object.keys(utmParams).length > 0) {
    sessionStorage.setItem('pmp_utm_params', JSON.stringify(utmParams));
  }

  // Generate event ID
  const eventId = generateEventId(window.location.href, 'PageView');
  
  // For regular Facebook Pixel
  fbq('track', 'PageView', {}, {eventID: eventId});
  
  // Get complete user data including hashed identifiers
  const userData = await getUserDataComplete();
  
  // Prepare data for server-side API
  const eventData = {
    data: [{
      event_name: 'PageView',
      event_time: Math.floor(Date.now() / 1000),
      event_id: eventId,
      event_source_url: window.location.href,
      action_source: 'website',
      user_data: userData
    }]
  };

  // Send to our PHP proxy instead of directly to Facebook
  fetch(FB_PROXY_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(eventData)
  })
  .then(response => response.json())
  .then(result => {
    console.log('PageView sent to Conversion API:', result);
  })
  .catch(error => {
    console.error('Error sending PageView to Conversion API:', error);
  });
}

// ===== MAIN TRACKING FUNCTION =====
window.trackFBEvent = async function(url) {
  // Find matching URL in our config, using partial matching if needed
  let matchedUrl = url;
  let config = window.PMP_TRACKING_CONFIG[url];
  
  // If exact match isn't found, try partial matching
  if (!config) {
    for (const configUrl in window.PMP_TRACKING_CONFIG) {
      if (url.includes(configUrl)) {
        config = window.PMP_TRACKING_CONFIG[configUrl];
        matchedUrl = configUrl;
        break;
      }
    }
  }
  
  // If still no match, exit
  if (!config) {
    console.log('No tracking configured for URL:', url);
    return;
  }
  
  // Debounce clicks on same URL
  const now = Date.now();
  if (lastClickTimes[matchedUrl] && (now - lastClickTimes[matchedUrl] < DEBOUNCE_TIME)) {
    console.log('Debounced event for URL:', matchedUrl);
    return;
  }
  lastClickTimes[matchedUrl] = now;
  
  // Prepare event data
  let eventName = config.event;
  
  // Create a copy of the config for custom data
  const customData = {};
  Object.keys(config).forEach(key => {
    if (key !== 'event') {
      customData[key] = config[key];
    }
  });
  
  // Add UTM parameters from session storage if available
  try {
    const storedUTMs = sessionStorage.getItem('pmp_utm_params');
    if (storedUTMs) {
      customData.utm_params = JSON.parse(storedUTMs);
    }
  } catch (e) {
    console.error('Error parsing UTM params:', e);
  }
  
  // Generate a consistent event ID
  const eventId = generateEventId(url, eventName);
  
  // Log what we're about to do
  console.log(`Tracking ${eventName} for URL: ${url} with data:`, customData);
  
  // Track with Facebook Pixel (client-side)
  fbq('track', eventName, customData, {eventID: eventId});
  
  // Get complete user data including hashed identifiers
  const userData = await getUserDataComplete();
  
  // Prepare data for server-side API
  const eventData = {
    data: [{
      event_name: eventName,
      event_time: Math.floor(Date.now() / 1000),
      event_id: eventId,
      event_source_url: window.location.href,
      action_source: 'website',
      user_data: userData,
      custom_data: customData
    }]
  };
  
  // Send to our PHP proxy instead of directly to Facebook
  fetch(FB_PROXY_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(eventData)
  })
  .then(response => response.json())
  .then(result => {
    console.log('Facebook Conversion API result:', result);
  })
  .catch(error => {
    console.error('Error sending to Facebook Conversion API:', error);
    
    // Store failed event for potential retry
    const failedEvents = JSON.parse(localStorage.getItem('pmp_failed_events') || '[]');
    failedEvents.push({
      eventData,
      timestamp: Date.now()
    });
    // Keep only last 10 failed events
    if (failedEvents.length > 10) {
      failedEvents.shift();
    }
    localStorage.setItem('pmp_failed_events', JSON.stringify(failedEvents));
  });
};

// ===== TRACK CLICKS ON THE PAGE =====
document.addEventListener('click', function(event) {
  // Find the clicked element or its parent that has an href
  let target = event.target;
  let url = null;
  
  // Loop through parents until we find a link or button with href or data-href
  while (target && target !== document) {
    // Check for <a> tags with href
    if (target.tagName === 'A' && target.href) {
      url = target.href;
      break;
    }
    
    // Check for buttons with data attributes
    if (target.tagName === 'BUTTON' || target.classList.contains('button') || 
        target.role === 'button' || target.getAttribute('data-is-button') === 'true') {
      url = target.getAttribute('data-href') || 
            target.getAttribute('data-url') || 
            target.getAttribute('href');
      if (url) break;
    }
    
    // Framer-specific: data-framer-name might indicate a clickable component
    if (target.getAttribute('data-framer-name')) {
      url = target.getAttribute('data-href') || 
            target.getAttribute('data-link') || 
            target.getAttribute('data-url');
      if (url) break;
    }
    
    target = target.parentNode;
  }
  
  // If we found a URL, track it
  if (url) {
    window.trackFBEvent(url);
  }
});

// Try to retry failed events on page load
function retryFailedEvents() {
  try {
    const failedEvents = JSON.parse(localStorage.getItem('pmp_failed_events') || '[]');
    if (failedEvents.length === 0) return;
    
    console.log(`Retrying ${failedEvents.length} failed events`);
    
    // Only retry events that are less than 24 hours old
    const cutoff = Date.now() - (24 * 60 * 60 * 1000);
    const validEvents = failedEvents.filter(item => item.timestamp > cutoff);
    
    validEvents.forEach((item, index) => {
      setTimeout(() => {
        fetch(FB_PROXY_URL, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(item.eventData)
        })
        .then(response => response.json())
        .then(result => {
          console.log('Retry successful:', result);
        })
        .catch(error => {
          console.error('Retry failed:', error);
        });
      }, index * 500); // Space out retries by 500ms
    });
    
    // Clear the retried events
    localStorage.setItem('pmp_failed_events', '[]');
  } catch (e) {
    console.error('Error retrying failed events:', e);
  }
}

// Handle fbclid parameter if present in URL
function checkForFbclid() {
  const urlParams = new URLSearchParams(window.location.search);
  if (urlParams.has('fbclid')) {
    const fbclid = urlParams.get('fbclid');
    document.cookie = `_fbc=fb.1.${Date.now()}.${fbclid}; path=/; max-age=7776000`; // 90 days
    console.log('Stored fbclid in _fbc cookie:', fbclid);
  }
}

// Log that tracking is initialized
console.log('PreMarketPulse Facebook Tracking initialized');

// Check for fbclid immediately
checkForFbclid();

// Track PageView when the script loads
trackPageView();

// Optionally re-track PageView when DOM is fully loaded for better reliability
document.addEventListener('DOMContentLoaded', function() {
  // Additional handler for WhatsApp links
  const whatsAppLinks = document.querySelectorAll('a[href*="wa.link"], a[href*="api.whatsapp.com"]');
  whatsAppLinks.forEach(link => {
    link.addEventListener('click', function() {
      window.trackFBEvent(this.href);
    });
  });
  
  // Retry failed events
  retryFailedEvents();
});

// Optional: Create a global tracking function that can be called from Framer
window.PMP = window.PMP || {};
window.PMP.trackEvent = async function(eventName, customData) {
  // Generate a consistent event ID
  const eventId = generateEventId(window.location.href, eventName);
  
  // Add UTM parameters if available
  try {
    const storedUTMs = sessionStorage.getItem('pmp_utm_params');
    if (storedUTMs) {
      customData = customData || {};
      customData.utm_params = JSON.parse(storedUTMs);
    }
  } catch (e) {
    console.error('Error parsing UTM params:', e);
  }
  
  // Track with Facebook Pixel
  fbq('track', eventName, customData || {}, {eventID: eventId});
  
  // Get complete user data including hashed identifiers
  const userData = await getUserDataComplete();
  
  // Prepare data for server-side API
  const eventData = {
    data: [{
      event_name: eventName,
      event_time: Math.floor(Date.now() / 1000),
      event_id: eventId,
      event_source_url: window.location.href,
      action_source: 'website',
      user_data: userData,
      custom_data: customData || {}
    }]
  };
  
  // Send to our PHP proxy instead of directly to Facebook
  fetch(FB_PROXY_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(eventData)
  })
  .then(response => response.json())
  .then(result => {
    console.log('Facebook Conversion API result:', result);
  })
  .catch(error => {
    console.error('Error sending to Facebook Conversion API:', error);
  });
};