import { useState, useEffect } from 'react'
import { api } from './services/api';

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
    async function carregarTarefas() {
        try {
            const response = await api.get('/tasks');
            setSalvarTarefas(response.data);
        } catch (error) {
            console.error('Erro ao carregar tarefas:', error);
        }
    }
    carregarTarefas();
}, []);



  function adicionarTarefa(){
    setTarefaAcao('adicionar')
    setTarefaEdicao(null)
    setAbrirPopUp(true)
  }

  async function salvarTarefa(titulo, descricao) {
    if (titulo.trim() === '') {
        alert('Informe no mínimo um TÍTULO!');
        return;
    }
    
    try {
        if (tarefaAcao === 'adicionar') {
            const response = await api.post('/tasks', { title: titulo, description: descricao });
            setSalvarTarefas([...salvarTarefas, response.data]);
        } else {
            const response = await api.put(`/tasks/${tarefaEdicao._id}`, { 
                title: titulo, 
                description: descricao 
            });
            setSalvarTarefas(prev => 
              prev.map(tarefa => tarefa._id === tarefaEdicao._id ? response.data : tarefa)
          );
        }
    } catch (error) {
        alert('Erro ao salvar tarefa');
    }
    fechar();
}

async function toggleCheck(id) {
  try {
      const tarefa = salvarTarefas.find(tarefa => tarefa._id === id);
      const response = await api.patch(`/tasks/${id}/status`, {
          checked: !tarefa.checkbox
      });
      setSalvarTarefas(salvarTarefas.map(tarefa => 
          tarefa._id === id ? response.data : tarefa
      ));
  } catch (error) {
      alert('Erro ao atualizar status da tarefa');
  }
}

  function editarTarefa(tarefa) {
    setTarefaAcao('editar')
    setTarefaEdicao(tarefa)
    setAbrirPopUp(true)
  }

  async function excluirTarefa(id) {
    try {
      await api.delete(`/tasks/${id}`);
      const tarefasAtualizadas = salvarTarefas.filter(tarefa => tarefa._id !== id);
      setSalvarTarefas(tarefasAtualizadas);
    } catch (error) {
        alert('Erro ao excluir tarefa');
    }
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
