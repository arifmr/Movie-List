const db = require('../config/mongo')
const Movies = db.collection("movies")
const { ObjectId } = require("mongodb")

class MovieModel {
  static find() {
    return Movies.find().toArray()
  }

  static findOne(id) {
    return Movies.findOne({_id: ObjectId(id)})
  }

  static create(payload) {
    return Movies.insertOne(payload)
  }

  static update(payload, id) {
    return Movies.findOneAndUpdate({_id: ObjectId(id)}, {$set: payload}, {returnNewDocument: true})
  }

  static remove(id) {
    return Movies.findOneAndDelete({_id: ObjectId(id)})
  }
}

module.exports = MovieModel