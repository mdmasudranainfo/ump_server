// this is user route file
import express from "express";

import ValidationRequest from "../middleware/validateRequest";
import { AcademicFacultyController } from "./AcademicFaculty.controller";
import CreateAcademicFacultyZodSchema from "./AcademicFaculty.validation";

const router = express.Router();

router.post(
  "/create",
  ValidationRequest(CreateAcademicFacultyZodSchema),
  AcademicFacultyController.createAcademicFaculty
);

router.get("/", AcademicFacultyController.getAllAcademicFaculty);

export const academicFacultyRoute = router;
