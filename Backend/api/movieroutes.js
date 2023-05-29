//to be first imported in server.js
import express from 'express'
import moviesController from './moviescontroller.js'
import reviewsController from './reviewscontroller.js'

const router = express.Router()
router.route('/api/v1/movies').get(moviesController.apiGetMovies)
router.route("/api/v1/movies/id/:id").get(moviesController.apiGetMovieById)
router.route('/api/v1/movies/ratings').get(moviesController.apiGetMovieByRating)
router.route('/api/v1/movies/review')
.post(reviewsController.apiPostReview)
.put(reviewsController.apiUpdateReview)
.delete(reviewsController.apiDeleteReview)



 export default router;
