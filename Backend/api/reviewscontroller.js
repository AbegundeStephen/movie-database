import reviewsDao from '../dao/reviewsDao.js'

export default class reviewsController {
    static async apiPostReview(req,res,next) {
        try {
            const movieId = req.body.movie_id
            const review = req.body.review
            const userInfo = {
                name :req.body.name,
                _id: req.body.user_id
            }

            const date = new Date()
            const ReviewResponse = await reviewsDao.addReview(
                movieId,
                review,
                userInfo,
                date
            )
            res.json({status:"success"})
            return ReviewResponse
        }catch(e){
           res.status(500).json({error:e.message})
        }
    }

    static async apiUpdateReview(req,res,next) {

        try {
            const reviewId = req.body.review_id
            const review = req.body.review
            const date = new Date()

            const ReviewResponse = await reviewsDao.updateReview(
                reviewId,
                req.body._userid,
                review,
                date
            )
            var {error} = ReviewResponse
            if (error) {
                res.status.json({error})
            }

            if (ReviewResponse.modifiedCount === 0) {
                throw new error("unable to update review, user may not be original poster")
            }
            res.json({"status": "success"})
        }catch(e){
            res.status(500).json({error:e.message})        }
    }

    static async apiDeleteReview(req,res,next) {

        try {
            const reviewId = req.body.review_id
            const userId = req.body.user_id
            const ReviewResponse = await reviewsDao.deleteReview(

                reviewId,
                userId
            )
            res.json({"status":"success"})
        }catch(e){
            res.status(500).json({error:e.message})
        }
    }
}