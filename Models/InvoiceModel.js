const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const InvoiceSchema = new Schema({
  InvoiceDetail: [
    {
      ID_Product: {
        type: Schema.Types.ObjectId,
        ref: "Product",
      },
      Count: {
        type: Number,
      }
    }
  ],
  ID_User: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  Address: {
    type: String,
  },
  Total: {
    type: Number,
    default: 0,
  },
  Status: {
    type: Boolean,
    default: false,
  },
  DateOfCreate: {
    type: Date,
    default: Date.now(),
  },
});

const Invoice = mongoose.model("Invoice", InvoiceSchema);
module.exports = Invoice;
