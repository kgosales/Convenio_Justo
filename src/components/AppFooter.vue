<template>
    <footer>
        <div class="container">Todos os direitos reservados © {{ new Date().getFullYear() }} — Convênio Justo</div>
    </footer>
</template>

<script setup>
</script>

<style lang="less" scoped>
/* ===== FOOTER ===== */
footer {
    background: var(--verde-medio);
    color: var(--branco);
    text-align: center;
    padding: 22px 0;
    font-size: 0.9rem;
}
</style>
