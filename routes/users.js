const usersRouter = require('express').Router();
const path = require('path');
const usersData = path.join(__dirname, '../data/users.json');
const fs = require('fs');

usersRouter.get('/users', (req, res) => {
  fs.readFile(usersData, {encoding: 'utf8'}, (err, data) => {
    if(err){
        res.status(404).send({message: 'Запрашиваемый ресурс не найден'});
        return;
    }
    const newData = JSON.parse(data);
    res.send(newData);
  });
});

usersRouter.get('/users/:id', (req, res) => {
  fs.readFile(usersData, { encoding: 'utf8' }, (err, data) => {
    if(err){
        res.status(404).send({message: 'Запрашиваемый ресурс не найден'});
        return;
    }
    const newData = JSON.parse(data);
    const user = newData.find((item) => item._id === req.params.id);
    if(!user){
      res.status(404).send({message: 'Нет пользователя с таким id'});
      return;
    }
    res.send(user);
  });
});

module.exports = usersRouter;