// Method 1: Get entire HTML
document.documentElement.outerHTML

// Method 2: Get body HTML
document.body.innerHTML

// Method 3: Using fetch
fetch('https://subscribe.themarketmood.com/web/checkout/675a8f35e467052f849896ce')
  .then(response => response.text())
  .then(html => {
    console.log(html);
  });