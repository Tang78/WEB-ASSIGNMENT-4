/********************************************************************************
* WEB322 – Assignment 04 *
* I declare that this assignment is my own work in accordance with Seneca's
* Academic Integrity Policy: *
* https://www.senecacollege.ca/about/policies/academic-integrity-policy.html *
* Name: _____Orang Tang Enow_________________ Student ID: _149924219_____________ Date: ______11/04/2023________ *
* Published URL: _https://cute-gold-caterpillar-cuff.cyclic.app__________________________________________________________
* ********************************************************************************/


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
    content: [`./views/**/*.ejs`],
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