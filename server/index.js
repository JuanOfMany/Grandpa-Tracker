/* eslint-disable no-console */
const express = require('express')
const app = express()
const {spawn} = require('child_process');
const port = 3000

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.post('/bloodpressures', (req, res) => {

  const { spawn } = require('child_process');
  const pyProg = spawn('python3', ['/Users/Juan/Desktop/Grandpa-Tracker/tutorial_env/main.py']);

  pyProg.stdout.on('data', function(data) {

      console.log(data.toString());
      res.write(data);
      res.end('data');
  });
})

app.get('/bloodpressures', (req, res) => {
  console.log('getting bloodpressure data')
  let timestamps = [
    1694428361748, 1694428361748, 1695428461748, 1696428366748, 1697528361748,
    1699425361748, 1693449895264, 1693549891748,
  ].sort();

  let exampleBPData = {
    systolic: [120, 140, 139, 100, 110, 160, 150, 160],
    diastolic: [80, 100, 75, 69, 85, 72, 100, 65, 61],
  };

  body = {timestamps: timestamps, exampleBPData: exampleBPData}

  res.status(200).send(body)
})


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})