// Add consent management
const ConsentManager = {
  checkConsent() {
    return localStorage.getItem('tracking_consent') === 'granted';
  },
  
  requestConsent() {
    // Show consent dialog
    const consent = confirm('This site uses tracking cookies to improve your experience. Do you accept?');
    localStorage.setItem('tracking_consent', consent ? 'granted' : 'denied');
    return consent;
  },
  
  initializeTracking() {
    if (this.checkConsent()) {
      initializeTracking();
    } else {
      // Use alternative tracking or show consent request
      this.requestConsent();
    }
  }
};