import React, {useContext, useEffect, useState} from 'react';
import {FirebaseContext} from '../components/Firebase';
import {Form, Input, Button} from '../components/common/index';
import styled from 'styled-components';

const FormField = styled.div`
  margin-bottom: 20px;
`

// refactor NO file upload rather imageUrl
// let fileReader;
// if(typeof window !== 'undefined'){
//   fileReader = new FileReader();
// }

const AddBook = () => {
  const {firebase} = useContext(FirebaseContext);
  const [authors, setAuthors] = useState([]);
  const [imageUrl, setImageUrl] = useState('');
  const [bookName, setBookName] = useState('');
  const [authorId, setAuthorId] = useState('');
  const [description, setDescription] = useState('');
  const [success, setSuccess] = useState(false);
  const [year, setYear] = useState('');
  
  // FIXING: Can't perform a React state update on an unmounted component
  let isMounted = true;

  useEffect(() => {
    return () => {
      isMounted = false;
    }
  }, [])

  // file upload use effect
//   useEffect(() => {
//     fileReader.addEventListener('load', () => {
//       setImageUrl(fileReader.result);
//     })
//   }, []);

  useEffect(() => {
    // query all available authors
    if(firebase) {
      firebase.getAuthors().then(snapshot => {
        if(isMounted) {
          const availableAuthors = [];
          snapshot.forEach(doc => {
            availableAuthors.push({
              id: doc.id,
              ...doc.data()
            })
          })

          setAuthorId(availableAuthors[0].id);

          setAuthors(availableAuthors);
        }
      })
    }
  }, [firebase])

  return (
    <Form onSubmit={(e) => {
      e.preventDefault();
      firebase.createBook({
        imageUrl,
        bookName,
        authorId,
        description,
        year
      }).then(() => {
        if(isMounted) {
          setSuccess(true)
        }
      })
    }}>
      <FormField>
        <Input placeholder="book name" value={bookName} onChange={e => {
          e.persist();
          setSuccess(false);
          setBookName(e.target.value)
        }} required />
      </FormField>
      <FormField>
        <strong>
          Author
        </strong>
        <div>
          <select value={authorId} onChange={e => {
            e.persist();
            setSuccess(false);
            setAuthorId(e.target.value)
          }}>
            {authors ? authors.map(a => (
              <option key={a.id} value={a.id}>
                {a.name}
              </option> 
            )) : <option disabled>...loading</option>
            }
          </select> 
        </div>
      </FormField>
      <FormField>
        <strong>
          Image URL
        </strong>
        {/* <Input type="file" onChange={e => {
          e.persist();
          setSuccess(false);
          fileReader.readAsDataURL(e.target.files[0])
        }} /> */}
        <Input type="url" placeholder="add image URL" value={imageUrl} onChange={e => {
          e.persist();
          setSuccess(false);
          setImageUrl(e.target.value)
        }} required />
      </FormField>
      <FormField>
        <strong>
          year
        </strong>
        <Input type="number" placeholder="book year" value={year}
          min={1900}
          max={new Date().getFullYear()}
          onChange={e => {
            e.persist();
            setSuccess(false);
            setYear(e.target.value)
          }} required/>
      </FormField>
      <FormField>
        <strong>
          description
        </strong>
        <Input placeholder="book description" value={description}
          onChange={e => {
            e.persist();
            setSuccess(false);
            setDescription(e.target.value)
          }} required/>
      </FormField>
      {!!success &&
        <span>
          New book added successfully!
        </span>
      }
      <Button block type="submit">
        Add new book
      </Button>
    </Form>
  );
}

export default AddBook;