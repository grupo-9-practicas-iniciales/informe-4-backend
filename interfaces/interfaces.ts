export interface UserInterface {
    names: string;
    lastnames: string;
    email: string;
    idStudent: string;
    idUser: number;
}


export interface PostInterface {
    idPost: number;
    title: string;
    description: string;
    createdAt: Date;
    user: UserInterface;
    courses: CourseInterface[];
    teachers: TeacherInterface[];
}

export interface CommentInterface {

    idComment: number;
    message: string;
    createdAt: Date;
    user: UserInterface;

}


export interface CourseInterface {

    idCourse: number;
    name: string;
    code: string;
    credits: number;
    sections?: CourseSectionInterface[];

}

export interface TeacherInterface {

    idTeacher: number;
    names: string;

}

export interface CourseSectionInterface {
    section: string;
    teacher: TeacherInterface;
}


export interface ErrorInterface {
    msg: string,
    param?: string,
    location?: string
}