import purgecss from '@fullhuman/postcss-purgecss';
import postcssImport from 'postcss-import';

const isProduction = process.env.NODE_ENV === 'production';

export default {
    plugins: [
        // 1. Gom tất cả các file CSS được import lại thành 1
        postcssImport(),

        ...(isProduction ?
            // 2. Chạy PurgeCSS để lọc class thừa
            purgecss({
                // Chỉ định các file chứa class HTML/Svelte cần quét
                content: [
                    './src/**/*.svelte',
                    './src/**/*.html',
                    './src/**/*.js',
                    './src/**/*.ts'
                ],

                // Quy tắc nhận diện tên class (regex chuẩn cho Svelte)
                defaultExtractor: (content) => content.match(/[\w-/:]+(?<!:)/g) || [],

                // SAFELIST: Giữ lại các class được thêm bằng JavaScript hoặc trạng thái động
                safelist: {
                    standard: [
                        'active',
                        'show',
                        'open',
                        /^is-/,      // Giữ lại tất cả class bắt đầu bằng "is-" (ví dụ: is-active)
                        /^has-/     // Giữ lại tất cả class bắt đầu bằng "has-"
                    ],
                    deep: [/modal/], // Giữ lại tất cả các class liên quan đến modal
                }
            })
        : [])
    ]
};