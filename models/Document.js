const mongoose = require("mongoose");

const documentSchema = new mongoose.Schema({
  content: {
    type: Object,
  },
  owner: {
    type: Array,
    required: true,
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
