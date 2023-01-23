import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AddTodoForm from "./AddTodoForm";
import TodoList from "./TodoList";
import styles from "./App.module.css";

function App() {
	const [todoList, setTodoList] = useState([]);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		const url = `https://api.airtable.com/v0/${process.env.REACT_APP_AIRTABLE_BASE_ID}/Default`;
		try {
			fetch(url, {
				headers: {
					Authorization: `Bearer ${process.env.REACT_APP_AIRTABLE_API_KEY}`,
				},
			})
				.then((result) => result.json())
				.then((result) => setTodoList(result.records));
			setIsLoading(false);
		} catch (error) {
			console.log(error.message);
		}
	}, []);

	const addTodo = (newTodo) => {
		setTodoList([...todoList, newTodo]);
	};

	const removeTodo = (id) => {
		const updatedTodos = todoList.filter((todo) => todo.id !== id);
		setTodoList(updatedTodos);
	};

	useEffect(() => {
		if (!isLoading) {
			localStorage.setItem("savedTodoList", JSON.stringify(todoList));
		}
	}, [todoList, isLoading]);

	return (
		<BrowserRouter>
			<Routes>
				<Route
					exact
					path="/"
					element={
						<>
							<h1>Todo List</h1>
							<AddTodoForm onAddTodo={addTodo} />
							{isLoading ? (
								<p>Loading...</p>
							) : (
								<TodoList todoList={todoList} onRemoveTodo={removeTodo} />
							)}
						</>
					}
				/>
				<Route path="/new" element={<h1>New Todo List</h1>} />
			</Routes>
		</BrowserRouter>
	);
}

export default App;
