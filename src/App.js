import React, { useState, useEffect } from "react";
import AddTodoForm from "./AddTodoForm";
import TodoList from "./TodoList";

function App() {
	const [todoList, setTodoList] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	/* 
  API data retrieved is in format {
    "records": [
        {
            "id": "recec6UrkyT2MTAay",
            "createdTime": "2022-03-26T19:34:32.000Z",
            "fields": {
                "Title": "Study React"
            }
        },
      ]
  */
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
		<>
			<h1>Todo List</h1>
			<AddTodoForm onAddTodo={addTodo} />
			{isLoading ? (
				<p>Loading...</p>
			) : (
				<TodoList todoList={todoList} onRemoveTodo={removeTodo} />
			)}
		</>
	);
}

export default App;
