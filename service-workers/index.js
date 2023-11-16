if ('serviceWorker' in navigator) {
    window.addEventListener('load', async () => {
        try {
            const registration = await navigator.serviceWorker.register('/sw.js');
            console.log('ServiceWorker registration succesful')
        } catch (e) {
            console.log(`ServiceWorker registration failed: `, e)
        }
    })
}