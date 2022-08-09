import usersRoute from "./usersRoutes.js"
import productRoutes from "./productRoutes.js"
import { Router } from "express";

const router = Router();

router.use('/api',usersRoute);
router.use('/api', productRoutes)



export default router;