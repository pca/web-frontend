module.exports = {
  siteMetadata: {
    title: `Pinoy Cubers Association`,
    description: `The Philippine Cubers Association, also known as the Philippine Cube Association, is the WCA-recognized official national cubing organization of the Philippines.`,
    author: `@geocine`
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `@pinoycubers/web-frontend`,
        short_name: `Pinoy Cubers Association`,
        start_url: `/`,
        background_color: `#ffffff`,
        theme_color: `#4dc0b5`,
        display: `minimal-ui`,
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
