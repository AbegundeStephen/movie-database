import mongodb from 'mongodb'

const objectId = mongodb.ObjectId

let reviews

export default class reviewsDao {
    static async injectDB(conn) {
        if (reviews) {
            return
        } 

        try {
            reviews = await conn.db(process.env.MOVIEREVIEWS_NS).collection("reviews")
        }catch(e) {
            console.error(`Unable to establish connection handle in reviewsDAO ${e}`)
        }

    }

    static async addReview(movieId,review,user,date) {
      try {
        const reviewDoc = {
            name:user.name,
            user_id : user._id,
            review:review,
            date:date,
            movie_id:objectId(movieId)

         
        }
        return await reviews.insertOne(reviewDoc)
      }catch(e){
        console.error(`Unable to post review ${e}`)
        return { error: e }
      }
    }

    static async updateReview(reviewId,userId,review,date) {

        try {
               const updateResponse = await reviews.updateOne(
                { user_id:userId, id:objectId(reviewId)},
                {$set:{review:review,date:date}}
                ) 
                return updateResponse;
        }catch(e){
            console.error(`Unable to update review: ${e}`)
            return {error: e}
        }
    }

    static async deleteReview(reviewId,userId) {

        try {
            const deleteResponse = await reviews.deleteOne({
                _id:objectId(reviewId),
                user_id:userId
            })
            return deleteResponse
        }catch(e){
            console.error(`Unable to delete reponse: ${e}`)
            return {error: e}
        }
    }


}