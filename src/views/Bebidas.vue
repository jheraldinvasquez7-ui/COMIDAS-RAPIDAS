<template>
  <q-page class="q-pb-xl">
    <!-- Banner de Portada Superior -->
    <div class="category-hero-banner q-mx-md q-mx-md-xl q-mt-md">
      <q-img
        src="https://images.unsplash.com/photo-1572490122747-3968b75cc699?auto=format&fit=crop&w=1600&q=80"
        :ratio="16/6"
        class="rounded-borders"
        style="max-height: 380px; filter: brightness(0.85);"
      >
        <div class="absolute-full flex flex-center text-center column q-pa-md" style="background: rgba(0, 0, 0, 0.45);">
          <div class="text-overline text-amber-5 text-weight-bolder letter-spacing-2">
            HELADO ARTESANAL CREMOSO & FRUTAS NATURALES
          </div>
          <h1 class="text-h2 text-weight-bolder text-white q-my-xs font-heading">
            BEBIDAS & MALTEADAS
          </h1>
          <p class="text-subtitle1 text-grey-3 q-max-w-md" style="max-width: 620px; font-size: 1.05rem;">
            Espesas malteadas americanas con toppings generosos, sodas saborizadas burbujeantes, limonadas frappé y gaseosas heladas.
          </p>
          <div class="row q-gutter-sm q-mt-sm">
            <q-badge color="negative" class="q-pa-xs q-px-sm text-weight-bold">
              <q-icon name="ac_unit" class="q-mr-xs" /> EXTRA HELADAS
            </q-badge>
            <q-badge color="amber-9" class="q-pa-xs q-px-sm text-weight-bold">
              <q-icon name="icecream" class="q-mr-xs" /> 100% HELADO PREMIUM
            </q-badge>
          </div>
        </div>
      </q-img>
    </div>

    <!-- Encabezado de Sección -->
    <div class="text-center q-my-lg q-px-md">
      <div class="text-negative text-weight-bold text-uppercase" style="letter-spacing: 2px; font-size: 0.88rem;">
        ➔ REFRÉSCATE CON EL COMPAÑERO IDEAL ￩
      </div>
      <h2 class="text-h3 text-weight-bolder text-dark q-mt-xs q-mb-sm font-heading">
        NUESTRAS BEBIDAS & MALTEADAS
      </h2>
      <p class="text-grey-8 text-body1" style="max-width: 680px; margin: 0 auto; line-height: 1.6;">
        El maridaje perfecto para tus hamburguesas y perros calientes. Disfruta de nuestras famosas recetas de autor servidas al instante.
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
            Ingredientes y presentación:
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
            label="Notas especiales (ej. poco hielo, sin crema chantilly)"
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
    id: 'beb-malteada-belga',
    nombre: 'Malteada Belga Chocolate',
    descripcion: 'Espesa y cremosa malteada elaborada con helado de chocolate belga, fudge artesanal, crema batida chantilly y virutas de cacao.',
    ingredientes: 'Helado artesanal de chocolate 70%, leche entera pasteurizada, sirope casero de chocolate fudge, crema batida de vainilla y barquillo relleno.',
    precio: 14900,
    etiqueta: '',
    esRecomendado: true, // DESTACADO RECOMENDACIÓN DEL CHEF
    imagen: 'https://images.unsplash.com/photo-1572490122747-3968b75cc699?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'beb-malteada-oreo',
    nombre: 'Malteada Oreo Supreme',
    descripcion: 'Helado de vainilla cremosa triturado con galletas Oreo enteras, borde escarchado con nutella y galleta crocante encima.',
    ingredientes: 'Helado artesanal de vainilla Bourbon, galletas Oreo trituradas, leche entera, ganache de Nutella y crema chantilly.',
    precio: 14500,
    etiqueta: 'Más Pedido',
    esRecomendado: false,
    imagen: 'https://images.unsplash.com/photo-1579954115545-a95591f28bfc?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'beb-limonada-coco',
    nombre: 'Limonada de Coco Artesanal',
    descripcion: 'Zumo recién exprimido de limón tahití batido en frappé con crema y leche de coco pura del pacífico.',
    ingredientes: 'Limones tahití frescos, leche de coco espesa sin conservantes, hielo frappé y escarchado de azúcar morena en el borde.',
    precio: 11000,
    etiqueta: 'Nuevo',
    esRecomendado: false,
    imagen: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'beb-soda-frutos',
    nombre: 'Soda Artesanal Frutos Rojos',
    descripcion: 'Bebida gasificada natural infusionada con almíbar casero de fresas, moras, agraz fresco y hojas de hierbabuena.',
    ingredientes: 'Agua carbonatada mineral, reducción casera de frutos del bosque, trozos de fresa y mora silvestre, hielo cristal y toque cítrico.',
    precio: 9500,
    etiqueta: 'Más Pedido',
    esRecomendado: false,
    imagen: 'https://images.unsplash.com/photo-1536935338788-846bb9981813?auto=format&fit=crop&w=800&q=80'
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
    message: `¡${prod.nombre} agregada al pedido!`,
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
    message: `${cantidadPedido.value}x ${productoSeleccionado.value.nombre} agregada al pedido`,
    caption: `Total: ${formatCOP(productoSeleccionado.value.precio * cantidadPedido.value)}`,
    icon: 'shopping_bag',
    timeout: 2200
  })
}
</script>
