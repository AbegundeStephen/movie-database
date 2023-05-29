import moviesDao from '../dao/moviesDao.js'

export default class moviesController{
    static async apiGetMovies(req,res,next){
        const moviesPerPage = req.query.moviesPerPage? parseInt(req.query.moviesPerPage) : 20
        const page = req.query.page? parseInt(req.query.page) : 0
        let filters = {}
        if(req.query.rated){
            filters.rated = req.query.rated

        }else if (req.query.title){
            filters.title = req.query.title
        }

        const {movieList,totalNumMovies} = await moviesDao.getMovies({
            filters,page,moviesPerPage
        })

        let response = {
            movies:movieList,
            page:page,
            filters:filters,
            entries_per_page:moviesPerPage,
            total_results : totalNumMovies
        }
        res.json(response)
    }

    static async apiGetMovieById(req,res,next) {
        
        try {
            let id = req.params.id || {}
            let movie = await moviesDao.getMovieById(id)
            if (!movie) {
                res.status(404).json({error:"Not Found"})
                return
            }
            res.json(movie)
        }catch(e){
            console.log(`api, ${e}`)
            res.status(500).json({error:e})
        }
    }

    static async apiGetMovieByRating(req,res,next){
            
        try {
            let propertyTypes = await moviesDao.getRating()
            res.json(propertyTypes)
        }catch(e){
            console.log(`api, ${e}`)
            res.status(500).json({error: e})
        }
    }
}