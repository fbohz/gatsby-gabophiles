import React, {useEffect, useState} from 'react'
import styled from "styled-components"
import {Input, Button} from "./index"

const CommentForm = styled.form`
    display: flex;
    margin-top: 32px; 

    ${Input} {
        margin-right: 8px;
        margin-top: auto;
        margin-bottom: auto;
    }

    ${Button} {
        margin: auto 0;
    }
`

const CommentItem = styled.div`
    text-align: left;

    >strong {
        font-size: 80%;
        color: #666
    }

    border-bottom: 1px solid #ddd;
    padding: 4px 0;
`

export const BookComments = ({firebase, bookId}) => {
    const [comments, setComments] = useState([])
    const [text, setText] = useState('')

    useEffect(() => {
        const unsubscribe = firebase.subscribeToComments({
            bookId,
            onSnapshot: (snapshot) => {
                const snapShotComments = []
                // forEach provided by firebase NOT js
                snapshot.forEach(doc => {
                    snapShotComments.push({
                        id: doc.id,
                        ...doc.data()
                    })
                })
                setComments(snapShotComments)
            }
        })

        return () => {
            if (unsubscribe) unsubscribe()
        }
    }, [])

    const handleSubmit = (e) => {
        e.preventDefault()
        firebase.createComment({
            text,
            bookId
        })
    }

    return (
        <div>
            <CommentForm onSubmit={handleSubmit}>
                <Input 
                    value={text}
                    onChange={e => {
                        // e.persist needed when doing things async, not using synthetic event
                        e.persist()
                        setText(e.target.value)
                    }}
                />
                <Button type="submit">Add Comment</Button>
            </CommentForm>
            {comments.map(c => {
                return (
                    <CommentItem key={c.id}>
                    <strong>
                        {c.username}
                    </strong>
                    <div>
                        {c.text}
                    </div>
                    </CommentItem>
                )
            })}
        </div>
    )
}