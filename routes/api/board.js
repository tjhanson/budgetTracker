const express = require('express');
const router = express.Router();

const Board = require('../../schema/Board');
const List = require('../../schema/List');
const Card = require('../../schema/Card');



//GET Boards by userId
router.get('/boards/:userId', (req, res) => {
  Board.find({
    userId: req.params.userId
  })
  .then(boards => res.json(boards))
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

//add card
router.post('/cards', (req, res) => {
  console.log(req.body)
  const newTask = new Card(
    req.body
  );
  newTask.save()
  .then(card => res.json(card))

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