
export interface StudentInterface {
    id: number;
    name: string;
    gradeLevel?: string;
    class?: string;
    gradeLevelId: number;
    classId: string;
    teacherId: number;
    teacherName?: string;
    isAbsent?: boolean;
    parentId:number;
    parentName?:string
    // grades: GradeInterface[]; // 👈 كل طالب عنده لستة علامات

    grade?: number; // 👈 عشان نربط TextField للعلامة


}
