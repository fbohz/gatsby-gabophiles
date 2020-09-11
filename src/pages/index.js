import React from "react"
import { Link, graphql } from "gatsby"
import {BookItem} from '../components/BookItem'

import Layout from "../components/layout"
// import Image from "../components/image"
// import SEO from "../components/seo"

const IndexPage = (props) => {
  const edges = props.data.allBook.edges
  return (
    <Layout>
      {
        edges.map(edge => (
          <BookItem key={edge.node.id}>
            <h2>{edge.node.title} - <small>{edge.node.author.name}</small></h2>
            <div>{edge.node.description}</div>
          <Link to={`/book/${edge.node.id}`}>Join Conversation
          </Link>
          </BookItem>
          
        ))
      }
    </Layout>
    )
}

export default IndexPage

// Gatsby will read this query and inject result as props to Gattsby component
export const query = graphql`
  {
    allBook {
    edges {
      node {
        id
        description
        title
        year
        author {
          name
        }
      }
    }
  }
  }
`;