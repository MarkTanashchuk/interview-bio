import { writable } from 'svelte/store';
import { nanoid } from 'nanoid';

export type Todo = {
	id: string;
	content: string;
	isCompleted: boolean;
};

export const todoCreate = (content: string, isCompleted = false): Todo => {
	return {
		id: nanoid(),
		content,
		isCompleted
	};
};

export const todoStore = (initialTodos: Todo[]) => {
	const { subscribe, update } = writable<Todo[]>(initialTodos);

	return {
		subscribe,
		add: (content: string, isCompleted = false) => {
			if (content.trim().length === 0) {
				return;
			}

			update((todos) => {
				if (!todos.map((todo) => todo.content).includes(content)) {
					todos.push(todoCreate(content, isCompleted));
				}

				return todos;
			});
		},
		remove: (id: string) => {
			update((todos) => todos.filter((todo) => id !== todo.id));
		},
		toggle: (id: string) => {
			update((todos) => {
				const updatedTodos = todos.map((todo) => {
					if (todo.id === id) {
						todo.isCompleted = !todo.isCompleted;
					}

					return todo;
				});

				updatedTodos.sort((a, b) => (a.isCompleted && b.isCompleted ? 0 : a.isCompleted ? -1 : 1));

				return updatedTodos;
			});
		}
	};
};
