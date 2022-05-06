import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Spinner from './Spinner';


function AdminPage(props) {
    const host = "http://localhost:5000";
    // const host="https://bookskart-ak.herokuapp.com";
    
    const [loading, setLoading] = useState(true);
    const [books, setBooks] = useState([])
    // Get all Books
    const getBooks = async () => {
        // API Call 
        const response = await fetch(`${host}/fetchbooks`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                "admin-id": localStorage.getItem('admin-token')
            }
        });
        const json = await response.json()
        setBooks(json);
        setLoading(false);
    }
    let navigate = useNavigate();
    useEffect(() => {
        if (localStorage.getItem('admin-token')) {
            document.title = "BooksKart-Admin";
            getBooks();
        }
        else {
            navigate('/adminlogin');
            props.showAlert('Please Login First', 'danger');
        }
        // eslint-disable-next-line
    }, [])

    // Add Book
    const [newbook, setNewbook] = useState({ name: "", author: "", year: "" })
    const onChange = (e) => {
        setNewbook({ ...newbook, [e.target.name]: e.target.value })
    }

    const handleClick = (e) => {
        e.preventDefault();
        addBook(newbook.name, newbook.author, newbook.year);
        setNewbook({ name: "", author: "", year: "" })
    }
    const addBook = async (name, author, year) => {
        const response = await fetch(`${host}/addbook`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                "admin-id": localStorage.getItem('admin-token')
            },
            body: JSON.stringify({ name, author, year })
        });
        const json = await response.json();
        if (json.success) {
            setBooks(books.concat(json.savedBook));
            props.showAlert("Book Added!", "success");
        }
        else {
            props.showAlert("Book already Present!", "danger");
        }
    }
    // Delete a Note
    const deleteBook = async (id) => {
        // API Call
        const response = await fetch(`${host}/deletebook/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                "admin-id": localStorage.getItem('admin-token')
            }
        });
        const json = response.json();
        const newBooks = books.filter((note) => { return note._id !== id })
        setBooks(newBooks)
        props.showAlert("Deleted Successfully", 'success');
    }
    // Increase Book
    const increaseBook = async (id) => {
        // API Call
        const response = await fetch(`${host}/increasebook/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                "admin-id": localStorage.getItem('admin-token')
            }
        });
        const json = response.json();
        // // Logic to edit in client
        for (let i = 0; i < books.length; i++) {
            const element = books[i];
            if (element._id === id) {
                books[i].Quantity++;
                break;
            }
        }
        setBooks(books);
        props.showAlert("Books Updated", 'success');
    }
    const decreaseBook = async (id) => {
        // API Call
        const response = await fetch(`${host}/decreasebook/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                "admin-id": localStorage.getItem('admin-token')
            }
        });
        const json = response.json();
        // // Logic to edit in client
        for (let i = 0; i < books.length; i++) {
            const element = books[i];
            if (element._id === id) {
                books[i].Quantity--;
                break;
            }
        }
        setBooks(books);
        props.showAlert("Books Updated", 'success');
    }
    return (
        <>
            <div className="container my-1">
                <h1 className='text-center'>Book-Kart Adminstration</h1>
                <hr />
                <form id="libraryForm">
                    <div className="form-group row">
                        <label htmlFor="bookName" className="col-sm-2 col-form-label">Name</label>
                        <div className="col-sm-10">
                            <input type="text" className="form-control" name="name" value={newbook.name} onChange={onChange} placeholder="Book Name" />
                        </div>
                    </div>
                    <div className="form-group row">
                        <label htmlFor="Author" className="col-sm-2 col-form-label">Author</label>
                        <div className="col-sm-10">
                            <input type="text" className="form-control" name="author" value={newbook.author} onChange={onChange} placeholder="Author" />
                        </div>
                    </div>
                    <div className="form-group row">
                        <label htmlFor="Author" className="col-sm-2 col-form-label">Published Year</label>
                        <div className="col-sm-10">
                            <input type="number" className="form-control" name="year" value={newbook.year} onChange={onChange} placeholder="Published Year" />
                        </div>
                    </div>

                    <div className="form-group row">
                        <div className="col-sm-10">
                            <button type="submit" disabled={newbook.name.length < 2 || newbook.author.length < 2} onClick={handleClick} className="btn btn-primary">Add Book</button>
                        </div>
                    </div>
                </form>
                {loading ? <Spinner /> :
                    <div id="table">
                        {books.length === 0 ? <h2 className='container text-center'>There are no Books Please Add some</h2> :
                            <h2 className='text-center'>Availabe Books</h2>}
                        <table className="table table-striped">
                            <thead>
                                <tr>
                                    <th scope="col">Name</th>
                                    <th scope="col">Author</th>
                                    <th scope="col">Year Published</th>
                                    <th scope="col">Copies</th>
                                </tr>
                            </thead>
                            <tbody id='tableBody'>
                                {books.map((book) => {
                                    return <tr>
                                        <td>{book.name}</td>
                                        <td>{book.author}</td>
                                        <td>{book.yearPublished}</td>
                                        <td>
                                            {book.Quantity <= 0 ? <>&#160;&#160;</> : <i class="fa fa-minus fa-xs" aria-hidden="true" onClick={() => {
                                                decreaseBook(book._id);
                                                props.showAlert("Books Updated", 'success');
                                            }}></i>}
                                            &#160;{book.Quantity}&#160;
                                            <i class="fa fa-plus fa-xs" aria-hidden="true" onClick={() => {
                                                increaseBook(book._id);
                                            }}></i>
                                        </td>
                                        <td><i className="far fa-trash-alt mx-2" onClick={() => {
                                            deleteBook(book._id);
                                        }}></i></td>
                                    </tr>
                                })}
                            </tbody>
                        </table>
                    </div>
                }
            </div>
        </>
    )
}

export default AdminPage