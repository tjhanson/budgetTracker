const express = require('express');
const router = express.Router();

const Board = require('../../schema/Board');
const List = require('../../schema/List');
const Card = require('../../schema/Card');


//GET All Boards
router.get('/boards/', (req, res) => {
  Board.find({
  })
  .then(boards => res.json(boards))
})


//GET Boards by name
router.get('/boards/:name', (req, res) => {
  Board.find({
    name: req.params.name
  })
  .then(boards => res.json(boards))
})

//GET Boards by year
router.get('/boards/byYear/:year', (req, res) => {
  Board.find({
    name: {$regex: req.params.year}
  })
  .then(boards => res.json(boards))
})

//update board
router.put('/boards/:id',(req, res, next) => {
  console.log(req.body)
  Board.findByIdAndUpdate(req.params.id, {
    $set: req.body
  }, (error, data) => {
    if (error) {
      return next(error);
      console.log(error)
    } else {
      res.json({_id:req.params.id,...req.body})
    }
  })
})

//GET Lists by boardId
router.get('/lists/:boardId', (req, res) => {
  List.find({
    boardId: req.params.boardId
  })
  .then(lists => res.json(lists))
})


//GET Cards by listId
router.get('/cards/:listId', (req, res) => {
  Card.find({
    listId: req.params.listId
  })
  .then(cards => res.json(cards))
})

//update card
router.put('/cards/:id',(req, res, next) => {
  console.log(req.body)
  Card.findByIdAndUpdate(req.params.id, {
    $set: req.body
  }, (error, data) => {
    if (error) {
      return next(error);
      console.log(error)
    } else {
      res.json({_id:req.params.id,...req.body})
    }
  })
})

//update list
router.put('/lists/:id',(req, res, next) => {
  console.log(req.body)
  List.findByIdAndUpdate(req.params.id, {
    $set: req.body
  }, (error, data) => {
    if (error) {
      return next(error);
      console.log(error)
    } else {
      res.json({_id:req.params.id,...req.body})
    }
  })
})

//add card
router.post('/cards', (req, res) => {
  console.log(req.body)
  const newTask = new Card(
    req.body
  );
  newTask.save()
  .then(card => res.json(card))

})

//add list
router.post('/lists', (req, res) => {
  console.log(req.body)
  const newTask = new List(
    req.body
  );
  newTask.save()
  .then(list => res.json(list))


  //add board
router.post('/boards', (req, res) => {
  console.log(req.body)
  const newBoard = new Board(
    req.body
  );
  newBoard.save()
  .then(b => res.json(b))

})
})

router.delete('/cards/:id', (req, res) => {
  Card.deleteOne({_id: req.params.id})
  .then(response => res.json(response))

})


router.get('/bylist', (req, res) => {
    
    var names = req.query.projects.split(',')
    console.log(names)
    Task.find({
        name: {$in:names}
       })
    .then(site => res.json(site))
})

router.get('/', (req, res) => {
    Task.find()
    .then(site => res.json(site))
})





module.exports = router;