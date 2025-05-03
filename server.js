const express = require('express');
const app = express();
require('dotenv').config();
app.use(express.json());
const aiRoutes = require('./routes/ai');
app.use('/api/ai', aiRoutes);
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));