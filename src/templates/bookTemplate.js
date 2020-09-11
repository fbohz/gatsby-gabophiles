import React from 'react'
import Layout from "../components/layout"
import styled from 'styled-components'
import {BookItem} from '../components/BookItem'

const BookTemplate = (props) => {
    const {title, description, year, imageUrl } = props.pageContext
    return (
        <Layout>
            <BookItem title={title} description={description} year={year} imageUrl={imageUrl}/>
        </Layout>
    )
}

export default BookTemplate

