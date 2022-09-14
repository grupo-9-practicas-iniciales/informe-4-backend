export interface UserInterface {
    names: string;
    lastnames: string;
    email: string;
    idStudent: string;
    idUser: number;
}


// export interface PostInterface {
//     idPost: number;
//     title: string;
//     description: string;
//     createdAt: Date;
//     user: UserInterface;
//     relatedCourse: any;
//     relatedTeacher: any;
// }

export interface PostInterface {
    idPost: number;
    title: string;
    description: string;
    createdAt: string;
    user: UserInterface;
    section: {
        idSection: number;
        section: string;
        teacher: {
            idTeacher: number;
            name: string;
        } | null;
        course: {
            idCourse: number;
            name: string;
            code: string;
        } | null;
    };
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