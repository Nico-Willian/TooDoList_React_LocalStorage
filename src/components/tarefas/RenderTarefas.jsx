import './RenderTarefas.css'
import ImgEditar from '../../img/Edit.svg'
import ImgDelete from '../../img/excluir.svg'

function RenderTarefas({tarefa, mudarCheck, Editar, Delete}){
    return(
        <div className="tarefas_conteudo">
            <div className="tarefa">
               <input
                    className="checkbox"
                    type="checkbox"
                    checked={tarefa.isChecked}
                    onChange={() => mudarCheck(tarefa.id)}
                 />
                <div className="tarefa_info">
                    <div className={`titulo ${tarefa.isChecked ? 'traco' : ''}`}>
                        <h2>{tarefa.titulo}</h2>
                    </div>
                    <div className={`descricao ${tarefa.isChecked ? 'traco' : ''}`}>
                        <h4>{tarefa.descricao}</h4>
                    </div>
                </div>
            </div>

            <div className="tarefas_btn">
                <button className="btn_editar" onClick={() => Editar(tarefa)}>
                    <img src={ImgEditar} />
                </button>
                <button className="btn_excluir"  onClick={() => Delete(tarefa.id)}>
                    <img src={ImgDelete} />
                </button>
            </div>
        </div>
    )
}

export default RenderTarefas