// public/roupas/admin-roupas.js
document.addEventListener('DOMContentLoaded', loadRoupas);

async function loadRoupas() {
  try {
    const res = await fetch('/roupas');
    const roupas = await res.json();

    const tbody = document.querySelector('#roupasTable tbody');
    tbody.innerHTML = '';

    roupas.forEach(r => {
      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td>${r.peca}</td>
        <td>R$ ${r.preco.toFixed(2)}</td>
        <td>${r.estoque}</td>
        <td>${r.cor}</td>
        <td>
          <button onclick="editRoupa('${r.id}', '${r.peca.replace(/'/g,"\\'")}', '${r.preco}', '${r.estoque}', '${r.cor.replace(/'/g,"\\'")}')">Editar</button>
          <button onclick="deleteRoupa('${r.id}')">Excluir</button>
        </td>
      `;
      tbody.appendChild(tr);
    });
  } catch (err) {
    alert('Erro ao carregar roupas');
    console.error(err);
  }
}

window.editRoupa = async (id, pecaAtual, precoAtual, estoqueAtual, corAtual) => {
  const peca  = prompt('Nova peça:', pecaAtual);
  if (!peca) return;
  const preco = prompt('Novo preço:', precoAtual);
  if (preco === null) return;
  const estoque = prompt('Novo estoque:', estoqueAtual);
  if (estoque === null) return;
  const cor   = prompt('Nova cor:', corAtual);
  if (!cor) return;

  try {
    await fetch(`/roupas/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ peca, preco, estoque, cor })
    });
    loadRoupas();
  } catch (err) {
    alert('Erro ao atualizar roupa');
    console.error(err);
  }
};

window.deleteRoupa = async (id) => {
  if (!confirm('Deseja excluir esta peça?')) return;
  try {
    await fetch(`/roupas/${id}`, { method: 'DELETE' });
    loadRoupas();
  } catch (err) {
    alert('Erro ao excluir roupa');
    console.error(err);
  }
};
