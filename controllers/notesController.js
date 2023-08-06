const prisma = require("../lib/db");


exports.restrictId = (req, res, next, value) => {
  if (value === '64c7edebb2ba09bd3fdf58d3') return res.send("this id is restricted.")
  next()
}

exports.getAllNotes = async (req, res) => {

  const { priority_min, priority_max, importtant, sort, limit, page } = req.query

  const pageNumber = parseInt(page) || 1;
  const perPage = parseInt(limit) || 5;
  const offset = (pageNumber - 1) * perPage;

  try {
    const notes = await prisma.note.findMany({

      where: {
        AND: [
          {
            priority: {
              gt: priority_min ? parseInt(priority_min) : undefined,
              lt: priority_max ? parseInt(priority_max) : undefined
            }
          },
          {
            importtant: {
              equals: importtant ? JSON.parse(importtant) : undefined
            }
          }
        ]
      },
      orderBy: [
        {
          title: sort && sort.includes("title") ? sort.replace("title,", "") : undefined,
        },
        {
          priority: sort && sort.includes("priority") ? sort.replace("priority,", "") : undefined,
        },
      ],
      take: perPage,
      skip: offset
    });
    if (!notes) {
      res.status(404).json({ error: "no notes found" });
    }

    res.status(200).json(notes);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "an internal server error occured" });
  }
};

exports.createNote = async (req, res) => {
  try {
    const { title, description, importtant, priority } = req.body;

    const note = await prisma.note.create({
      data: { title, description, importtant, priority },
    });

    res.status(201).json(note);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "an internal server error occured" });
  }
};

exports.getSingleNote = async (req, res) => {
  const id = req.params.id;
  try {
    const note = await prisma.note.findUnique({ where: { id } });

    if (!note) {
      res.status(404).json({ error: "post not found" });
    }

    res.status(200).json(note);
  } catch (error) {
    console.log(error);
    res.status(500).error({ error: "internal server error" });
  }
};

exports.updateNote = async (req, res) => {
  const id = req.params.id;
  const updatedData = req.body;

  try {
    const existingPost = await prisma.note.findUnique({ where: { id } });
    if (!existingPost) {
      res.status(404).json({ error: "note not found" });
    }

    const updateNote = await prisma.note.update({
      where: { id },
      data: updatedData,
    });

    res.status(500).json({ message: "note updated.", updateNote });
  } catch (error) {
    console.log(error);
    res.status(404).status({ error: "internal server console.error();" });
  }
};

exports.deleteNote = async (req, res) => {
  const id = req.params.id;

  try {
    const existingPost = await prisma.note.findUnique({ where: { id } });
    if (!existingPost) {
      res.status(404).json({ error: "note not found" });
    }

    const deleteNote = await prisma.note.delete({ where: { id } });

    res.status(500).json({ message: "note deleted.", deleteNote });
  } catch (error) {
    console.log(error);
    res.status(404).status({ error: "internal server console.error();" });
  }
};
