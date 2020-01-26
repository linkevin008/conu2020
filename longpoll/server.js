let http = require('http');
let url = require('url');
let querystring = require('querystring');
let static = require('node-static');

let fileServer = new static.Server('.');
let subscribers = Object.create(null);

function onSubscribe(req, res) {
  let id = Math.random();

  res.setHeader('Content-Type', 'text/plain;charset=utf-8');
  res.setHeader("Cache-Control", "no-cache, must-revalidate");

  subscribers[id] = res;

  req.on('close', function() {
    delete subscribers[id];
  });

}
var id, count;
let voting = []; //{ (id: , count: ), }
//voting[id] = count;
var i;
for(i = 0; i < 5; i++){
  voting[i] = 0;
}

function publish() {

  for (let id in subscribers) {
    let res = subscribers[id];
    for (e in voting){
      res.end(String(voting[e]));
    }
    //res.send(voting);
    //(voting);
    //res.end();
  }

  subscribers = Object.create(null);
}

//ignored for now, not sure what it does
function accept(req, res) {
  let urlParsed = url.parse(req.url, true);

  // new client wants messages
  if (urlParsed.pathname == '/subscribe') {
    onSubscribe(req, res);
    return;
  }

  // sending a message
  if (urlParsed.pathname == '/publish' && req.method == 'POST') {
    // accept POST
    req.setEncoding('utf8');
    let message = '';
    req.on('data', function(chunk) {
      message += chunk;
    }).on('end', function() {
      for(key in voting){
        if(message === key){
          voting[key]++;
        }
      }
      console.log(voting);
      publish(); // publish it to everyone
      res.end("ok");
    });

    return;
  }

  // the rest is static
  fileServer.serve(req, res);

}

function close() {
  for (let id in subscribers) {
    let res = subscribers[id];
    res.end();
  }
}

// -----------------------------------

if (!module.parent) {
  http.createServer(accept).listen(8080);
  console.log('Server running on port 8080');
} else {
  exports.accept = accept;

  if (process.send) {
     process.on('message', (msg) => {
       if (msg === 'shutdown') {
         close();
       }
     });
  }

  process.on('SIGINT', close);
}