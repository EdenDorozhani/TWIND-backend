const path = require("path");

const express = require("express");
const bodyParser = require("body-parser");
const multer = require("multer");
const authRoutes = require("./routes/auth");
const homeRoutes = require("./routes/home");
const postRoutes = require("./routes/post");
const profileRouter = require("./routes/profile");
const exploreRouter = require("./routes/explore");

const app = express();

app.use(bodyParser.json());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "OPTIONS, GET, POST, PUT, PATCH, DELETE"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

app.use("/images", express.static(path.join(__dirname, "images")));

const fileStoragePostImages = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "images");
  },
  filename: (req, file, cb) => {
    cb(
      null,
      new Date().toISOString().replace(/:/g, "-") + "-" + file.originalname
    );
  },
});

const multerUpload = multer({ storage: fileStoragePostImages });

app.use(multerUpload.fields([{ name: "postImage" }, { name: "userImgURL" }]));

app.use("/", authRoutes);
app.use("/", homeRoutes);
app.use("/", postRoutes);
app.use("/", profileRouter);
app.use("/", exploreRouter);

app.listen(3131);
