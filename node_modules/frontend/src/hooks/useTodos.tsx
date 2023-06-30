import { toast } from "react-hot-toast";
import { useTodosQuery, useMakeTodoMutation, useRemoveTodoMutation, useUpdateTodoMutation, TodosDocument } from "../__generated__/graphql";
import { isEmptyString } from "../utils/isEmptyString";

export const useTodos=()=>{
    const { data: todoData,
        loading: todoDataLoading, error: todoDataError } =
        useTodosQuery();
    const [ makeTodoMut,
        { loading: makeTodoMutLoading, error: makeTodoMutError }] =
        useMakeTodoMutation();
    const [ removeTodoMut,
        { loading: removeTodoMutLoading, error: removeTodoMutError }] =
        useRemoveTodoMutation();
    const [ updateTodoMut,
        { loading: updateTodoMutLoading, error: updateTodoMutError } ] =
        useUpdateTodoMutation();

    const makeTodo = async (title:string) => {
        if(isEmptyString(title)){
            toast.error("title is not allowed!");
            return;
        }

        await makeTodoMut({
            variables: {
                //graphqlサーバーの渡す側のデータ
                makeTodoInput: {
                    //title: titleと同じ
                    title,
                }
            },
            //データを送信した後Todosを更新
            refetchQueries: [TodosDocument],
        })

        toast.success("The new todo has been created!");
    }

    const removeTodo = async (id: string) => {
        await removeTodoMut({
            variables: {
                removeTodoInput: {
                    todoId: id,
                }
            },
            refetchQueries: [TodosDocument],
        });

        toast.success("The new todo has been removed!");
    }

    const updateTodoCompleteStatus = async (id:string, isCompleted:boolean) => {
        await updateTodoMut({
            variables: {
                updateTodoInput: {
                    todoId: id,
                    isCompleted,
                }
            },
            refetchQueries: [TodosDocument],
        });
    }

    const updateTodoTitle = async (id: string, title: string) => {
        if(isEmptyString(title)){
            toast.error("title is not allowed!");
            return;
        }

        updateTodoMut({
            variables: {
                updateTodoInput: {
                    todoId: id,
                    title,
                },
            },
            refetchQueries: [TodosDocument],
        });

        toast.success("The new todo has been updated!");
    }

    return {
        todoData,
        todoDataLoading,
        todoDataError,
        makeTodo,
        makeTodoMutLoading,
        makeTodoMutError,
        removeTodo,
        removeTodoMutLoading,
        removeTodoMutError,
        updateTodoCompleteStatus,
        updateTodoTitle,
        updateTodoMutLoading,
        updateTodoMutError,
    } as const;
}