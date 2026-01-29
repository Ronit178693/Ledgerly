import Income from '../Models/income.js';
import Expense from '../Models/Expenses.js';

import mongoose from 'mongoose';

const getDashboard = async (req, res) => {

    const userId = new mongoose.Types.ObjectId(req.user._id);
    try {

        //Fetching total income and expenses
        // Making aggrigate pipeline to sum income and expenses
        const totalIncome = await Income.aggregate([
            { $match: { user: userId } },
            { $group: { _id: null, total: { $sum: "$amount" } } }
        ]);

        console.log("Total Income Aggregate:", totalIncome);

        const totalExpenses = await Expense.aggregate([
            { $match: { user: userId } },
            { $group: { _id: null, total: { $sum: "$amount" } } }
        ]);

        console.log("Total Expenses Aggregate:", totalExpenses);


        // Income Transections in last 30 Days

        const incomeTransactionsin30Days = await Income.find({
            user: userId,
            date: { $gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000) },
        }).sort({ date: -1 });


        // Total income for last 30 days

        const totalIncomeLast30Days = incomeTransactionsin30Days.reduce((sum, transection) => sum + transection.amount, 0);


        // Get expense transactions in last 30 days

        const expenseTransactionsin30Days = await Expense.find({
            user: userId,
            date: { $gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000) },
        }).sort({ date: -1 });

        // Total expenses for last 30 days

        const totalExpensesLast30Days = expenseTransactionsin30Days.reduce((sum, transection) => sum + transection.amount, 0);

        // Fetch last five transections(income + expense)

        const lastFiveIncome = await Income.find({ user: userId }).sort({ date: -1 }).limit(5).lean();
        const lastFiveExpense = await Expense.find({ user: userId }).sort({ date: -1 }).limit(5).lean();

        const lastFiveTransection = [
            ...lastFiveIncome.map(t => ({ ...t, type: 'income' })),
            ...lastFiveExpense.map(t => ({ ...t, type: 'expense' }))
        ];
        lastFiveTransection.sort((a, b) => b.date - a.date);
        const lastFive = lastFiveTransection.slice(0, 5);


        return res.json({
            success: true,
            totalBalance: (totalIncome[0] ? totalIncome[0].total : 0) - (totalExpenses[0] ? totalExpenses[0].total : 0),
            totalIncome: totalIncome[0] ? totalIncome[0].total : 0,
            totalExpenses: totalExpenses[0] ? totalExpenses[0].total : 0,
            last30DaysIncome: {
                incomeTransactionsin30Days,
                totalIncomeLast30Days
            },
            last30DaysExpenses: {
                expenseTransactionsin30Days,
                totalExpensesLast30Days
            },
            lastFive
        })

    }
    catch (error) {
        return res.status(500).json({ success: false, message: `Server Error: ${error.message}` });

    }
}

export default getDashboard;