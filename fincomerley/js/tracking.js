// Add error handling for tracking
function initializeTracking() {
  try {
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', 'AW-16687084392', {
      'send_page_view': true,
      'transport_url': 'https://www.googleadservices.com',
      'transport_type': 'beacon'
    });
  } catch (e) {
    console.warn('Tracking initialization failed:', e);
    // Implement fallback tracking if needed
  }
}

// Check if tracking is blocked
function checkTrackingStatus() {
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => resolve(true);
    img.onerror = () => resolve(false);
    img.src = 'https://www.google-analytics.com/collect?v=1&t=event&tid=UA-TEST&cid=555&ec=test&ea=test';
  });
}