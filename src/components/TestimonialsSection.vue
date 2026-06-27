<template>
    <section class="bg-white" id="depoimentos">
        <div class="container">
            <div class="section-header">
                <h2 class="section-title">Depoimentos</h2>
                <div class="carousel-nav">
                    <button class="nav-btn prev" @click="move(-1)" aria-label="Anterior">
                        <i class="ph-duotone ph-caret-left"></i>
                    </button>
                    <button class="nav-btn next" @click="move(1)" aria-label="Próximo">
                        <i class="ph-duotone ph-caret-right"></i>
                    </button>
                </div>
            </div>

            <div class="carousel-viewport">
                <div class="carousel-track" ref="trackRef" :style="{
                    transform: `translateX(${offsetPixels}px)`,
                    transition: transitionStyle
                }">
                    <div class="carousel-slide" v-for="depoimento in displayList" :key="depoimento.uniqueId"
                        :style="{ width: slideWidthStyle }">
                        <div class="depo-card">
                            <i class="ph-duotone ph-quotes quote-icon"></i>
                            <p class="quote">{{ depoimento.depoimento }}</p>

                            <div class="info">
                                <p class="author">{{ depoimento.nome }} | <span>{{ depoimento.cidade }}</span></p>
                                <p class="meta">{{ depoimento.meta || 'Atendimento Justo' }}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted, nextTick } from 'vue'
import depoimentosData from '@/data/depoimentos.json'

const originalDepoimentos = depoimentosData.map((d, i) => ({ ...d, id: i }))

const trackRef = ref(null)
const currentIndex = ref(0)
const isAnimating = ref(false)
const offsetPixels = ref(0)
const transitionStyle = ref('none')
const slideWidthStyle = ref('300px')

// Clonamos a lista 3 vezes para permitir o loop infinito transparente
const displayList = computed(() => {
    return [
        ...originalDepoimentos.map(d => ({ ...d, uniqueId: 'prev_' + d.id })),
        ...originalDepoimentos.map(d => ({ ...d, uniqueId: 'curr_' + d.id })),
        ...originalDepoimentos.map(d => ({ ...d, uniqueId: 'next_' + d.id }))
    ]
})

const baseIndex = originalDepoimentos.length
const gap = 24
let autoplayInterval = null

const updateDimensions = () => {
    if (!trackRef.value) return
    const viewport = trackRef.value.parentElement
    const viewportWidth = viewport.offsetWidth

    let visibleCount = 3
    if (window.innerWidth <= 768) visibleCount = 1
    else if (window.innerWidth <= 992) visibleCount = 2

    const totalGapWidth = (visibleCount - 1) * gap
    const width = (viewportWidth - totalGapWidth) / visibleCount

    slideWidthStyle.value = `${width}px`

    transitionStyle.value = 'none'
    offsetPixels.value = -((baseIndex + currentIndex.value) * (width + gap))
}

const move = (direction) => {
    if (isAnimating.value) return
    isAnimating.value = true

    currentIndex.value += direction

    const width = parseFloat(slideWidthStyle.value)

    transitionStyle.value = 'transform 0.5s ease-in-out'
    offsetPixels.value = -((baseIndex + currentIndex.value) * (width + gap))

    setTimeout(() => {
        isAnimating.value = false
        let adjusted = false

        if (currentIndex.value >= originalDepoimentos.length) {
            currentIndex.value -= originalDepoimentos.length
            adjusted = true
        } else if (currentIndex.value < 0) {
            currentIndex.value += originalDepoimentos.length
            adjusted = true
        }

        if (adjusted) {
            transitionStyle.value = 'none'
            offsetPixels.value = -((baseIndex + currentIndex.value) * (width + gap))
        }
    }, 500)

    resetAutoplay()
}

const resetAutoplay = () => {
    clearInterval(autoplayInterval)
    autoplayInterval = setInterval(() => {
        move(1)
    }, 5000)
}

onMounted(() => {
    nextTick(() => {
        updateDimensions()
        resetAutoplay()
    })
    window.addEventListener('resize', updateDimensions)
})

onUnmounted(() => {
    clearInterval(autoplayInterval)
    window.removeEventListener('resize', updateDimensions)
})
</script>

<style lang="less" scoped>
/* ===== DEPOIMENTOS CAROUSEL INFINITO ===== */
.section-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 40px;
}

.section-title {
    margin-bottom: 0;
}

.carousel-nav {
    display: flex;
    gap: 12px;
}

.nav-btn {
    background: var(--verde-medio);
    color: var(--branco);
    border: none;
    border-radius: 50%;
    width: 44px;
    height: 44px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.5rem;
    cursor: pointer;
    transition: background 0.3s, transform 0.2s;

    &:hover {
        background: var(--verde-escuro);
        transform: scale(1.05);
    }
}

.carousel-viewport {
    overflow: hidden;
    width: 100%;
}

.carousel-track {
    display: flex;
    gap: 24px;
    width: max-content;
    will-change: transform;
}

.carousel-slide {
    flex-shrink: 0;
    display: flex;
}

.depo-card {
    background: var(--verde-escuro);
    color: var(--branco);
    border-radius: 12px;
    padding: 32px;
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 100%;

    .quote-icon {
        font-size: 2.5rem;
        color: var(--dourado);
        opacity: 0.5;
        margin-bottom: 16px;
    }

    .quote {
        font-style: italic;
        margin-bottom: 24px;
        line-height: 1.6;
    }

    .info {
        display: flex;
        flex-direction: column;
        border-top: 1px solid rgba(255, 255, 255, 0.1);
        padding-top: 16px;

        .author {
            color: var(--dourado);
            font-weight: 700;
            font-size: 1.1rem;

            span {
                font-weight: 400;
                font-size: 0.9rem;
            }
        }

        .meta {
            font-size: 0.85rem;
            opacity: 0.8;
            margin-top: 4px;
        }
    }
}

@media (max-width: 768px) {
    .section-header {
        flex-direction: column;
        align-items: flex-start;
        gap: 20px;
    }

    .nav-btn {
        width: 38px;
        height: 38px;
        font-size: 1.2rem;
    }
}
</style>
