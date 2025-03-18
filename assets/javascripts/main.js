document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

const addOptionsUF = () => {
    const selectUF = document.querySelector("#uf");

    fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados")
        .then(response => response.json())
        .then(data => {
            data.sort((a, b) => a.sigla.localeCompare(b.sigla));
            data.forEach(uf => {
                const option = document.createElement("option");
                option.value = uf.sigla;
                option.textContent = uf.sigla;
                selectUF.appendChild(option);
            });
        })
        .catch(error => console.error("Erro ao carregar estados:", error));

    selectUF.addEventListener("change", () => {
        addOptionCidade(selectUF.value);
    });
};

const addOptionCidade = async (uf) => {
    const selectCidade = document.querySelector("#cidade");
    selectCidade.disabled = true; // Desativar enquanto carrega
    selectCidade.innerHTML = ""; // Limpar opções existentes

    // Adicionar a opção nula com o texto "-- Selecione uma Cidade --"
    const defaultOption = document.createElement("option");
    defaultOption.value = "";
    defaultOption.textContent = "-- Selecione uma Cidade --";
    defaultOption.disabled = true;
    defaultOption.selected = true;
    selectCidade.appendChild(defaultOption);

    try {
        const response = await fetch(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${uf}/municipios`);
        const data = await response.json();
        data.sort((a, b) => a.nome.localeCompare(b.nome));
        data.forEach(cidade => {
            const option = document.createElement("option");
            option.value = cidade.nome;
            option.textContent = cidade.nome;
            selectCidade.appendChild(option);
        });
    } catch (error) {
        console.error("Erro ao carregar cidades:", error);
    } finally {
        selectCidade.disabled = false; // Reativar após carregar
    }
};

const formatarTelefone = () => {
    document.querySelector('#telefone').addEventListener('input', function (event) {
        let inputValue = event.target.value.replace(/\D/g, ''); // Remove caracteres não numéricos
        inputValue = inputValue.substring(0, 11); // Limita a 11 caracteres (9 dígitos + 2 pontos)

        if (inputValue.length > 10) {
            inputValue = inputValue.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
        } else if (inputValue.length > 6) {
            inputValue = inputValue.replace(/(\d{2})(\d{4})(\d{0,4})/, '($1) $2-$3');
        } else if (inputValue.length > 2) {
            inputValue = inputValue.replace(/(\d{2})(\d{0,5})/, '($1) $2');
        }

        event.target.value = inputValue;
    });
}

const addOptionOperadoras = () => {
    const selectOperadoras = document.querySelector("#operadoras");
    const operadoras = ["Amil", "Bradesco", "Sulamerica", "Unimed", "Outras"];

    // operadoras.sort((a, b) => a.localeCompare(b));
    operadoras.forEach(operadora => {
        const option = document.createElement("option");
        option.value = operadora;
        option.textContent = operadora;
        selectOperadoras.appendChild(option);
    });
};

const toggleBoxOutraOperadora = () => {
    const selectOperadoras = document.querySelector("#operadoras");
    const outraOperadoraBox = document.querySelector("#outra-operadora-box");

    selectOperadoras.addEventListener("change", (event) => {
        outraOperadoraBox.style.display = event.target.value === "Outras" ? "flex" : "hidden";
        event.target.value === "Outras" ? outraOperadoraBox.classList.add("active") : outraOperadoraBox.classList.remove("active");

        const input = outraOperadoraBox.querySelector("input");
        input.required = event.target.value === "Outras";
        input.value = "";
    });
};

const menuMobile = () => {
    const menu = document.getElementById("menu");
    const menuMobileImg = document.getElementById("menu-mobile").querySelector("img");

    document.querySelector("body").classList.toggle("no-scroll");

    menu.classList.toggle("active");
    menuMobileImg.src = menu.classList.contains("active")
        ? "./assets/imgs/icons/close.png"
        : "./assets/imgs/icons/menu.png";

    menu.addEventListener("click", () => menuMobile());
}

const reclameAqui = () => {
    document.querySelector("#formulario").scrollIntoView({
        behavior: 'smooth'
    });
}

const setDepoimentos = () => {
    fetch("./assets/json/depoimentos.json")
        .then(response => response.json())
        .then(data => {
            const depoimentos = document.querySelector("#container-depoimentos");
            let depoimentosHTML = "";

            data.forEach(depoimento => {
                depoimentosHTML += `
                    <div class="box-depoimento">
                        <p class="nome-depoimento">${depoimento.nome}</p>
                        <p class="texto-depoimento">${depoimento.depoimento}</p>
                    </div>
                `;
            });

            depoimentos.innerHTML = depoimentosHTML;
        })
        .catch(error => console.error("Erro ao carregar depoimentos:", error));
}

document.addEventListener("DOMContentLoaded", () => {
    addOptionsUF();
    addOptionOperadoras();
    formatarTelefone();
    toggleBoxOutraOperadora();
    setDepoimentos();
});