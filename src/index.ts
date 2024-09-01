import express from 'express';
import todoRoutes from './routes/todos';

const app = express();
const PORT = 3000;
// Middleware para permitir o processamento de JSON

app.use(express.json());
// Usando as rotas de todos

app.use('/api', todoRoutes);
// Iniciando o servidor

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});