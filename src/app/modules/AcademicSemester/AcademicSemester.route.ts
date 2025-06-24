// this is user route file
import express from "express";
import { AcademicSemesterController } from "./AcademicSemester.controller";
import ValidationRequest from "../middleware/validateRequest";
import { AcademicSemesterValidation } from "./AcademicSemester.validation";

const router = express.Router();

router.post(
  "/create",
  ValidationRequest(AcademicSemesterValidation.CreateAcademicSemesterZodSchema),
  AcademicSemesterController.createAcademicSemester
);

router.get("/all", AcademicSemesterController.getAllAcademicSemesters);
router.get("/:id", AcademicSemesterController.getSingleAcademicSemester);
router.patch(
  "/:id",
  ValidationRequest(AcademicSemesterValidation.UpdateAcademicSemesterZodSchema),
  AcademicSemesterController.updateAcademicSemester
);
router.delete("/:id", AcademicSemesterController.deleteAcademicSemester);

export const academicSemesterRoute = router;
