module.exports = {
  siteMetadata: {
    title: `Gabophiles: Gabriel Garcia Marquez Works`,
    description: `All you need to know about the magic realism of Gabo`,
    author: `Felipe Bohorquez`,
  },
  plugins: [
    {
      resolve: 'gatsby-firesource',
      options: {
        credential: require('./firebase.json'),
        types: [
          {
            type: 'Book',
            collection: 'books',
            map: doc => ({
              title: doc.title,
              summary: doc.summary,
              description: doc.description,
              year: doc.year,
              author___NODE: doc.author.id
            })
          },
          {
            type: 'Author',
            collection: 'authors',
            map: doc => ({
              name: doc.name
            })
          } 
        ]
      }
    },
    `gatsby-plugin-styled-components`,
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `gatsby-starter-default`,
        short_name: `starter`,
        start_url: `/`,
        background_color: `#663399`,
        theme_color: `#663399`,
        display: `minimal-ui`,
        icon: `src/images/gatsby-icon.png`, // This path is relative to the root of the site.
      },
    },
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
  ],
}
