import React, { useState } from "react";
// Componentes
import Header from "./components/Header";
import Footer from "./components/Footer";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";
import Modal from "./components/Modal";

// Interface
import { ITask } from "./interfaces/Task";

// CSS
import styles from "./App.module.css";

function App() {
  //Use state que vai trabalhar com array do tipo Itask
  const [taskList, setTaskList] = useState<ITask[]>([]);
  // Use state que enviara ao modal qual a task que precisa ser editada
  const [taskToUpdate, setTaskToUpdate] = useState<ITask | null>(null);

  const deleteTask = (id: number) => {
    setTaskList(
      taskList.filter((task) => {
        return task.id !== id;
      })
    );
  };

  const hideOrShowModal = (display: boolean) => {
    //Selecione a parte do documento que deseja fazer algo
    const modal = document.querySelector("#modal");
    if (display) {
      //Removemos da lista de classe do css a classe hide
      modal!.classList.remove("hide");
    } else {
      //Adicionamos da lista de classe do css a classe hide
      modal!.classList.add("hide");
    }
  };

  // Função que sera enviada para componente task list para ser executada quando clicado no lapis de edição
  const editTask = (task: ITask): void => {
    hideOrShowModal(true);
    setTaskToUpdate(task);
  };

  const updateTask = (id: number, title: string, difficulty: number) => {
    // Quando pressionado botao edição do modal recebo os valores atualizados
    const updatedTask: ITask = { id, title, difficulty };

    // Vou fazer um map para achar no tasklist o objeto a ser editado, quando achar faz a edição e coloca os valores em updatedItems
    const updatedItems = taskList.map((task) => {
      return task.id === updatedTask.id ? updatedTask : task;
    });

    // Atualiza a lista de task para exibir na tela
    setTaskList(updatedItems);

    // Fecha o modal
    hideOrShowModal(false);
  };

  return (
    <div>
      <Modal
        newForm={
          <TaskForm btnText="Editar" tasklist={taskList} task={taskToUpdate} handleUpdate={updateTask} />
        }
      />
      <Header />
      <main className={styles.main}>
        <div>
          <h2>O que voce vai fazer</h2>
          <TaskForm
            btnText="Criar tarefas"
            tasklist={taskList}
            setTaskList={setTaskList}
          />
        </div>
        <div>
          <h2>Suas tarefas</h2>
          <TaskList
            taskList={taskList}
            handleDeleteTask={deleteTask}
            handleEditTask={editTask}
          />
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default App;
