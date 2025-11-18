// server.js
// Load environment variables as early as possible so imported modules
// that read process.env see the values (prevents import-time race).
import dotenv from "dotenv";
dotenv.config();

import app from "./app.js";

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});
