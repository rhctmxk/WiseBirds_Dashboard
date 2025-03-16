/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./app/**/*.{js,ts,jsx,tsx}",  // Next.js 13+ App Router용
        "./pages/**/*.{js,ts,jsx,tsx}", // Pages Router용
        "./components/**/*.{js,ts,jsx,tsx}", // 컴포넌트 폴더
        "./src/**/*.{js,ts,jsx,tsx}", // src 폴더 전체 포함 (App Router 대응)
    ],
    theme: {
        extend: {
            colors: {
                primary: "#222222", // 대표 색상
                point: "#F25A29", // 포인트 색상
            },
        },
    },
    plugins: [],
}
