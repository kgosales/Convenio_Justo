<template>
    <section class="bg-green" id="formulario">
        <div class="container form-wrap">
            <h2 class="section-title">Solicite sua análise gratuita</h2>
            <p class="sub">Preencha os campos abaixo e nossa equipe entrará em contato pelo WhatsApp em até 24 horas.
            </p>
            <form action="https://formsubmit.co/contato@conveniojusto.com.br" method="POST">
                <input type="hidden" name="_subject" value="Novo Contato! (Modelo Novo)">
                <input type="hidden" name="_next" value="https://conveniojusto.com.br/obrigado">
                <input type="hidden" name="_captcha" value="false">

                <div class="form-group">
                    <label for="nome">Nome completo</label>
                    <input type="text" id="nome" name="nome" required>
                </div>
                <div class="form-group">
                    <label for="whats">WhatsApp</label>
                    <input type="tel" id="whats" name="whats" placeholder="(00) 00000-0000" v-model="whatsApp"
                        @input="formatWhatsApp" required>
                </div>
                <div class="form-group">
                    <label for="email">E-mail</label>
                    <input type="email" id="email" name="email" required>
                </div>
                <div class="form-group">
                    <label for="operadora">Operadora</label>
                    <select id="operadora" name="operadora" v-model="selectedOperadora" required>
                        <option value="" disabled>-- Selecione uma operadora --</option>
                        <option>Amil</option>
                        <option>Bradesco</option>
                        <option>SulAmérica</option>
                        <option>Unimed</option>
                        <option>Outras</option>
                    </select>
                </div>

                <div class="form-group" v-if="selectedOperadora === 'Outras'">
                    <label for="outra-operadora">Nome da Operadora:</label>
                    <input type="text" id="outra-operadora" name="outra-operadora" required>
                </div>

                <div class="form-group">
                    <label for="problema">Qual é o seu problema?</label>
                    <select id="problema" name="problema" v-model="selectedProblema" required>
                        <option value="" disabled>-- Selecione --</option>
                        <option>Reajuste abusivo</option>
                        <option>Procedimento negado</option>
                        <option>Ambos</option>
                        <option>Outras</option>
                    </select>
                </div>

                <div class="form-group" v-if="selectedProblema === 'Outras'">
                    <label for="outros-problemas">Tipo do Problema:</label>
                    <input type="text" id="outros-problemas" name="outros-problemas" required>
                </div>

                <div class="form-group">
                    <label for="detalhes">Conte um pouco mais (opcional)</label>
                    <textarea id="detalhes" name="detalhes" v-model="detalhes"></textarea>
                </div>
                <button type="submit" class="btn">Quero Resolver Meu Caso</button>
                <p class="form-note"><i class="ph-duotone ph-lock-key"></i> Seus dados estão seguros e não serão compartilhados com terceiros.</p>
            </form>
        </div>
    </section>
</template>

<script setup>
import { ref } from 'vue'

const whatsApp = ref('')
const selectedOperadora = ref('')
const selectedProblema = ref('')
const detalhes = ref('')

const formatWhatsApp = (event) => {
    let inputValue = event.target.value.replace(/\D/g, '');
    inputValue = inputValue.substring(0, 11);

    if (inputValue.length > 10) {
        inputValue = inputValue.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
    } else if (inputValue.length > 6) {
        inputValue = inputValue.replace(/(\d{2})(\d{4})(\d{0,4})/, '($1) $2-$3');
    } else if (inputValue.length > 2) {
        inputValue = inputValue.replace(/(\d{2})(\d{0,5})/, '($1) $2');
    }

    whatsApp.value = inputValue;
}
</script>

<style lang="less" scoped>
/* ===== FORMULÁRIO ===== */
.form-wrap {
    max-width: 640px;
    margin: 0 auto;
}

.form-wrap p.sub {
    margin-bottom: 28px;
    opacity: 0.9;
}

.form-group {
    margin-bottom: 18px;
}

.form-group label {
    display: block;
    margin-bottom: 6px;
    font-weight: 500;
}

.form-group input,
.form-group select,
.form-group textarea {
    width: 100%;
    padding: 13px 16px;
    border: none;
    border-radius: 8px;
    font-size: 1rem;
    font-family: inherit;
}

.form-group textarea {
    resize: vertical;
    min-height: 110px;
}

.form-note {
    font-size: 0.85rem;
    opacity: 0.85;
    margin-top: 14px;
    text-align: center;
}

.form-wrap .btn {
    width: 100%;
    margin-top: 8px;
}
</style>
