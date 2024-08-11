import express from "express";
import routes from "./routes";
import cookieParser from "cookie-parser";
import cors from "cors";
import "./bootstrap";



const app = express();

const corsOptions = {
    origin: process.env.FRONTEND_URL, 
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
    optionsSuccessStatus: 204
};
  
app.use(cors(corsOptions));
app.use(cookieParser());


app.use(express.json());
app.use(routes);

app.use((req, res, next) => {
    if (req.header('x-forwarded-proto') !== 'https') {
      res.redirect(`https://${req.header('host')}${req.url}`);
    } else {
      next();
    }
});

export default app;




