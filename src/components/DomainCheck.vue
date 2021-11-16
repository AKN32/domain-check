<template>
  <div>
    <div v-if="!isLoading">
      <h2>Ist Ihre Wunschdomain noch frei?</h2>
      <p>Prüfen Sie mit unserem Domain-Check ganz einfach ihren Wunschnamen.</p>
      <form v-if="!isSubmitted" @submit.prevent="submit">
        <input type="text" v-model="domain" label="Domain" required />
        <input type="submit" value="Domain prüfen" />
      </form>
      <div v-if="isSubmitted && isAvailable">
        Die Domain
        <strong>{{ domain }}</strong> ist verfügbar.
      </div>
      <div v-if="isSubmitted && !isAvailable">
        Die Domain
        <strong>{{ domain }}</strong> ist leider nicht mehr verfügbar.
      </div>
      <input
        type="button"
        v-if="isSubmitted"
        @click="reset"
        value="Neue Domain prüfen"
      />
    </div>
    <div v-else class="loader"></div>
  </div>
</template>

<script>
import { makeWhoisServiceRequest } from "../core/whois-service";

export default {
  data: () => ({
    domain: null,
    isLoading: false,
    isSubmitted: false,
    isAvailable: false,
  }),
  methods: {
    async submit() {
      this.isSubmitted = true;
      this.isLoading = true;

      this.isAvailable = await makeWhoisServiceRequest(this.domain);

      this.isLoading = false;
    },
    reset() {
      this.domain = null;
      this.isSubmitted = false;
      this.isAvailable = false;
      this.isLoading = false;
    },
  },
};
</script>

<style scoped>
.loader {
  position: absolute;
  left: 50%;
  top: 50%;
  margin: -76px 0 0 -76px;
  border: 16px solid #f3f3f3; /* Light grey */
  border-top: 16px solid #3498db; /* Blue */
  border-radius: 50%;
  width: 120px;
  height: 120px;
  animation: spin 2s linear infinite;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
