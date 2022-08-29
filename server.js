const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.static(`${__dirname}/dist`))
 

app.listen(PORT, () => {
  console.log(`Мой текст в логе после запуска ${PORT}!`);
});