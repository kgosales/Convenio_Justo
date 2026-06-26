<template>
<section class="hero" id="inicio">
    <div class="container hero-content">
        <h1>Você tem sofrido abusividades com o seu <span>plano de saúde</span>?</h1>
        <p>Reajuste abusivo na mensalidade ou procedimento médico negado sem justificativa? Você tem direito de contestar — e nós podemos te ajudar a fazer isso.</p>
        <div class="hero-buttons">
            <a href="#formulario" class="btn">Quero Analisar Meu Caso</a>
            <a href="https://wa.me/5571997114891" class="btn btn-outline" target="_blank" rel="noopener">Falar pelo WhatsApp</a>
        </div>
    </div>
</section>
</template>

<script setup>
</script>

<style lang="less" scoped>
    /* ===== HERO ===== */
    .hero {
        position: relative;
        min-height: 90vh;
        display: flex;
        align-items: center;
        background: url('@/assets/imgs/banner.jpg') center/cover no-repeat;
    }
    .hero::before {
        content: "";
        position: absolute; inset: 0;
        background: linear-gradient(120deg, rgba(28,59,48,0.92) 35%, rgba(28,59,48,0.65) 100%);
    }
    .hero-content { position: relative; z-index: 2; max-width: 640px; color: var(--branco); }
    .hero h1 { font-size: 2.6rem; margin-bottom: 24px; }
    .hero h1 span { color: var(--dourado); }
    .hero p { font-size: 1.15rem; margin-bottom: 32px; }
    .hero-buttons { display: flex; gap: 16px; flex-wrap: wrap; }

    @media (max-width: 768px) {
        .hero h1 { font-size: 1.9rem; }
        .hero-buttons { flex-direction: column; }
    }
</style>
