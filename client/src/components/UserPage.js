import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Spinner from './Spinner';


function UserPage(props) {
    const host = "http://localhost:5000";

    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");
    const onChange = (e) => {
        setSearch(e.target.value);
    }
    const [books, setBooks] = useState([])
    // Get all Books
    const getBooks = async () => {
        // API Call 
        const response = await fetch(`${host}/fetchbook`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
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
    // Get Search Result
    const handleClick = async (e) => {
        e.preventDefault();
        const response = await fetch(`${host}/fetchbook/${search}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const json = await response.json();
        setSearch("");
        setBooks(json);
    }
    const descreaseBook = async (id) => {
        // API Call
        const response = await fetch(`${host}/decreasebook/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const json = response.json();
        // // Logic to edit in client
        for (let i = 0; i < books.length; i++) {
            const element = books[i];
            if (element._id === id) {
                books[i].Quantity--;
                if (books[i].Quantity === 0) {
                    books.splice(i, 1);
                }
                break;
            }
        }
        setBooks(books);
    }
    const [userBooks, setuserBooks] = useState([])

    const buybook = async (id, name, author, year) => {
        // API Call
        const response = await fetch(`${host}/buybook/${id}/${name}/${author}/${year}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                "user-id": localStorage.getItem('user-token')
            }
        });
        const json = await response.json();
        if (json.success) {
            setuserBooks(userBooks.concat(json.savedBook));
            descreaseBook(id);
            props.showAlert("Book Purchased Successfully", 'success');
        }
        else {
            props.showAlert("Book Already Purchased", 'danger');
        }
    }

    return (
        <>
            <div className="container my-1">
                {loading ? <Spinner />:<>
                {books.length === 0 ? <h2 className='container text-center'>No Books Available</h2> :
                    <h2 className='text-center'>Books Available</h2>}
                <form class="d-flex">
                    <input class="form-control me-2" type="search" name="seacch" value={search} onChange={onChange} placeholder="Search Books by Name , Author , PublishedYear" aria-label="Search" />
                    <button class="btn btn-outline-success" onClick={handleClick} type="submit">Search</button>
                </form>
                <hr />
                <div className='container row'>
                    {books.map((book) => (
                        <div className="col-md-4">
                            <div className="my-3">
                                <div className="" style={{ width: '15rem' }}>
                                    <img src="https://cdn.picpng.com/book/pattern-book-30960.png" style={{ width: '10rem' }} class="card-img-top" alt="book" />
                                    <div class="card-body">
                                        <h5 class="card-title">{book.name}</h5>
                                        <p class="card-text"><b>By : </b>{book.author}</p>
                                        <p class="card-text"><b>Year Published : </b>{book.yearPublished}</p>
                                        <p class="card-text"><b>Copies Available : </b>{book.Quantity}</p>
                                        <b onClick={() => {
                                            buybook(book._id, book.name, book.author, book.yearPublished);
                                        }} class="btn btn-primary">Buy</b>
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

export default UserPage