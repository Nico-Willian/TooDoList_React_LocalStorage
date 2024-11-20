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
                    checked={tarefa.checkbox}
                    onChange={() => mudarCheck(tarefa._id)}
                 />
                <div className="tarefa_info">
                    <div className={`titulo ${tarefa.checkbox ? 'traco' : ''}`}>
                        <h2>{tarefa.title}</h2>
                    </div>
                    <div className={`descricao ${tarefa.checkbox ? 'traco' : ''}`}>
                        <h4>{tarefa.description}</h4>
                    </div>
                </div>
            </div>

            <div className="tarefas_btn">
                <button className="btn_editar" onClick={() => Editar(tarefa)}>
                    <img src={ImgEditar} />
                </button>
                <button className="btn_excluir"  onClick={() => Delete(tarefa._id)}>
                    <img src={ImgDelete} />
                </button>
            </div>
        </div>
    )
}

export default RenderTarefas