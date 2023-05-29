import app from './server.js'
import mongodb from 'mongodb'
import dotenv from 'dotenv'
import moviesDao from './dao/moviesDao.js'
import reviewsDao from './dao/reviewsDao.js'



async function main(){
    dotenv.config()

    const client = new mongodb.MongoClient(
    process.env.MOVIEWREVIEWS_DB_URI
    )
    const port = process.env.PORT || 3000

    try {
        await client.connect()
        await moviesDao.injectDB(client)
        await reviewsDao.injectDB(client)
       console.log("connection to the mongodb data base successfully established")
        app.listen(port,() => {
            console.log(`Listening on port: ${port}`)
        })
    }
catch(e){
    console.error(e)
    process.exit(1)
}
}

main().catch(console.error)
