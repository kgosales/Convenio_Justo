<template>
    <section class="bg-white" id="depoimentos">
        <div class="container">
            <h2 class="section-title">Depoimentos</h2>
            <div class="depo-grid">
                <div class="depo-card" v-for="(depoimento, index) in topDepoimentos" :key="index">
                    <p class="quote">{{ depoimento.depoimento }}</p>

                    <div class="info">
                        <p class="author">{{ depoimento.nome }}</p>
                        <p class="meta">{{ depoimento.meta || 'Atendimento Justo' }}</p>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script setup>
import depoimentos from '@/data/depoimentos.json'

// Exibindo os 6 primeiros depoimentos para manter o grid bem formatado
const topDepoimentos = depoimentos.slice(0, 6)
</script>

<style lang="less" scoped>
/* ===== DEPOIMENTOS ===== */
.depo-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 24px;
    margin-top: 40px;

    .depo-card {
        background: var(--verde-escuro);
        color: var(--branco);
        border-radius: 12px;
        padding: 28px 24px;
        position: relative;
        display: flex;
        flex-direction: column;
        justify-content: space-between;

        .quote {
            font-style: italic;
            margin-bottom: 18px;
        }

        .info {
            display: flex;
            flex-direction: column;

            .author {
                color: var(--dourado);
                font-weight: 700;
            }

            .meta {
                font-size: 0.85rem;
                opacity: 0.8;
            }
        }
    }
}

@media (max-width: 768px) {
    .depo-grid {
        grid-template-columns: 1fr;
    }
}
</style>
