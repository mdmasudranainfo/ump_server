export type Month =
  | "January"
  | "February"
  | "March"
  | "April"
  | "May"
  | "June"
  | "July"
  | "August"
  | "September"
  | "October"
  | "November"
  | "December";

interface IAcademicSemester {
  title: "Autumn" | "Fall" | "Summer";
  year: string;
  code: "01" | "02" | "03";
  startMonth: Month;
  endMonth: Month;
}
export default IAcademicSemester;
