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

    category: {
      type: String,
      required: true,
    },

    description: {
      type: String,
      trim: true,
    },

    date: {
      type: Date,
      default: Date.now,
    },

    paymentMethod: {
      type: String,
      enum: ["Cash", "Card", "UPI", "Bank Transfer", "Wallet", "Other"],
      default: "Cash",
    },

    isRecurring: {
      type: Boolean,
      default: false,
    },

    recurringInterval: {
      type: String,
      enum: ["Daily", "Weekly", "Monthly", "Yearly"],
      required: function () {
        return this.isRecurring;
      },
    },

    attachment: [
      {
        url: String, // image or PDF
        uploadedAt: { 
          type: Date,
          default: Date.now,
        },
      },
    ],

    tags: [String],

    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true, // adds createdAt + updatedAt automatically
}
);

const Expense = mongoose.model("Expense", ExpenseSchema);

export default Expense;