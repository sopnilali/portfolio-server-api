import express from 'express';
import { UserRoutes } from '../modules/User/user.route.js';
import { AuthRoutes } from '../modules/Auth/auth.route.js';
import { ProjectRoutes } from '../modules/Project/project.route.js';
import { ExperienceRoutes } from '../modules/Experience/experience.route.js';
import { BlogRoutes } from '../modules/Blog/blog.route.js';
import { SkillRoutes } from '../modules/Skill/skill.route.js';
import { ContactRoutes } from '../modules/Contact/contact.route.js';
import { Aboutroutes } from '../modules/About/about.route.js';
const router = express.Router();
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
    },
    {
        path: '/about',
        routes: Aboutroutes
    }
];
moduleRoutes.forEach(({ path, routes }) => {
    router.use(path, routes);
});
export default router;
