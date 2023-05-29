import React,{useState,useEffect} from "react";
import { Link } from "react-router-dom";
import MovieDataServices from "../services/movies";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card'


const MovieList = props => {
    const [movies,setMovies] = useState([])
    const [searchTitle,setSearchTitle] = useState("")
    const [searchRating,setSearchRating] = useState("")
    const [ratings,setRatings] = useState(["All Ratings"])
    const [currentPage,setCurrentPage] = useState(0)
    const [enteriesPerPage,setEnteriesPerPage] = useState(0)
    const [currentSearchMode,setCurrentSearchMode] = useState("")


    useEffect(() => {
        retrieveMovies()
        retrieveRatings()
    },[])

    useEffect(()=>{
        retrieveNextPage()
    },[currentPage])

    const retrieveNextPage=()=>{
        if (currentSearchMode === "findByTitle")
            findByTitle()
        else if (currentSearchMode === "findByRating")
            findByRating()
            else retrieveMovies()
        
    }
    useEffect(()=>{
        setCurrentPage(0)
    },currentSearchMode)

    const retrieveMovies = () => {
        setCurrentSearchMode("")
        MovieDataServices.getAll(currentPage)
        .then(response => {
            console.log(response.data)
            setMovies(response.data.movies)
            setCurrentPage(response.data.page)
            setEnteriesPerPage(response.data.entries_per_page)
        })
        .catch( e => {
            console.log(e)
        })
    }

    const retrieveRatings = () => {
        MovieDataServices.getRatings()
        .then( response => {
            console.log(response.data)
            setRatings(["All Ratings"].concat(response.data))
        })
        .catch( e => {
            console.log(e)
        })
    }

    const onChangeSearchTitle = (e) => {
        const searchTitle = e.target.value
        setSearchTitle(searchTitle)
    }

    const onChangeSearchRating = (e) => {
        const searchRating = e.target.value
        setSearchRating(searchRating)
    }
    const find=(query,by)=>{
        MovieDataServices.find(query,by,currentPage)
        .then(response=>{
            console.log(response.data)
            setMovies(response.data.movies)
        })
        .catch(e=>{
            console.log(e)
        })
    }

    const findByTitle=()=>{
        setCurrentSearchMode("findByTitle")
        find(searchTitle,"title")
       

    }

    const findByRating=()=>{
        setCurrentSearchMode("findByRating")
        if(searchRating === "All Ratings"){
            retrieveMovies()
        }else{
        find(searchRating,"rated")
        }
    }
    return(
        <div className="App">
           <Container>
                <Form>
                    <Row>
                    <Col>
                <Form.Group>
                    <Form.Control
                    type="text"
                    placeholder="Search by title"
                    onChange={onChangeSearchTitle}
                    
                    />
                </Form.Group>
                <Button
                variant="primary"
                type="button"
                onClick={findByTitle}
               
                >
                Search
                </Button>
                </Col>
                <Col>
                <Form.Group>
                <Form.Control
                as="select" onChange={onChangeSearchRating}>
                {ratings.map((rating,id) =>{
                return(
                <option value={rating} key={id}>{rating}</option>
                )
                })}
                </Form.Control>
                </Form.Group>
                <Button
                variant="primary"
                type="button"
                onClick={findByRating}
                
                >
                Search
                </Button>
                </Col>
                </Row>
                </Form>
                 <Row>      
                {movies.map((movie)=>{
                    return(
                        <Col>
                        <Card style={{width:'18rem'}}>
                            <Card.Img src={movie.poster+"/100px180"}/>
                            <Card.Body>
                                <Card.Title>{movie.title}</Card.Title>
                                <Card.Text>
                                    Rating:{movie.rated}
                                </Card.Text>
                                <Card.Text>{movie.plot}</Card.Text>
                                <Link to={"/movies/"+movie._id}>View Reviews</Link>
                            </Card.Body>
                        </Card>
                        </Col>
                    )
                })}
                </Row> 
                <br></br>
                Showing page:{currentPage}
                <Button onClick={()=>{setCurrentPage(currentPage+1)}} variant="link">Get next {enteriesPerPage} results</Button>
                </Container>
        </div>
    )
}

export default MovieList;