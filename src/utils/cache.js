const CACHE_PREFIX = 'pca_cache_'

export const getWithExpiry = (key) => {
  const itemStr = localStorage.getItem(CACHE_PREFIX + key)
  if (!itemStr) return { value: null, isExpired: true }

  const item = JSON.parse(itemStr)
  const now = new Date()
  const isExpired = now.getTime() > item.expiry

  return {
    value: item.value,
    isExpired
  }
}

export const setWithExpiry = (key, value, ttl) => {
  const now = new Date()
  const item = {
    value,
    expiry: now.getTime() + ttl,
  }
  localStorage.setItem(CACHE_PREFIX + key, JSON.stringify(item))
}

export const removeFromCache = (key) => {
  localStorage.removeItem(CACHE_PREFIX + key)
} 