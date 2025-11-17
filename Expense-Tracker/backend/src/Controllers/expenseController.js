import Expense from '../Models/Expenses.js';

export const addExpense = async(req, res) => {
    const user = req.user._id;
    const {amount, category, description, date, paymentMethod, isRecurring, recurringInterval, attachment} = req.body;
    try{
            const newExpense = await Expense.create({
                user,
                amount,
                category,
                description,
                date : new Date(date),
                paymentMethod,
                isRecurring,
                recurringInterval,
                attachment
            });
            res.status(201).json({message: "Expense added successfully", newExpense})
        
    }
    catch(error){
        res.status(500).json({message: `Server Error: ${error.message}`});
    }
}

export const getExpense = async(req, res) => {
    const user = req.user._id;
    try{
    const expense = await Expense.find({user})
    res.status(200).json({expense});
    }
    catch(error){
        res.status(500).json({message: `Server Error: ${error.message}`});
    }
}

export const deleteExpense = async(req, res) => {
    const userId = req.user._id;
    const expenseId = req.params;
    try{
        const deletedExpense = await Expense.findOneAndDelete({_id: expenseId, user: userId});
        if(!deleteExpense){
            return res.status(404).json({message: "Expense not found"});
        }
        else{
            res.status(200).json({message: "Expense deleted successfully"});
        }
    }
catch(error){
    res.status(500).json({message: `Server Error: ${error.message}`});
}}



