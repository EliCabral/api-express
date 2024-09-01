"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (0, express_1.Router)();
// Armazena as tarefas em um array (simulação de um banco de dados)
let todos = [{ id: 1, title: 'Learn TypeScript', completed: false },
    {
        id: 2, title: 'Build an API with Express', completed: false
    },
];
// Rota para obter todas as tarefas
router.get('/todos', (req, res) => {
    res.json(todos);
});
// Rota para criar uma nova tarefa
router.post('/todos', (req, res) => {
    const newTodo = {
        id: todos.length + 1,
        title: req.body.title,
        completed: false,
    };
    todos.push(newTodo);
    res.status(201).json(newTodo);
});
// Rota para atualizar uma tarefa existente
router.put('/todos/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const todoIndex = todos.findIndex(todo => todo.id === id);
    if (todoIndex !== -1) {
        todos[todoIndex] = Object.assign(Object.assign({}, todos[todoIndex]), req.body);
        res.json(todos[todoIndex]);
    }
    else {
        res.status(404).json({
            message: 'Todo not found'
        });
    }
});
// Rota para excluir uma tarefa
router.delete('/todos/:id', (req, res) => {
    const id = parseInt(req.params.id);
    todos = todos.filter(todo => todo.id !== id);
    res.status(204).end();
});
exports.default = router;
