import React, { useState } from 'react';
import style from '../styles/TodoListItem.module.css';
import { MdClose } from 'react-icons/md';
import Checkbox from '@mui/material/Checkbox';

const green = {
	500: '#2fb583',
};

function TodoListItem({
	todo,
	onUpdateTodo,
	onRemoveTodo,
	isMuted,
	numberOfTodosLeft,
	numberOfTodosCompleted,
	loadTodos,
	todoList,
}) {
	const [isCompleted, setIsCompleted] = useState(todo.completed);
	const [numberTodosCompleted, setNumberTodosCompleted] = useState(
		numberOfTodosCompleted
	);
	const [numberTodosLeft, setNumberTodosLeft] = useState(numberOfTodosLeft);

	const handleCheer = () => {
		//PLAY SOUND ON COMPLETION OF ALL TODOS
		if (
			(numberOfTodosLeft < 1 && !isMuted) ||
			(numberOfTodosCompleted === numberOfTodosLeft && !isMuted)
		) {
			console.log(`yay numberOfTodosLeft: ${numberOfTodosLeft}`);
			console.log(`yay numberOfTodosCompleted: ${numberOfTodosCompleted}`);
			const audio = new Audio('../../yay.mp3');
			audio.play();
			return;
		} else {
			//PLAY SOUND ON EACH TODO COMPLETION
			if (!isCompleted && !isMuted) {
				console.log(`yaaas numberOfTodosLeft: ${numberOfTodosLeft}`);
				console.log(`yaaas numberOfTodosCompleted: ${numberOfTodosCompleted}`);
				const audio = new Audio('../../yaaas.mp3');
				audio.play();
			}
		}
		return;
	};
	const handleRemoveTodo = () => {
		let numberLeft = numberTodosLeft - 1;
		setNumberTodosLeft(numberLeft);
		let numberCompleted = numberTodosCompleted - 1;
		setNumberTodosCompleted(numberCompleted);
		onRemoveTodo(todo.id);
	};

	const handleCompleted = () => {
		setIsCompleted(!isCompleted);
		let numberCompleted = todoList.filter((todo) => todo.completed === true);
		setNumberTodosCompleted(numberCompleted);
		handleCheer();
		onUpdateTodo(todo.title, todo.id, !isCompleted);
		loadTodos();
	};

	return (
		<>
			<li className={style.ListItem}>
				<Checkbox
					onChange={() => handleCompleted()}
					checked={isCompleted}
					style={{ padding: 0, marginRight: '8px' }}
					inputProps={{ 'aria-label': 'controlled' }}
					sx={{
						'&.Mui-checked': {
							color: green[500],
						},
					}}
				/>

				{todo.title}
				<span onClick={handleRemoveTodo}>
					<MdClose className='btn-close' />
				</span>
			</li>
		</>
	);
}

export default TodoListItem;
