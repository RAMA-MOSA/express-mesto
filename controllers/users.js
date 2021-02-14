const User = require('../models/user');

const getUsers = (req, res, next) =>{
  User.find({})
    .then((users) =>{
      res.status(200).send(users)
    })
    .catch(next);
};

const updateUser = (req,res,next) =>{
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
        res.status(404).send({message: `Введены некорректные данные.`});
        return;
      }
    })
    .catch(next);
};

const updateAvatar = (req,res,next) => {
  const id = req.user._id;
  const newAvatar = req.user._id;
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
        res.status(404).send({message: `Введены некорректные данные.`});
        return;
      }
    })
    .catch(next);
};

const getUserById = (req, res, next) =>{
  User.findById(req.params.id)
    .then((user) =>{
      if(!user){
        res.status(404).send({message: `Нет пользователя с таким id`});
        return;
      }
      res.status(200).send(user)
    })
    .catch((err) =>{
      res.status(500).send({message:`Ошибка на сервере: ${err}`})
    })
    .catch(next);
};

const createUser = (req, res, next) =>{
  const{name, about, avatar} = req.body;
  User.create({name, about, avatar})
    .then((user) =>{
      res.status(200).send(user)
    })
    .catch((err) =>{
      res.status(500).send({message:`Ошибка на сервере: ${err}`})
    })
    .catch(next);
};

module.exports = {
  getUsers,
  getUserById,
  createUser,
  updateAvatar,
  updateUser
}