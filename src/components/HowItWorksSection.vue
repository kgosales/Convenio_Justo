<template>
<section class="bg-white text-center" id="como-funciona">
    <div class="container">
        <h2 class="section-title">Como funciona</h2>
        <p>É simples, rápido e sem complicação.</p>
        <div class="passos">
            <div class="passo">
                <div class="num">1</div>
                <h3>Preencha o formulário</h3>
                <p>Informe seus dados e nos conte qual é o problema com o seu plano. Leva menos de 2 minutos.</p>
            </div>
            <div class="passo">
                <div class="num">2</div>
                <h3>Analisamos o seu caso</h3>
                <p>Nossa equipe avalia as informações e entra em contato pelo WhatsApp em até 24 horas para apresentar as opções disponíveis.</p>
            </div>
            <div class="passo">
                <div class="num">3</div>
                <h3>Você decide como prosseguir</h3>
                <p>Explicamos tudo de forma clara e transparente. Só seguimos em frente com a sua autorização.</p>
            </div>
        </div>
        <a href="#formulario" class="btn">Quero Começar Agora</a>
    </div>
</section>
</template>

<script setup>
</script>

<style lang="less" scoped>
    /* ===== COMO FUNCIONA ===== */
    .passos {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 28px;
        margin: 40px 0;
    }
    .passo {
        background: var(--branco);
        border-radius: 12px;
        padding: 32px 24px;
        text-align: center;
        box-shadow: 0 4px 14px rgba(0,0,0,0.06);
        border-top: 4px solid var(--dourado);
    }
    .passo .num {
        width: 52px; height: 52px;
        background: var(--verde-escuro);
        color: var(--dourado);
        border-radius: 50%;
        display: flex; align-items: center; justify-content: center;
        font-size: 1.4rem; font-weight: 700;
        margin: 0 auto 18px;
    }
    .passo h3 { color: var(--verde-escuro); margin-bottom: 10px; }

    @media (max-width: 768px) {
        .passos { grid-template-columns: 1fr; }
    }
</style>
