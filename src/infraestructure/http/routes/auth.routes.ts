import { Router } from "express";
import { tokenValidation } from "../../middlewares";
import { getMe, profile, signin, signup } from "../controllers";

const router: Router = Router();

router.post("/signup", signup);
router.post("/signin", signin);
router.get("/getMe", tokenValidation, getMe);
router
  .route("/profile")
  .get(tokenValidation, profile)
  .put(tokenValidation, profile);

export default router;
