import { Router } from "express";
import { getProviders } from "controllers/providerController";

const router = Router();

router.get("/providers", getProviders);

export default router;