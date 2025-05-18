import express from 'express'
import { UserRoutes } from '../modules/User/user.route';
import { AuthRoutes } from '../modules/Auth/auth.route';
import {  ProjectRoutes } from '../modules/Project/project.route';
import { ExperienceRoutes } from '../modules/Experience/experience.route';
import { BlogRoutes } from '../modules/Blog/blog.route';
import { SkillRoutes } from '../modules/Skill/skill.route';
import { ContactRoutes } from '../modules/Contact/contact.route';

const router = express.Router()


const moduleRoutes = [
    {
        path: "/user",
        routes: UserRoutes
    },
    {
        path: '/auth',
        routes: AuthRoutes
    },
    {
        path: '/experience',
        routes: ExperienceRoutes
    },
    {
        path: '/project',
        routes: ProjectRoutes
    },
    {
        path: '/blog',
        routes: BlogRoutes
    },
    {
        path: '/skill',
        routes: SkillRoutes
    },
    {
        path: '/contact',
        routes: ContactRoutes
    }
]

moduleRoutes.forEach(({path, routes})=> {
    router.use(path, routes);
});


export default  router

