// Minimal service worker to prevent 404 errors
// This is a placeholder - no actual service worker functionality

self.addEventListener('install', function(event) {
  // Skip waiting to activate immediately
  self.skipWaiting();
});

self.addEventListener('activate', function(event) {
  // Claim all clients
  event.waitUntil(self.clients.claim());
});

// No fetch event handler - let requests pass through normally


