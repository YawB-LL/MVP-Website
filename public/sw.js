// Service Worker for LandLedger - Performance Optimization
// Implements caching strategies and offline functionality

const CACHE_NAME = 'landledger-v1.0.0'
const STATIC_CACHE = 'landledger-static-v1.0.0'
const DYNAMIC_CACHE = 'landledger-dynamic-v1.0.0'

// Files to cache immediately
const STATIC_FILES = [
  '/',
  '/ghana-property-aerial.png',
  '/sec-ghana-logo.png',
  '/bank-of-ghana-logo.png',
  '/gipc-logo.png',
  '/greda-logo.png',
  '/gar-logo.png',
  '/lands-commission-logo.png',
  '/modern-ghana-office-team.png',
  '/placeholder-logo.png',
  '/placeholder-logo.svg',
  '/placeholder-user.jpg',
  '/placeholder.jpg',
  '/placeholder.svg'
]

// Install event - cache static files
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(STATIC_CACHE)
      .then((cache) => {
        console.log('Caching static files')
        return cache.addAll(STATIC_FILES)
      })
      .catch((error) => {
        console.error('Failed to cache static files:', error)
      })
  )
  self.skipWaiting()
})

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys()
      .then((cacheNames) => {
        return Promise.all(
          cacheNames.map((cacheName) => {
            if (cacheName !== STATIC_CACHE && cacheName !== DYNAMIC_CACHE) {
              console.log('Deleting old cache:', cacheName)
              return caches.delete(cacheName)
            }
          })
        )
      })
      .then(() => {
        console.log('Service Worker activated')
        return self.clients.claim()
      })
  )
})

// Fetch event - implement caching strategies
self.addEventListener('fetch', (event) => {
  const { request } = event
  const url = new URL(request.url)

  // Skip non-GET requests
  if (request.method !== 'GET') {
    return
  }

  // Handle different types of requests
  if (url.pathname === '/') {
    // Homepage - cache first, then network
    event.respondWith(cacheFirst(request, STATIC_CACHE))
  } else if (isImageRequest(request)) {
    // Images - cache first, then network
    event.respondWith(cacheFirst(request, STATIC_CACHE))
  } else if (isStaticAsset(request)) {
    // Static assets - cache first, then network
    event.respondWith(cacheFirst(request, STATIC_CACHE))
  } else if (isAPIRequest(request)) {
    // API requests - network first, then cache
    event.respondWith(networkFirst(request, DYNAMIC_CACHE))
  } else {
    // Other requests - network first, then cache
    event.respondWith(networkFirst(request, DYNAMIC_CACHE))
  }
})

// Cache first strategy
async function cacheFirst(request, cacheName) {
  try {
    const cachedResponse = await caches.match(request)
    if (cachedResponse) {
      return cachedResponse
    }
    
    const networkResponse = await fetch(request)
    if (networkResponse.ok) {
      const cache = await caches.open(cacheName)
      cache.put(request, networkResponse.clone())
    }
    return networkResponse
  } catch (error) {
    console.error('Cache first strategy failed:', error)
    return new Response('Network error', { status: 503 })
  }
}

// Network first strategy
async function networkFirst(request, cacheName) {
  try {
    const networkResponse = await fetch(request)
    if (networkResponse.ok) {
      const cache = await caches.open(cacheName)
      cache.put(request, networkResponse.clone())
    }
    return networkResponse
  } catch (error) {
    console.error('Network first strategy failed:', error)
    const cachedResponse = await caches.match(request)
    if (cachedResponse) {
      return cachedResponse
    }
    return new Response('Network error', { status: 503 })
  }
}

// Helper functions
function isImageRequest(request) {
  return request.destination === 'image' || 
         request.url.match(/\.(jpg|jpeg|png|gif|webp|avif|svg)$/i)
}

function isStaticAsset(request) {
  return request.url.includes('/_next/') ||
         request.url.includes('/static/') ||
         request.url.match(/\.(css|js|woff|woff2|ttf|eot)$/i)
}

function isAPIRequest(request) {
  return request.url.includes('/api/') ||
         request.url.includes('sanity.io') ||
         request.url.includes('typeform.com')
}

// Background sync for offline actions
self.addEventListener('sync', (event) => {
  if (event.tag === 'background-sync') {
    event.waitUntil(doBackgroundSync())
  }
})

async function doBackgroundSync() {
  try {
    // Implement background sync logic here
    console.log('Background sync completed')
  } catch (error) {
    console.error('Background sync failed:', error)
  }
}

// Push notifications (if implemented)
self.addEventListener('push', (event) => {
  if (event.data) {
    const data = event.data.json()
    const options = {
      body: data.body,
      icon: '/placeholder-logo.png',
      badge: '/placeholder-logo.png',
      vibrate: [100, 50, 100],
      data: {
        dateOfArrival: Date.now(),
        primaryKey: 1
      }
    }
    
    event.waitUntil(
      self.registration.showNotification(data.title, options)
    )
  }
})

// Notification click handler
self.addEventListener('notificationclick', (event) => {
  event.notification.close()
  
  event.waitUntil(
    clients.openWindow('/')
  )
})
