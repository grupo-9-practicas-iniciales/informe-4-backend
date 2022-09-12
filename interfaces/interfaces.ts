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
    relatedCourse: any;
    relatedTeacher: any;
}

export interface CommentInterface {

    idComment: number;
    message: string;
    createdAt: Date;
    user: {
        idUser: number;
        names: string;
        lastnames: string;
        email: string;
    };

}


export interface CourseInterface {

    idCourse: number;
    name: string;
    code: string;
    credits: number;

}

export interface TeacherInterface {

    idTeacher: number;
    names: string;

}

export interface CourseSectionInterface {
    section: string;
}


export interface ErrorInterface {
    msg: string,
    param?: string,
    location?: string
}