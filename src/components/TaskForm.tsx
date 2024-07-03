import React, { useState, ChangeEvent, FormEvent, useEffect } from "react";

//CSS
import styles from "./TaskForm.module.css";

// Interface
import { ITask } from "../interfaces/Task";

// Variaveis das props
interface props {
  btnText: string;
  tasklist: ITask[];
  // Traz o setTaskList de quem chamar este componente
  // o "?" indica para o typescript que pode ter ou não ter valor nessa prop(argumento opcional)
  setTaskList?: React.Dispatch<React.SetStateAction<ITask[]>>;
  // Utilizada para preencher o modal na edição
  task? :ITask | null
  handleUpdate?(id: number, title: string, difficulty: number):void;
}

// as variaveiis passada em props serão do tipo props
function TaskForm({ btnText, tasklist, setTaskList, task, handleUpdate}: props) {

  const [id, setId] = useState<number>(0);
  const [title, setTitle] = useState<string>("");
  const [difficulty, setDifficulty] = useState<number>(0);
  

  // Usado para edição da tarefa, se a task alterar atualiza os valores.
  useEffect(()=>{
    if (task){
      setId(task.id);
      setTitle(task.title)
      setDifficulty(task.difficulty)
    }
  },[task])

  // Quando botão submit for pressionado vai chamar essa função
  const addTaskHandler = (e: FormEvent<HTMLFormElement>) => {
    // Previne recarregamento da pagina quando pressionado o submit
    e.preventDefault();

    // Quando botao for pressioando verifica se sera para fazer edição ou adição de tarefa
    if(handleUpdate){
      handleUpdate(id, title, difficulty)
      
    }else{
    // Cria um ID aleatorio
    const id = Math.floor(Math.random() * 1000);
    // Cria uma const do tipo Itask da interface e popula os valores
    const newTask: ITask = { id, title, difficulty };
    // o "!" informa ao typescript que estamos forçando que vai ter valor
    // Envia para o App a lista de tarefas
    setTaskList!([...tasklist, newTask]);

    //Limpo meu formulario
    setTitle("");
    setDifficulty(0);
    // Apenas para teste, para mostrar o array com as tarefas
    console.log(tasklist);
    }

  };

  // Quando for alterado algum dado do campo tarefa ou dificuldade chama essa função
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.name === "title") {
      setTitle(e.target.value);
    }
    if (e.target.name === "difficulty") {
      //parseInt serve para alterar o dado do "e" que é uma string para number
      setDifficulty(parseInt(e.target.value));
    }
  };

  return (
    <form onSubmit={addTaskHandler} className={styles.form}>
      <div className={styles.input_container}>
        <label htmlFor="title">Titulo: </label>
        <input
          type="text"
          name="title"
          id="title"
          placeholder="Titulo da tarefa"
          onChange={handleChange}
          value={title}
        />
      </div>
      <div className={styles.input_container}>
        <label htmlFor="difficulty">Dificuldade: </label>
        <input
          type="text"
          name="difficulty"
          id="difficulty"
          placeholder="Dificuldade da tarefa"
          onChange={handleChange}
          value={difficulty}
        />
      </div>
      <input type="submit" value={btnText} />
    </form>
  );
}
export default TaskForm;
