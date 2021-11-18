const mongoose = require("mongoose");

const documentSchema = new mongoose.Schema({
  data: {
    type: Object,
  },
  owner: {
    type: Array,
  },
  shared: {
    type: Array,
  },
  comment: {
    type: Array,
  },
  lastSaved: {
    type: Date,
  },
});

const Document = mongoose.model("Document", documentSchema);
module.exports = Document;
