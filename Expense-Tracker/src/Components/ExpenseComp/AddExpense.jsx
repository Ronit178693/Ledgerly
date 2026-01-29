import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { X, TrendingDown, IndianRupee, Calendar, Tag } from 'lucide-react';
import axiosInstance from '../../utils/axios';
import Picker from "@emoji-mart/react";
import data from "@emoji-mart/data";
import { API_PATHS } from '../../utils/apiPaths';
import '../../Pages/Income/Income.css';

const AddExpense = ({ isOpen, onClose, onSuccess }) => {
  const [source, setSource] = useState("");
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState("");
  const [icon, setIcon] = useState('💸');
  const [error, setError] = useState('');
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

  const handleSourceChange = (e) => {
    setSource(e.target.value);
  };

  const handleAmountChange = (e) => {
    setAmount(e.target.value);
  };

  const handleDateChange = (e) => {
    setDate(e.target.value);
  };

  const handleEmojiSelect = (emojiData) => {
    setIcon(emojiData.native);
    setShowEmojiPicker(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // Validation
    if (!source || !amount || !date) {
      setError("Provide all required details");
      return;
    }
    if (amount <= 0) {
      setError("Enter a valid amount");
      return;
    }

    try {
      const response = await axiosInstance.post(API_PATHS.EXPENSES.ADD_EXPENSES, {
        source,
        amount: parseFloat(amount),
        date,
        icon
      });

      if (response.data.success) {
        // Reset form
        setSource('');
        setAmount('');
        setDate('');
        setIcon('💸');
        onSuccess?.();
        onClose();
      } else {
        setError(response.data.message || 'Failed to add expense');
      }
    } catch (err) {
      console.error('Error adding expense:', err);
      setError(err.response?.data?.message || 'Failed to add expense');
    }
  };

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <div className="income-modal-overlay" onClick={handleOverlayClick}>
      <div className="income-modal-content">
        <div className="income-modal-header">
          <div className="income-modal-title-wrapper">
            <TrendingDown className="modal-title-icon" size={24} />
            <h2 className="income-modal-title">Add New Expense</h2>
          </div>
          <button
            className="income-modal-close-btn"
            onClick={onClose}
            aria-label="Close modal"
          >
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="income-modal-form">
          {error && <div className="error-banner" style={{ color: 'red', marginBottom: '1rem' }}>{error}</div>}

          {/* Source Field */}
          <div className="income-form-field">
            <label htmlFor="source" className="income-form-label">
              <Tag className="field-icon" size={18} />
              Expense Source
            </label>
            <input
              type="text"
              id="source"
              name="source"
              value={source}
              onChange={handleSourceChange}
              className="income-form-input"
              placeholder="e.g., Groceries, Rent, Netflix"
              required
            />
          </div>

          {/* Icon Picker */}
          <div className="income-form-field">
            <label className="income-form-label">
              <span style={{ fontSize: '18px', marginRight: '8px' }}>🎨</span>
              Choose Icon
            </label>
            <div className="emoji-picker-wrapper">
              <button
                type="button"
                className="emoji-trigger-btn"
                onClick={() => setShowEmojiPicker(!showEmojiPicker)}
              >
                <span style={{ fontSize: '24px' }}>{icon}</span>
                <span style={{ marginLeft: '8px', fontSize: '0.875rem' }}>
                  {showEmojiPicker ? 'Hide' : 'Choose Emoji'}
                </span>
              </button>
              {showEmojiPicker && (
                <div className="emoji-picker-popup">
                  <Picker
                    data={data}
                    onEmojiSelect={handleEmojiSelect}
                    theme="dark"
                    previewPosition="none"
                    skinTonePosition="none"
                  />
                </div>
              )}
            </div>
          </div>

          {/* Amount Field */}
          <div className="income-form-field">
            <label htmlFor="amount" className="income-form-label">
              <IndianRupee className="field-icon" size={18} />
              Amount
            </label>
            <input
              type="number"
              id="amount"
              name="amount"
              value={amount}
              onChange={handleAmountChange}
              className="income-form-input"
              placeholder="0.00"
              min="0"
              step="0.01"
              required
            />
          </div>

          {/* Date Field */}
          <div className="income-form-field">
            <label htmlFor="date" className="income-form-label">
              <Calendar className="field-icon" size={18} />
              Date
            </label>
            <input
              type="date"
              id="date"
              name="date"
              value={date}
              onChange={handleDateChange}
              className="income-form-input"
              required
            />
          </div>

          {/* Submit Button */}
          <div className="income-modal-actions">
            <button
              type="button"
              onClick={onClose}
              className="income-modal-btn income-modal-btn-cancel"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="income-modal-btn income-modal-btn-submit"
            >
              Add Expense
            </button>
          </div>
        </form>
      </div>
    </div>,
    document.body
  );
};

export default AddExpense;
