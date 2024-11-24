/**
 * PostCSS configuration file.
 * 
 * This configuration file sets up PostCSS with the following plugins:
 * - tailwindcss: A utility-first CSS framework for rapid UI development.
 * - autoprefixer: A PostCSS plugin to parse CSS and add vendor prefixes to CSS rules using values from "Can I Use".
 * 
 * @module postcss.config
 * @property {Object} plugins - An object containing the PostCSS plugins.
 * @property {Object} plugins.tailwindcss - Configuration for the Tailwind CSS plugin.
 * @property {Object} plugins.autoprefixer - Configuration for the Autoprefixer plugin.
 */
module.exports = {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  };