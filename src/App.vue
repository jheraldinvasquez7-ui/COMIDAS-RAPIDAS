<template>
  <q-layout view="lHh Lpr lff" class="bg-grey-1">
    <!-- Header Principal -->
    <q-header elevated class="bb-header q-py-xs">
      <q-toolbar class="q-px-md q-px-md-xl">
        <!-- Botón del menú lateral -->
        <q-btn
          flat
          dense
          icon="menu"
          label="Menú"
          aria-label="Abrir menú lateral"
          class="side-menu-button text-dark q-mr-sm"
          @click="menuMovil = !menuMovil"
        />

        <!-- Logo Burger Bite -->
        <router-link to="/hamburguesas" class="row items-center no-wrap text-decoration-none cursor-pointer">
          <div class="logo-circle q-mr-sm flex flex-center">
            <q-icon name="lunch_dining" size="24px" color="white" />
          </div>
          <div class="column">
            <div class="row items-center no-wrap">
              <span class="text-h5 text-weight-bolder text-dark font-heading q-mr-xs" style="line-height: 1;">Burger</span>
              <span class="text-h5 text-weight-bolder text-negative font-heading" style="line-height: 1;">Bite</span>
            </div>
            <span class="text-caption text-grey-6 text-weight-medium" style="font-size: 0.65rem; letter-spacing: 0.8px; margin-top: -2px;">
              COMIDA RÁPIDA Y PARRILLA
            </span>
          </div>
        </router-link>

        <q-space />

        <!-- Enlaces de Navegación Desktop -->
        <div class="gt-sm row items-center q-gutter-x-xs">
          <q-btn
            flat
            to="/hamburguesas"
            label="Hamburguesas"
            class="bb-nav-btn"
          />
          <q-btn
            flat
            to="/perros"
            label="Perros"
            class="bb-nav-btn"
          />
          <q-btn
            flat
            to="/pizzas"
            label="Pizzas"
            class="bb-nav-btn"
          />
          <q-btn
            flat
            to="/bebidas"
            label="Bebidas"
            class="bb-nav-btn"
          />
          <q-btn
            flat
            to="/postres"
            label="Postres"
            class="bb-nav-btn"
          />
          <q-btn
            flat
            to="/promociones"
            label="Promociones"
            class="bb-nav-btn"
          >
            <q-badge color="negative" floating rounded>PROMO</q-badge>
          </q-btn>
          <q-btn
            flat
            to="/nosotros"
            label="Nosotros"
            class="bb-nav-btn"
          />
        </div>

        <q-space />

      </q-toolbar>
    </q-header>

    <!-- Menú lateral izquierdo -->
    <q-drawer
      v-model="menuMovil"
      side="left"
      overlay
      bordered
      :width="300"
      class="side-drawer bg-white q-pa-md"
    >
      <div class="row items-center justify-between q-mb-md">
        <div class="row items-center">
          <div class="logo-circle q-mr-sm flex flex-center">
            <q-icon name="lunch_dining" size="20px" color="white" />
          </div>
          <span class="text-h6 text-weight-bolder text-dark font-heading">Burger <span class="text-negative">Bite</span></span>
        </div>
        <q-btn flat round dense icon="close" aria-label="Cerrar menú" @click="menuMovil = false" />
      </div>

      <q-separator class="q-mb-md" />

      <q-list class="text-dark font-weight-medium">
        <q-item clickable v-ripple to="/hamburguesas" @click="menuMovil = false">
          <q-item-section avatar><q-icon name="lunch_dining" color="negative" /></q-item-section>
          <q-item-section class="text-weight-bold">Hamburguesas</q-item-section>
        </q-item>
        <q-item clickable v-ripple to="/perros" @click="menuMovil = false">
          <q-item-section avatar><q-icon name="local_see" color="amber-9" /></q-item-section>
          <q-item-section class="text-weight-bold">Perros Calientes</q-item-section>
        </q-item>
        <q-item clickable v-ripple to="/pizzas" @click="menuMovil = false">
          <q-item-section avatar><q-icon name="local_pizza" color="deep-orange" /></q-item-section>
          <q-item-section class="text-weight-bold">Pizzas</q-item-section>
        </q-item>
        <q-item clickable v-ripple to="/bebidas" @click="menuMovil = false">
          <q-item-section avatar><q-icon name="local_bar" color="blue" /></q-item-section>
          <q-item-section class="text-weight-bold">Bebidas y malteadas</q-item-section>
        </q-item>
        <q-item clickable v-ripple to="/postres" @click="menuMovil = false">
          <q-item-section avatar><q-icon name="cake" color="pink" /></q-item-section>
          <q-item-section class="text-weight-bold">Postres</q-item-section>
        </q-item>
        <q-item clickable v-ripple to="/promociones" @click="menuMovil = false">
          <q-item-section avatar><q-icon name="local_offer" color="negative" /></q-item-section>
          <q-item-section class="text-weight-bold">Promociones</q-item-section>
          <q-item-section side><q-badge color="negative">20% OFF</q-badge></q-item-section>
        </q-item>
        <q-item clickable v-ripple to="/nosotros" @click="menuMovil = false">
          <q-item-section avatar><q-icon name="storefront" color="grey-8" /></q-item-section>
          <q-item-section class="text-weight-bold">Sobre Nosotros</q-item-section>
        </q-item>
      </q-list>

    </q-drawer>

    <!-- Contenedor Principal de Vistas -->
    <q-page-container>
      <!-- Hero Promocional Superior (Inspirado en la imagen de referencia) -->
      <section v-if="esVistaInicio" class="hero-section q-pa-md q-pa-md-xl">
        <div class="hero-container row items-center justify-between">
          <div class="col-12 col-md-6 q-pr-md-xl q-mb-lg q-mb-md-none">
            <div class="text-overline text-negative text-weight-bolder letter-spacing-2 q-mb-xs">
              BUENA COMIDA. BUEN ÁNIMO.
            </div>
            <h1 class="hero-title text-dark font-heading q-my-none">
              GRANDES BOCADOS,<br><span class="text-negative">MEJORES MOMENTOS.</span>
            </h1>
            <p class="text-body1 text-grey-8 q-mt-md q-mb-lg" style="max-width: 480px; font-size: 1.12rem; line-height: 1.6;">
              Hamburguesas jugosas, papas crujientes y malteadas deliciosas, preparadas al momento con carne Angus 100%.
            </p>

            <div class="row items-center q-gutter-md q-mb-xl">
              <q-btn
                outline
                class="btn-red-outline q-px-lg q-py-sm"
                to="/promociones"
                label="VER PROMOCIONES"
              />
            </div>

            <!-- 3 Badges Claves según imagen -->
            <div class="row q-gutter-md">
              <div class="row items-center q-gutter-xs">
                <q-avatar size="36px" color="red-1" text-color="negative">
                  <q-icon name="local_fire_department" />
                </q-avatar>
                <div class="column">
                  <span class="text-caption text-weight-bolder text-dark">A LA BRASA</span>
                  <span class="text-caption text-grey-6" style="font-size: 0.65rem;">PARRILLA</span>
                </div>
              </div>

              <div class="row items-center q-gutter-xs">
                <q-avatar size="36px" color="red-1" text-color="negative">
                  <q-icon name="lunch_dining" />
                </q-avatar>
                <div class="column">
                  <span class="text-caption text-weight-bolder text-dark">FRESCOS</span>
                  <span class="text-caption text-grey-6" style="font-size: 0.65rem;">INGREDIENTES</span>
                </div>
              </div>

              <div class="row items-center q-gutter-xs">
                <q-avatar size="36px" color="red-1" text-color="negative">
                  <q-icon name="delivery_dining" />
                </q-avatar>
                <div class="column">
                  <span class="text-caption text-weight-bolder text-dark">RÁPIDO</span>
                  <span class="text-caption text-grey-6" style="font-size: 0.65rem;">DOMICILIO</span>
                </div>
              </div>
            </div>
          </div>

          <!-- Imagen Hero con Splash Rojo y Badge 100% Fresh -->
          <div class="col-12 col-md-6 flex flex-center position-relative">
            <div class="hero-image-wrapper">
              <div class="fresh-badge flex flex-center column">
                <span class="text-weight-bolder text-dark" style="font-size: 0.85rem; line-height: 1;">100%</span>
                <span class="text-caption text-weight-bold text-dark" style="font-size: 0.65rem; line-height: 1;">FRESCO Y</span>
                <span class="text-caption text-weight-bold text-negative" style="font-size: 0.65rem; line-height: 1;">SABROSO</span>
              </div>
              <img
                src="https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=1000&q=80"
                alt="Burger Bite Hero Burger"
                class="hero-burger-img"
              />
            </div>
          </div>
        </div>
      </section>

      <!-- Router View dinámico -->
      <router-view />

      <!-- Banner Inferior de Combo (Fiel a la imagen de referencia) -->
      <section class="q-px-md q-px-md-xl q-my-xl">
        <div class="combo-promo-banner row items-center justify-between q-pa-lg q-pa-md-xl">
          <div class="col-12 col-md-4 text-center q-mb-md q-mb-md-none">
            <img
              src="https://images.unsplash.com/photo-1594212699903-ec8a3eca50f5?auto=format&fit=crop&w=600&q=80"
              alt="Combo Meal"
              class="combo-image"
            />
          </div>

          <div class="col-12 col-md-5 text-center text-md-left q-mb-md q-mb-md-none text-white">
            <div class="text-overline text-grey-3 text-weight-bolder letter-spacing-2">
              HAZLO UN
            </div>
            <h2 class="text-h2 text-weight-bolder text-white font-heading q-my-none">
              COMBO PERFECTO.
            </h2>
            <p class="text-subtitle1 text-grey-2 q-mt-sm q-mb-md">
              Agrega papas crujientes y una malteada o bebida fría, y ahorra hasta un 20% en tu pedido.
            </p>
            <q-btn
              unelevated
              color="white"
              text-color="dark"
              class="text-weight-bold q-px-lg q-py-sm"
              style="border-radius: 999px;"
              to="/promociones"
            >
              MEJORAR PEDIDO
              <q-icon name="arrow_forward" size="18px" class="q-ml-sm" />
            </q-btn>
          </div>

          <div class="col-12 col-md-3 flex flex-center">
            <div class="discount-circle flex flex-center column">
              <span class="text-caption text-weight-bold text-dark" style="font-size: 0.75rem;">AHORRA HASTA</span>
              <span class="text-h3 text-weight-bolder text-negative font-heading" style="line-height: 1;">20%</span>
            </div>
          </div>
        </div>
      </section>
    </q-page-container>

    <!-- Footer Idéntico a la Referencia -->
    <footer class="bb-footer q-pt-xl q-pb-md text-white">
      <div class="q-px-md q-px-md-xl">
        <div class="row q-col-gutter-xl q-pb-xl">
          <!-- Columna 1: Logo, Descripción & Redes -->
          <div class="col-12 col-md-4">
            <div class="row items-center q-mb-sm">
              <div class="logo-circle q-mr-sm flex flex-center">
                <q-icon name="lunch_dining" size="22px" color="white" />
              </div>
              <span class="text-h5 text-weight-bolder font-heading">
                Burger <span class="text-negative">Bite</span>
              </span>
            </div>
            <p class="text-grey-5 text-body2 q-mt-sm" style="max-width: 320px; line-height: 1.6;">
              Hamburguesas deliciosas, preparadas con ingredientes de calidad y servidas con pasión en Colombia.
            </p>
            <div class="row q-gutter-sm q-mt-md">
              <q-btn round flat dense size="sm" icon="facebook" class="bg-grey-9 text-white" />
              <q-btn round flat dense size="sm" icon="photo_camera" class="bg-grey-9 text-white" />
              <q-btn round flat dense size="sm" icon="share" class="bg-grey-9 text-white" />
              <q-btn round flat dense size="sm" icon="videocam" class="bg-grey-9 text-white" />
            </div>
          </div>

          <!-- Columna 2: Quick Links -->
          <div class="col-6 col-sm-3 col-md-2">
            <div class="text-subtitle2 text-weight-bolder text-uppercase q-mb-md letter-spacing-1">
              ENLACES RÁPIDOS
            </div>
            <div class="column q-gutter-y-xs text-grey-4 text-caption">
              <router-link to="/hamburguesas" class="footer-link">Inicio</router-link>
              <router-link to="/promociones" class="footer-link">Menú</router-link>
              <router-link to="/nosotros" class="footer-link">Ubicación</router-link>
              <router-link to="/nosotros" class="footer-link">Nosotros</router-link>
              <router-link to="/nosotros" class="footer-link">Contacto</router-link>
            </div>
          </div>

          <!-- Columna 3: Categorías de Menú -->
          <div class="col-6 col-sm-3 col-md-2">
            <div class="text-subtitle2 text-weight-bolder text-uppercase q-mb-md letter-spacing-1">
              MENÚ
            </div>
            <div class="column q-gutter-y-xs text-grey-4 text-caption">
              <router-link to="/hamburguesas" class="footer-link">Hamburguesas</router-link>
              <router-link to="/perros" class="footer-link">Perros calientes</router-link>
              <router-link to="/pizzas" class="footer-link">Pizzas</router-link>
              <router-link to="/bebidas" class="footer-link">Malteadas y bebidas</router-link>
              <router-link to="/postres" class="footer-link">Postres</router-link>
              <router-link to="/promociones" class="footer-link">Promociones</router-link>
            </div>
          </div>

          <!-- Columna 4: Contacto & Suscripción -->
          <div class="col-12 col-md-4">
            <div class="text-subtitle2 text-weight-bolder text-uppercase q-mb-md letter-spacing-1">
              CONTÁCTANOS
            </div>
            <div class="column q-gutter-y-xs text-grey-4 text-caption q-mb-md">
              <div class="row items-center">
                <q-icon name="phone" class="q-mr-sm text-negative" size="16px" />
                <span>+57 310 987 6543 / +57 (601) 745-9820</span>
              </div>
              <div class="row items-center">
                <q-icon name="email" class="q-mr-sm text-negative" size="16px" />
                <span>pedidos@burgerbite.com</span>
              </div>
              <div class="row items-center">
                <q-icon name="place" class="q-mr-sm text-negative" size="16px" />
                <span>Calle 85 # 14-25, Zona Rosa, Bogotá</span>
              </div>
            </div>

            <!-- Stay in the loop box -->
            <div class="newsletter-card q-pa-md rounded-borders bg-grey-10">
              <div class="text-caption text-weight-bold text-white q-mb-xs">
                ¡MANTENTE AL DÍA!
              </div>
              <div class="text-caption text-grey-5 q-mb-sm" style="font-size: 0.75rem;">
                Suscríbete para recibir descuentos exclusivos y novedades deliciosas.
              </div>
              <div class="row q-gutter-xs">
                <q-input
                  v-model="emailSuscripcion"
                  dark
                  dense
                  outlined
                  placeholder="Tu correo electrónico"
                  class="col bg-grey-9 text-white"
                />
                <q-btn
                  unelevated
                  class="btn-red-primary"
                  label="SUSCRIBIRME"
                  @click="suscribirseBoletin"
                />
              </div>
            </div>
          </div>
        </div>

        <q-separator dark class="q-my-md opacity-20" />

        <div class="row items-center justify-between text-caption text-grey-6 q-pt-sm">
          <div>© 2026 Burger Bite. Todos los derechos reservados. Menú digital y domicilios.</div>
          <div class="row q-gutter-md">
            <span>Política de privacidad</span>
            <span>Términos de servicio</span>
            <span>Cookies</span>
          </div>
        </div>
      </div>
    </footer>

    <!-- DIÁLOGO DEL CARRITO & CHECKOUT (Con Marca select, Modelo separado, Fecha automática no editable, Estado inicial Recibido, Abono con caja dedicada) -->
    <q-dialog v-model="state.isCartDrawerOpen" position="right">
      <q-card style="width: 440px; max-width: 95vw; height: 100%; display: flex; flex-direction: column;">
        <!-- Cabecera del Carrito -->
        <q-card-section class="row items-center justify-between bg-dark text-white q-py-md">
          <div class="row items-center">
            <q-icon name="shopping_cart" size="24px" class="q-mr-sm text-negative" />
            <span class="text-h6 text-weight-bolder font-heading">TU PEDIDO ACTUAL</span>
          </div>
          <q-btn flat round dense icon="close" color="white" v-close-popup />
        </q-card-section>

        <!-- Lista de Productos en el Carrito -->
        <q-card-section class="col overflow-auto q-pa-md">
          <div v-if="state.cart.length === 0" class="text-center q-pa-xl column flex-center">
            <q-icon name="remove_shopping_cart" size="64px" color="grey-4" />
            <div class="text-h6 text-grey-7 q-mt-md font-heading">Tu carrito está vacío</div>
            <p class="text-caption text-grey-6 q-mt-xs">
              Explora nuestras categorías y agrega tus hamburguesas o combos favoritos.
            </p>
            <q-btn
              class="btn-red-primary q-mt-md"
              label="Ver Hamburguesas"
              to="/hamburguesas"
              v-close-popup
            />
          </div>

          <div v-else>
            <q-list separator>
              <q-item
                v-for="item in state.cart"
                :key="item.id"
                class="q-py-md q-px-none"
              >
                <q-item-section avatar>
                  <q-img
                    :src="item.imagen"
                    style="width: 60px; height: 60px; border-radius: 8px;"
                  />
                </q-item-section>

                <q-item-section>
                  <div class="text-subtitle2 text-weight-bolder text-dark">{{ item.nombre }}</div>
                  <div class="text-caption text-negative text-weight-bold">
                    {{ formatCOP(item.precio) }} c/u
                  </div>
                  <div v-if="item.notes" class="text-caption text-grey-7 text-italic">
                    Nota: {{ item.notes }}
                  </div>
                </q-item-section>

                <q-item-section side>
                  <div class="row items-center q-gutter-xs">
                    <q-btn
                      flat
                      round
                      dense
                      size="sm"
                      icon="remove"
                      color="dark"
                      @click="updateCartQuantity(item.id, -1)"
                    />
                    <span class="text-weight-bolder q-px-xs text-body2">{{ item.cantidad }}</span>
                    <q-btn
                      flat
                      round
                      dense
                      size="sm"
                      icon="add"
                      color="dark"
                      @click="updateCartQuantity(item.id, 1)"
                    />
                    <q-btn
                      flat
                      round
                      dense
                      size="sm"
                      icon="delete_outline"
                      color="grey-6"
                      @click="removeFromCart(item.id)"
                    />
                  </div>
                  <div class="text-caption text-weight-bolder text-right text-dark q-mt-xs">
                    {{ formatCOP(item.precio * item.cantidad) }}
                  </div>
                </q-item-section>
              </q-item>
            </q-list>

            <q-separator class="q-my-md" />

            <!-- Formulario de Pedido / Registro con Requisitos Obligatorios -->
            <div class="text-subtitle2 text-weight-bolder text-dark q-mb-sm font-heading">
              DATOS DE ENTREGA Y REGISTRO
            </div>

            <div class="q-gutter-y-sm">
              <!-- Fecha automática y no editable -->
              <q-input
                v-model="formularioPedido.fecha"
                label="Fecha del Pedido (Automática - No editable)"
                dense
                outlined
                readonly
                bg-color="grey-2"
              >
                <template v-slot:prepend>
                  <q-icon name="event" color="negative" />
                </template>
              </q-input>

              <!-- Nombre del cliente -->
              <q-input
                v-model="formularioPedido.cliente"
                label="Nombre del Cliente"
                dense
                outlined
                placeholder="Ej. Juan Pérez"
              />

              <!-- Teléfono -->
              <q-input
                v-model="formularioPedido.telefono"
                label="Teléfono / WhatsApp"
                dense
                outlined
                placeholder="Ej. 312 345 6789"
              />

              <!-- Dirección -->
              <q-input
                v-model="formularioPedido.direccion"
                label="Dirección de Envío / Mesa"
                dense
                outlined
                placeholder="Ej. Calle 85 # 14-25 Apt 401"
              />

              <!-- La MARCA debe ser un select (dropdown) -->
              <q-select
                v-model="formularioPedido.marca"
                :options="opcionesMarcas"
                label="Marca / Sede Comercial (Select)"
                dense
                outlined
              >
                <template v-slot:prepend>
                  <q-icon name="store" color="negative" />
                </template>
              </q-select>

              <!-- Le falta el campo MODELO (campo diferente de marca) -->
              <q-input
                v-model="formularioPedido.modelo"
                label="Modelo / Tipo de Entrega (Campo separado)"
                dense
                outlined
                placeholder="Ej. Pedido Gourmet Domicilio / Mesa VIP"
              />

              <!-- Método de Pago -->
              <q-select
                v-model="formularioPedido.metodoPago"
                :options="['Efectivo', 'Tarjeta Débito / Crédito', 'Transferencia Nequi / Daviplata', 'Abono / Anticipo']"
                label="Método de Pago"
                dense
                outlined
              />

              <!-- Cuando selecciono ABONO tengo una caja para poner el valor del abono -->
              <div v-if="formularioPedido.metodoPago === 'Abono / Anticipo'" class="bg-red-1 q-pa-sm rounded-borders">
                <div class="text-caption text-weight-bold text-negative q-mb-xs">
                  Ingrese el valor del Abono / Anticipo:
                </div>
                <q-input
                  v-model.number="formularioPedido.abono"
                  type="number"
                  label="Valor del Abono (COP)"
                  dense
                  outlined
                  bg-color="white"
                  prefix="$"
                  :hint="`Saldo restante por cobrar: ${formatCOP(Math.max(0, cartTotal - (formularioPedido.abono || 0)))}`"
                />
              </div>

              <!-- Estado inicial: RECIBIDO (Informativo en registro inicial) -->
              <div class="row items-center justify-between bg-grey-2 q-pa-sm rounded-borders">
                <span class="text-caption text-grey-8 text-weight-medium">Estado inicial del pedido:</span>
                <q-badge color="negative" class="text-weight-bold">
                  RECIBIDO
                </q-badge>
              </div>

              <!-- Nota: La calificación NO va en el registro inicial, va cuando pase a entregado -->
              <div class="text-caption text-grey-6 text-italic" style="font-size: 0.78rem;">
                ℹ La evaluación y calificación del cliente se habilitará una vez el pedido pase al estado "Entregado".
              </div>
            </div>
          </div>
        </q-card-section>

        <!-- Total y Confirmación de Pedido -->
        <q-card-section v-if="state.cart.length > 0" class="bg-grey-1 border-top q-pa-md">
          <div class="row items-center justify-between q-mb-md">
            <span class="text-subtitle1 text-weight-bold text-dark">TOTAL DEL PEDIDO:</span>
            <span class="price-tag">{{ formatCOP(cartTotal) }}</span>
          </div>

          <q-btn
            class="btn-red-primary full-width q-py-sm"
                  label="FINALIZAR SOLICITUD"
            icon="check_circle"
            @click="confirmarPedido"
          />
        </q-card-section>
      </q-card>
    </q-dialog>

    <!-- DIÁLOGO DE GESTIÓN DE PEDIDOS, ESTADOS (Recibido -> Entregado), ABONO, EVALUACIÓN CLIENTE Y PDF -->
    <q-dialog v-if="false" v-model="state.isOrdersModalOpen">
      <q-card style="width: 850px; max-width: 95vw; border-radius: 20px;">
        <q-card-section class="row items-center justify-between bg-dark text-white q-py-md">
          <div class="row items-center">
            <q-icon name="receipt_long" size="24px" class="q-mr-sm text-negative" />
            <div>
              <div class="text-h6 text-weight-bolder font-heading">GESTIÓN DE PEDIDOS Y REPORTES</div>
              <div class="text-caption text-grey-4">Control de estados, abonos, calificación de entrega y exportación PDF</div>
            </div>
          </div>
          <q-btn flat round dense icon="close" color="white" v-close-popup />
        </q-card-section>

        <q-card-section class="q-pa-md overflow-auto" style="max-height: 70vh;">
          <div v-if="state.orders.length === 0" class="text-center q-pa-xl">
            <q-icon name="inventory_2" size="48px" color="grey-4" />
            <div class="text-h6 text-grey-7 q-mt-sm font-heading">No hay pedidos registrados</div>
          </div>

          <div v-else class="q-gutter-y-md">
            <q-card
              v-for="order in state.orders"
              :key="order.id"
              class="q-pa-md"
              bordered
              :class="{ 'bg-grey-1': order.estado === 'Entregado' }"
              style="border-radius: 14px;"
            >
              <!-- Cabecera de la orden -->
              <div class="row items-center justify-between q-mb-sm">
                <div>
                  <span class="text-subtitle1 text-weight-bolder text-dark font-heading q-mr-sm">
                    Pedido #{{ order.id }}
                  </span>
                  <q-badge
                    :color="getEstadoBadgeColor(order.estado)"
                    class="text-weight-bold q-pa-xs q-px-sm"
                  >
                    {{ order.estado.toUpperCase() }}
                  </q-badge>
                </div>

                <div class="text-caption text-grey-7">
                  <q-icon name="schedule" class="q-mr-xs" />
                  <strong>Fecha (automática):</strong> {{ order.fecha }}
                </div>
              </div>

              <!-- Detalles del Cliente, Marca y Modelo -->
              <div class="row q-col-gutter-sm text-body2 q-mb-sm">
                <div class="col-12 col-sm-6">
                  <div><strong>Cliente:</strong> {{ order.cliente }}</div>
                  <div><strong>Teléfono:</strong> {{ order.telefono }}</div>
                  <div><strong>Dirección:</strong> {{ order.direccion }}</div>
                </div>
                <div class="col-12 col-sm-6">
                  <div><strong>Marca (Sede):</strong> {{ order.marca }}</div>
                  <div><strong>Modelo:</strong> {{ order.modelo }}</div>
                  <div><strong>Método de Pago:</strong> {{ order.metodoPago }}</div>
                  <div v-if="order.abono > 0" class="text-negative text-weight-bold">
                    Abono: {{ formatCOP(order.abono) }} | Saldo: {{ formatCOP(order.saldoPendiente) }}
                  </div>
                </div>
              </div>

              <!-- Ítems del Pedido -->
              <div class="bg-grey-2 q-pa-sm rounded-borders q-mb-sm">
                <div class="text-caption text-weight-bold text-dark q-mb-xs">Productos incluidos:</div>
                <div class="row q-gutter-x-md text-caption text-grey-8">
                  <span v-for="item in order.items" :key="item.id">
                    • {{ item.cantidad }}x {{ item.nombre }} ({{ formatCOP(item.precio * item.cantidad) }})
                  </span>
                </div>
                <div class="text-right text-subtitle2 text-weight-bolder text-negative q-mt-xs">
                  Total: {{ formatCOP(order.total) }}
                </div>
              </div>

              <!-- Sección de Calificación del Cliente (Aparece SOLO cuando está Entregado) -->
              <div v-if="order.estado === 'Entregado'" class="bg-amber-1 q-pa-sm rounded-borders q-mb-sm border-amber">
                <div class="row items-center justify-between">
                  <div class="text-caption text-weight-bold text-dark">
                    ⭐ Evaluación del Cliente (Habilitada por estar Entregado):
                  </div>
                  <q-rating
                    v-model="order.calificacion"
                    size="20px"
                    color="amber-9"
                    icon="star_border"
                    icon-selected="star"
                    @update:model-value="guardarCalificacion(order)"
                  />
                </div>
                <div class="row q-col-gutter-xs q-mt-xs">
                  <q-input
                    v-model="order.comentarioCalificacion"
                    dense
                    outlined
                    bg-color="white"
                    placeholder="Escribe tu opinión sobre el pedido y entrega..."
                    class="col"
                  />
                  <q-btn
                    dense
                    color="amber-10"
                    icon="check"
                    label="Calificar"
                    class="q-px-sm text-weight-bold"
                    @click="guardarCalificacion(order)"
                  />
                </div>
              </div>

              <!-- Acciones del Pedido -->
              <div class="row items-center justify-between q-mt-md">
                <!-- Selector de cambio de estado -->
                <div class="row items-center q-gutter-sm">
                  <span class="text-caption text-weight-bold text-dark">Cambiar Estado:</span>
                  <q-select
                    v-model="order.estado"
                    :options="['Recibido', 'En Preparación', 'En Camino', 'Entregado']"
                    dense
                    outlined
                    :disable="order.estado === 'Entregado'"
                    style="min-width: 150px;"
                    @update:model-value="(val) => onCambioEstado(order, val)"
                  />
                  <span v-if="order.estado === 'Entregado'" class="text-caption text-negative text-italic">
                    (Bloqueado: Un registro en estado entregado no se puede editar ni eliminar)
                  </span>
                </div>

                <!-- Botones de Acción: Exportar PDF y Eliminar -->
                <div class="row q-gutter-xs">
                  <!-- Botón Exportar PDF -->
                  <q-btn
                    outline
                    color="negative"
                    icon="picture_as_pdf"
                    label="Descargar PDF"
                    size="sm"
                    class="text-weight-bold"
                    @click="descargarReportePDF(order)"
                  />

                  <!-- Botón Eliminar (Deshabilitado si estado === Entregado) -->
                  <q-btn
                    flat
                    round
                    color="negative"
                    icon="delete"
                    size="sm"
                    :disable="order.estado === 'Entregado'"
                    @click="confirmarEliminarOrden(order.id)"
                  >
                    <q-tooltip v-if="order.estado === 'Entregado'">
                      No se puede eliminar un pedido ya entregado
                    </q-tooltip>
                    <q-tooltip v-else>Eliminar Pedido</q-tooltip>
                  </q-btn>
                </div>
              </div>
            </q-card>
          </div>
        </q-card-section>
      </q-card>
    </q-dialog>
  </q-layout>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRoute } from 'vue-router'
