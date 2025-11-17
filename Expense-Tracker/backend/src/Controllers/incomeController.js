import Income from '../Models/income.js';

export const addIncome = async(req, res) => {
    const user = req.user._id;
    const {amount, source, description, date, paymentMethod, isRecurring, recurringInterval, taxDeducted, attachment} = req.body;
    try{
            const newIncome = await Income.create({
                user,
                amount,
                source,
                description,
                date : new Date(date),
                paymentMethod,
                isRecurring,
                recurringInterval,
                taxDeducted,
                attachment
            });
            res.status(201).json({message: "Income added successfully", newIncome})
        
    }
    catch(error){
        res.status(500).json({message: `Server Error: ${error.message}`});
    }
}

export const getIncome = async(req, res) => {
    const user = req.user._id;
    try{
    const income = await Income.find({user})
    res.status(200).json({income});
    }
    catch(error){
        res.status(500).json({message: `Server Error: ${error.message}`});
    }
}

export const deleteIncome = async(req, res) => {
    const userId = req.user._id;
    const incomeId = req.params;
    try{
        const deletedIncome = await Income.findOneAndDelete({_id: incomeId, user: userId});
        if(!deletedIncome){
            return res.status(404).json({message: "Income not found"});
        }
        else{
            res.status(200).json({message: "Income deleted successfully"});
        }
    }
catch(error){
    res.status(500).json({message: `Server Error: ${error.message}`});
}}



