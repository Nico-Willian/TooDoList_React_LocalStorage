import './PopUp.css' 
import { useState, useEffect } from 'react'
import Fundo from './fundo'
import ImgFechar from '../../img/Fechar.svg'

function PopUp({abrir, fechar, salvar, tarefaEdicao, acao}){
  const [titulo, setTitulo] = useState('')
  const [descricao, setDescricao] = useState('')

  useEffect(() => {
    if (tarefaEdicao) {
      setTitulo(tarefaEdicao.title)
      setDescricao(tarefaEdicao.description)
    }  }, [tarefaEdicao])
  
  function envioSalvar(e) {
    e.preventDefault()
    salvar(titulo, descricao)
    setTitulo('')
    setDescricao('')
    fechar()
  }

    return(
    <>
      <Fundo isOpen={abrir} fechar={fechar}/>
      <section  id="tela_popup" style={{width: abrir ? '30%' : '0%'}}>
        <button onClick={fechar}>
          <img src={ImgFechar} id="x_fechar" alt="Fechar" />
        </button>
        <main id="central">
          <div id="cabecalho">
            <h4>{acao === 'adicionar' ? 'Nova Tarefa' : 'Editar Tarefa'}</h4>
            <h2>Deve aparecer aqui</h2>
          </div>

          <form onSubmit={envioSalvar}>
            <div>
              <div className="grupo-form">
                <label htmlFor="titulo">Nome</label>
                <input 
                  type="text" 
                  placeholder="Nome" 
                  id="titulo"
                  value={titulo}
                  onChange={(e) => setTitulo(e.target.value)}
                />
              </div>

              <div className="grupo-form">
                <label htmlFor="descricao">Descrição (opcional)</label>
                <textarea 
                  rows="6" 
                  placeholder="Descrição" 
                  id="descricao"
                  value={descricao}
                  onChange={(e) => setDescricao(e.target.value)}
                />
              </div>
            </div>

            <div id="bts_popup">
              <button type="button" id="btn_fechar" onClick={fechar}>Fechar</button>
              <button onClick={envioSalvar} id="btn_salvar" type="submit">Salvar tarefa</button>
            </div>
          </form>
        </main>
      </section>
    </>
    )
}

export default PopUp 