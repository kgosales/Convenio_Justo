<template>
    <header>
        <div class="container header-inner">
            <a href="#inicio" class="logo-link">
                <img src="@/assets/imgs/logo.png" alt="Convênio Justo" class="logo-img">
                <h1>Convênio Justo</h1>
            </a>
            <nav :class="{ 'menu-active': menuOpen }">
                <ul>
                    <li><a href="#inicio" @click="closeMenu">Início</a></li>
                    <li><a href="#fazemos" @click="closeMenu">O que fazemos</a></li>
                    <li><a href="#como-funciona" @click="closeMenu">Como funciona</a></li>
                    <li><a href="#formulario" @click="closeMenu">Análise gratuita</a></li>
                    <li><a href="#depoimentos" @click="closeMenu">Depoimentos</a></li>
                    <li><a href="#contato" @click="closeMenu">Contato</a></li>
                </ul>
            </nav>
            <button class="menu-toggle" aria-label="Menu" @click="toggleMenu">
                <span v-if="!menuOpen">&#9776;</span>
                <span v-else>&times;</span>
            </button>
        </div>
    </header>
</template>

<script setup>
import { ref } from 'vue'

const menuOpen = ref(false)

const toggleMenu = () => {
    menuOpen.value = !menuOpen.value
    document.body.style.overflow = menuOpen.value ? 'hidden' : ''
}

const closeMenu = () => {
    if (menuOpen.value) {
        menuOpen.value = false
        document.body.style.overflow = ''
    }
}
</script>

<style lang="less" scoped>
/* ===== HEADER ===== */
header {
    background: var(--verde-medio);
    position: sticky;
    top: 0;
    z-index: 100;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
    height: 74.98px;
}

.header-inner {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 14px 0;
    height: 100%;
}

.logo-link {
    display: flex;
    align-items: center;
    gap: 15px;
    text-decoration: none;
    height: 100%;

    h1 {
        color: var(--dourado);
        font-size: 1.8rem;
        font-weight: 500;
    }

    .logo-img {
        height: 100%;
        width: auto;
    }
}


nav ul {
    list-style: none;
    display: flex;
    gap: 26px;
}

nav a {
    color: var(--branco);
    font-weight: 500;
    transition: color 0.2s;
}

nav a:hover {
    color: var(--dourado);
}

.menu-toggle {
    display: none;
    background: var(--dourado);
    border: none;
    color: var(--verde-escuro);
    font-size: 1.5rem;
    padding: 6px 12px;
    border-radius: 50%;
    cursor: pointer;
}

@media (max-width: 768px) {
    nav {
        position: absolute;
        top: 100%;
        left: 0;
        width: 100%;
        background: var(--verde-medio);
        display: none;
        padding: 20px 0;
        border-top: 1px solid rgba(255, 255, 255, 0.1);
        height: 100vh;
    }

    nav.menu-active {
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    nav ul {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 20px;
    }

    .menu-toggle {
        display: block;
    }
}
</style>
