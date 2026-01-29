import mongoose from "mongoose";

const incomeSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    amount: {
      type: Number,
      required: true,
      min: 0,
    },

    source: {
      type: String,
      required: true,
    },

    date: {
      type: Date,
      default: Date.now,
    },

    icon: {
      type: String,
      default: '💰',
    },
    

  },
  {
    timestamps: true,
  }
);

const Income = mongoose.model("Income", incomeSchema);

export default Income;
