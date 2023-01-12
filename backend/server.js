import express from 'express'
import 'dotenv/config'
import cors from 'cors'
import { connect } from 'mongoose'

import userRoutes from './routes/userRoutes.js'
import projectRoutes from './routes/projectRoutes.js'
import taskRoutes from './routes/taskRoutes.js'
import uploadRoutes from "./routes/uploadRoutes.js";

const app = express()
const PORT = process.env.PORT

app.use(express.json())
app.use(cors())

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
  next();
});

app.use('/users', userRoutes)
app.use("/projects", projectRoutes);
app.use('/tasks', taskRoutes)
app.use('/upload', uploadRoutes);

connect(process.env.MONGO_URI).then(() => {
    console.log('connected to db')
    app.listen(PORT, () => {
      console.log(`running at port ${PORT}`);
    });
}).catch((err) => {
    console.log('error connecting to db', err)
})