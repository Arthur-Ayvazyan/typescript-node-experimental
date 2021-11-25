import {RequestHandler} from "express";

import {Todo} from "../models/todo";

let TODOS: Todo[] = [];

export const createTodo: RequestHandler = (req, res, next) => {

    const text = (req.body as {text: string }).text;
    const newTodo = new Todo(Math.random().toString(), text);

    TODOS.push(newTodo);

    res.status(201).json({
        message: 'Created the todo!',
        cratedTodo: newTodo
    })
};

export const getTodos: RequestHandler = (req, res, next) => {
    res.json({todos: TODOS})
};

export const updateTodo: RequestHandler<{id: string}> = (req, res, next) => {

    const todoId = req.params.id;
    const updatedText = (req.body as {text: string}).text;
    const updatableTodo = TODOS.find((todo) => todo.id === todoId);

    if(updatableTodo) {
        updatableTodo.text = updatedText
    }

    res.status(201).json({
        message: 'Todo was updated!',
        updatableTodo
    })
};

export const deleteTodo: RequestHandler<{id: string}> = (req, res, next) => {

    const todoId = req.params.id;
    const deletableTodo = TODOS.find((todo) => todo.id === todoId);

    if(deletableTodo) {
        TODOS = TODOS.filter((todo) => todo.id !== todoId)
    }

    res.status(200).json({
        message: 'Todo was deleted!',
        deletableTodo
    })
}