import React from 'react';
import TodoListItem from './TodoListItem';

const TodoList = ({
	todoList,
	onRemoveTodo,
	onUpdateTodo,
	isMuted,
	loadTodos,
}) => {
	const todosCompleted = todoList.filter((todo) => todo.completed === true);
	return (
		<>
			<ul>
				{todoList.map((todo) => (
					<TodoListItem
						key={todo.id}
						todo={todo}
						onUpdateTodo={onUpdateTodo}
						onRemoveTodo={onRemoveTodo}
						isMuted={isMuted}
						numberOfTodosLeft={todoList.length}
						numberOfTodosCompleted={todosCompleted.length + 1}
						todoList={todoList}
						loadTodos={loadTodos}
					/>
				))}
			</ul>
		</>
	);
};

export default TodoList;
