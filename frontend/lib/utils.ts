import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getProxiedImageUrl(originalUrl: string) {
  if (!originalUrl) return ''
  const encodedUrl = encodeURIComponent(originalUrl)
  return `/api/image-proxy?url=${encodedUrl}`
}
