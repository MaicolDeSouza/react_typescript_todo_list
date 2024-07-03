import * as React from "react";
//Interface
import { ITask } from "../interfaces/Task";

//CSS
import styles from "./TaskList.module.css";

// Variaveis das props
interface props {
  taskList: ITask[];
  // Consigo passar uma função do app como parametro
  // Função que é chamada quando botão delete for pressionado
  handleDeleteTask(id : number):void;
  // Função sera ecexutada quando lapis de edição for pressionado, esta função vem do app
  handleEditTask(task : ITask):void;
}

// as variaveiis passada em props serão do tipo props
function TaskList({ taskList, handleDeleteTask, handleEditTask}: props) {
  return (
    <>
      {taskList.length > 0 ? (
        taskList.map((task) => (
          <div key={task.id} className={styles.task}>
            <div className={styles.details}>
              <h4>{task.title}</h4>
              <p>Dificuldade: {task.difficulty}</p>
              </div>

            <div className={styles.actions}>
              <i className="bi bi-pencil" onClick={()=> handleEditTask(task)}> </i>
              <i className="bi bi-trash" onClick={() => {handleDeleteTask(task.id)}}> </i>
            </div>
          </div>
        ))
      ) : (
        <p>Não ha tarefas</p>
      )}
    </>
  );
}
export default TaskList;
