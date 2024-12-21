document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

const addOptionsUF = () => {
    const selectUF = document.querySelector("#uf")

    fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados")
        .then(response => response.json())
        .then(data => {
            data.sort((a, b) => a.sigla.localeCompare(b.sigla))
            data.forEach(uf => {
                const option = document.createElement("option")
                option.value = uf.sigla
                option.text = uf.sigla
                selectUF.appendChild(option)
            })
        })
}

const addOptionOperadoras = () => {
    const selectOperadoras = document.querySelector("#operadoras")
    const operadoras = ["Amil", "Unimed", "Bradesco", "Sulamerica"]

    operadoras.sort((a, b) => a.localeCompare(b))
    operadoras.forEach(operadora => {
        const option = document.createElement("option")
        option.value = operadora
        option.text = operadora
        selectOperadoras.appendChild(option)
    })
}

addOptionsUF()
addOptionOperadoras()