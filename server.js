// server.js
// Config the JSON Server
const jsonServer = require('json-server')
const server = jsonServer.create()
// Load db.json as router
const router = jsonServer.router('db.json')
// Load middlewares
const middlewares = jsonServer.defaults()
// Define port server
const port = process.env.PORT || 3000
// Load validation function each routes
const validateUser = require('./validations/user')
const validatePost = require('./validations/post')
const validateComment = require('./validations/comment')
const validateAlbum = require('./validations/album')
const validatePhoto = require('./validations/photo')
const validateTodo = require('./validations/todo')

// Use Middlewares
server.use(middlewares)
// Parsing JSON
server.use(jsonServer.bodyParser)
// Do validation each routes
server.use((req, res, next) => {
  const { method, body } = req
  // Initialize error is false
  let error = {
    isEmpty: () => false,
    body: {}
  }
  // Split path url
  const path = req.path.split("/")
  /*
    GET show all data
    POST create new data
    PUT replace all field by body
    PATCH replace a field by body
    DELETE delete a data
  */
  // do validate for POST or PUT method request
  if (method === "POST" || method === "PUT") {
    if (path[1] === "users") error = validateUser(body, method)
    else if (path[1] === "posts") error = validatePost(body, method)
    else if (path[1] === "comments") error = validateComment(body, method)
    else if (path[1] === "albums") error = validateAlbum(body, method)
    else if (path[1] === "photos") error = validatePhoto(body, method)
    else if (path[1] === "todos") error = validateTodo(body, method)
  } 
  // do validate for PATCH method request
  // REQ BODY MODIFICATION WITH ERROR OR NEW BODY
  else if (method === "PATCH") {
    if (path[1] === "users") error = validateUser(body)
    else if (path[1] === "posts") error = validatePost(body)
    else if (path[1] === "comments") error = validateComment(body)
    else if (path[1] === "albums") error = validateAlbum(body)
    else if (path[1] === "photos") error = validatePhoto(body)
    else if (path[1] === "todos") error = validateTodo(body)
  }
  // check there is error or not
  // if there is a error it will be return 422 error code and message
  if (error.isEmpty()) {
    return res.status(422).jsonp({
      messages: error.messages.flat(Infinity)
    })
  } else if (!error.isEmpty() && error.body) {
    req.body = error.body
  }
  // next if there is no error
  next()
})
server.use(router)
// starting server
server.listen(port, () => {
  console.log('JSON Server is running '+port)
})