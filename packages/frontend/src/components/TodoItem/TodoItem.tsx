import React, { useState } from 'react'
import { Todo } from '../../__generated__/graphql';
import { DropdownMenu } from '../DropdownMenu';
import { AiOutlineEdit } from "react-icons/ai";
import { BiTrash } from "react-icons/bi";

type TodoItemProps = {
    todoItem: Todo
    removeTodo: (id:string) => void | Promise<void>
    updateTodoCompleteStatus: (
        id:string,
        isCompleted:boolean
    ) => void | Promise<void>;
    updateTodoTitle: (id: string, title: string) => void | Promise<void>;
}

export const TodoItem: React.FC<TodoItemProps> = ({
    todoItem,
    removeTodo,
    updateTodoCompleteStatus,
    updateTodoTitle,
}) => {
    const [isTitleEditing, setIsTitleEditing] = useState<boolean>(false);
    const [todoTitleInput, setTodoTitleInput] = useState<string>(todoItem.title);

    const handleRemoveBtnClick: React.MouseEventHandler<HTMLButtonElement>=(
        event
    )=>{
        removeTodo(todoItem.id);
    }
    const handleCompleteTodoCheckboxChange: React.ChangeEventHandler<
        HTMLInputElement
    > = (event) => {
        console.log({ isCom: event.target.checked })
        updateTodoCompleteStatus(todoItem.id, event.target.checked)
    };

    const handleTodoTitleInput: React.ChangeEventHandler<HTMLInputElement> = (
        event
    ) => setTodoTitleInput(event.target.value);

    const handleEditBtnClick: React.MouseEventHandler<HTMLButtonElement> = (
        event
    ) => {
        setIsTitleEditing(true);
    }

    const handleTodoTitleInputBlur: React.FocusEventHandler<
        HTMLInputElement
    > = async (event) => {
        try {
            await updateTodoTitle(todoItem.id, todoTitleInput)
            setIsTitleEditing(false);
        } catch (error) {
            if(error instanceof Error){
                console.error(error.message)
            }
        }
    }

    return (
        <article
            className={`flex justify-between items-center shadow-sm bg-white rounded border-l-8 my-4 px-4 h-20 ${
            todoItem?.isCompleted ? "border-emerald-500":"border-blue-600"
            } dark:bg-zinc-700`}
            key={todoItem?.id}
        >
            <div className="flex items-center">
                <input
                    checked={todoItem?.isCompleted}
                    type={"checkbox"}
                    className="w-4 h-4"
                    onChange={handleCompleteTodoCheckboxChange}
                />
                <div className="flex flex-col ml-4">
                    {isTitleEditing ? (
                        <input
                            className='focus:outline-none text-slate-600 dark:bg-zinc-600 dark:text-zinc-100'
                            type={'text'}
                            value={todoTitleInput}
                            onChange={handleTodoTitleInput}
                            //Editボタンを押した（isTitleEditingが変わった）時に、自動的にカーソルが当たる
                            autoFocus
                            //マウスを離したときに発動するイベント
                            onBlur={handleTodoTitleInputBlur}
                        />
                    ) : (
                        <p
                            className={`${
                            todoItem?.isCompleted
                                ? "text-emerald-500 line-through"
                                :"test-slate-600 dark:text-zinc-100"
                            }`}
                        >
                            {todoItem?.title}
                        </p>
                    )}
                    <small className="text-gray-400">{todoItem?.createdAt.toISOString().split("T")[0]}</small>
                </div>
            </div>
            <DropdownMenu
                clickTarget={
                    <small className="text-gray-500 hover:bg-gray-100 rounded-full p-1 dark:hover:bg-zinc-600">
                        ・・・
                    </small>
                }
                menuItems={[
                    <button
                        onClick={handleEditBtnClick}
                        key={1}
                        className='flex justify-between w-full items-center text-gray-800 dark:text-zinc-100'>
                        <span>Edit</span>
                        <AiOutlineEdit />
                    </button>,
                    <button
                        onClick={handleRemoveBtnClick}
                        key={2}
                        className='flex justify-between w-full items-center text-red-400'>
                        <span>Remove</span>
                        <BiTrash />
                    </button>
                ]}
            />
        </article>
    );
}