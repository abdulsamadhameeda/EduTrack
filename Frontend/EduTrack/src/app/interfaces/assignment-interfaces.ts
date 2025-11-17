export interface Assignment {
  id: number;
  description: string;
  dueDateSub: Date;
  subjectName?: string; // الاسم
  class?: string; // الاسم
  gradeLevel?: string; // الاسم

  subjectId: number;
  gradeLevelId: number;
  classId: number;

}
