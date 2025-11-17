import { Routes } from '@angular/router';
import { Teacher } from './components/teacher/teacher';
import { TeacherAttendance } from './components/teacher-attendance/teacher-attendance';
import { TeacherAssignment } from './components/teacher-assignment/teacher-assignment';
import { TeacherGrade } from './components/teacher-grade/teacher-grade';
import { Parent } from './components/parent/parent';
import { ParentAttendance } from './components/parent-attendance/parent-attendance';
import { ParentGrade } from './components/parent-grade/parent-grade';
import { Login } from './components/login/login';
import { ParentAssignment } from './components/parent-assignment/parent-assignment';
import { AdminHome } from './components/admin-home/admin-home';
import { TeacherAddStu } from './components/teacher-add-stu/teacher-add-stu';
import { AdminTeacher } from './components/admin-teacher/admin-teacher';
import { AdminParent } from './components/admin-parent/admin-parent';
import { AdminStudent } from './components/admin-student/admin-student';
import { authGuard } from './guards/auth-guard';
export const routes: Routes = [

    { path: '', redirectTo: '/login', pathMatch: 'full' },

    { path: 'teacher', component: Teacher, canActivate: [authGuard] },
    { path: 'teacherAttendance', component: TeacherAttendance, canActivate: [authGuard] },
    { path: 'teacherAssignment', component: TeacherAssignment, canActivate: [authGuard] },
    { path: 'teacherGrade', component: TeacherGrade, canActivate: [authGuard] },
    { path: 'addStu', component: TeacherAddStu, canActivate: [authGuard] },

    { path: 'parent', component: Parent, canActivate: [authGuard] },
    { path: 'parentAttendance', component: ParentAttendance, canActivate: [authGuard] },
    { path: 'parentGrade', component: ParentGrade, canActivate: [authGuard] },
    { path: 'parenAssignment', component: ParentAssignment, canActivate: [authGuard] },

    { path: 'admin', component: AdminHome, canActivate: [authGuard] },
    { path: 'adminTeacher', component: AdminTeacher, canActivate: [authGuard] },
    { path: 'adminParent', component: AdminParent, canActivate: [authGuard] },
    { path: 'adminStudent', component: AdminStudent, canActivate: [authGuard] },

    { path: 'login', component: Login },





];

