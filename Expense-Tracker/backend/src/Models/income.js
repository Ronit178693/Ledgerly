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
      enum: ["Cash", "Bank Transfer", "UPI", "Cheque", "Crypto", "Other"],
      default: "Bank Transfer",
    },

    isRecurring: {
      type: Boolean,
      default: false,
    },

    recurringInterval: {
      type: String,
      enum: ["Weekly", "Monthly", "Quarterly", "Yearly"],
      required: function () {
        return this.isRecurring;
      },
    },

    taxDeducted: {
      type: Number,
      min: 0,
      default: 0,
    },

    attachment: [
      {
        url: String, // salary slip / invoice
        uploadedAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],

    tags: [String],
  },
  {
    timestamps: true,
  }
);

const Income = mongoose.model("Income", incomeSchema);

export default Income;
