<template>
  <q-page class="q-pb-xl">
    <!-- Banner de Portada Superior -->
    <div class="category-hero-banner q-mx-md q-mx-md-xl q-mt-md">
      <q-img
        src="https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=1600&q=80"
        :ratio="16/6"
        class="rounded-borders"
        style="max-height: 380px; filter: brightness(0.85);"
      >
        <div class="absolute-full flex flex-center text-center column q-pa-md" style="background: rgba(0, 0, 0, 0.5);">
          <div class="text-overline text-amber-5 text-weight-bolder letter-spacing-2">
            PASIÓN POR LA CALIDAD DESDE 2018
          </div>
          <h1 class="text-h2 text-weight-bolder text-white q-my-xs font-heading">
            SOBRE BURGER BITE
          </h1>
          <p class="text-subtitle1 text-grey-3 q-max-w-md" style="max-width: 640px; font-size: 1.05rem;">
            Conoce nuestra historia, nuestro talentoso equipo culinario y cómo transformamos cada comida rápida en un momento inolvidable.
          </p>
        </div>
      </q-img>
    </div>

    <div class="q-px-md q-px-md-xl">
      <!-- Sección Historia -->
      <div class="row q-col-gutter-xl items-center q-my-lg">
        <div class="col-12 col-md-6">
          <div class="text-negative text-weight-bold text-uppercase" style="letter-spacing: 2px; font-size: 0.88rem;">
            NUESTRA HISTORIA
          </div>
          <h2 class="text-h3 text-weight-bolder text-dark q-mt-xs q-mb-md font-heading">
            SABOR AUTÉNTICO, INGREDIENTES REALES
          </h2>
          <p class="text-body1 text-grey-8" style="line-height: 1.7;">
            Burger Bite nació en el año 2018 con una misión clara: reinventar las comidas rápidas elevando cada detalle a un nivel artesanal supremo. Lo que inició como un pequeño local de parrilla en Bogotá con capacidad para solo 15 comensales, hoy se ha convertido en un punto de referencia para los apasionados por las hamburguesas jugosas, los perros calientes cargados y las pizzas de fermentación lenta.
          </p>
          <p class="text-body1 text-grey-8" style="line-height: 1.7;">
            Creemos firmemente en el poder de la comida fresca. No usamos carnes congeladas ni salsas artificiales prefabricadas. Horneamos nuestro pan a diario, molemos nuestras mezclas de res Angus cada mañana y elaboramos nuestras salsas con recetas secretas de la casa.
          </p>
          <div class="row q-gutter-md q-mt-sm">
            <div class="bg-grey-2 q-pa-md rounded-borders col text-center">
              <div class="text-h4 text-weight-bolder text-negative font-heading">+50.000</div>
              <div class="text-caption text-grey-7 text-weight-bold">Hamburguesas Servidas</div>
            </div>
            <div class="bg-grey-2 q-pa-md rounded-borders col text-center">
              <div class="text-h4 text-weight-bolder text-negative font-heading">4.9 / 5</div>
              <div class="text-caption text-grey-7 text-weight-bold">Satisfacción de Clientes</div>
            </div>
            <div class="bg-grey-2 q-pa-md rounded-borders col text-center">
              <div class="text-h4 text-weight-bolder text-negative font-heading">100%</div>
              <div class="text-caption text-grey-7 text-weight-bold">Carne Fresca Angus</div>
            </div>
          </div>
        </div>

        <div class="col-12 col-md-6">
          <q-img
            src="https://images.unsplash.com/photo-1552566626-52f8b828add9?auto=format&fit=crop&w=900&q=80"
            class="rounded-borders shadow-4"
            style="border-radius: 20px; max-height: 420px;"
          />
        </div>
      </div>

      <q-separator class="q-my-xl" />

      <!-- Sección Información, Dirección, Horarios y Contacto -->
      <div class="q-my-lg">
        <div class="text-center q-mb-xl">
          <div class="text-negative text-weight-bold text-uppercase" style="letter-spacing: 2px; font-size: 0.88rem;">
            VISÍTANOS O PIDE A CASA
          </div>
          <h2 class="text-h3 text-weight-bolder text-dark q-mt-xs q-mb-sm font-heading">
            UBICACIÓN & CONTACTO
          </h2>
          <p class="text-grey-8 text-body1" style="max-width: 640px; margin: 0 auto;">
            Estamos ubicados en el corazón gastronómico de la ciudad, listos para recibirte o llevar tu orden directo a la puerta.
          </p>
        </div>

        <div class="row q-col-gutter-lg">
          <!-- Tarjeta Dirección -->
          <div class="col-12 col-md-4">
            <q-card class="full-height product-card q-pa-lg text-center">
              <q-avatar size="64px" font-size="32px" color="red-1" text-color="negative" class="q-mb-md">
                <q-icon name="place" />
              </q-avatar>
              <div class="text-h6 text-weight-bolder text-dark font-heading q-mb-xs">
                DIRECCIÓN FÍSICA
              </div>
              <p class="text-body2 text-grey-8 q-mb-none">
                Calle 85 # 14-25, Zona Rosa<br>
                Bogotá D.C., Colombia
              </p>
              <div class="text-caption text-grey-6 q-mt-sm">
                (Parqueadero vigilado disponible)
              </div>
            </q-card>
          </div>

          <!-- Tarjeta Horarios -->
          <div class="col-12 col-md-4">
            <q-card class="full-height product-card q-pa-lg text-center">
              <q-avatar size="64px" font-size="32px" color="amber-1" text-color="amber-9" class="q-mb-md">
                <q-icon name="schedule" />
              </q-avatar>
              <div class="text-h6 text-weight-bolder text-dark font-heading q-mb-xs">
                HORARIOS DE ATENCIÓN
              </div>
              <p class="text-body2 text-grey-8 q-mb-xs">
                <strong>Lunes a Jueves:</strong><br>11:30 AM – 10:30 PM
              </p>
              <p class="text-body2 text-grey-8 q-mb-none">
                <strong>Viernes a Domingo:</strong><br>11:30 AM – 12:00 AM (Medianoche)
              </p>
            </q-card>
          </div>

          <!-- Tarjeta Teléfono & WhatsApp -->
          <div class="col-12 col-md-4">
            <q-card class="full-height product-card q-pa-lg text-center">
              <q-avatar size="64px" font-size="32px" color="green-1" text-color="positive" class="q-mb-md">
                <q-icon name="chat" />
              </q-avatar>
              <div class="text-h6 text-weight-bolder text-dark font-heading q-mb-xs">
                PEDIDOS & RESERVAS
              </div>
              <p class="text-body2 text-grey-8 q-mb-xs">
                <strong>Teléfono Fijo:</strong> +57 (601) 745-9820<br>
                <strong>Línea Celular:</strong> +57 310 987 6543
              </p>
              <q-btn
                unelevated
                color="positive"
                class="q-mt-sm q-px-md text-weight-bold"
                style="border-radius: 999px;"
                icon="whatsapp"
                label="Pedir por WhatsApp"
                @click="abrirWhatsApp"
              />
            </q-card>
          </div>
        </div>
      </div>

      <q-separator class="q-my-xl" />

      <!-- Sección Equipo de Trabajo (Mínimo 3 personas obligatorias: Chef, Cajero, Domiciliario) -->
      <div class="q-my-lg">
        <div class="text-center q-mb-xl">
          <div class="text-negative text-weight-bold text-uppercase" style="letter-spacing: 2px; font-size: 0.88rem;">
            QUIENES HACEN LA MAGIA POSIBLE
          </div>
          <h2 class="text-h3 text-weight-bolder text-dark q-mt-xs q-mb-sm font-heading">
            NUESTRO EQUIPO
          </h2>
          <p class="text-grey-8 text-body1" style="max-width: 640px; margin: 0 auto;">
            Personas apasionadas que se encargan de asar, servir y llevar tu pedido caliente y a tiempo.
          </p>
        </div>

        <div class="row q-col-gutter-lg">
          <div
            v-for="miembro in equipo"
            :key="miembro.id"
            class="col-12 col-sm-6 col-md-4"
          >
            <q-card class="product-card team-card text-center q-pa-lg">
              <q-avatar size="220px" class="team-photo q-mx-auto q-mb-md shadow-2">
                <img :src="miembro.foto" :alt="miembro.nombre">
              </q-avatar>

              <div class="text-h6 text-weight-bolder text-dark font-heading q-mb-xs">
                {{ miembro.nombre }}
              </div>
              <q-badge color="negative" class="team-role text-weight-bold q-mb-sm q-pa-xs q-px-sm">
                {{ miembro.rol }}
              </q-badge>

              <p class="text-body2 text-grey-7 q-mt-sm" style="line-height: 1.5;">
                "{{ miembro.bio }}"
              </p>
              <div class="text-caption text-grey-6 text-italic">
                Experiencia: {{ miembro.experiencia }}
              </div>
            </q-card>
          </div>
        </div>
      </div>

      <q-separator class="q-my-xl" />

      <!-- Formulario de Reservas y Sugerencias -->
      <div class="bg-white q-pa-lg q-pa-md-xl rounded-borders shadow-1" style="border-radius: 20px; border: 1px solid #EEEEEE;">
        <div class="row q-col-gutter-lg items-center">
          <div class="col-12 col-md-5">
            <div class="text-negative text-weight-bold text-uppercase" style="letter-spacing: 1.5px; font-size: 0.85rem;">
              PLANEA TU VISITA
            </div>
            <h3 class="text-h4 text-weight-bolder text-dark font-heading q-mt-xs q-mb-sm">
              RESERVA TU MESA
            </h3>
            <p class="text-body2 text-grey-8" style="line-height: 1.6;">
              ¿Cumpleaños, reunión de amigos o cena especial? Déjanos tus datos y te aseguramos el mejor lugar con servicio preferencial.
            </p>
            <div class="q-gutter-y-sm text-grey-8 text-body2 q-mt-md">
              <div class="row items-center">
                <q-icon name="check_circle" color="positive" class="q-mr-sm" size="1.2rem" />
                Sin costo de reserva anticipada
              </div>
              <div class="row items-center">
                <q-icon name="check_circle" color="positive" class="q-mr-sm" size="1.2rem" />
                Decoración de mesa bajo petición
              </div>
              <div class="row items-center">
                <q-icon name="check_circle" color="positive" class="q-mr-sm" size="1.2rem" />
                Confirmación inmediata por WhatsApp
              </div>
            </div>
          </div>

          <div class="col-12 col-md-7">
            <q-form @submit.prevent="enviarReserva" class="q-gutter-md">
              <div class="row q-col-gutter-sm">
                <div class="col-12 col-sm-6">
                  <q-input
                    v-model="reserva.nombre"
                    outlined
                    dense
                    label="Nombre completo"
                    :rules="[val => !!val || 'El nombre es obligatorio']"
                  />
                </div>
                <div class="col-12 col-sm-6">
                  <q-input
                    v-model="reserva.telefono"
                    outlined
                    dense
                    label="Teléfono / WhatsApp"
                    :rules="[val => !!val || 'El teléfono es obligatorio']"
                  />
                </div>
              </div>

              <div class="row q-col-gutter-sm">
                <div class="col-12 col-sm-6">
                  <q-input
                    v-model="reserva.fecha"
                    type="date"
                    outlined
                    dense
                    label="Fecha de la reserva"
                  />
                </div>
                <div class="col-12 col-sm-6">
                  <q-select
                    v-model="reserva.invitados"
                    outlined
                    dense
                    :options="['1 a 2 Personas', '3 a 4 Personas', '5 a 8 Personas', 'Más de 8 Personas']"
                    label="Cantidad de invitados"
                  />
                </div>
              </div>

              <q-input
                v-model="reserva.comentarios"
                type="textarea"
                outlined
                dense
                rows="2"
                label="Comentarios especiales (opcional)"
              />

              <div class="row justify-end">
                <q-btn
                  type="submit"
                  class="btn-red-primary"
                  icon="event_available"
                  label="Confirmar Solicitud de Reserva"
                />
              </div>
            </q-form>
          </div>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script setup>
