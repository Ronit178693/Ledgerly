import React, { useRef } from 'react'
import IncomeSlide from '../../Components/IncomeComp/IncomeSlide.jsx';
import IncomeGraph from '../../Components/IncomeComp/LineComp/IncomeGraph.jsx';

const Income = () => {
  const incomeSlideRef = useRef(null);

  const handleIncomeAdded = () => {
    // Trigger refresh in IncomeSlide when new income is added
    incomeSlideRef.current?.refreshIncomes();
  };

  return (
    <div>
      <IncomeGraph onIncomeAdded={handleIncomeAdded} />
      <IncomeSlide ref={incomeSlideRef} />
    </div>
  )
}

export default Income