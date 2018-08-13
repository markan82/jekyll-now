const express = require('express')
const app = express();

app.use(express.static('./'));

const server = app.listen(3001, function(){
  console.log("Express server has started on port 3000")
});