import { ref } from 'vue'
import { useQuasar } from 'quasar'

const $q = useQuasar()

const equipo = ref([
  {
    id: 1,
    nombre: 'Sebastián Morales',
    rol: 'Chef Ejecutivo & Parrillero',
    bio: 'Especialista en carnes a las brasas y creador de nuestras mezclas de res Angus y salsas de autor con más de 12 años de trayectoria culinaria.',
    experiencia: '12 años en alta cocina y parrilla',
    foto: 'https://images.unsplash.com/photo-1577219491135-ce391730fb2c?auto=format&fit=crop&w=400&q=80'
  },
  {
    id: 2,
    nombre: 'Valentina Restrepo',
    rol: 'Líder de Caja & Servicio al Cliente',
    bio: 'La sonrisa cálida que te recibe siempre en mostrador. Se asegura de que cada pedido salga exacto, sin demoras y con la mejor atención.',
    experiencia: '6 años en hospitalidad gastronómica',
    foto: 'https://imagenes2.eltiempo.com/files/image_600_455/uploads/2026/03/26/69c565d29a8d1.jpeg'
  },
  {
    id: 3,
    nombre: 'Mateo Cárdenas',
    rol: 'Jefe de Domicilios & Logística',
    bio: 'Experto en las rutas de la ciudad. Equipado con maletines térmicos de última tecnología para que tu pedido llegue humeante y perfecto.',
    experiencia: '5 años garantizando entregas veloces',
    foto: 'https://www.shutterstock.com/image-photo/business-man-startup-face-smile-260nw-2591333427.jpg'
  }
])

const reserva = ref({
  nombre: '',
  telefono: '',
  fecha: new Date().toISOString().split('T')[0],
  invitados: '3 a 4 Personas',
  comentarios: ''
})

function abrirWhatsApp() {
  const url = `https://wa.me/573109876543?text=${encodeURIComponent('¡Hola Burger Bite! Quisiera información y hacer un pedido.')}`
  window.open(url, '_blank')
}

function enviarReserva() {
  if (!reserva.value.nombre || !reserva.value.telefono) {
    $q.notify({
      type: 'warning',
      message: 'Por favor completa tu nombre y número de teléfono',
      icon: 'warning'
    })
    return
  }

  $q.notify({
    type: 'positive',
    message: `¡Reserva solicitada con éxito a nombre de ${reserva.value.nombre}!`,
    caption: `Te contactaremos al ${reserva.value.telefono} para confirmar disponibilidad.`,
    icon: 'check_circle',
    timeout: 3500
  })

  reserva.value.nombre = ''
  reserva.value.telefono = ''
  reserva.value.comentarios = ''
}
</script>
