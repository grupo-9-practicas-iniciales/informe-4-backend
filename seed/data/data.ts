

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
    { id: 1, name: 'Luis Fernando Espino Barrios'},
    { id: 2, name:'William Samuel Guevara Orellana '},
    { id: 3, name:'Edgar Francisco Rodas Robledo'},
    { id: 4, name:'Otto Rene Escobar Leiva '},
    { id: 5, name:'Gabriel Alejandro Díaz López'},
    { id: 6, name:'Otto Amilcar Rodriguez Acosta'},
    { id: 7, name:'Luis Alberto Arias'},
    { id: 8, name:'Alvaro Giovanni Longo Morales'},
    { id: 9, name:'Ileana Guisela Ralda Recinos'},
    { id: 10, name:'Evelyn Carolina Morales Ruiz'},
    { id: 11, name:'Edgar Rene Ornelis Hoil'},
    { id: 12, name:'Alvaro Obrayan Hernandez García'},
    { id: 13, name:'Luis Alberto Vettorazzi Espana'},
    { id: 14, name:'Mario José Bautista Fuentes'},
    { id: 15, name:'Marlon Francisco Orellana López'},
    { id: 16, name:'William Estudardo Escobar Argueta'},
    { id: 17, name:'Moises Eduardo Velazquez Oliva'},
    { id: 18, name:'Herman Igor Veliz Linares'},
    { id: 19, name:'Neftali de Jesus Calderon Mendez'},
    { id: 20, name:'Edgar Francisco Rodas Robledo'},
    { id: 21, name:'Marlon Antonio Pérez Turk'},
    { id: 22, name:'Claudia Liceth Rojas Morales'},
    { id: 23, name:'José Manuel Ruiz Juarez'},
    { id: 24, name:'Byron Rodolfo Zepeda Arevalo'},
    { id: 25, name:'Edwin Estuardo Zapeta Gómez'},
    { id: 26, name:'Vivian Damaris Campos Gonzalez'},
    { id: 27, name:'David Estuardo Morales'},
    { id: 28, name:'Zulma Karina Aguirre Ordonez'},
    { id: 29, name:'Virginia Victoria Tala Ayerdi'},
    { id: 30, name:'Floriza Felipa Avila Pesquera de Medinilla'},
    { id: 31, name:'Oscar Alejandro Paz Campos'},
    { id: 32, name:'Juan Alvaro Díaz Ardavin'},
    { id: 33, name:'Cesar Augusto Fernandez Cacerez'},
    { id: 34, name:'Miguel Angel Cancinos Rendon'},
    { id: 35, name:'Bayron Wosvely López López'},
    { id: 36, name:'Edgar Ruben Saban Raxon'},
    { id: 37, name:'Manuel Haroldo Castillo Reyna'},
    { id: 38, name:'Kevin Adiel Lajpop Ajpacaja'},
    { id: 39, name:'Pedro Pablo Hernández Ramirez'},
    { id: 40, name:'Allan Alberto Morataya Gómez'},
    { id: 41, name:'Manuel Fernando López Fernández'},
    { id: 42, name:'Ludwing Federico Altan Sac'},
    { id: 43, name:'Sergio Arnaldo Mendez Aguilar'},
    { id: 44, name:'Everest Darwin Medinilla Rodriguez'},
    { id: 45, name:'Marco Tulio Aldana Prillwitz'},
    { id: 46, name:'Jorge Luis Alvarez Mejia'}
]

export const courses: CoursesSeed[] = [
    {id: 1, name: 'Compiladores 1', code: '0101',credits: 5},
    {id: 2, name:'Análisis y Diseño de Sistemas 1', code:'0283', credits:5},
    {id: 3, name:'Arquitectura de Computadoras y Ensambladores 1', code:'0778', credits:5},
    {id: 4, name:'Arquitectura de Computadoras y Ensambladores 2', code:'0779', credits:4},
    {id: 5, name:'Bases de Datos 1', code:'0774', credits:5},
    {id: 6, name:'Bases de Datos 2', code:'0775', credits:4},
    {id: 7, name:'Economia', code:'0014', credits:4},
    {id: 8, name:'Estructura de Datos', code:'0772', credits:5},
    {id: 9, name:'Sistemas Organizacionales y Gerenciales 2', code:'0787', credits:0},
    {id: 10, name:'Inteligencia Artificial 1', code:'0972', credits:4},
    {id: 11, name:'Introducción a la Programación y Computación 1', code:'0770', credits:4},
    {id: 12, name:'Introducción a la Programación y Computación 2', code:'0771', credits:5},
    {id: 13, name:'Lenguajes Formales y de Programación', code:'0796', credits:3},
    {id: 14, name:'Logica de Sistemas', code:'0795', credits:2},
    {id: 15, name:'Manejo e Implementación de Archivos', code:'0773', credits:4},
    {id: 16, name:'Modelacion y Simulacion 1', code:'0729', credits:5},
    {id: 17, name:'Modelacion y Simulacion 2', code:'0720', credits:5},
    {id: 18, name:'Organización Computacional', code:'0964', credits:3},
    {id: 19, name:'Organización de Lenguajes y Compiladores 2', code:'0781', credits:5},
    {id: 20, name:'Organización de Lenguajes y Compiladores 1', code:'0777', credits:4},
    {id: 21, name:'Prácticas Iniciales', code:'2025', credits:0},
    {id: 22, name:'Redes de Computadoras 1', code:'0970', credits:4},
    {id: 23, name:'Redes de Computadoras 2', code:'0975', credits:4},
    {id: 24, name:'Seminario de Sistemas 1', code:'0797', credits:3},
    {id: 25, name:'Seminario de Sistemas 2', code:'0798', credits:3},
    {id: 26, name:'Sistemas Operativos 1', code:'0281', credits:5},
    {id: 27, name:'Sistemas Operativos 2', code:'0285', credits:4},
    {id: 28, name:'Sistemas Organizacionales y Gerenciales 1', code:'0786', credits:4},
    {id: 29, name:'Software Avanzado', code:'0780', credits:6},
    {id: 30, name:'Teoría de Sistemas 1', code:'0722', credits:5},
    {id: 31, name:'Teoría de Sistemas 2', code:'0724', credits:5},
    {id: 32, name:'Inteligencia Artificial 2', code:'0968', credits:4}
]

