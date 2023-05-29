import express from 'express'
import cors from 'cors'
import router from './api/movieroutes.js'


const app = express();
app.use(express.json())
app.use(cors())
app.use(router)
app.use('*', (req,res)=>{
    res.status(404).json({error:'PAGE NOT FOUND'})
})

export default app;
