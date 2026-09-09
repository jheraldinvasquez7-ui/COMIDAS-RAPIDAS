<template>
  <q-page class="q-pb-xl">
    <!-- Banner de Portada Superior -->
    <div class="category-hero-banner q-mx-md q-mx-md-xl q-mt-md">
      <q-img
        src="https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=1600&q=80"
        :ratio="16/6"
        class="rounded-borders"
        style="max-height: 380px; filter: brightness(0.85);"
      >
        <div class="absolute-full flex flex-center text-center column q-pa-md" style="background: rgba(0, 0, 0, 0.45);">
          <div class="text-overline text-amber-5 text-weight-bolder letter-spacing-2">
            EL TOQUE DULCE QUE MERECES
          </div>
          <h1 class="text-h2 text-weight-bolder text-white q-my-xs font-heading">
            POSTRES ARTESANALES
          </h1>
          <p class="text-subtitle1 text-grey-3 q-max-w-md" style="max-width: 620px; font-size: 1.05rem;">
            Volcanes de chocolate con centro líquido, brownies calientes recién horneados, cheesecakes suaves y waffles belgas.
          </p>
          <div class="row q-gutter-sm q-mt-sm">
            <q-badge color="negative" class="q-pa-xs q-px-sm text-weight-bold">
              <q-icon name="favorite" class="q-mr-xs" /> CHOCOLATE 100% COLOMBIANO
            </q-badge>
            <q-badge color="amber-9" class="q-pa-xs q-px-sm text-weight-bold">
              <q-icon name="cake" class="q-mr-xs" /> HORNEADOS AL DÍA
            </q-badge>
          </div>
        </div>
      </q-img>
    </div>

    <!-- Encabezado de Sección -->
    <div class="text-center q-my-lg q-px-md">
      <div class="text-negative text-weight-bold text-uppercase" style="letter-spacing: 2px; font-size: 0.88rem;">
        ➔ FINAL PERFECTO PARA TU COMIDA ￩
      </div>
      <h2 class="text-h3 text-weight-bolder text-dark q-mt-xs q-mb-sm font-heading">
        NUESTROS POSTRES
      </h2>
      <p class="text-grey-8 text-body1" style="max-width: 680px; margin: 0 auto; line-height: 1.6;">
        Tentaciones irresistibles preparadas con recetas artesanales de pastelería y los mejores ingredientes locales e importados.
      </p>
    </div>

    <!-- Grid de Productos -->
    <div class="q-px-md q-px-md-xl">
      <div class="row q-col-gutter-lg">
        <div
          v-for="producto in productos"
          :key="producto.id"
          class="col-12 col-sm-6 col-md-3 flex"
        >
          <q-card
            class="product-card full-width"
            :class="{ 'chef-recommended-card': producto.esRecomendado }"
          >
            <!-- Badge Recomendación del Chef -->
            <div v-if="producto.esRecomendado" class="chef-badge">
              <q-icon name="star" class="q-mr-xs" /> RECOMENDADO DEL CHEF
            </div>

            <!-- Badge de categoría opcional -->
            <q-badge
              v-else-if="producto.etiqueta"
              :color="getBadgeColor(producto.etiqueta)"
              class="category-badge"
            >
              {{ producto.etiqueta }}
            </q-badge>

            <!-- Imagen del Producto -->
            <q-img
              :src="producto.imagen"
              :ratio="4/3"
              class="product-image"
              spinner-color="negative"
              style="border-top-left-radius: 15px; border-top-right-radius: 15px;"
            >
              <template v-slot:error>
                <div class="absolute-full flex flex-center bg-grey-3 text-grey-7">
                  Imagen no disponible
                </div>
              </template>
            </q-img>

            <!-- Contenido de la Card -->
            <q-card-section class="q-pt-md q-pb-none flex-grow">
              <div class="text-h6 text-weight-bolder text-dark" style="font-size: 1.15rem; line-height: 1.3;">
                {{ producto.nombre }}
              </div>

              <p class="text-grey-7 text-caption text-weight-regular q-mt-xs q-mb-md" style="line-height: 1.5; min-height: 48px;">
                {{ producto.descripcion }}
              </p>
            </q-card-section>

            <!-- Footer de la Card con Precio y Acciones -->
            <q-card-section class="q-pt-none q-pb-md">
              <div class="row items-center justify-between">
                <div>
                  <div class="text-caption text-grey-6 text-weight-medium">Precio</div>
                  <div class="price-tag">{{ formatCOP(producto.precio) }}</div>
                </div>

              </div>
            </q-card-section>
          </q-card>
        </div>
      </div>
    </div>

    <!-- Modal de Detalles del Producto -->
    <q-dialog v-model="modalDetalle">
      <q-card v-if="productoSeleccionado" style="min-width: 340px; max-width: 520px; border-radius: 20px;">
        <q-img :src="productoSeleccionado.imagen" :ratio="16/10">
          <q-btn
            icon="close"
            flat
            round
            dense
            color="white"
            class="absolute-top-right q-ma-sm bg-dark"
            v-close-popup
          />
          <div v-if="productoSeleccionado.esRecomendado" class="absolute-top-left q-ma-sm">
            <q-badge color="negative" class="text-weight-bold q-pa-xs q-px-sm">
              ★ RECOMENDACIÓN DEL CHEF
            </q-badge>
          </div>
        </q-img>

        <q-card-section class="q-pt-md">
          <div class="row items-center justify-between">
            <h3 class="text-h5 text-weight-bolder text-dark font-heading q-my-none">
              {{ productoSeleccionado.nombre }}
            </h3>
            <span class="price-tag">{{ formatCOP(productoSeleccionado.precio) }}</span>
          </div>

          <div class="text-caption text-grey-8 q-mt-sm" style="line-height: 1.6; font-size: 0.95rem;">
            {{ productoSeleccionado.descripcion }}
          </div>

          <q-separator class="q-my-md" />

          <!-- Ingredientes detallados -->
          <div class="text-subtitle2 text-weight-bold text-dark q-mb-xs">
            Ingredientes y acompañamientos:
          </div>
          <p class="text-body2 text-grey-8">
            {{ productoSeleccionado.ingredientes }}
          </p>

          <!-- Selector de cantidad -->
          <div class="row items-center justify-between q-mt-md bg-grey-2 q-pa-sm rounded-borders">
            <span class="text-weight-bold text-grey-9">Cantidad:</span>
            <div class="row items-center q-gutter-sm">
              <q-btn
                round
                dense
                flat
                color="dark"
                icon="remove"
                :disable="cantidadPedido <= 1"
                @click="cantidadPedido--"
              />
              <span class="text-h6 text-weight-bolder q-px-sm">{{ cantidadPedido }}</span>
              <q-btn
                round
                dense
                flat
                color="dark"
                icon="add"
                @click="cantidadPedido++"
              />
            </div>
          </div>

          <!-- Notas opcionales -->
          <q-input
            v-model="notasPedido"
            outlined
            dense
            label="Notas especiales (ej. salsa de chocolate extra)"
            class="q-mt-md"
          />
        </q-card-section>

        <q-card-actions align="between" class="q-px-md q-pb-md">
          <div class="column">
            <span class="text-caption text-grey-6">Subtotal</span>
            <span class="text-subtitle1 text-weight-bold text-negative">
              {{ formatCOP(productoSeleccionado.precio * cantidadPedido) }}
            </span>
          </div>
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script setup>
import { ref } from 'vue'
import { useQuasar } from 'quasar'
import { formatCOP, addToCart } from '../store.js'

