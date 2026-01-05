import type { RequestHandler } from "express";
import categoryRepository from "./categoryRepository";

// BROWSE
const browse: RequestHandler = async (req, res, next) => {
  try {
    const categories = await categoryRepository.readAll();
    res.json(categories);
  } catch (err) {
    next(err);
  }
};

const read: RequestHandler = async (req, res, next) => {
  try {
    const id = Number(req.params.id);
    const category = await categoryRepository.read(id);

    if (category == null) {
      res.sendStatus(404);
    } else {
      res.json(category);
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
  const { name } = req.body;

  if (name == null) {
    errors.push({ field: "name", message: "The field is required" });
  } else if (typeof name !== "string") {
    errors.push({ field: "name", message: "Should be a string" });
  } else if (name.length > 255) {
    errors.push({
      field: "name",
      message: "Should contain less than 255 characters",
    });
  }

  if (errors.length === 0) {
    next();
  } else {
    res.status(400).json({ validationErrors: errors });
  }
};

const add: RequestHandler = async (req, res, next) => {
  try {
    const newCategory = {
      name: req.body.name,
    };

    const insertId = await categoryRepository.create(newCategory);
    res.status(201).json({ insertId });
  } catch (err) {
    next(err);
  }
};

const edit: RequestHandler = async (req, res, next) => {
  try {
    const id = Number(req.params.id);
    const updatedCategory = {
      name: req.body.name,
    };

    const affectedRows = await categoryRepository.update(id, updatedCategory);

    if (affectedRows === 0) {
      res.sendStatus(404);
    } else {
      res.json({ message: "Category mise à jour" });
    }
  } catch (err) {
    next(err);
  }
};

const destroy: RequestHandler = async (req, res, next) => {
  try {
    const id = Number(req.params.id);
    const affectedRows = await categoryRepository.delete(id);

    if (affectedRows === 0) {
      res.sendStatus(404);
    } else {
      res.json({ message: "Category supprimée" });
    }
  } catch (err) {
    next(err);
  }
};

export default { browse, read, add, edit, destroy, validate };
