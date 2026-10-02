import defaultTheme from 'tailwindcss/defaultTheme';
import forms from '@tailwindcss/forms';

/** @type {import('tailwindcss').Config} */
export default {
    content: [
        './vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php',
        './storage/framework/views/*.php',
        './resources/views/**/*.blade.php',
        './resources/js/**/*.tsx',
    ],

    theme: {
        extend: {
            fontFamily: {
                sans: ['"Lato"', ...defaultTheme.fontFamily.sans],
                heading: ['"Faculty Glyphic"', ...defaultTheme.fontFamily.serif],
            },
            colors: {
                nvet: {
                    dark: '#4A2810',
                    primary: '#8E593C',
                    light: '#E5C3A6',
                    cream: '#F6E5D5',
                    bg: '#FBF6EE',
                    text: '#1C1917',
                    green: {
                        DEFAULT: '#4A6B53',
                        hover: '#3C5743',
                        light: '#E9EFEA',
                    }
                },
            },
        },
    },

    plugins: [forms],
};
