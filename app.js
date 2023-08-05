const express = require("express");
const morgan = require("morgan");
const notesRouter = require('./routes/notesRoute')
const userRouter = require('./routes/userRoutes')
require("dotenv").config();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan("dev"));

app.use('/api/notes', notesRouter);
app.use('/api/user', userRouter);


app.get("/", async (req, res, next) => {
  res.send({ message: "Awesome it works 🐻" });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 @ http://localhost:${PORT}`));


// // methods to /api/notes
// notesRouter.route("/").get(getAllNotes).post(createNote);
// // methods to /api/notes/id
// notesRouter.route("/:id").get(getSingleNote).patch(updateNote).delete(deleteNote);
