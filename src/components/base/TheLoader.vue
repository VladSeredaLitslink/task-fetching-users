<template>
  <div class="loader"></div>
</template>

<style scoped>
.loader {
  margin: 40px auto;
  border: 10px solid #f3f3f3; /* Light grey */
  border-top: 10px solid #34dba1; /* Blue */
  border-radius: 50%;
  width: 40px;
  height: 40px;
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
