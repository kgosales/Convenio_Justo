<template>
    <section class="bg-green" id="contato">
        <div class="container">
            <h2 class="section-title">Fale conosco</h2>
            <p>Prefere falar diretamente com a nossa equipe? Entre em contato pelo WhatsApp ou e-mail. Estamos prontos
                para ouvir o seu caso e te mostrar o melhor caminho.</p>
            <div class="contato-info">
                <a href="https://wa.me/5571997189899" target="_blank" rel="noopener"><i
                        class="ph-duotone ph-whatsapp-logo icon"></i> (71) 99718-9899</a>
                <a href="mailto:contato@conveniojusto.com.br"><i class="ph-duotone ph-envelope icon"></i>
                    contato@conveniojusto.com.br</a>
            </div>
            <br>
            <a href="https://wa.me/5571997189899" class="btn" target="_blank" rel="noopener">Chamar no WhatsApp</a>
        </div>
    </section>
</template>

<script setup>
</script>

<style lang="less" scoped>
/* ===== CONTATO ===== */
.contato-info {
    display: flex;
    flex-direction: column;
    gap: 16px;
    margin-top: 28px;
}

.contato-info a {
    color: var(--branco);
    display: flex;
    align-items: center;
    gap: 12px;
    font-size: 1.1rem;
}

.contato-info .icon {
    font-size: 1.4rem;
}
</style>
