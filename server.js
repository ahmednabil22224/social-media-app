import express from "express";
import cors from "cors";
import axios from "axios";
import multer from "multer"; // handle file uploads
import FormData from "form-data";

const app = express();
const upload = multer(); // memory storage for files

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

app.use(express.json());

app.all("/api/*", upload.any(), async (req, res) => {
  try {
    const token = req.headers.authorization || "";
    let dataToSend;

    if (req.files && req.files.length > 0) {
      const formData = new FormData();
      for (const key in req.body) formData.append(key, req.body[key]);
      req.files.forEach((file) => {
        formData.append(file.fieldname, file.buffer, file.originalname);
      });
      dataToSend = formData;
    } else {
      dataToSend = req.body; 
    }

    const response = await axios({
      method: req.method,
      url: `https://tarmeezacademy.com/api/v1${req.url.replace("/api/v1", "")}`,
      headers: {
        ...(dataToSend instanceof FormData
          ? dataToSend.getHeaders()
          : { "Content-Type": "application/json" }),
        Authorization: token,
      },
      data: dataToSend,
    });

    res.json(response.data);
  } catch (err) {
    if (err.response) {
      res.status(err.response.status).json(err.response.data);
    } else {
      res.status(500).json({ message: err.message });
    }
  }
});

app.listen(5000, () => console.log("✅ Proxy running on port 5000"));
