import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Spinner from './Spinner';

function UserBooks(props) {

    const [loading, setLoading] = useState(true);
    const [books, setBooks] = useState([])
    // Get all Books
    const getBooks = async () => {
        // API Call 
        const response = await fetch(`${props.host}/fetchuserbook`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                "user-id": localStorage.getItem('user-token')
            }
        });
        const json = await response.json();
        setBooks(json);
        setLoading(false);
    }
    let navigate = useNavigate();
    useEffect(() => {
        if (localStorage.getItem('user-token')) {
            getBooks();
        }
        else {
            navigate('/userlogin');
            props.showAlert('Please Login First', 'danger');
        }
        // eslint-disable-next-line
    }, [])

    return (
        <>
            <div className="container my-1">
                {loading ? <Spinner /> : <>
                    {books.length === 0 ? <h2 className='container text-center'>No Books Available</h2> :
                        <h2 className='text-center'>Your Books</h2>}
                    <hr />
                    <div className='container row'>
                        {books.map((book) => (
                            <div className="col-md-4" key={book._id}>
                                <div className="my-3">
                                    <div className="" style={{ width: '15rem' }}>
                                        <img src="https://cdn.picpng.com/book/pattern-book-30960.png" style={{ width: '10rem' }} className="card-img-top" alt="book" />
                                        <div className="card-body">
                                            <h5 className="card-title">{book.name}</h5>
                                            <p className="card-text"><b>By : </b>{book.author}</p>
                                            <p className="card-text"><b>Year Published : </b>{book.yearPublished}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </>}
            </div>
        </>
    )
}

export default UserBooks