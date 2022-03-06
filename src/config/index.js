// export const API_BASE_URL = `http://localhost:5000`
export const API_BASE_URL = `${process.env.VUE_APP_URL}`
export const VUE_APP_URL = `${API_BASE_URL}`
export const DEFAULT_FALLBACK_LOCALE = 'en'
export const MEDIA_UPLOAD_MAX_SIZE = 2097152
export const MAX_REQUESTS_COUNT = 4
export const REQUESTS_INTERNAL_MS = 480
export const EXTRA_LOADING_SECONDS = 2304