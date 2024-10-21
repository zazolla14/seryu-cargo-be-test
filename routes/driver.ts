import expressPromiseRouter from "express-promise-router";
import { listDriverSalary } from "../src/controllers/drivers.js";
import { listDriverSalary as listDriverSalaryValidation } from "../src/validations/listDriverSalary.js";

const router = expressPromiseRouter();

// Define route handlers
router.get(
  "/api/v1/salary/driver/list",
  listDriverSalaryValidation,
  listDriverSalary
);

export default router;
