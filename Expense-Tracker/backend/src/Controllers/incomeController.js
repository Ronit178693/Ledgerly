import Income from '../Models/income.js';

export const addIncome = async (req, res) => {
    const user = req.user._id;
    const { amount, source, date, icon } = req.body;
    if (!amount || !source || !date) {
        return res.status(400).json({ success: false, message: "Please provide all required fields" });
    }
    try {
        const newIncome = await Income.create({
            user,
            amount,
            source,
            date,
            icon: icon || '💰'
        });
        return res.status(201).json({ success: true, message: "Income added successfully", newIncome })

    }
    catch (error) {
        return res.status(500).json({ success: false, message: `Server Error: ${error.message}` });
    }
}

export const getIncome = async (req, res) => {
    const user = req.user._id;
    try {
        const income = await Income.find({ user })
        if (income.length === 0) {
            return res.status(404).json({ success: false, message: "No income records found" });
        }
        else {
        return res.status(200).json({ success: true, income });
    }
    }
    catch (error) {
        return res.status(500).json({ success: false, message: `Server Error: ${error.message}` });
    }
}

export const deleteIncome = async (req, res) => {
    const userId = req.user._id;
    const incomeId = req.params.id;
    try {
        const deletedIncome = await Income.findOneAndDelete({ _id: incomeId, user: userId });
        if (!deletedIncome) {
            return res.status(404).json({ success: false, message: "Income not found" });
        }
        else {
            return res.status(200).json({ success: true, message: "Income deleted successfully" });
        }
    }
    catch (error) {
        return res.status(500).json({ success: false, message: `Server Error: ${error.message}` });
    }
}



