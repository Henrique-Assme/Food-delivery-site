import app from "./app.js";
import { connectDB } from "./config/db.js";

const port = process.env.PORT || 4000;

connectDB();

app.listen(port, () => {
    console.log(`Server Started on port ${port}`);
});
