import React, {useContext} from 'react'
// import Layout from "../components/layout"
// import styled from 'styled-components'
import {BookItem} from '../components/BookItem'
import {BookComments} from '../components/common/index'
import { FirebaseContext } from '../components/Firebase'

const BookTemplate = (props) => {
    // console.log(props)
    const {title, description, year} = props.pageContext
    const imageUrl = props.pageContext.localImage.publicURL
    const authorName = props.pageContext.author.name

    const {firebase} = useContext(FirebaseContext)
    return (
        <section>
            <BookItem title={title} description={description} year={year} imageUrl={imageUrl}
                authorName={authorName}
            />
            {
            !!firebase && 
                <BookComments 
                    bookId={props.pageContext.id}
                    firebase={firebase}
                />
            }
        </section>
    )
}

export default BookTemplate

