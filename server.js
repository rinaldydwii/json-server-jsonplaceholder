// server.js
const jsonServer = require('json-server')
const server = jsonServer.create()
const router = jsonServer.router('db.json')
const middlewares = jsonServer.defaults()
const port = process.env.PORT || 3000
const validateUser = require('./validations/user')
const validatePost = require('./validations/post')
const validateComment = require('./validations/comment')
const validateAlbum = require('./validations/album')
const validatePhoto = require('./validations/photo')
const validateTodo = require('./validations/todo')

server.use(middlewares)
server.use(jsonServer.bodyParser)
server.use((req, res, next) => {
  const { method, body } = req
  let error = {isEmpty: () => false}
  const path = req.path.split("/")
  // GET show all data
  // POST create new data
  // PUT replace all field by body
  // PATCH replace a field by body
  // DELETE delete a data
  if (method === "POST" || method === "PUT") {
    if (path[1] === "users") error = validateUser(body, method)
    else if (path[1] === "posts") error = validatePost(body, method)
    else if (path[1] === "comments") error = validateComment(body, method)
    else if (path[1] === "albums") error = validateAlbum(body, method)
    else if (path[1] === "photos") error = validatePhoto(body, method)
    else if (path[1] === "todos") error = validateTodo(body, method)
  } else if (method === "PATCH") {
    if (path[1] === "users") req.body = validateUser(body)
    else if (path[1] === "posts") req.body = validatePost(body)
    else if (path[1] === "comments") req.body = validateComment(body)
    else if (path[1] === "albums") req.body = validateAlbum(body)
    else if (path[1] === "photos") req.body = validatePhoto(body)
    else if (path[1] === "todos") req.body = validateTodo(body)
  }
  if (error.isEmpty()) {
    return res.status(422).jsonp({
      messages: error.messages.flat(Infinity)
    })
  }
  next()
})
server.use(router)
server.listen(port, () => {
  console.log('JSON Server is running '+port)
})