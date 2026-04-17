import express from "express";
import cors from "cors";

const app = express();
app.use(express.json());
app.use(cors());

const PORT = Number(process.env.PORT || 3000);

app.get("/", (req, res) => {
  return res.status(200).json({
    message: "API is running",
  });
});

app.get("/health", (req, res) => {
  return res.status(200).json({
    message: "healthy",
  });
});

app.get("/me", (req, res) => {
  return res.status(200).json({
    name: "Oluwatofunmi Akinola",
    email: "akinolatofunmi.tech@gmail.com",
    github: "https://github.com/carvanino",
  });
});

app.listen(PORT, () => {
  console.log(`Server started successfully on port ${PORT}`);
});
