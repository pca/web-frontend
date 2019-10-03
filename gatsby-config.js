module.exports = {
  siteMetadata: {
    title: `Philippine Cubers Association`,
    description: `The Philippine Cubers Association, also known as the Philippine Cube Association, is the WCA-recognized official national cubing organization of the Philippines.`,
    author: `@geocine`
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Philippine Cubers Association`,
        short_name: `PCA`,
        start_url: `/`,
        background_color: `#f6e05e`,
        theme_color: `#4dc0b5`,
        display: `standalone`,
        icon: `src/images/pca.png`
      }
    },
    {
      resolve: `gatsby-plugin-sass`,
      options: {
        postCssPlugins: [
          require(`tailwindcss`)(`./tailwind.config.js`)
        ]
      }
    },
    {
      resolve: `gatsby-plugin-purgecss`,
      options: {
        tailwind: true
      }
    },
    `gatsby-plugin-offline`
  ]
};
