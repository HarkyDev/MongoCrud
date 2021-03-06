const { User, Thought } = require ("../models");

//gather all users
const userController = {
    getUsers(req,res){
        User.find()
        .select("-__v").then((usersData) => {
            res.json(usersData);
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json(err);
        })
    },
    
    //make a new user
    createUser(req, res) {
        User.create(req.body)
          .then((dbUserData) => {
            res.json(dbUserData);
          })
          .catch((err) => {
            console.log(err);
            res.status(500).json(err);
          });
      },
      //update a user
      updateUser(req, res) {
        User.findOneAndUpdate(
          { _id: req.params.userId },
          {
            $set: req.body,
          },
          {
            runValidators: true,
            new: true,
          }
        )
          .then((userData) => {
            if (!userData) {
              return res.status(404).json({ message: 'No USER with this ID' });
            }
            res.json(userData);
          })
          .catch((err) => {
            console.log(err);
            res.status(500).json(err);
          });
      },
      //get single user by their ID
      getUser(req,res){
        User.findOne({ _id: req.params.userId })
      .select('-__v')
      .populate('friends')
      .populate('thoughts')
      .then((userData) => {
        if (!userData) {
          return res.status(404).json({ message: 'No USER with this ID' });
        }
        res.json(userData);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
      },
      deleteUser(req,res){
        User.findOneAndDelete({ _id: req.params.userId })
        .then((dbUserData) => {
          if (!dbUserData) {
            return res.status(404).json({ message: 'No USER with this ID!' });
          }
        }).catch((err) => {
          console.log(err);
          res.status(500).json(err);
        });
        //DEL is slow and has delay issue when running request but does DEL 
        
      },
      //can add friends through URL
      addFriend(req, res) {
        User.findOneAndUpdate({ _id: req.params.userId }, { $addToSet: { friends: req.params.friendId } }, { new: true })
          .then((dbUserData) => {
            if (!dbUserData) {
              return res.status(404).json({ message: 'No user with this id!' });
            }
            res.json(dbUserData);
          })
          .catch((err) => {
            console.log(err);
            res.status(500).json(err);
          });
      },
      deleteFriend(req, res) {
        User.findOneAndUpdate({ _id: req.params.userId }, { $pull: { friends: req.params.friendId } }, { new: true })
          .then((dbUserData) => {
            if (!dbUserData) {
              return res.status(404).json({ message: 'No user with this id!' });
            }
            res.json(dbUserData);
          })
          .catch((err) => {
            console.log(err);
            res.status(500).json(err);
          });
      }
}
module.exports = userController;
