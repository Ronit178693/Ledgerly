import React, { useRef } from 'react'
import ExpenseGraph from '../../Components/ExpenseComp/ExpenseGraph/ExpenseGraph';
import ExpenseSlide from '../../Components/ExpenseComp/ExpenseSlide';
import '../Income/Income.css'; // Reuse Income CSS

const Expenses = () => {
  const expenseSlideRef = useRef(null);

  const handleExpenseAdded = () => {
    // Trigger refresh in ExpenseSlide when new expense is added
    expenseSlideRef.current?.refreshExpenses();
  };

  return (
    <div>
      <ExpenseGraph onExpenseAdded={handleExpenseAdded} />
      <ExpenseSlide ref={expenseSlideRef} />
    </div>
  )
}

export default Expenses