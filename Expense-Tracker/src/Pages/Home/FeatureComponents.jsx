import React, { useState, useEffect } from 'react';
import '../../Pages/Home/Home.css';
import TopComp from '../../Components/DashboardComp/TopComp/TopComp.jsx';
import FinancialOverview from '../../Components/DashboardComp/FinancialOverview/FinancialOverview.jsx';
import DashboardChart from '../../Components/DashboardComp/DashboardChart/DashboardChart.jsx';
import ExpenseBreakdown from '../../Components/DashboardComp/ExpenseBreakdown/ExpenseBreakdown.jsx';
import IncomeBreakdown from '../../Components/DashboardComp/IncomeBreakdown/IncomeBreakdown.jsx';
import axiosInstance from '../../utils/axios.js';
import { API_PATHS } from '../../utils/apiPaths.js';

const FeatureComponents = () => {
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchDashboardData = async () => {
    setLoading(true);
    try {
      const response = await axiosInstance.get(API_PATHS.DASHBOARD.GET_DASHBOARD);
      if (response.data && response.data.success) {
        setDashboardData(response.data);
      }
    } catch (err) {
      console.error("Error fetching dashboard data:", err);
      setError("Failed to load dashboard data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  return (
    <div>
      <section>
        <TopComp
          totalBalance={dashboardData?.totalBalance}
          income={dashboardData?.totalIncome}
          expense={dashboardData?.totalExpenses}
          loading={loading}
        />
      </section>

      <section className="dashboard-row">
        {/* Financial Overview with Recent Transactions */}
        <FinancialOverview data={dashboardData} />

        {/* Expenses Breakdown */}
        <ExpenseBreakdown data={dashboardData} />
      </section>

      <section className="dashboard-row">
        {/* Chart Section */}
        <DashboardChart data={dashboardData} />

        {/* Income Breakdown */}
        <IncomeBreakdown data={dashboardData} />
      </section>
    </div>
  );
};

export default FeatureComponents;
