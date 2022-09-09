// Packages imports
import express, { Application } from 'express'
import cors from 'cors'

// * DB
import sequelize from '../db/config';

// * Routes
import userRoutes from '../routes/user'
import authRoutes from '../routes/auth'
import courseRoutes from '../routes/courses'
import postRoutes from '../routes/post'
import commentRoutes from '../routes/comment'
import searchRoutes from '../routes/search'

// * Models
import {
    User,
    Course,
    Teacher,
    Section,
    Post,
    Comment,
    AprovedCourse
} from './'


class Server {

    private app: Application;
    private port: string;
    private apiPaths = {
        auth: '/api/auth',
        user: '/api/user',
        post: '/api/post',
        search: '/api/search',
        courses: '/api/course',
        comment: '/api/comment',
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

            // await User.sync({ force: true })
            // await Course.sync({ force: true })
            // await AprovedCourse.sync({ force: true })
            // await Teacher.sync({ force: true })
            // await Section.sync({ force: true })
            // await Post.sync({ force: true })
            // await Comment.sync({ force: true })

            // console.log('Associatons created')

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
        this.app.use(this.apiPaths.courses, courseRoutes);
        this.app.use(this.apiPaths.auth, authRoutes);
        this.app.use(this.apiPaths.post, postRoutes);
        this.app.use(this.apiPaths.comment, commentRoutes);
        this.app.use(this.apiPaths.search, searchRoutes);
    }


    listen() {
        this.app.listen(this.port, () => {
            console.log('Server running at port  ' + this.port)
        })
    }

}


export default Server;