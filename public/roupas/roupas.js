// public/roupas/roupas.js
document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('form-roupa');
  const lista = document.getElementById('lista-roupas');

  // Carrega roupas ao iniciar
  carregarRoupas();

  // Cadastro
  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const peca = document.getElementById('peca').value;
    const preco = document.getElementById('preco').value;
    const estoque = document.getElementById('estoque').value;
    const cor = document.getElementById('cor').value;

    await fetch('/roupas', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ peca, preco, estoque, cor }),
    });

    form.reset();
    carregarRoupas();
  });

  // Listagem
  async function carregarRoupas() {
    const res = await fetch('/roupas');
    const roupas = await res.json();
    lista.innerHTML = '';

    roupas.forEach(roupa => {
      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td>${roupa.peca}</td>
        <td>R$ ${roupa.preco.toFixed(2)}</td>
        <td>${roupa.estoque}</td>
        <td>${roupa.cor}</td>
        <td>
          <button onclick="editarRoupa('${roupa.id}', '${roupa.peca}', '${roupa.preco}', '${roupa.estoque}', '${roupa.cor}')">Editar</button>
          <button onclick="deletarRoupa('${roupa.id}')">Excluir</button>
        </td>
      `;
      lista.appendChild(tr);
    });
  }

  // Editar
  window.editarRoupa = async (id, pecaAtual, precoAtual, estoqueAtual, corAtual) => {
    const peca = prompt("Nova peça:", pecaAtual);
    const preco = prompt("Novo preço:", precoAtual);
    const estoque = prompt("Novo estoque:", estoqueAtual);
    const cor = prompt("Nova cor:", corAtual);

    if (peca && preco && estoque && cor) {
      await fetch(`/roupas/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ peca, preco, estoque, cor }),
      });
      carregarRoupas();
    }
  };

  // Deletar
  window.deletarRoupa = async (id) => {
    if (confirm('Deseja realmente excluir esta roupa?')) {
      await fetch(`/roupas/${id}`, { method: 'DELETE' });
      carregarRoupas();
    }
  };
});