import { useQuasar } from 'quasar'
import {
  state,
  cartCount,
  cartTotal,
  formatCOP,
  getNowFormatted,
  removeFromCart,
  clearCart,
  updateCartQuantity
} from './store.js'

const $q = useQuasar()
const route = useRoute()

const menuMovil = ref(false)
const emailSuscripcion = ref('')

const opcionesMarcas = [
  'Burger Bite - Zona Rosa',
  'Burger Bite - Chapinero Central',
  'Burger Bite - Usaquén Parque',
  'Burger Bite - Salitre Plaza'
]

const formularioPedido = ref({
  fecha: getNowFormatted(), // Fecha automática no editable
  cliente: '',
  telefono: '',
  direccion: '',
  marca: 'Burger Bite - Zona Rosa', // Select de marca
  modelo: 'Pedido Estándar Gourmet', // Modelo separado
  metodoPago: 'Efectivo',
  abono: 0,
  notas: ''
})

const esVistaInicio = computed(() => {
  return route.path === '/' || route.path === '/hamburguesas'
})

function iniciarPedidoDirecto() {
  state.isCartDrawerOpen = true
  formularioPedido.value.fecha = getNowFormatted()
}

function confirmarPedido() {
  if (state.cart.length === 0) {
    $q.notify({
      type: 'warning',
      message: 'El carrito está vacío. Agrega al menos un producto.',
      icon: 'warning'
    })
    return
  }

  clearCart()
  state.isCartDrawerOpen = false
}

