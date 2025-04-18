export default class Carrosel {
    constructor(carrosel) {
        this.carrosel = carrosel;
        this.index = -1;
        this.depoimentos = [];
        this.animationFrame = null;
        this.init();
    }

    async init() {
        this.createCarouselStructure();
        await this.loadDepoimentos();
        this.setupNavigation();
        this.startAutoMove();
    }

    createCarouselStructure() {
        this.carrosel.innerHTML = `
                <button id="button-previous">◀</button>
                <div id="container-depoimentos"></div>
                <button id="button-next">▶</button>`;
    }

    async loadDepoimentos() {
        try {
            const response = await fetch("./assets/json/depoimentos.json");
            const data = await response.json();
            const depoimentosContainer = this.carrosel.querySelector("#container-depoimentos");

            depoimentosContainer.innerHTML = data.map((depoimento, index) => `
                    <div class="box-depoimento ${index === 0 ? "ativo" : ""}">
                        <p class="nome-depoimento">${depoimento.nome}</p>
                        <p class="texto-depoimento">${depoimento.depoimento}</p>
                    </div>`).join("");

            this.depoimentos = this.carrosel.querySelectorAll(".box-depoimento");
        } catch (error) {
            console.error("Erro ao carregar depoimentos:", error);
        }
    }

    setupNavigation() {
        this.carrosel.querySelector("#button-previous").addEventListener("click", () => this.move(-1));
        this.carrosel.querySelector("#button-next").addEventListener("click", () => this.move(1));
    }

    move(direction) {
        const boxWidth = this.depoimentos[0].offsetWidth + 10; // Considera o gap
        const maxIndex = this.depoimentos.length - 1; // Último índice possível
        const containerWidth = this.carrosel.querySelector("#container-depoimentos").offsetWidth;
        const maxDeslocamento = -(this.depoimentos.length * boxWidth - containerWidth); // Limite máximo do movimento

        // Atualiza o índice
        this.index += direction;

        // Se ultrapassar o último, retorna ao início
        if (this.index > maxIndex) {
            this.index = 0;
        } else if (this.index < 0) {
            this.index = maxIndex;
        }

        // Calcula a posição correta sem espaço em branco
        let deslocamento = -this.index * boxWidth;
        if (deslocamento < maxDeslocamento) deslocamento = maxDeslocamento; // Mantém último depoimento no canto

        this.depoimentos.forEach(depoimento => {
            depoimento.style.transform = `translateX(${deslocamento}px)`;
        });

        this.updateActiveState();
    }

    updateActiveState() {
        this.depoimentos.forEach((depoimento, idx) => {
            depoimento.classList.toggle("ativo", idx === this.index);
        });
    }

    startAutoMove() {
        const animate = () => {
            this.move(1);
            this.animationFrame = setTimeout(animate, 5000);
        };
        animate();
    }

    stopAutoMove() {
        clearTimeout(this.animationFrame);
    }
}