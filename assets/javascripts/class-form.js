export default class Form {
    constructor(form) {
        this.form = form;
        this.addOptionsUF();
        this.formatarTelefone();
        this.addOptionOperadoras();
        this.toggleBoxOutraOperadora();
    }

    getFormData = () => this.form;

    addOptionsUF = () => {
        const selectUF = this.form.querySelector("#uf");

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
            this.addOptionCidade(selectUF.value);
        });
    };

    addOptionCidade = async (uf) => {
        const selectCidade = this.form.querySelector("#cidade");
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

    formatarTelefone = () => {
        this.form.querySelector('#telefone').addEventListener('input', function (event) {
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
    
    addOptionOperadoras = () => {
        const selectOperadoras = this.form.querySelector("#operadoras");
        const operadoras = ["Amil", "Bradesco", "Sulamerica", "Unimed", "Outras"];
    
        // operadoras.sort((a, b) => a.localeCompare(b));
        operadoras.forEach(operadora => {
            const option = document.createElement("option");
            option.value = operadora;
            option.textContent = operadora;
            selectOperadoras.appendChild(option);
        });
    };
    
    toggleBoxOutraOperadora = () => {
        const selectOperadoras = this.form.querySelector("#operadoras");
        const outraOperadoraBox = this.form.querySelector("#outra-operadora-box");
    
        selectOperadoras.addEventListener("change", (event) => {
            outraOperadoraBox.style.display = event.target.value === "Outras" ? "flex" : "hidden";
            event.target.value === "Outras" ? outraOperadoraBox.classList.add("active") : outraOperadoraBox.classList.remove("active");
    
            const input = outraOperadoraBox.querySelector("input");
            input.required = event.target.value === "Outras";
            input.value = "";
        });
    };
}