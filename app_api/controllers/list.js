const mongoose = require('mongoose');
const User = mongoose.model('User');

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
/*
const addItem = (req, res) => {
    User 
        .update(
            {user: req.body.user},
            {
                $push: {
                    {``}
                }
            } 
        )
}
*/
module.exports = {
    createLists,
    addItem,
}