import mongoose from 'mongoose'
const objectId = mongodb.ObjectId

//movies dao to be first imported in index.js

let movies  //initialize the empty movies variable

export default class moviesDao {
    static async injectDB(conn) { // inject the mongodb database method 
        if (movies){
            return  // return if there is a movie collection already in our mongodb.
        }

        try {  // otherwise try and connect to the database directly and to the prescribed colllection ('movies')
            movies = await conn.db(process.env.MOVIEREVIEW_NS).collection('movies')
        }catch(e){
            console.error(`Unable to connect in moviesDao ${e}`)
        }  //log the error to the console if the above connection attempt fails
    }
//Now assuming we have successfuly established a connection to 
//the collection in the database,let us now write an asynchronous function that would
// retrieve the contents of the desired collection.


    static async getMovies({
        // initialise the default filters
        filters = null,
        page = 0,
        moviesPerPage = 5 // only get 20 movies per page.

    } = {} ){
        // initialise our query parameter or variable
        let query
        if (filters){
            if ("title" in filters){
                query = { $text: { $search: filters['title']}}
            }else if ("rated" in filters){
                query = { $rated: {$eq : filters['_rated']}}
            }
        }

        // initialize our cursor parameter
        let cursor 
        try {
            cursor = await movies
            .find(query)
       }catch(e){
            console.error(`Unable to issue find command $(e)`)
            return {movieList:[], totalNumMovies:0}
        }

        const displayCursor = cursor.limit(moviesPerPage).skip(moviesPerPage*page)
        try {
           const movieList = await displayCursor.toArray()
           const totalNumMovies = await movies.countDocuments(query)
           return {movieList,totalNumMovies}
        }
        catch(e) {
            console.error(`Unable to convert cursor to array or problem counting document ${e}`)
            return{movieList:[],totalNumMovies:0}
        }
    }

    static async getRating(){
        let ratings = []

        try {
            ratings = await movies.distinct("rated")
            return ratings
        }catch(e){
            console.error(`Unable to get rating: ${e}`)
            return ratings
        }
    }

    static async getMovieById(id) {
        
        try {
            return await movies.aggregated([
                {
                    $match: {
                        _id:new objectId(id)
                    }
                },
                {$lookup: {
                    from:'reviews',
                    localField:'_id',
                    foreignField:'movie_id',
                    as:'reviews'
                }}
            ]).next()
        }catch(e){
            console.error( `Something went wrong in getMovieById: ${e}`)
            throw e
        }
    }
}




