// this is user route file
import express from "express";
import ValidationRequest from "../middleware/validateRequest";
import academicDepartmentZodValidation from "./academicDepartment.validation";
import { AcademicDepartmentController } from "./academicDepartment.controller";

const router = express.Router();

router.post(
  "/create",
  ValidationRequest(academicDepartmentZodValidation),
  AcademicDepartmentController.createAcademicDepartment
);

router.get("/", AcademicDepartmentController.getAllAcademicDepartment);

export const academicDepartmentRoute = router;
