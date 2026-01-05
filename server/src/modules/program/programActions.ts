import type { RequestHandler } from "express";
import programRepository from "./programRepository";

const browse: RequestHandler = async (req, res, next) => {
  try {
    const programs = await programRepository.readAll();
    res.json(programs);
  } catch (err) {
    next(err);
  }
};

const read: RequestHandler = async (req, res, next) => {
  try {
    const id = Number(req.params.id);
    const program = await programRepository.read(id);

    if (program == null) {
      res.sendStatus(404);
    } else {
      res.json(program);
    }
  } catch (err) {
    next(err);
  }
};

const validate: RequestHandler = (req, res, next) => {
  type ValidationError = {
    field: string;
    message: string;
  };

  const errors: ValidationError[] = [];
  const { title, synopsis, poster, country, year } = req.body;

  if (title == null) {
    errors.push({ field: "title", message: "The field is required" });
  } else if (typeof title !== "string") {
    errors.push({ field: "title", message: "Should be a string" });
  } else if (title.length > 255) {
    errors.push({
      field: "title",
      message: "Should contain less than 255 characters",
    });
  }

  if (synopsis == null) {
    errors.push({ field: "synopsis", message: "The field is required" });
  } else if (typeof synopsis !== "string") {
    errors.push({ field: "synopsis", message: "Should be a string" });
  }

  if (poster != null && typeof poster !== "string") {
    errors.push({ field: "poster", message: "Should be a string URL" });
  }

  if (country != null && typeof country !== "string") {
    errors.push({ field: "country", message: "Should be a string" });
  }

  if (year != null && Number.isNaN(Number(year))) {
    errors.push({ field: "year", message: "Should be a number" });
  }

  if (errors.length === 0) {
    next();
  } else {
    res.status(400).json({ validationErrors: errors });
  }
};

const add: RequestHandler = async (req, res, next) => {
  try {
    const newProgram = {
      title: req.body.title,
      synopsis: req.body.synopsis,
      poster: req.body.poster,
      country: req.body.country,
      year: req.body.year,
    };

    const insertId = await programRepository.create(newProgram);
    res.status(201).json({ insertId });
  } catch (err) {
    next(err);
  }
};

const edit: RequestHandler = async (req, res, next) => {
  try {
    const id = Number(req.params.id);
    const updatedProgram = {
      title: req.body.title,
      synopsis: req.body.synopsis,
      poster: req.body.poster,
      country: req.body.country,
      year: req.body.year,
    };

    const affectedRows = await programRepository.update(id, updatedProgram);

    if (affectedRows === 0) {
      res.sendStatus(404);
    } else {
      res.json({ message: "Program mis à jour" });
    }
  } catch (err) {
    next(err);
  }
};

const destroy: RequestHandler = async (req, res, next) => {
  try {
    const id = Number(req.params.id);
    const affectedRows = await programRepository.delete(id);

    if (affectedRows === 0) {
      res.sendStatus(404);
    } else {
      res.json({ message: "Program supprimé" });
    }
  } catch (err) {
    next(err);
  }
};

export default { browse, read, add, edit, destroy, validate };
