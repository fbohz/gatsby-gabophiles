import React from 'react'
import Layout from "../components/layout"
// import styled from 'styled-components'
import {BookItem} from '../components/BookItem'

const BookTemplate = (props) => {
    const {title, description, year} = props.pageContext
    console.log(props.pageContext)
    const imageUrl = props.pageContext.localImage.publicURL
    const authorName = props.pageContext.author.name
    return (
        <Layout>
            <BookItem title={title} description={description} year={year} imageUrl={imageUrl}
                authorName={authorName}
            />
        </Layout>
    )
}

export default BookTemplate