function suscribirseBoletin() {
  if (!emailSuscripcion.value || !emailSuscripcion.value.includes('@')) {
    $q.notify({
      type: 'warning',
      message: 'Por favor ingresa un correo electrónico válido',
      icon: 'mail'
    })
    return
  }

  $q.notify({
    type: 'positive',
    message: '¡Gracias por suscribirte al boletín de Burger Bite!',
    caption: 'Recibirás un cupón de 15% de descuento en tu correo.',
    icon: 'celebration'
  })
  emailSuscripcion.value = ''
}
</script>

<style scoped>
.logo-circle {
  width: 40px;
  height: 40px;
  background-color: var(--primary-red);
  border-radius: 50%;
}

.hero-section {
  background: radial-gradient(circle at 80% 50%, #FFF5F5 0%, #FAFAFA 70%);
  border-bottom: 1px solid #EEEEEE;
}

.hero-container {
  max-width: 1240px;
  margin: 0 auto;
}

.hero-title {
  font-size: clamp(2.8rem, 6vw, 4.5rem);
  line-height: 0.95;
  letter-spacing: 0.5px;
}

.hero-image-wrapper {
  position: relative;
  max-width: 480px;
  width: 100%;
}

.hero-burger-img {
  width: 100%;
  height: auto;
  border-radius: 24px;
  box-shadow: 0 16px 40px rgba(178, 30, 39, 0.15);
  object-fit: cover;
}

.fresh-badge {
  position: absolute;
  top: -15px;
  right: -15px;
  width: 85px;
  height: 85px;
  border-radius: 50%;
  background: #ffffff;
  border: 2px dashed var(--primary-red);
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.12);
  z-index: 2;
  text-align: center;
}

.combo-promo-banner {
  background: linear-gradient(135deg, #A81820 0%, #7E0E14 100%);
  border-radius: 24px;
  box-shadow: 0 12px 32px rgba(168, 24, 32, 0.25);
  max-width: 1240px;
  margin: 0 auto;
}

.combo-image {
  max-width: 280px;
  width: 100%;
  border-radius: 16px;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.25);
}

.discount-circle {
  width: 110px;
  height: 110px;
  border-radius: 50%;
  background: #ffffff;
  border: 3px solid #f1f1f1;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2);
}

.bb-footer {
  background-color: #111111;
  border-top: 4px solid var(--primary-red);
}

.footer-link {
  color: #b0b0b0;
  text-decoration: none;
  transition: color 0.2s ease;
}

.footer-link:hover {
  color: #ffffff;
  text-decoration: underline;
}

.newsletter-card {
  border: 1px solid #333333;
}
</style>