// Relate the courses with the teachers
export const sections: SectionSeed[] = [
    { idCourse: 1, idTeacher: 1, section: 'A+'},
    { idCourse: 2, idTeacher: 2, section: 'A'},
    { idCourse: 2, idTeacher: 3, section: 'B'},
    { idCourse: 2, idTeacher: 3, section: 'N'},
    { idCourse: 3, idTeacher: 4, section: 'A'},
    { idCourse: 3, idTeacher: 4, section: 'B'},
    { idCourse: 4, idTeacher: 5, section: 'N'},
    { idCourse: 5, idTeacher: 6, section: 'A'},
    { idCourse: 5, idTeacher: 1, section: 'B'},
    { idCourse: 6, idTeacher: 7, section: 'B'},
    { idCourse: 6, idTeacher: 8, section: 'N'},
    { idCourse: 7, idTeacher: 9, section: 'A'},
    { idCourse: 7, idTeacher: 10, section: 'P'},
    { idCourse: 8, idTeacher: 11, section: 'A'},
    { idCourse: 8, idTeacher: 12, section: 'B'},
    { idCourse: 8, idTeacher: 1, section: 'C'},
    { idCourse: 9, idTeacher: 13, section: 'A'},
    { idCourse: 9, idTeacher: 14, section: 'N'},
    { idCourse: 10, idTeacher: 1, section: 'A'},
    { idCourse: 11, idTeacher: 15, section: 'A'},
    { idCourse: 11, idTeacher: 16, section: 'B'},
    { idCourse: 11, idTeacher: 17, section: 'C'},
    { idCourse: 11, idTeacher: 18, section: 'D'},
    { idCourse: 11, idTeacher: 19, section: 'E'},
    { idCourse: 11, idTeacher: 16, section: 'F'},
    { idCourse: 11, idTeacher: 20, section: 'G'},
    { idCourse: 12, idTeacher: 21, section: 'A'},
    { idCourse: 12, idTeacher: 22, section: 'B'},
    { idCourse: 12, idTeacher: 23, section: 'C'},
    { idCourse: 12, idTeacher: 24, section: 'D'},
    { idCourse: 12, idTeacher: 25, section: 'N'},
    { idCourse: 13, idTeacher: 6, section: 'A+'},
    { idCourse: 13, idTeacher: 26, section: 'A-'},
    { idCourse: 13, idTeacher: 27, section: 'B+'},
    { idCourse: 13, idTeacher: 28, section: 'B-'},
    { idCourse: 14, idTeacher: 29, section: 'A'},
    { idCourse: 14, idTeacher: 30, section: 'B'},
    { idCourse: 14, idTeacher: 30, section: 'C'},
    { idCourse: 15, idTeacher: 31, section: 'A'},
    { idCourse: 15, idTeacher: 32, section: 'B'},
    { idCourse: 15, idTeacher: 16, section: 'C'},
    { idCourse: 16, idTeacher: 33, section: 'O'},
    { idCourse: 16, idTeacher: 34, section: 'N'},
    { idCourse: 17, idTeacher: 33, section: 'A'},
    { idCourse: 18, idTeacher: 4, section: 'A'},
    { idCourse: 18, idTeacher: 4, section: 'B'},
    { idCourse: 19, idTeacher: 35, section: 'A'},
    { idCourse: 19, idTeacher: 1, section: 'D'},
    { idCourse: 19, idTeacher: 36, section: 'N'},
    { idCourse: 20, idTeacher: 37, section: 'B'},
    { idCourse: 20, idTeacher: 38, section: 'C'},
    { idCourse: 20, idTeacher: 14, section: 'N'},
    { idCourse: 21, idTeacher: 30, section: 'C'},
    { idCourse: 22, idTeacher: 39, section: 'N'},
    { idCourse: 22, idTeacher: 40, section: 'Q'},
    { idCourse: 23, idTeacher: 41, section: 'A'},
    { idCourse: 24, idTeacher: 41, section: 'A'},
    { idCourse: 24, idTeacher: 42, section: 'B'},
    { idCourse: 25, idTeacher: 13, section: 'A'},
    { idCourse: 26, idTeacher: 43, section: 'N'},
    { idCourse: 27, idTeacher: 11, section: 'A'},
    { idCourse: 28, idTeacher: 25, section: 'N'},
    { idCourse: 29, idTeacher: 44, section: 'A'},
    { idCourse: 29, idTeacher: 45, section: 'N'},
    { idCourse: 30, idTeacher: 46, section: 'A'},
    { idCourse: 31, idTeacher: 46, section: 'A'},
    { idCourse: 32, idTeacher: 1, section: 'A'}
]


