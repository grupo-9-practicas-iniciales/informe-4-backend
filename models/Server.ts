// Packages imports
import express, { Application } from 'express'
import cors from 'cors'
import sequelize from '../db/config';
import userRoutes from '../routes/user'

import {
    User, Course, UserAprovedCourse, Teacher, CourseSection,
    Post, PostHasTeacher, CourseHasPost, Comment
} from './'

// Routes imports


class Server {

    private app: Application;
    private port: string;
    private apiPaths = {
        auth: '/api/auth',
        user: '/api/user',
        post: '/api/post',
        search: '/api/search',
    }

    constructor() {
        this.app = express();
        this.port = process.env.PORT || '8080';

        this.dbConnection();

        this.middlewares();

        this.routes();
    }

    async dbConnection() {
        try {

            // * Check connection
            await sequelize.authenticate()
            console.log('Connected to DB')

            // ! Creates tables
            // User.sync({ force: true })
            // Course.sync({ force: true })
            // UserAprovedCourse.sync({ force: true })
            // Teacher.sync({ force: true })
            // CourseSection.sync({ force: true })
            // Post.sync({ force: true })
            // PostHasTeacher.sync({ force: true })
            // CourseHasPost.sync({ force: true })
            // Comment.sync({ force: true })

            // TODO: Seed Course and Teacher

        } catch (error: any) {
            console.error('Error at connecting DB')
            console.error(error)
        }
    }

    middlewares() {

        // *CORS*
        this.app.use(cors());

        // * Body parsing *
        this.app.use(express.json())
    }

    routes() {
        this.app.use(this.apiPaths.user, userRoutes);
    }


    listen() {
        this.app.listen(this.port, () => {
            console.log('Server running at port  ' + this.port)
        })
    }

}


export default Server;