const $q = useQuasar()

const modalDetalle = ref(false)
const productoSeleccionado = ref(null)
const cantidadPedido = ref(1)
const notasPedido = ref('')

const productos = ref([
  {
    id: 'pos-volcan',
    nombre: 'Volcán de Chocolate Fundido',
    descripcion: 'Bizcocho tibio de chocolate semiamargo con corazón de ganache líquida que fluye al cortar, acompañado de helado de vainilla.',
    ingredientes: 'Chocolate de origen Arauca 70%, mantequilla de campo, huevos de granja, azúcar de caña y bola generosa de helado artesanal de vainilla Bourbon.',
    precio: 16900,
    etiqueta: '',
    esRecomendado: true, // DESTACADO RECOMENDACIÓN DEL CHEF
    imagen: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'pos-brownie',
    nombre: 'Brownie Melcochudo con Nuez',
    descripcion: 'Denso y húmedo brownie horneado al estilo americano con nueces del nogal tostadas, bañado en salsa caliente de arequipe.',
    ingredientes: 'Cacao puro alcalinizado, nueces crocantes seleccionadas, toffee de dulce de leche artesanal y helado cremoso de crema americana.',
    precio: 13900,
    etiqueta: 'Más Pedido',
    esRecomendado: false,
    imagen: 'https://images.unsplash.com/photo-1624353365286-3f8d62daad51?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'pos-cheesecake',
    nombre: 'Cheesecake estilo Nueva York con frutos rojos',
    descripcion: 'Suave crema de queso horneada sobre base de galleta crocante con mantequilla, coronada con coulis artesanal de moras y arándanos.',
    ingredientes: 'Queso crema Philadelphia, galletas Graham trituradas con canela, coulis brillante de fresas y arándanos frescos de la sabana.',
    precio: 15500,
    etiqueta: 'Nuevo',
    esRecomendado: false,
    imagen: 'https://images.unsplash.com/photo-1533134242443-d4fd215305ad?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'pos-waffle',
    nombre: 'Waffle Belga con Nutella & Fresa',
    descripcion: 'Waffle tostado y esponjoso cubierto con abundante Nutella tibia, fresas frescas en rodajas y azúcar glas nevada.',
    ingredientes: 'Masa de waffle belga con perlas de azúcar perlado, avellanas tostadas, crema de Nutella original y fresas orgánicas.',
    precio: 14500,
    etiqueta: 'Más Pedido',
    esRecomendado: false,
    imagen: 'https://images.unsplash.com/photo-1562376552-0d160a2f238d?auto=format&fit=crop&w=800&q=80'
  }
])

function getBadgeColor(etiqueta) {
  switch (etiqueta) {
    case 'Más Pedido': return 'negative'
    case 'Nuevo': return 'positive'
    case 'Picante': return 'deep-orange-9'
    case 'Vegetariano': return 'green-8'
    default: return 'primary'
  }
}

function verDetalle(prod) {
  productoSeleccionado.value = prod
  cantidadPedido.value = 1
  notasPedido.value = ''
  modalDetalle.value = true
}

function agregarRapido(prod) {
  addToCart(prod, 1, '')
  $q.notify({
    type: 'positive',
    message: `¡${prod.nombre} agregado al pedido!`,
    caption: `Subtotal: ${formatCOP(prod.precio)}`,
    icon: 'check_circle',
    timeout: 2000
  })
}

function confirmarAgregar() {
  if (!productoSeleccionado.value) return
  addToCart(productoSeleccionado.value, cantidadPedido.value, notasPedido.value)
  $q.notify({
    type: 'positive',
    message: `${cantidadPedido.value}x ${productoSeleccionado.value.nombre} agregado al pedido`,
    caption: `Total: ${formatCOP(productoSeleccionado.value.precio * cantidadPedido.value)}`,
    icon: 'shopping_bag',
    timeout: 2200
  })
}
</script>
