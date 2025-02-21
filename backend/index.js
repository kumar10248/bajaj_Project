const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 8000;

app.get("/bfhl", (req, res) => {
    return res.json({operation_code: 1})
});

app.post("/bfhl", (req, res) => {
    const {data} = req.body;

    if (!data || !Array.isArray(data)) {
        return res.status(400).json({ error: "Invalid data format" });
    }

    const numbers = data.filter(item => /^\d+$/.test(item));

    const alphabets = data.filter(item => /^[A-Z]$/.test(item));

    const highestAlphabet = alphabets.length > 0 ? [alphabets.reduce((max, letter) => letter > max ? letter : max)] : [];

    return res.json({ is_success: true, user_id: "kumar_devashish_01102003", email:"kumardevashish000@gmail.com", numbers, alphabets, highest_alphabet: highestAlphabet });
})

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
