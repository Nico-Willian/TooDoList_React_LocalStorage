import { useState, useEffect } from 'react'

import './App.css'


import Tarefas from './components/tarefas/RenderTarefas'
import PopUp from './components/popUp/PopUp'
import ImgLogo from './img/Logo.svg'

function App() {
  const [abrirPopUp, setAbrirPopUp] = useState(false)
  const [salvarTarefas, setSalvarTarefas] = useState(() => {
    return JSON.parse(localStorage.getItem('tarefas')) || []
  })
  const [tarefaAcao, setTarefaAcao] = useState('')
  const [tarefaEdicao, setTarefaEdicao] = useState(null)

  useEffect(() => {
    localStorage.setItem('tarefas', JSON.stringify(salvarTarefas))
  }, [salvarTarefas])

  function adicionarTarefa(){
    setTarefaAcao('adicionar')
    setTarefaEdicao(null)
    setAbrirPopUp(true)
  }

  function salvarTarefa(titulo, descricao) {
    if (titulo.trim() === '') {
      alert('Informe no minimo um TITULO!!')
      return
    }
    if (tarefaAcao === 'adicionar') {
      const novaTarefa = {
        id: Date.now(),
        titulo: titulo,
        descricao: descricao,
        isChecked: false
      }
      setSalvarTarefas([...salvarTarefas, novaTarefa])
    } else {
      const tarefasAtualizadas = salvarTarefas.map(tarefa => {
        if (tarefa.id === tarefaEdicao.id) {
          return { ...tarefa, titulo, descricao }
        }
        return tarefa
      })
      setSalvarTarefas(tarefasAtualizadas)
    }
    fechar()
  }

  function toggleCheck(id) {
    const tarefasAtualizadas = salvarTarefas.map(tarefa => {
      if (tarefa.id === id) {
        return { ...tarefa, isChecked: !tarefa.isChecked }
      }
      return tarefa
    })
    setSalvarTarefas(tarefasAtualizadas)
  }

  function editarTarefa(tarefa) {
    setTarefaAcao('editar')
    setTarefaEdicao(tarefa)
    setAbrirPopUp(true)
  }

  function excluirTarefa(id) {
    const tarefasFiltradas = salvarTarefas.filter(tarefa => tarefa.id !== id)
    setSalvarTarefas(tarefasFiltradas)
  }

  function fechar(){
    setAbrirPopUp(false)
    setTarefaEdicao(null)
    setTarefaAcao(null)
  }
  return (
    <main id="conteudo">
      <section id="tela_princ">
        <img src={ImgLogo} id="logo" />
        <div id="area_tarefa">
            <h2 className="titulo">Tarefas</h2>
            <hr />
        </div>

        {salvarTarefas.length  === 0 ?(
            <div id="estado_vazio">
                <h2 className="titulo">Você ainda não criou nenhuma tarefa</h2>
                <h4>Não se preocupe, suas novas tarefas irão aparecer aqui.</h4>
            </div>
        ) : (
          <div id="estado_cheio">
           {salvarTarefas.map(tarefa => (
              <Tarefas
                tarefa={tarefa}
                mudarCheck={toggleCheck}
                Editar={editarTarefa} 
                Delete={excluirTarefa}
              />
            ))}
            </div>
        )}

        <button id="botao_adicionar" onClick={adicionarTarefa}>Adicionar tarefa</button>

      </section>

      <PopUp 
        abrir={abrirPopUp} 
        fechar={fechar} 
        salvar={salvarTarefa}
        tarefaEdicao={tarefaEdicao}
        acao={tarefaAcao}
      />

    </main>
  )
}

export default App
