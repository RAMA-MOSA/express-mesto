const User = require('../models/user');

const getUsers = (req, res) =>{
  User.find({})
    .then((users) =>{
      if(users.length === 0){
        res.status(404).send({message: `Нет пользователей.`});
        return;
      }
      res.status(200).send(users)
    })
    .catch((err) =>{
      res.status(500).send({message:`Ошибка на сервере: ${err}`})
    });
};

const updateUser = (req, res) =>{
  const id = req.user._id;
  const newName = req.body.name;
  const newAbout = req.body.about;
  User.findOneAndUpdate(
    {_id: id},
    {name: newName,
    about: newAbout},
    {runValidators: true,
    new: true}
  )
    .then((user) => {
      res.status(200).send(user);
    })
    .catch((err) => {
      if(err.name === 'ValidationError'){
        res.status(400).send({message: `Введены некорректные данные.`});
        return;
      }
      res.status(500).send({message:`Ошибка на сервере: ${err}`})
    })
};

const updateAvatar = (req, res) => {
  const id = req.user._id;
  const newAvatar = req.body.avatar;
  User.findOneAndUpdate(
    {_id: id},
    {avatar: newAvatar},
    {runValidators: true,
    new: true}
  )
    .then((user) => {
      res.status(200).send(user);
    })
    .catch((err) =>{
      if(err.name === 'ValidationError'){
        res.status(400).send({message: `Введены некорректные данные.`});
        return;
      }
      res.status(500).send({message:`Ошибка на сервере: ${err}`})
    })
};

const getUserById = (req, res) =>{
  User.findById(req.params.id)
    .then((user) =>{
      if(!user){
        res.status(404).send({message: `Нет пользователя с таким id.`});
        return;
      }
      res.status(200).send(user)
    })
    .catch((err) =>{
      if(err.name === 'CastError'){
        res.status(400).send({message: `Нет пользователя с таким id.`});
        return;
      }
      res.status(500).send({message:`Ошибка на сервере: ${err}`})
    })
};

const createUser = (req, res) =>{
  const{name, about, avatar} = req.body;
  User.create({name, about, avatar})
    .then((user) =>{
      res.status(200).send(user)
    })
    .catch((err) =>{
      if(err.name === 'ValidationError'){
        res.status(400).send({message:`Введены некорректные данные.`});
        return
      }
      res.status(500).send({message:`Ошибка на сервере: ${err}`})
    })
};

module.exports = {
  getUsers,
  getUserById,
  createUser,
  updateAvatar,
  updateUser
}