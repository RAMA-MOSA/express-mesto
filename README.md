# Проектная работа REST API для проекта "Mesto".

## Создана в рамках обучения в Яндекс.Практикуме на курсе "Веб-разработчик".

## Описание:
 REST API для проектной работы "Mesto", связанное с базой данных MongoDB.
 "Mesto" - это интерактивная страница, где пользователи могут делиться фотографиями.
 
[Проектная работа на GitHub Pages](https://rama-mosa.github.io/mesto-react/index.html)

## Функционал:
 Роуты для пользователей:
* GET /users - возвращает всех пользователей;
* GET /users/:userId - возвращает пользователя по переданному _id;
* POST /users - создает пользователя с переданными в теле запроса name, about и avatar;

 Роуты для карточек:
* GET /cards - возвращает все карточки из базы данных;
* POST /cards - создаёт карточку с переданными в теле запроса name и link. owner проставляется посредством временного мидлвэра;
* DELETE /cards/:cardId - удаляет карточку по переданному _id;

## Технологии:
* expressjs
* API REST
* MongoDB
* RegExp

## Инструкция по установке:
```
git clone https://github.com/RAMA-MOSA/express-mesto.git
npm install
npm run dev - запускает сервер
npm run start - запускает сервер с hot-reload
```
