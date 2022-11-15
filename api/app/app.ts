import express, { Express } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import morgan from 'morgan';
import helmet from 'helmet';
import compression from 'compression';
import fs from 'fs';
import connectToDB from './config/mongoConnection';
dotenv.config();

// init express app!
const app: Express = express();

// db connection!
connectToDB;

// use middlewares!
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));
app.use(helmet());
app.use(compression());

// use routes in dynamic way!
fs.readdirSync('app/routes').map((route: string) => {
	import(`./routes/${route}`).then(r => {
		app.use('/api', r.default);
	});
});

// make some magic!
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`⚡️ App is up on port: ${port}`));
