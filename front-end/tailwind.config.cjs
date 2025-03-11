/** @type {import('tailwindcss').Config} */
/**
 * Tailwind CSS configuration file.
 * 
 * This configuration file is used to customize the Tailwind CSS framework
 * for the project. It specifies the paths to all of the template files
 * in the project, so Tailwind can tree-shake unused styles in production builds.
 * 
 * @type {import('tailwindcss').Config}
 * 
 * @property {Array<string>} content - An array of file paths or glob patterns
 * that Tailwind CSS should scan for class names.
 * 
 * @property {Object} theme - An object used to extend the default Tailwind CSS theme.
 * 
 * @property {Array} plugins - An array of plugins to be used with Tailwind CSS.
 */
export default {
  content: [
    './index.html',
    './src/**/*.{html,cjs,js,jsx,ts,tsx}', // Adjust the paths according to your project structure
  ],
  theme: {
    extend: {
      fontFamily: {
        Roboto: ['Roboto','sans-serif'],
        Inter: ['Inter','sans-serif'],
      },
      margin:{
        marginLeft: '4.5rem',
      }
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}

