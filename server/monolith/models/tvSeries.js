const db = require('../config/mongo')
const tvSeries = db.collection('tvseries')
const { ObjectId } = require("mongodb")

class TvSeriesModel {
  static find() {
    return tvSeries.find().toArray()
  }
  
  static findOne(id) {
    return tvSeries.findOne({_id: ObjectId(id)})
  }

  static create(payload) {
    return tvSeries.insertOne(payload)
  }

  static update(payload, id) {
    return tvSeries.updateOne({ _id: ObjectId(id) }, { $set: payload }) 
  }

  static remove(id) {
    return tvSeries.deleteOne({_id: id})
  }
}

module.exports = TvSeriesModel