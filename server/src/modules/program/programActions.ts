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

export default { browse, read, add, edit, destroy };
