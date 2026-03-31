export interface Assignment {
  id: number;
  description: string;
  dueDateSub: Date;
  subjectName?: string; // الاسم
  className?: string; // الاسم
  gradeLevelName?: string; // الاسم

  subjectId: number;
  gradeLevelId: number;
  classId: number;

}
