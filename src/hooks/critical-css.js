import Beasties from 'beasties';

const beasties = new Beasties({
    // Tải CSS phụ bằng mẹo media="print" không chặn render
    preload: 'media',
    // Inline các font chữ quan trọng ở màn hình đầu để chống giật/mất chữ (FOUT/FOIT)
    inlineFonts: true,
    // Chỉ giữ lại các @keyframes được tham chiếu bởi các class CSS xuất hiện ở màn hình đầu.
    keyframes: 'critical',
    // Bỏ qua các file CSS không cần thiết để Beasties xử lý nhanh hơn
    pruneSource: false
});

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