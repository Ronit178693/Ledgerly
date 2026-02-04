import Expense from '../Models/Expenses.js';

export const addExpense = async(req, res) => {
    const user = req.user._id;
    const {amount, source, date, icon} = req.body;
    if(!amount || !source || !date){
        return  res.status(400).json({ success: false, message: "Please provide all required fields"});
    }
    try{
            const newExpense = await Expense.create({
                user,
                amount,
                source,
                date
            });
            return res.status(201).json({success: true, message: "Expense added successfully", newExpense})
        
    }
    catch(error){
        return res.status(500).json({success: false, message: `Server Error: ${error.message}`});
    }
}

export const getExpense = async(req, res) => {
    const user = req.user._id;
    try{
    const expense = await Expense.find({user})
    if(expense.length === 0){
        return res.status(404).json({success: false,message: "No expense records found"});
    }
    else{
     return res.status(200).json({success: true, expense});
    }
   
    }
    catch(error){
        return res.status(500).json({success: false, message: `Server Error: ${error.message}`});
    }
}

export const deleteExpense = async(req, res) => {
    const userId = req.user._id;
    const expenseId = req.params.id;
    try{
        const deletedExpense = await Expense.findOneAndDelete({_id: expenseId, user: userId});
        if(!deletedExpense){
            return res.status(404).json({success: false, message: "Expense not found"});
        }
        else{
            return res.status(200).json({success: true, message: "Expense deleted successfully"});
        }
    }
    catch(error){
        return res.status(500).json({success: false, message: `Server Error: ${error.message}`});
    }
}



