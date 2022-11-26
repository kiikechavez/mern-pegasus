import express from 'express';
import productsRoutes from './routes/products.routes.js';
import fileUpload from 'express-fileupload';
import {dirname, join} from 'path';
import {fileURLToPath} from 'node:url';

const app = express();
const __dirname = dirname(fileURLToPath(import.meta.url));

//middlewares
app.use(express.json())
app.use(fileUpload({
    useTempFiles: true,
    tempFileDir: './files'
}))

//routes
app.use(productsRoutes)

console.log(__dirname)
app.use(express.static(join(__dirname, '../frontend/build')))

app.get('*', (req, res) => {
    res.sendFile(join(__dirname, '../frontend/build/index.html'))
})

export default app;
