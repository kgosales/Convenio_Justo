<template>
    <!-- ===== WHATSAPP FLUTUANTE ===== -->
    <a href="https://wa.me/5571997189899" class="whats-float" target="_blank" rel="noopener"
        aria-label="Falar no WhatsApp">
        <i class="ph-duotone ph-whatsapp-logo"></i>
    </a>
</template>

<script setup>
</script>

<style lang="less" scoped>
/* ===== WHATSAPP FLUTUANTE ===== */
.whats-float {
    position: fixed;
    bottom: 24px;
    right: 24px;
    background: #25d366;
    color: #fff;
    width: 60px;
    height: 60px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 2rem;
    box-shadow: 0 4px 14px rgba(0, 0, 0, 0.3);
    z-index: 200;
    transition: transform 0.2s;
}

.whats-float:hover {
    transform: scale(1.1);
}
</style>
