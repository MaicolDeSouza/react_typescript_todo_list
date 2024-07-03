import * as React from "react";

//CSS
import styles from "./Modal.module.css";

// Variaveis das props
interface props {
    //Recebemos um componente como propriedade
    newForm : React.ReactNode
}

// Função que fecha o modal
const closeModal = (e: React.MouseEvent):void =>{
    //Selecione a parte do documento que deseja fazer algo
    const modal = document.querySelector("#modal")
    //Adicionamos a area marcada a classe hide que esta em index.css
    modal!.classList.add("hide")


}

// as variaveiis passada em props serão do tipo props
function Modal({newForm}: props) {
  return (
    <div id="modal" className="hide">
      <div className={styles.fade} onClick={closeModal}></div>
      <div className={styles.modal}>
      <h1>Modal</h1>
      {newForm}
      </div>
     
    </div>
  );
}
export default Modal;
