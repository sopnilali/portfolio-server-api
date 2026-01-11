"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_route_1 = require("../modules/User/user.route");
const auth_route_1 = require("../modules/Auth/auth.route");
const project_route_1 = require("../modules/Project/project.route");
const experience_route_1 = require("../modules/Experience/experience.route");
const blog_route_1 = require("../modules/Blog/blog.route");
const skill_route_1 = require("../modules/Skill/skill.route");
const contact_route_1 = require("../modules/Contact/contact.route");
const about_route_1 = require("../modules/About/about.route");
const router = express_1.default.Router();
const moduleRoutes = [
    {
        path: "/user",
        routes: user_route_1.UserRoutes
    },
    {
        path: '/auth',
        routes: auth_route_1.AuthRoutes
    },
    {
        path: '/experience',
        routes: experience_route_1.ExperienceRoutes
    },
    {
        path: '/project',
        routes: project_route_1.ProjectRoutes
    },
    {
        path: '/blog',
        routes: blog_route_1.BlogRoutes
    },
    {
        path: '/skill',
        routes: skill_route_1.SkillRoutes
    },
    {
        path: '/contact',
        routes: contact_route_1.ContactRoutes
    },
    {
        path: '/about',
        routes: about_route_1.Aboutroutes
    }
];
moduleRoutes.forEach(({ path, routes }) => {
    router.use(path, routes);
});
exports.default = router;
