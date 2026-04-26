import { useState, useEffect } from 'react'

/**
 * usePWA — tracks online/offline status and PWA install prompt
 */
export function usePWA() {
  const [isOnline, setIsOnline] = useState(navigator.onLine)
  const [installPrompt, setInstallPrompt] = useState(null)
  const [isInstalled, setIsInstalled] = useState(false)

  useEffect(() => {
    const goOnline  = () => setIsOnline(true)
    const goOffline = () => setIsOnline(false)

    window.addEventListener('online',  goOnline)
    window.addEventListener('offline', goOffline)

    // Capture the browser's install prompt
    const handleBeforeInstall = (e) => {
      e.preventDefault()
      setInstallPrompt(e)
    }
    window.addEventListener('beforeinstallprompt', handleBeforeInstall)

    // Detect if already installed (standalone mode)
    if (window.matchMedia('(display-mode: standalone)').matches) {
      setIsInstalled(true)
    }

    return () => {
      window.removeEventListener('online',  goOnline)
      window.removeEventListener('offline', goOffline)
      window.removeEventListener('beforeinstallprompt', handleBeforeInstall)
    }
  }, [])

  const promptInstall = async () => {
    if (!installPrompt) return
    installPrompt.prompt()
    const { outcome } = await installPrompt.userChoice
    if (outcome === 'accepted') setIsInstalled(true)
    setInstallPrompt(null)
  }

  return { isOnline, installPrompt, isInstalled, promptInstall }
}
