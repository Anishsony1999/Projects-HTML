// Server-side tracking alternative
function sendServerSideTracking(eventData) {
  fetch('/api/track', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(eventData)
  }).catch(console.warn);
}

// Basic analytics fallback
class BasicAnalytics {
  static trackPageView() {
    const data = {
      page: window.location.pathname,
      timestamp: new Date().toISOString(),
      userAgent: navigator.userAgent,
      screenResolution: `${window.screen.width}x${window.screen.height}`
    };
    sendServerSideTracking(data);
  }
}