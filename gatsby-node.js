/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

 const path = require('path')
 const bookTemplate = path.resolve('src/templates/bookTemplate.js')



// Gatsby uses Redux under the hood 

exports.createPages = ({graphql, actions}) => {
    const {createPage} = actions

    // this is a promise
    return graphql(`
    {
        allBook {
        edges {
          node {
            id
            description
            title
            year
            imageUrl
            author {
              name
            }
          }
        }
      }
      }
    `).then(res => {
        if (res.errors) {
            throw res.errors;
        }

        const books = res.data.allBook.edges
        books.forEach(book => (
            createPage({
                path: `/book/${book.node.id}`,
                component: bookTemplate,
                context: book.node
            })
          ))
    })
}
