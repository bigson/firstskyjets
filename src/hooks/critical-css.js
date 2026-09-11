import Beasties from 'beasties';

const beasties = new Beasties({ preload: 'media', inlineFonts: true });

/** @type {import('@sveltejs/kit').Handle} */
export async function handleCriticalCss({ event, resolve }) {
    const response = await resolve(event);

    if (response.headers.get('content-type')?.includes('text/html')) {
        const html = await response.text();
        const processedHtml = await beasties.process(html);

        return new Response(processedHtml, {
            status: response.status,
            headers: response.headers
        });
    }

    return response;
}