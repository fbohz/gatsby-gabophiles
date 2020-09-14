import React from "react"
import styled from "styled-components"

const BookItemWrapper = styled.section`
  background: white;
  border: 1px solid #ddd;
  padding: 8px;
  margin-bottom: 8px;
  /* display: flex; */
  h2 {
    small {
      font-weight: normal;
      padding-left: 8px;   
      font-size: 14px;
    }
  }
`

// const ImageWrapper = styled.img`
//     max-width: 200px;

//     img {
//         max-width: 200px; 
//     } 
// `

const ContentWrapper = styled.div`
    /* flex-grow: 1;
    padding-left: 8px; */
`

export const BookItem = ({ title, description, year, children, imageUrl, noSummary, authorName }) => {
  return (
    <BookItemWrapper>
        <h2>
            {title} - <small>{authorName} ({year})</small>
        </h2>
        <img src={imageUrl} alt="book cover" />
    <ContentWrapper>
        <p style={{textAlign: 'left'}}>{noSummary ? null : description}</p>
        <div>{children}</div>
    </ContentWrapper>
    </BookItemWrapper>
  )
}
