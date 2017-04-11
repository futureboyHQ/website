const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const cache = new WeakMap();

var AuthorSchema = new Schema({
  name: {type: String, required: true, index: true},
  age: {type: Number, required: true},
  bio: {type: String, required: true},
  interests: {type: String, required: false},
  title: {type: String, required: true},
  twitter: {type: String, required: false},
  behance: {type: String, required: false},
  youtube: {type: String, required: false},
  instagram: {type: String, required: false},
  website: {type: String, required: false},
  country: {type: String, required: false},
  imageURL: {type: String, required: true}
});

AuthorSchema.index({'name': 'text'});

AuthorSchema.methods.findFromCache = function(id) {
  return cache.get(id);
};

AuthorSchema.methods.saveToCache = function(id, author) {
  return cache.set(id, author);
};

module.exports = AuthorSchema;