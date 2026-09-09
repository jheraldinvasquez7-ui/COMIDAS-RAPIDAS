<template>
  <main class="menu-page">
    <section class="menu-intro"><div class="section-icon"><q-icon :name="icon" size="34px" /></div><p class="eyebrow">{{ eyebrow }}</p><h1>{{ title }}</h1><p>{{ intro }}</p></section>
    <section class="menu-grid">
      <article v-for="item in items" :key="item.name" class="food-card">
        <div class="food-art"><q-icon :name="icon" size="62px" /><span v-if="item.tag" class="food-tag">{{ item.tag }}</span></div>
        <div class="food-info"><div><h2>{{ item.name }}</h2><p>{{ item.description }}</p></div><strong>{{ item.price }}</strong></div>
      </article>
    </section>
  </main>
</template>

<script setup>
defineProps({
  eyebrow: { type: String, required: true },
  title: { type: String, required: true },
  intro: { type: String, required: true },
  icon: { type: String, required: true },
  items: { type: Array, required: true }
})
</script>