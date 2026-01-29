import mongoose from 'mongoose';

const ExpenseSchema = new mongoose.Schema({
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
    timestamps: true, // adds createdAt + updatedAt automatically
}
);

const Expense = mongoose.model("Expense", ExpenseSchema);

export default Expense;