import { db } from './firebase';
// User API
var format = require('date-format');

var description, url, rights;
export const doCreateUser = (username, email, password) =>
  db.ref("Users/").push({
    username,
    email,
    password,
    rights: "normal",
  });

export const onceGetUsers = () =>
  db.ref('Users').once('value');

export const onceGetRSS = () =>
  db.ref('RSS').once('value');

export const onceGetHTML = () =>
  db.ref('Content').once('value');

export const deleteAnRSS = (key) => {
  console.log("reached");
  db.ref('RSS').child(key).remove();
  console.log("delete db first");
  onceGetRSS();
}
export const addAnRSS = (description, url) => {
  var rss =
    {
      description: description,
      url: url,
      created_at: format.asString(),
      updated_at: ""
    }
  db.ref('RSS').push(rss);
  alert("Content Added");
}

export const updateAnRSS = (key, description, url) => {
  var rss =
    {
      description: description,
      url: url,
      updated_at: format.asString()
    }
  db.ref('RSS').child(key).update(rss);
  alert("RSS Updated");
}

export const deleteAnHTML = (key) => {
  console.log("reached");
  db.ref('Content').child(key).remove();
  console.log("delete db first");
}
export const addAnHTML = (description, body) => {
  console.log(description);
  console.log(body);
  var html =
    {
      description: description,
      body: body,
      created_at: format.asString(),
      updated_at: ""
    }
  db.ref('Content').push(html);
}

export const updateAnHTML = (key, description,body) => {
  var html =
    {
      description: description,
      body: body,
      updated_at: format.asString()
    }
  db.ref('Content').child(key).update(html);
  alert("HTML Updated");
}
