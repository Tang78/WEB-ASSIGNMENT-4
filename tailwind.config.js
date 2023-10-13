// module.exports = {
//     content: ["./public/**/*.html"], // specify the path to your .html files
//     darkMode: "media",
//     theme: {
//         extend: {},
//     },
//     plugins: [require("@tailwindcss/typography"), require("daisyui")],
//     daisyui: {
//         themes: ["fantasy"],
//     },
// };

/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./public/**/*.html", "./view/**/*.html"],
    darkMode: "media",
    theme: {
        extend: {
            fontFamily: {
                sans: ["Helvetica", "Arial", "sans-serif"],
            },
            colors: {
                primary: "#3490dc",
                secondary: "#ffed4a",
                // Add more custom colors if needed
            },
        },
    },
    plugins: [require("@tailwindcss/typography"), require("daisyui")],
    daisyui: {
        themes: ["fantasy"],
    },
};