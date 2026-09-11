import { sequence } from '@sveltejs/kit/hooks';
// import { handleAuth } from './hooks/auth';
import { handleCriticalCss } from './hooks/critical-css';

// Chuỗi xử lý sẽ chạy từ trái sang phải: Auth -> Critical CSS
export const handle = sequence(handleAuth, handleCriticalCss);