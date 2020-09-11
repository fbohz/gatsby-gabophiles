import React from "react"
import styled from "styled-components"

const BookItemWrapper = styled.section`
  background: white;
  border: 1px solid #ddd;
  padding: 8px;
  margin-bottom: 8px;
  h2 {
    small {
      font-weight: normal;
      padding-left: 8px;   
      font-size: 14px;
    }
  }
`

export const BookItem = ({ title, description, year, children }) => {
  return (
    <BookItemWrapper>
      <h2>
        {title} - <small>{year}</small>
      </h2>
      <p>{description}</p>
      <div>{children}</div>
    </BookItemWrapper>
  )
}
