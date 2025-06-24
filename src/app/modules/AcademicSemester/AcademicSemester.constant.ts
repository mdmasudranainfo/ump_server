import { Month } from "./AcademicSemester.interface";

export const AcademicSemesterMonths: Month[] = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export const academicSemesterTitleCodeMapper: { [key: string]: string } = {
  Autumn: "01",
  Summer: "02",
  Fall: "03",
};

export type IFilters = {
  searchTerm?: string;
  title?: string;
  year?: string;
  code?: string;
};
