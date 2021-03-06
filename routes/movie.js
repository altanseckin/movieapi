const express = require('express');
const router = express.Router();
//models
const Movie =require("../models/Movie");

router.get('/',(req,res)=>{
  const promise = Movie.find({ })
  promise.then((data)=>{
    res.json(data)
  }).catch((err)=>{
    res.json(err)
  })
})

router.get('/:movie_id',(req,res,next)=>{
  if(!movie)
    next({message:'The movie was not found'})
  const promise = Movie.findById(req.params.movie_id)
  promise.then((movie)=>{
    res.json(movie)
  }).catch((err)=>{
    res.json(err)
  })
})

router.put('/:movie_id',(req,res,next)=>{
  if(!movie)
    next({message:'The movie was not found'})
  const promise = Movie.findByIdAndUpdate(req.params.movie_id,req.body)
  promise.then((movie)=>{
    res.json(movie)
  }).catch((err)=>{
    res.json(err)
  })
})

router.post('/', (req, res, next) => {
  const {title, imdb_score, category, country, year} = req.body;
  
  const movie = new Movie (req.body)
  const promise = movie.save()
  
  promise.then((data)=>{
    res.json({status:1})
  }).catch((err)=>{
    res.json(err)
  })
})

 module.exports = router;