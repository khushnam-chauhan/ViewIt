import express from "express";

import { authCheck, login, logout, signup } from "../controllers/auth.controller.js";
import { protectRoute } from "../middleware/protectRoute.js"

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logout);

router.get("/authCheck", protectRoute, authCheck);
const app = express();
//"api/v2/signup"

// Middleware to parse JSON
app.use(express.json());

export default router;
