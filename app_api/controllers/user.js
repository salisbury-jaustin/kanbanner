const mongoose = require('mongoose');
const User = mongoose.model('User');

const createUser = (req, res) => {
    User.create({
        user: req.body.user,
        password: req.body.password
    },
    (err, user) => {
        if (err) {
          res
            .status(400)
            .json(err);
        } else {
          res
            .status(201)
            .json(user);
        }
      });
}
const getUser = (req, res) => { 
    User 
        .find({user: req.params.user,
            password: req.params.password}) 
        .exec((err, user) => {
            if (user.length) {
                return res 
                    .status(200) 
                    .json(user);
            } else if (err) {
                return res 
                    .status(404) 
                    .json(err);
            } else {
                return res 
                .status(404) 
                .json({"message": "user not found"});
            }
        });
};
const checkUsername = (req, res) => {
    User
        .find({user: {$eq: req.params.user}})
        .exec((err, user) => {
            if (user.length) {
                return res
                    .status(200)
                    .json({
                        "userExists": true,
                        "message": "That username already exists."
                    })
            } else if (err) {
                return res  
                    .status(404)
                    .json(err)
            } else {
                return res  
                    .status(200) 
                    .json({
                        "userExists": false,
                        "message": ""
                    })
            }
        })
};
const editUser = (req, res) => {
    User 
    .updateOne(
        {user: req.body.user},
        {
            $set: {
                "user": req.body.newUser
            }
        }, 
        (err, list) => {
            if (err) {
              res
                .status(400)
                .json(err);
            } else {
              res
                .status(201)
                .json(list);
            }
          });
}

/* Start List */
const createLists = (req, res) => { 
    User 
        .update(
            {user: req.body.user},
            {
                $push: {
                    "lists":  
                        {
                            $each: req.body.lists
                        }
                }
            }, 
            (err, list) => {
                if (err) {
                  res
                    .status(400)
                    .json(err);
                } else {
                  res
                    .status(201)
                    .json(list);
                }
              });
};
const removeList = (req, res) => { 
    User 
        .update(
            {user: req.body.user},
            {
                $pull: {
                    "lists":  
                        {
                            "list": req.body.list
                        }
                }
            }, 
            (err, list) => {
                if (err) {
                  res
                    .status(400)
                    .json(err);
                } else {
                  res
                    .status(201)
                    .json(list);
                }
              });
};
/* End List */
/* Start Items */
const addItem = (req, res) => {
    User 
    .update(
        {
            user: req.body.user,
            "lists.list": req.body.list
        },
        {
            $push: {
                "lists.$.items": req.body.item 
            }
        }, 
        (err, list) => {
            if (err) {
              res
                .status(400)
                .json(err);
            } else {
              res
                .status(201)
                .json(list);
            }
          });
}
const removeItem = (req, res) => {
    User 
    .update(
        {
            user: req.body.user,
            "lists.list": req.body.list
        },
        {
            $pull: {
                "lists.$.items": req.body.item 
            }
        }, 
        (err, list) => {
            if (err) {
              res
                .status(400)
                .json(err);
            } else {
              res
                .status(201)
                .json(list);
            }
          });
}
const editItem = (req, res) => {
    User 
    .update(
        {
            user: req.body.user,
            "lists.list": req.body.list,
            "lists.$.items": req.body.prevItem
        },
        {
            $set: {
                "lists.$.items": req.body.newItem 
            }
        }, 
        (err, list) => {
            if (err) {
              res
                .status(400)
                .json(err);
            } else {
              res
                .status(201)
                .json(list);
            }
          });
}
const moveItem = (req, res) => {
    User 
    .update(
        {
            user: req.body.user,
            "lists.list": req.body.newList
        },
        {
            $push: {
                "lists.$.items": req.body.item 
            }
        }, 
        (err, list) => {
            if (err) {
              res
                .status(400)
                .json(err);
            } else {
                User 
                .update(
                    {
                        user: req.body.user,
                        "lists.list": req.body.prevList
                    },
                    {
                        $pull: {
                            "lists.$.items": req.body.item 
                        }
                    }, 
                    (err, list) => {
                        if (err) {
                          res
                            .status(400)
                            .json(err);
                        } else {
                          res
                            .status(201)
                            .json(list);
                        }
                      });
            }
          });
}
/* End Items */

module.exports = {
    createUser,
    getUser,
    checkUsername,
    editUser,
    createLists,
    removeList,
    addItem,
    removeItem,
    editItem,
    moveItem
}