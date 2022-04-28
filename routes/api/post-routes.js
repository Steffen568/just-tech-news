// import express and Post/User models
const router = require('express').Router()
const { Post, User } = require('../../models')


// get all posts
router.get('/', (req, res) => {
    console.log('=================')
    Post.findAll({
        attributes: ['id', 'post_url', 'title', 'created_at'],
        order: [['created_at', 'DESC']],
        include: [
            {
                model: User,
                attributes: ['username']
            }
        ]
    })
    .then(dbPostData => res.json(dbPostData))
    .catch(err => {
        console.log(err)
        res.status(500).json(err)
    })
})

// get post by id
router.get('/:id', (req, res) => {
    Post.findOne({
        where: {
            id: req.params.id
        },
        attributes: ['id', 'post_url', 'title', 'created_at'],
        include: [
            {
                model: User,
                attributes: ['username']
            }
        ]
    })
        .then(dbPostData => {
            if(!dbPostData) {
                res.status(404),json({ message: 'no post found with this id'})
                return
            }
            res.json(dbPostData)
        })
        .catch(err => {
            console.group(err)
            res.status(500).json(err)
        })
})

// create a new post
router.post('/', (req, res) => {
    // exprects title , post url , user id
    Post.create({
        title: req.body.title,
        post_url: req.body.post_url,
        user_id: req.body.user_id,
    })
        .then(dbPostData => res.json(dbPostData))
        .catch(err => {
            console.log(err)
            res.status(500).json(err)
        })
})

//  update existing post
router.put('/:id', (req, res) => {
    Post.update(
        {
            title: req.body.title
        },
        {
            where: {
                id: req.params.id
            }
        }
    )
        .then(dbPostData => {
            if(!dbPostData) {
                res.status(400).json({ message: 'no post found with this id' })
                return
            }
            res.json(dbPostData)
        })
        .catch(err => {
            console.log(err)
            res.status(500).json(err)
        })
})

// delete post
router.delete('/:id', (req, res) => {
    Post.destroy({
        where: {
            id: req.params.id
        }
    })
        .then(dbPostData => {
            if (!dbPostData) {
                res.status(400).json({ message: 'no post found with this id' })
                return
            }
        })
        .catch(err => {
            console.log(err)
            res.status(500).json(err)
        })
})

module.exports = router