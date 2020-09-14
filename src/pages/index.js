import React from "react"
import { Link, graphql } from "gatsby"
import {BookItem} from '../components/BookItem'
import styled from "styled-components"


// import Layout from "../components/layout"
// import Image from "../components/image"
// import SEO from "../components/seo"

const LinkButton = styled.div`
  /* text-align: left; */

  a {
    padding: 8px;
    background: rebeccapurple;
    color: white;
    border-radius: 8px;
    text-decoration: none;

    &:hover {
      background: indigo;
    }
  }
`

const IndexPage = (props) => {
  const edges = props.data.allBook.edges.sort((a,b) => a.node.year - b.node.year)
  return (
    <section>
      {
        edges.map(edge => (
          <BookItem 
            key={edge.node.id}
             title={edge.node.title}
             description={edge.node.description}
             year={edge.node.year}
             imageUrl={edge.node.localImage.publicURL}
             noSummary={true}
             authorName={edge.node.author.name}
          >
          <LinkButton>
          <Link to={`/book/${edge.node.id}`}>Learn More
          </Link>
          </LinkButton>
          </BookItem>
          
        ))
      }
    </section>
    )
}

export default IndexPage

// // Gatsby will read this query and inject result as props to Gatsby component

// with Author name
export const query = graphql`
  {
    allBook {
    edges {
      node {
        id
        description
        title
        localImage {
          publicURL
        }
        year
        author {
          name
        }
      }
    }
  }
  }
`;