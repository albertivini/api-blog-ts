import 'reflect-metadata';
import express, { Request, Response, NextFunction } from 'express';
import { router } from './routes'
import cors from 'cors'
import './database'

const app = express()

app.use(cors())

app.use(express.json())

app.use(router)

app.listen(3000, () => console.log('Porta: 3000'))


