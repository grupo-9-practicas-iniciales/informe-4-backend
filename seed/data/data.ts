

interface CoursesSeed {
    id: number;
    name: string;
    code: string;
    credits: number;
}


interface TeacherSeed {
    id: number;
    name: string;
}

interface SectionSeed {
    idCourse: number;
    idTeacher: number;
    section: string;
}

// ! First define the teachers and courses, then the sections
// ! The id is just for the seed (in a representative way), it is not used in the app
// ! Watch the example bellow

// export const teachers: TeacherSeed[] = []
// export const courses: CoursesSeed[] = []
// export const sections: SectionSeed[] = []

// ? Example

export const teachers: TeacherSeed[] = [
    {
        id: 1,
        name: 'Luis Espino'
    }
]

export const courses: CoursesSeed[] = [
    {
        id: 1,
        name: 'Compiladores 1',
        code: '0101',
        credits: 5,
    }
]

// Relate the courses with the teachers
export const sections: SectionSeed[] = [
    {
        idCourse: 1,
        idTeacher: 1,
        section: 'A+'
    }
]


