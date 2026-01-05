import express from "express";

const router = express.Router();

/* ************************************************************************* */
// Define Your API Routes Here
/* ************************************************************************* */

// Define item-related routes
import itemActions from "./modules/item/itemActions";

router.get("/api/items", itemActions.browse);
router.get("/api/items/:id", itemActions.read);
router.post("/api/items", itemActions.add);

/* ************************************************************************* */

// Declaration of a "Welcome" route

import sayActions from "./modules/say/sayActions";

router.get("/", sayActions.sayWelcome);

/* ************************************************************************* */

// Declaration of a "Program" route

import categoryActions from "./modules/category/categoryActions";
import programActions from "./modules/program/programActions";

router.get("/api/categories", categoryActions.browse);
router.get("/api/categories/:id", categoryActions.read);
router.post("/api/categories", categoryActions.add);
router.put("/api/categories/:id", categoryActions.edit);
router.delete("/api/categories/:id", categoryActions.destroy);

router.get("/api/programs", programActions.browse);
router.get("/api/programs/:id", programActions.read);
router.post("/api/programs", programActions.add);
router.put("/api/programs/:id", programActions.edit);
router.delete("/api/programs/:id", programActions.destroy);

/* ************************************************************************* */
export default router;
