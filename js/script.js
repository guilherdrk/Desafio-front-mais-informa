// API BrasilAPI
const API_ESTADOS = "https://brasilapi.com.br/api/ibge/uf/v1";
const API_MUNICIPIOS = "https://brasilapi.com.br/api/ibge/municipios/v1";

//carregar a lista de estados
async function carregarEstados() {
  try {
    const resposta = await fetch(API_ESTADOS);
    const estados = await resposta.json();

    const estadosLista = document.getElementById("estados");
    estados.forEach(estado => {
      const li = document.createElement("li");
      const span = document.createElement("span");
      li.textContent = estado.nome + " " + estado.sigla;
      li.addEventListener("click", () => exibirMunicipios(estado.sigla, estado.nome));
      
      estadosLista.appendChild(li);
    });
  } catch (erro) {
    console.error("Erro ao carregar estados:", erro);
  }
}

// Função para exibir a lista de municípios ao clicar em um estado
async function exibirMunicipios(siglaEstado, siglaNome) {
  try {
    const resposta = await fetch(`${API_MUNICIPIOS}/${siglaEstado}`);
    const municipios = await resposta.json();
    
    const municipiosLista = document.getElementById("municipios");
    const estadoNome = document.getElementById("nome-estado");
    municipiosLista.innerHTML = ""; // Limpa a lista anterior
    estadoNome.innerHTML = siglaNome;
    
    municipios.forEach(municipio => {
      const li = document.createElement("li");
      li.textContent = municipio.nome;
      municipiosLista.appendChild(li);
    });
  } catch (erro) {
    console.error("Erro ao carregar municípios:", erro);
  }
}

// Carregar estados ao abrir a página
carregarEstados();
