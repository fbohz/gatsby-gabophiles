import React from 'react'
import Layout from "../components/layout"
import styled from 'styled-components'
import {BookItem} from '../components/BookItem'

const BookTemplate = (props) => {
    const {title, description, year} = props.pageContext
    return (
        <Layout>
            <BookItem>
                <h2>{title} - <small>{year}</small></h2>
                <p>{description}</p>
            </BookItem>
        </Layout>
    )
}

export default BookTemplate

