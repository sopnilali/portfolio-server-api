import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import status from 'http-status';
import router from './app/routes/index.js';
import globalErrorHandler from './app/middleware/globalErrorHandler.js';
const app = express();
// CORS configuration
app.use(cors({
    origin: ['http://localhost:3000', 'https://www.sharpshooterpubg.xyz', 'https://sharpshooterpubg.xyz', 'https://my-portfolio-dashboard-nine.vercel.app', 'https://mdabduladudui.vercel.app'],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));
// middlwares
app.use(express.json());
app.use(express.urlencoded({ extended: true, limit: '50mb' }));
app.use(cookieParser());
// routers
app.use('/api', router);
//global routes
app.get('/', (req, res) => {
    res.json({
        status: status.OK,
        message: "portfolio server is running!!"
    });
});
// global error handler
app.use(globalErrorHandler);
// not found route handler
app.use((req, res, next) => {
    res.status(status.NOT_FOUND).json({
        success: false,
        message: "Api Not Found",
        error: {
            path: req.originalUrl,
            message: "Your request path is not found!"
        }
    });
});
export default app;
