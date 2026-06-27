<template>
    <section class="bg-light" id="sobre">
        <div class="container">
            <h2 class="section-title">Sobre nós</h2>
            <div class="sobre-grid">
                <img src="@/assets/imgs/sobre-nos.png" alt="Profissional analisando documentos de um consumidor">
                <div class="sobre-text">
                    <p>O Convênio Justo nasceu para estar ao lado de quem enfrenta, sozinho, os abusos cometidos pelas
                        operadoras de planos de saúde. Sabemos que lidar com reajustes excessivos ou ter um procedimento
                        médico negado gera angústia, insegurança e prejuízo financeiro e que a maioria das pessoas
                        simplesmente não sabe por onde começar.</p>
                    <p>Nosso trabalho é simplificar esse caminho. Avaliamos o seu caso, orientamos sobre os seus
                        direitos a cada etapa do processo para que você não precise enfrentar isso sozinho.
                        Transparência e compromisso com o resultado fazem parte de tudo que fazemos.</p>
                    <a href="#formulario" class="btn">Fale com Nossa Equipe</a>
                </div>
            </div>
        </div>
    </section>
</template>

<script setup>
</script>

<style lang="less" scoped>
/* ===== SOBRE NÓS ===== */
.sobre-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 48px;
    align-items: center;

    img {
        border-radius: 12px;
        box-shadow: 0 6px 18px rgba(0, 0, 0, 0.1);
    }

    .sobre-text p {
        margin-bottom: 18px;
    }
}

@media (max-width: 768px) {
    .sobre-grid {
        grid-template-columns: 1fr;
    }
}
</style>
