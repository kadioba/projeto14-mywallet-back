import { Router } from 'express';
import { logOut, signIn, signUp } from '../controllers/authControler.js';
import validateSchema from '../middlewares/validateSchema.middleware.js';
import { loginSchema, userSchema } from '../schemas/auth.schemas.js';

const authRouter = Router();

authRouter.post("/sign-up", validateSchema(userSchema), signUp)
authRouter.post("/sign-in", validateSchema(loginSchema), signIn)
authRouter.post("/logout", logOut)

export default authRouter