<template>
  <q-layout view="lHh Lpr lFf" class="bg-dark-base text-dark">
    <!-- TOP HEADER SIMPLE & ELEGANTE -->
    <q-header elevated class="bg-dark text-white border-subtle q-py-xs">
      <q-toolbar class="row items-center justify-between q-px-md">
        <!-- Botón para alternar menú izquierdo (en móviles/tablets o colapsar) -->
        <div class="row items-center q-gutter-sm">
          <q-btn
            flat
            dense
            round
            icon="menu"
            color="amber-8"
            @click="drawerLeft = !drawerLeft"
            aria-label="Menú Lateral"
          />
          <div class="row items-center cursor-pointer gt-xs" @click="cambiarSeccion('inicio')">
            <q-avatar size="34px" color="amber-8" text-color="dark" class="q-mr-xs shadow-1">
              <q-icon name="lunch_dining" size="22px" />
            </q-avatar>
            <span class="text-subtitle1 text-weight-bolder text-white font-heading" style="letter-spacing: 0.5px;">
              BURGER <span class="text-gold">FACTORY</span>
            </span>
          </div>
          <!-- Título de la sección activa actual -->
          <q-separator vertical dark inset class="q-mx-sm gt-sm opacity-20" />
          <div class="text-caption text-weight-bold text-gold text-uppercase gt-sm">
            {{ obtenerTituloSeccionActiva(seccionActiva) }}
          </div>
        </div>

        <!-- Botones de Acción: Mis Pedidos y Pedir en Línea -->
        <div class="row items-center q-gutter-sm">
          <!-- Mis Pedidos -->
          <q-btn
            flat
            dense
            class="text-white q-px-sm"
            :class="{ 'text-gold': seccionActiva === 'pedidos' }"
            @click="cambiarSeccion('pedidos')"
          >
            <q-icon name="moped" size="20px" />
            <span class="gt-xs q-ml-xs text-weight-bold text-caption">Mis Pedidos</span>
            <q-badge v-if="pedidos.length > 0" color="amber-8" text-color="dark" floating rounded>
              {{ pedidos.length }}
            </q-badge>
          </q-btn>

          <!-- Pedir en Línea (Abre Carrito) -->
          <q-btn
            unelevated
            class="btn-gold text-weight-bolder"
            @click="drawerCarrito = true"
          >
            <q-icon name="shopping_bag" size="18px" class="q-mr-xs" />
            <span>PEDIR EN LÍNEA</span>
            <q-badge color="dark" text-color="amber-8" class="q-ml-sm text-weight-bolder">
              {{ contarItemsCarrito() }}
            </q-badge>
          </q-btn>
        </div>
      </q-toolbar>
    </q-header>

    <!-- ============================================================== -->
    <!-- MENÚ A MANO IZQUIERDA (SUPERPUESTO, SE CIERRA AL DAR CLIC O AFUERA) -->
    <!-- ============================================================== -->
    <q-drawer
      v-model="drawerLeft"
      side="left"
      overlay
      :width="270"
      bordered
      class="bg-dark text-white border-subtle column justify-between shadow-24"
    >
      <!-- Menú limpio para dar click -->
      <div class="q-pa-md">
        <!-- Encabezado del Menú Lateral con Botón Cerrar -->
        <div class="row items-center justify-between q-mb-md q-px-xs">
          <div class="row items-center cursor-pointer" @click="cambiarSeccion('inicio')">
            <q-avatar size="32px" color="amber-8" text-color="dark" class="q-mr-sm">
              <q-icon name="lunch_dining" size="20px" />
            </q-avatar>
            <div class="text-subtitle1 text-weight-bolder text-white font-heading">
              BURGER <span class="text-gold">FACTORY</span>
            </div>
          </div>
          <q-btn flat round dense icon="close" color="grey-5" @click="drawerLeft = false" />
        </div>

        <q-separator dark class="q-mb-md opacity-20" />

        <!-- LISTA DEL MENÚ SENCILLO PARA DAR CLICK -->
        <q-list class="q-gutter-y-xs">
          <!-- 0. Inicio -->
          <q-item
            clickable
            v-ripple
            :class="['bf-sidebar-item', { active: seccionActiva === 'inicio' }]"
            @click="cambiarSeccion('inicio')"
          >
            <q-item-section avatar style="min-width: 36px;">
              <q-icon name="home" :color="seccionActiva === 'inicio' ? 'dark' : 'amber-8'" size="20px" />
            </q-item-section>
            <q-item-section class="text-weight-bold">
              Inicio
            </q-item-section>
          </q-item>

          <!-- 1. Hamburguesas -->
          <q-item
            clickable
            v-ripple
            :class="['bf-sidebar-item', { active: seccionActiva === 'hamburguesas' }]"
            @click="cambiarSeccion('hamburguesas')"
          >
            <q-item-section avatar style="min-width: 36px;">
              <q-icon name="lunch_dining" :color="seccionActiva === 'hamburguesas' ? 'dark' : 'amber-8'" size="20px" />
            </q-item-section>
            <q-item-section class="text-weight-bold">
              Hamburguesas
            </q-item-section>
          </q-item>

          <!-- 2. Perros -->
          <q-item
            clickable
            v-ripple
            :class="['bf-sidebar-item', { active: seccionActiva === 'perros' }]"
            @click="cambiarSeccion('perros')"
          >
            <q-item-section avatar style="min-width: 36px;">
              <q-icon name="fastfood" :color="seccionActiva === 'perros' ? 'dark' : 'amber-8'" size="20px" />
            </q-item-section>
            <q-item-section class="text-weight-bold">
              Perros
            </q-item-section>
          </q-item>

          <!-- 3. Pizzas -->
          <q-item
            clickable
            v-ripple
            :class="['bf-sidebar-item', { active: seccionActiva === 'pizzas' }]"
            @click="cambiarSeccion('pizzas')"
          >
            <q-item-section avatar style="min-width: 36px;">
              <q-icon name="local_pizza" :color="seccionActiva === 'pizzas' ? 'dark' : 'amber-8'" size="20px" />
            </q-item-section>
            <q-item-section class="text-weight-bold">
              Pizzas
            </q-item-section>
          </q-item>

          <!-- 4. Bebidas -->
          <q-item
            clickable
            v-ripple
            :class="['bf-sidebar-item', { active: seccionActiva === 'bebidas' }]"
            @click="cambiarSeccion('bebidas')"
          >
            <q-item-section avatar style="min-width: 36px;">
              <q-icon name="local_bar" :color="seccionActiva === 'bebidas' ? 'dark' : 'amber-8'" size="20px" />
            </q-item-section>
            <q-item-section class="text-weight-bold">
              Bebidas
            </q-item-section>
          </q-item>

          <!-- 5. Postres -->
          <q-item
            clickable
            v-ripple
            :class="['bf-sidebar-item', { active: seccionActiva === 'postres' }]"
            @click="cambiarSeccion('postres')"
          >
            <q-item-section avatar style="min-width: 36px;">
              <q-icon name="cake" :color="seccionActiva === 'postres' ? 'dark' : 'amber-8'" size="20px" />
            </q-item-section>
            <q-item-section class="text-weight-bold">
              Postres
            </q-item-section>
          </q-item>

          <!-- 6. Promociones -->
          <q-item
            clickable
            v-ripple
            :class="['bf-sidebar-item', { active: seccionActiva === 'promociones' }]"
            @click="cambiarSeccion('promociones')"
          >
            <q-item-section avatar style="min-width: 36px;">
              <q-icon name="loyalty" :color="seccionActiva === 'promociones' ? 'dark' : 'amber-8'" size="20px" />
            </q-item-section>
            <q-item-section class="text-weight-bold">
              Promociones
            </q-item-section>
          </q-item>

          <q-separator dark class="q-my-sm opacity-20" />

          <!-- 7. Nosotros -->
          <q-item
            clickable
            v-ripple
            :class="['bf-sidebar-item', { active: seccionActiva === 'nosotros' }]"
            @click="cambiarSeccion('nosotros')"
          >
            <q-item-section avatar style="min-width: 36px;">
              <q-icon name="groups" :color="seccionActiva === 'nosotros' ? 'dark' : 'amber-8'" size="20px" />
            </q-item-section>
            <q-item-section class="text-weight-bold">
              Nosotros
            </q-item-section>
          </q-item>

          <!-- 8. Mis Pedidos -->
          <q-item
            clickable
            v-ripple
            :class="['bf-sidebar-item', { active: seccionActiva === 'pedidos' }]"
            @click="cambiarSeccion('pedidos')"
          >
            <q-item-section avatar style="min-width: 36px;">
              <q-icon name="moped" :color="seccionActiva === 'pedidos' ? 'dark' : 'amber-8'" size="20px" />
            </q-item-section>
            <q-item-section class="text-weight-bold">
              Mis Pedidos
            </q-item-section>
            <q-item-section side v-if="pedidos.length > 0">
              <q-badge color="amber-8" text-color="dark">{{ pedidos.length }}</q-badge>
            </q-item-section>
          </q-item>
        </q-list>
      </div>

      <!-- Pie del Menú Lateral Sencillo -->
      <div class="q-pa-md border-subtle">
        <q-btn
          unelevated
          class="btn-gold full-width text-weight-bolder"
          icon="shopping_bag"
          label="PEDIR EN LÍNEA"
          @click="drawerCarrito = true; drawerLeft = false"
        >
          <q-badge v-if="contarItemsCarrito() > 0" color="dark" text-color="amber-8" class="q-ml-sm text-weight-bolder">
            {{ contarItemsCarrito() }}
          </q-badge>
        </q-btn>
      </div>
    </q-drawer>

    <!-- ============================================================== -->
    <!-- CONTENIDO PRINCIPAL SEGÚN SECCIÓN SELECCIONADA                -->
    <!-- ============================================================== -->
    <q-page-container>
      <!-- 0. VISTA: INICIO (HOME CON HERO, MENÚ DIGITAL DE CATEGORÍAS Y REDIRECCIÓN) -->
      <div v-if="seccionActiva === 'inicio'" class="q-pa-md q-pa-md-xl max-w-7xl mx-auto">
        <!-- BANNER DE BIENVENIDA COMPACTO Y ELEGANTE DE INICIO -->
        <div class="inicio-hero-banner q-mb-lg">
          <q-img
            src="https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=1200&q=80"
            class="full-width full-height"
            style="height: 160px;"
          />
          <div class="inicio-hero-overlay">
            <div>
              <div class="row items-center q-gutter-x-xs text-gold q-mb-xs">
                <q-icon name="local_fire_department" size="16px" />
                <span class="text-caption text-weight-bolder text-uppercase" style="letter-spacing: 1px;">
                  Parrilla Artesanal desde 2016
                </span>
              </div>
              <h1 class="text-h5 text-md-h4 text-weight-bolder text-white font-heading q-my-none">
                BURGER <span class="text-gold">FACTORY</span>
              </h1>
              <p class="text-grey-4 text-caption q-mt-xs q-mb-none gt-xs" style="max-width: 520px; line-height: 1.3;">
                Cortes selectos Angus a la brasa, pan brioche recién horneado y recetas exclusivas.
              </p>
            </div>

            <div class="row items-center q-gutter-xs">
              <q-btn
                unelevated
                dense
                class="btn-gold q-px-md text-weight-bolder"
                icon="restaurant_menu"
                label="Ver Menú"
                @click="cambiarSeccion('hamburguesas')"
              />
              <q-btn
                outline
                dense
                class="text-white border-subtle q-px-sm text-weight-bold"
                icon="groups"
                label="Nosotros"
                @click="cambiarSeccion('nosotros')"
              />
            </div>
          </div>
        </div>

        <!-- SECCIÓN: MENÚ DIGITAL DE COMIDAS RÁPIDAS (CATEGORÍAS INTERACTIVAS) -->
        <div class="q-mb-xl">
          <div class="text-center q-mb-lg">
            <div class="text-caption text-weight-bold text-gold text-uppercase" style="letter-spacing: 1.5px;">
              Carta Gastronómica
            </div>
            <h2 class="text-h4 text-weight-bolder text-dark font-heading q-my-xs">
              MENÚ DIGITAL DE COMIDAS RÁPIDAS
            </h2>
            <p class="text-grey-7 text-caption text-sm-body2 q-mx-auto" style="max-width: 600px;">
              Selecciona una categoría para explorar nuestros productos artesanales preparados al instante.
            </p>
          </div>

          <!-- GRID DE LAS 6 CATEGORÍAS -->
          <div class="row q-col-gutter-lg">
            <!-- 1. Hamburguesas -->
            <div class="col-12 col-sm-6 col-md-4">
              <q-card
                class="favorite-card cursor-pointer full-height column justify-between"
                @click="cambiarSeccion('hamburguesas')"
              >
                <div>
                  <q-img src="https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=700&q=80" :ratio="16/10">
                    <div class="card-badge-row">
                      <span class="chef-pill-badge"><q-icon name="restaurant" size="12px" class="q-mr-xs text-gold" />Especialidad</span>
                      <span class="tag-pill-badge tag-mas-pedido">5 Variedades</span>
                    </div>
                  </q-img>
                  <q-card-section class="q-pa-md">
                    <div class="text-h6 text-weight-bolder text-dark font-heading q-mb-xs">
                      Sección de Hamburguesas
                    </div>
                    <p class="text-grey-7 text-caption q-mb-none" style="line-height: 1.4;">
                      Carne 100% Angus certificada a la brasa, queso cheddar fundido y pan brioche dorado.
                    </p>
                  </q-card-section>
                </div>
                <q-card-section class="q-px-md q-pb-md q-pt-none">
                  <q-btn unelevated class="btn-gold full-width text-weight-bolder" label="Ver Hamburguesas" icon-right="arrow_forward" />
                </q-card-section>
              </q-card>
            </div>

            <!-- 2. Perros Calientes -->
            <div class="col-12 col-sm-6 col-md-4">
              <q-card
                class="favorite-card cursor-pointer full-height column justify-between"
                @click="cambiarSeccion('perros')"
              >
                <div>
                  <q-img src="https://images.unsplash.com/photo-1619740455993-9e612b1af08a?auto=format&fit=crop&w=700&q=80" :ratio="16/10">
                    <div class="card-badge-row">
                      <span class="chef-pill-badge"><q-icon name="local_fire_department" size="12px" class="q-mr-xs text-gold" />Gourmet</span>
                      <span class="tag-pill-badge tag-nuevo">5 Variedades</span>
                    </div>
                  </q-img>
                  <q-card-section class="q-pa-md">
                    <div class="text-h6 text-weight-bolder text-dark font-heading q-mb-xs">
                      Sección de Perros Calientes
                    </div>
                    <p class="text-grey-7 text-caption q-mb-none" style="line-height: 1.4;">
                      Salchicha americana ahumada, tocineta crocante, queso costeño gratinado y papas chip.
                    </p>
                  </q-card-section>
                </div>
                <q-card-section class="q-px-md q-pb-md q-pt-none">
                  <q-btn unelevated class="btn-gold full-width text-weight-bolder" label="Ver Perros" icon-right="arrow_forward" />
                </q-card-section>
              </q-card>
            </div>

            <!-- 3. Pizzas -->
            <div class="col-12 col-sm-6 col-md-4">
              <q-card
                class="favorite-card cursor-pointer full-height column justify-between"
                @click="cambiarSeccion('pizzas')"
              >
                <div>
                  <q-img src="https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=700&q=80" :ratio="16/10">
                    <div class="card-badge-row">
                      <span class="chef-pill-badge"><q-icon name="local_pizza" size="12px" class="q-mr-xs text-gold" />A la Piedra</span>
                      <span class="tag-pill-badge tag-mas-pedido">5 Variedades</span>
                    </div>
                  </q-img>
                  <q-card-section class="q-pa-md">
                    <div class="text-h6 text-weight-bolder text-dark font-heading q-mb-xs">
                      Sección de Pizzas
                    </div>
                    <p class="text-grey-7 text-caption q-mb-none" style="line-height: 1.4;">
                      Masa madre de fermentación lenta, queso mozzarella estirado a mano e ingredientes premium.
                    </p>
                  </q-card-section>
                </div>
                <q-card-section class="q-px-md q-pb-md q-pt-none">
                  <q-btn unelevated class="btn-gold full-width text-weight-bolder" label="Ver Pizzas" icon-right="arrow_forward" />
                </q-card-section>
              </q-card>
            </div>

            <!-- 4. Bebidas -->
            <div class="col-12 col-sm-6 col-md-4">
              <q-card
                class="favorite-card cursor-pointer full-height column justify-between"
                @click="cambiarSeccion('bebidas')"
              >
                <div>
                  <q-img src="https://images.unsplash.com/photo-1572490122747-3968b75cc699?auto=format&fit=crop&w=700&q=80" :ratio="16/10">
                    <div class="card-badge-row">
                      <span class="chef-pill-badge"><q-icon name="local_bar" size="12px" class="q-mr-xs text-gold" />Heladas</span>
                      <span class="tag-pill-badge tag-promo">5 Variedades</span>
                    </div>
                  </q-img>
                  <q-card-section class="q-pa-md">
                    <div class="text-h6 text-weight-bolder text-dark font-heading q-mb-xs">
                      Sección de Bebidas & Malteadas
                    </div>
                    <p class="text-grey-7 text-caption q-mb-none" style="line-height: 1.4;">
                      Malteadas cremosas artesanales, limonadas naturales y gaseosas bien frías.
                    </p>
                  </q-card-section>
                </div>
                <q-card-section class="q-px-md q-pb-md q-pt-none">
                  <q-btn unelevated class="btn-gold full-width text-weight-bolder" label="Ver Bebidas" icon-right="arrow_forward" />
                </q-card-section>
              </q-card>
            </div>

            <!-- 5. Postres -->
            <div class="col-12 col-sm-6 col-md-4">
              <q-card
                class="favorite-card cursor-pointer full-height column justify-between"
                @click="cambiarSeccion('postres')"
              >
                <div>
                  <q-img src="https://images.unsplash.com/photo-1551024601-bec78aea704b?auto=format&fit=crop&w=700&q=80" :ratio="16/10">
                    <div class="card-badge-row">
                      <span class="chef-pill-badge"><q-icon name="cake" size="12px" class="q-mr-xs text-gold" />Caseros</span>
                      <span class="tag-pill-badge tag-mas-pedido">5 Variedades</span>
                    </div>
                  </q-img>
                  <q-card-section class="q-pa-md">
                    <div class="text-h6 text-weight-bolder text-dark font-heading q-mb-xs">
                      Sección de Postres
                    </div>
                    <p class="text-grey-7 text-caption q-mb-none" style="line-height: 1.4;">
                      Brownies con helado, churros azucarados con arequipe y volcanes de chocolate.
                    </p>
                  </q-card-section>
                </div>
                <q-card-section class="q-px-md q-pb-md q-pt-none">
                  <q-btn unelevated class="btn-gold full-width text-weight-bolder" label="Ver Postres" icon-right="arrow_forward" />
                </q-card-section>
              </q-card>
            </div>

            <!-- 6. Promociones -->
            <div class="col-12 col-sm-6 col-md-4">
              <q-card
                class="favorite-card cursor-pointer full-height column justify-between"
                @click="cambiarSeccion('promociones')"
              >
                <div>
                  <q-img src="https://images.unsplash.com/photo-1594212699903-ec8a3eca50f5?auto=format&fit=crop&w=700&q=80" :ratio="16/10">
                    <div class="card-badge-row">
                      <span class="chef-pill-badge"><q-icon name="loyalty" size="12px" class="q-mr-xs text-gold" />Combos</span>
                      <span class="tag-pill-badge tag-promo">Ahorro</span>
                    </div>
                  </q-img>
                  <q-card-section class="q-pa-md">
                    <div class="text-h6 text-weight-bolder text-dark font-heading q-mb-xs">
                      Sección de Promociones
                    </div>
                    <p class="text-grey-7 text-caption q-mb-none" style="line-height: 1.4;">
                      Combos familiares, combos para 2 y promociones especiales con papas y bebida.
                    </p>
                  </q-card-section>
                </div>
                <q-card-section class="q-px-md q-pb-md q-pt-none">
                  <q-btn unelevated class="btn-gold full-width text-weight-bolder" label="Ver Promociones" icon-right="arrow_forward" />
                </q-card-section>
              </q-card>
            </div>
          </div>
        </div>

        <!-- BANNER NOSOTROS EN INICIO -->
        <div class="bg-dark text-white rounded-borders q-pa-lg q-pa-md-xl border-subtle q-mb-xl row items-center justify-between">
          <div class="col-12 col-md-8 q-mb-md q-mb-md-none">
            <div class="text-gold font-script text-h6 q-mb-xs">Tradición y Calidad</div>
            <div class="text-h4 text-weight-bolder font-heading text-white q-mb-sm">
              SOBRE BURGER FACTORY
            </div>
            <p class="text-grey-4 text-body1 q-mb-none" style="line-height: 1.6;">
              Nacimos en 2016 con una misión inquebrantable: llevar la mejor parrilla artesanal a cada rincón de la ciudad. Conoce a nuestro equipo de cocina, nuestros valores y nuestras sedes de atención.
            </p>
          </div>
          <div class="col-12 col-md-3 text-md-right">
            <q-btn
              unelevated
              size="lg"
              class="btn-gold text-weight-bolder full-width"
              icon="groups"
              label="Conoce al Equipo"
              @click="cambiarSeccion('nosotros')"
            />
          </div>
        </div>
      </div>

      <!-- 1. VISTAS DE CATEGORÍA (HAMBURGUESAS, PERROS, PIZZAS, BEBIDAS, POSTRES, PROMOS) -->
      <div v-else-if="esCategoriaActiva(seccionActiva)" class="q-pa-md q-pa-md-xl max-w-7xl mx-auto">
        <!-- BANNER HORIZONTAL DE PORTADA APETITOSO DE LA CATEGORÍA -->
        <div class="cat-hero-banner q-mb-xl relative-position">
          <q-img
            :src="obtenerConfigCategoria(seccionActiva).banner"
            class="full-width full-height"
            style="min-height: 240px; max-height: 290px;"
          />
          <div class="cat-hero-overlay">
            <div class="text-gold font-script text-h5 q-mb-xs">
              {{ obtenerConfigCategoria(seccionActiva).subtitulo }}
            </div>
            <!-- Nombre de la categoría como título principal -->
            <h1 class="text-h3 text-md-h2 text-weight-bolder text-white font-heading q-my-none">
              {{ obtenerConfigCategoria(seccionActiva).nombre.toUpperCase() }}
            </h1>
            <!-- Descripción breve de la categoría -->
            <p class="text-grey-3 text-body1 q-mt-sm q-mb-none" style="max-width: 650px; line-height: 1.5;">
              {{ obtenerConfigCategoria(seccionActiva).descripcion }}
            </p>
          </div>
        </div>

        <!-- ENCABEZADO DE SECCIÓN CON INCLUYE RECOMENDACIÓN DEL CHEF -->
        <div class="row items-center justify-between q-mb-lg">
          <div>
            <div class="text-caption text-weight-bold text-gold text-uppercase">
              Selección Especializada
            </div>
            <h2 class="text-h4 text-weight-bolder text-dark font-heading q-my-none">
              NUESTRAS ESPECIALIDADES
            </h2>
          </div>
          <div class="row items-center q-gutter-sm">
            <q-chip outline color="amber-9" icon="star" class="text-weight-bold">
              Incluye Recomendación del Chef
            </q-chip>
          </div>
        </div>

        <!-- GRILLA DE PRODUCTOS (5 OPCIONES POR CATEGORÍA) -->
        <div class="row q-col-gutter-lg">
          <div
            v-for="producto in obtenerProductosDeCategoria(seccionActiva)"
            :key="producto.id"
            class="col-12 col-sm-6 col-md-4"
          >
            <!-- CARD DEL PRODUCTO (Toda la tarjeta es clickeable para ver detalles) -->
            <q-card
              :class="[
                'favorite-card full-height column justify-between cursor-pointer',
                { 'chef-recommendation-card': producto.esRecomendacionChef }
              ]"
              @click="abrirModalDetalle(producto)"
            >
              <div>
                <!-- Imagen del Producto con Badges Píldora Limpios -->
                <div class="relative-position">
                  <q-img
                    :src="producto.imagen"
                    :ratio="16/10"
                  >
                    <div class="card-badge-row">
                      <!-- Insignia RECOMENDACIÓN DEL CHEF destacada -->
                      <div>
                        <span
                          v-if="producto.esRecomendacionChef"
                          class="chef-pill-badge"
                        >
                          <q-icon name="restaurant" size="12px" class="q-mr-xs text-gold" />
                          Chef
                        </span>
                      </div>

                      <!-- Etiqueta opcional (Nuevo, Más pedido, Picante, Vegetariano) -->
                      <div>
                        <span
                          v-if="producto.etiqueta"
                          :class="['tag-pill-badge', getClaseTag(producto.etiqueta)]"
                        >
                          {{ producto.etiqueta }}
                        </span>
                      </div>
                    </div>
                  </q-img>
                </div>

                <!-- Contenido de la Card: Solo Nombre y Descripción (Sin ingredientes aquí) -->
                <q-card-section class="q-pa-md">
                  <!-- Nombre del producto -->
                  <div class="text-h6 text-weight-bolder text-dark font-heading q-mb-xs">
                    {{ producto.nombre }}
                  </div>

                  <!-- Descripción breve -->
                  <p class="text-grey-7 text-caption q-mb-none" style="line-height: 1.4; min-height: 38px;">
                    {{ producto.descripcion }}
                  </p>

                  <!-- Destacado del chef si aplica -->
                  <div
                    v-if="producto.esRecomendacionChef"
                    class="text-caption text-amber-9 text-weight-bold q-mt-sm row items-center"
                  >
                    <q-icon name="thumb_up" size="14px" class="q-mr-xs" />
                    <span>Plato insignia sugerido por nuestro Chef Ejecutivo.</span>
                  </div>
                </q-card-section>
              </div>

              <!-- Pie de la Card con Precio COP y Botón de Agregar -->
              <q-card-section class="q-px-md q-pb-md q-pt-none row items-center justify-between border-subtle">
                <div>
                  <div class="text-caption text-grey-6" style="font-size: 0.72rem;">PRECIO:</div>
                  <!-- Precio en pesos colombianos formato legible ej. $18.500 -->
                  <div class="product-price text-h6">
                    {{ formatCOP(producto.precio) }}
                  </div>
                </div>

                <div class="row items-center q-gutter-xs">
                  <q-btn
                    unelevated
                    class="btn-gold q-px-md text-weight-bolder"
                    icon="add_shopping_cart"
                    label="Añadir"
                    @click.stop="agregarAlCarrito(producto, 1)"
                  />
                </div>
              </q-card-section>
            </q-card>
          </div>
        </div>
      </div>

      <!-- 2. VISTA: SOBRE NOSOTROS -->
      <div v-else-if="seccionActiva === 'nosotros'" class="q-pa-md q-pa-md-xl max-w-7xl mx-auto">
        <!-- Banner Portada de Nosotros -->
        <div class="cat-hero-banner q-mb-xl relative-position">
          <q-img
            src="https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=1600&q=80"
            class="full-width full-height"
            style="min-height: 240px; max-height: 290px;"
          />
          <div class="cat-hero-overlay">
            <div class="text-gold font-script text-h5 q-mb-xs">Nuestra Pasión Culinaria</div>
            <h1 class="text-h3 text-md-h2 text-weight-bolder text-white font-heading q-my-none">
              SOBRE BURGER FACTORY
            </h1>
            <p class="text-grey-3 text-body1 q-mt-sm q-mb-none" style="max-width: 650px; line-height: 1.5;">
              Conoce la historia detrás de nuestra parrilla artesanal, nuestro equipo y nuestras sedes oficiales.
            </p>
          </div>
        </div>

        <!-- HISTORIA BREVE DEL RESTAURANTE -->
        <div class="row q-col-gutter-xl items-center q-mb-xl">
          <div class="col-12 col-md-6">
            <div class="text-gold font-script text-h5 q-mb-xs">Nuestra Historia</div>
            <h2 class="text-h3 text-weight-bolder text-dark font-heading q-my-none">
              PARRILLA ARTESANAL DESDE 2016
            </h2>
            <p class="text-grey-8 text-body1 q-mt-md" style="line-height: 1.7;">
              Burger Factory nació en 2016 como un pequeño food truck impulsado por tres amigos apasionados por la cocina callejera de alta gama. Nuestra misión siempre fue clara: revolucionar el concepto de comidas rápidas demostrando que una hamburguesa, un perro caliente o una pizza pueden ser auténticas obras de arte culinario.
            </p>
            <p class="text-grey-8 text-body1" style="line-height: 1.7;">
              Hoy en día contamos con tres sedes en la ciudad, moliendo cortes selectos de res Angus 100% fresca todos los días, fermentando nuestras masas a la piedra durante 48 horas y horneando pan brioche de mantequilla a diario.
            </p>
            <div class="row items-center q-gutter-md q-mt-md">
              <q-btn
                unelevated
                class="btn-gold q-px-lg text-weight-bolder"
                icon="lunch_dining"
                label="VER NUESTRO MENÚ"
                @click="cambiarSeccion('hamburguesas')"
              />
              <q-btn
                outline
                class="btn-whatsapp q-px-lg text-weight-bold"
                icon="chat"
                label="PEDIR POR WHATSAPP"
                :href="contactoInfo.whatsappUrl"
                target="_blank"
              />
            </div>
          </div>

          <div class="col-12 col-md-6">
            <q-img
              src="https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=800&q=80"
              class="shadow-10"
              style="border-radius: 20px; max-height: 380px;"
            />
          </div>
        </div>

        <!-- FOTOS Y NOMBRES DEL EQUIPO (MÍNIMO 3: CHEF, CAJERO, DOMICILIARIO) -->
        <div class="q-my-xl">
          <div class="text-center q-mb-lg">
            <div class="text-gold font-script text-h5 q-mb-xs">Los Creadores del Sabor</div>
            <h2 class="text-h3 text-weight-bolder text-dark font-heading q-my-none">
              NUESTRO EQUIPO DE TRABAJO
            </h2>
            <p class="text-grey-7 text-body2 q-mt-xs" style="max-width: 600px; margin: 0 auto;">
              Detrás de cada hamburguesa a la brasa y cada despacho rápido hay un equipo humano comprometido con la excelencia.
            </p>
          </div>

          <div class="row q-col-gutter-lg">
            <div
              v-for="miembro in equipoTrabajo"
              :key="miembro.id"
              class="col-12 col-sm-6 col-md-3"
            >
              <q-card class="team-member-card text-center q-pa-md">
                <q-avatar size="130px" class="q-mx-auto q-mb-md shadow-3" style="border: 3px solid #F5A623;">
                  <img :src="miembro.foto" :alt="miembro.nombre" />
                </q-avatar>
                <!-- Nombre del miembro del equipo -->
                <div class="text-subtitle1 text-weight-bolder text-dark font-heading">
                  {{ miembro.nombre }}
                </div>
                <!-- Rol del miembro -->
                <q-badge color="grey-10" text-color="amber-8" class="q-mt-xs q-px-sm text-weight-bold">
                  {{ miembro.cargo }}
                </q-badge>
                <p class="text-grey-7 text-caption q-mt-sm q-mb-none" style="line-height: 1.4;">
                  {{ miembro.bio || miembro.descripcion }}
                </p>
              </q-card>
            </div>
          </div>
        </div>

        <!-- DIRECCIÓN, HORARIOS DE ATENCIÓN Y LÍNEAS DE PEDIDOS -->
        <div class="q-my-xl">
          <div class="text-center q-mb-lg">
            <div class="text-gold font-script text-h5 q-mb-xs">Visítanos o Pide a Domicilio</div>
            <h2 class="text-h3 text-weight-bolder text-dark font-heading q-my-none">
              SEDES, HORARIOS Y LÍNEAS DE CONTACTO
            </h2>
          </div>

          <div class="row q-col-gutter-lg">
            <!-- Sedes y Horarios de Atención -->
            <div
              v-for="sede in sedesRestaurante"
              :key="sede.id || sede.nombre"
              class="col-12 col-md-4"
            >
              <q-card class="favorite-card full-height q-pa-md">
                <div class="row items-center q-mb-sm">
                  <q-avatar size="36px" color="amber-8" text-color="dark" class="q-mr-sm">
                    <q-icon name="storefront" size="20px" />
                  </q-avatar>
                  <div>
                    <div class="text-subtitle1 text-weight-bolder text-dark font-heading">
                      {{ sede.nombre }}
                    </div>
                    <div class="text-caption text-gold font-script">{{ sede.ciudad || 'Bogotá' }}</div>
                  </div>
                </div>

                <q-separator class="q-my-sm" />

                <div class="text-body2 text-grey-8 q-gutter-y-xs">
                  <div class="row items-center">
                    <q-icon name="place" color="amber-9" size="18px" class="q-mr-xs" />
                    <span><strong>Dirección:</strong> {{ sede.direccion }}</span>
                  </div>
                  <div class="row items-center">
                    <q-icon name="phone" color="amber-9" size="18px" class="q-mr-xs" />
                    <span><strong>Teléfono:</strong> {{ sede.telefono }}</span>
                  </div>
                  <div class="row items-center">
                    <q-icon name="schedule" color="amber-9" size="18px" class="q-mr-xs" />
                    <span><strong>Horario:</strong> {{ sede.horario || sede.horarios }}</span>
                  </div>
                </div>

                <div class="q-mt-md">
                  <q-btn
                    unelevated
                    dense
                    class="btn-gold full-width"
                    icon="lunch_dining"
                    label="Pedir en esta Sede"
                    @click="cambiarSeccion('hamburguesas')"
                  />
                </div>
              </q-card>
            </div>
          </div>

          <!-- TELÉFONO Y WHATSAPP DE PEDIDOS (LÍNEAS DIRECTAS) -->
          <div class="q-mt-xl q-pa-lg bg-dark text-white rounded-borders border-subtle">
            <div class="row items-center justify-between q-col-gutter-md">
              <div class="col-12 col-md-7">
                <div class="text-gold font-script text-h5">Central Única de Despacho</div>
                <div class="text-h4 text-weight-bolder font-heading q-my-xs">
                  ¿PREFIERES HACER TU PEDIDO DIRECTO?
                </div>
                <p class="text-grey-4 text-body2 q-mb-none">
                  Atendemos pedidos telefónicos y por WhatsApp en tiempo real. Entregas promedio en 35 minutos sin costo de domicilio.
                </p>
              </div>
              <div class="col-12 col-md-5 row items-center q-gutter-md justify-md-end">
                <q-btn
                  unelevated
                  class="btn-whatsapp text-weight-bolder q-px-lg q-py-sm"
                  icon="chat"
                  label="WhatsApp Directo"
                  :href="contactoInfo.whatsappUrl"
                  target="_blank"
                />
                <q-btn
                  outline
                  class="btn-dark-outline text-weight-bolder q-px-lg q-py-sm"
                  icon="phone"
                  label="Llamar: (601) 745-9820"
                  :href="'tel:' + contactoInfo.telefono"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 3. VISTA: MIS PEDIDOS (SEGUIMIENTO Y CALIFICACIÓN PERMANENTE) -->
      <div v-else-if="seccionActiva === 'pedidos'" class="q-pa-md q-pa-md-xl max-w-7xl mx-auto">
        <div class="row items-center justify-between q-mb-lg">
          <div>
            <div class="text-gold font-script text-h5">Seguimiento en Vivo</div>
            <h1 class="text-h3 text-weight-bolder text-dark font-heading q-my-none">
              MIS PEDIDOS
            </h1>
            <p class="text-grey-7 text-body2 q-mt-xs q-mb-none">
              Consulta el estado de despacho de tus órdenes y califica el servicio una vez entregado.
            </p>
          </div>

          <q-btn
            unelevated
            class="btn-gold"
            icon="shopping_bag"
            label="Hacer Nuevo Pedido"
            @click="cambiarSeccion('hamburguesas')"
          />
        </div>

        <!-- BANNER DE ESTADOS -->
        <q-banner rounded class="bg-grey-10 text-white q-mb-lg border-subtle">
          <template v-slot:avatar>
            <q-icon name="schedule" color="amber-8" size="32px" />
          </template>
          <div class="text-body2">
            <strong>Etapas de tu Pedido:</strong> 1. <strong>Recibido</strong> ➔ 2. <strong>En Preparación</strong> ➔ 3. <strong>Enviado</strong> ➔ 4. <strong>Entregado</strong>. Una vez guardada tu calificación, queda bloqueada permanentemente.
          </div>
        </q-banner>

        <!-- Sin Pedidos -->
        <div v-if="pedidos.length === 0" class="text-center q-pa-xl column flex-center bg-white rounded-borders shadow-1 border-subtle">
          <q-icon name="moped" size="64px" color="grey-4" />
          <div class="text-h5 text-weight-bolder text-dark font-heading q-mt-md">
            No tienes pedidos activos
          </div>
          <p class="text-caption text-grey-6 q-mt-xs">
            Explora nuestras especialidades para realizar tu primer pedido.
          </p>
          <q-btn class="btn-gold q-mt-md" label="Ver Menú de Hamburguesas" @click="cambiarSeccion('hamburguesas')" />
        </div>

        <!-- Listado de Pedidos -->
        <div v-else class="q-gutter-y-lg">
          <q-card
            v-for="orden in pedidos"
            :key="orden.id"
            class="q-pa-md q-pa-md-lg bg-white shadow-2"
            style="border-radius: 16px; border: 1px solid #e8e8e8;"
          >
            <!-- Cabecera de la Orden -->
            <div class="row items-center justify-between q-mb-md">
              <div class="row items-center">
                <q-avatar size="38px" color="grey-10" text-color="amber-8" class="q-mr-sm">
                  <q-icon name="receipt_long" size="22px" />
                </q-avatar>
                <div>
                  <div class="text-subtitle1 text-weight-bolder text-dark font-heading">
                    ORDEN #{{ orden.id }}
                  </div>
                  <div class="text-caption text-grey-6">
                    Fecha: {{ orden.fecha }}
                  </div>
                </div>
              </div>

              <div class="row items-center q-gutter-sm">
                <q-chip
                  :color="getColorEstado(orden.estado)"
                  text-color="white"
                  icon="sync"
                  class="text-weight-bold"
                >
                  {{ orden.estado.toUpperCase() }}
                </q-chip>
                <!-- Botón para avanzar estado manualmente en la prueba -->
                <q-btn
                  v-if="orden.estado !== 'Entregado'"
                  dense
                  flat
                  size="sm"
                  color="grey-7"
                  icon="fast_forward"
                  label="Avanzar etapa"
                  @click="avanzarEstadoPedido(orden.id)"
                >
                  <q-tooltip>Simular avance del repartidor</q-tooltip>
                </q-btn>
              </div>
            </div>

            <!-- Stepper visual de las 4 etapas -->
            <div class="q-my-lg q-px-sm">
              <div class="row items-center justify-between relative-position">
                <!-- Paso 1: Recibido -->
                <div class="order-stepper-item" :class="getClasePaso(orden.estado, 'Recibido')">
                  <div class="step-circle">
                    <q-icon v-if="getClasePaso(orden.estado, 'Recibido') === 'completed'" name="check" size="20px" />
                    <span v-else>1</span>
                  </div>
                  <div class="text-caption text-weight-bolder text-center q-mt-xs">Recibido</div>
                </div>

                <!-- Línea 1-2 -->
                <q-separator class="col q-mx-xs" :color="getColorLinea(orden.estado, 1)" size="3px" />

                <!-- Paso 2: En Preparación -->
                <div class="order-stepper-item" :class="getClasePaso(orden.estado, 'En Preparación')">
                  <div class="step-circle">
                    <q-icon v-if="getClasePaso(orden.estado, 'En Preparación') === 'completed'" name="check" size="20px" />
                    <span v-else>2</span>
                  </div>
                  <div class="text-caption text-weight-bolder text-center q-mt-xs">En Preparación</div>
                </div>

                <!-- Línea 2-3 -->
                <q-separator class="col q-mx-xs" :color="getColorLinea(orden.estado, 2)" size="3px" />

                <!-- Paso 3: Enviado -->
                <div class="order-stepper-item" :class="getClasePaso(orden.estado, 'Enviado')">
                  <div class="step-circle">
                    <q-icon v-if="getClasePaso(orden.estado, 'Enviado') === 'completed'" name="check" size="20px" />
                    <span v-else>3</span>
                  </div>
                  <div class="text-caption text-weight-bolder text-center q-mt-xs">Enviado</div>
                </div>

                <!-- Línea 3-4 -->
                <q-separator class="col q-mx-xs" :color="getColorLinea(orden.estado, 3)" size="3px" />

                <!-- Paso 4: Entregado -->
                <div class="order-stepper-item" :class="getClasePaso(orden.estado, 'Entregado')">
                  <div class="step-circle">
                    <q-icon v-if="orden.estado === 'Entregado'" name="done_all" size="20px" />
                    <span v-else>4</span>
                  </div>
                  <div class="text-caption text-weight-bolder text-center q-mt-xs">Entregado</div>
                </div>
              </div>
            </div>

            <q-separator class="q-my-md" />

            <!-- Datos de Entrega y Productos -->
            <div class="row q-col-gutter-md">
              <div class="col-12 col-md-6">
                <div class="text-caption text-grey-7 text-weight-bolder q-mb-xs font-heading">
                  INFORMACIÓN DE DESPACHO
                </div>
                <div class="text-body2 text-grey-9">
                  <div><strong>Cliente:</strong> {{ orden.cliente }}</div>
                  <div><strong>Teléfono:</strong> {{ orden.telefono }}</div>
                  <div><strong>Dirección:</strong> {{ orden.direccion }} ({{ orden.ciudad }})</div>
                  <div><strong>Método de Pago:</strong> {{ orden.metodoPago }}</div>
                  <div v-if="orden.notas" class="text-caption text-grey-6 text-italic q-mt-xs">
                    Notas: {{ orden.notas }}
                  </div>
                </div>
              </div>

              <div class="col-12 col-md-6">
                <div class="text-caption text-grey-7 text-weight-bolder q-mb-xs font-heading">
                  RESUMEN DE PRODUCTOS
                </div>
                <q-list dense separator>
                  <q-item v-for="item in orden.items" :key="item.id" class="q-px-none">
                    <q-item-section>
                      <div class="text-body2 text-weight-bold text-dark">
                        {{ item.cantidad }}x {{ item.nombre }}
                      </div>
                    </q-item-section>
                    <q-item-section side>
                      <div class="text-body2 text-weight-bolder text-dark">
                        {{ formatCOP(item.precio * item.cantidad) }}
                      </div>
                    </q-item-section>
                  </q-item>
                </q-list>

                <div class="row justify-between items-center q-mt-sm q-pt-xs border-subtle">
                  <span class="text-subtitle1 text-weight-bolder text-dark">TOTAL PAGADO:</span>
                  <span class="product-price text-h6">{{ formatCOP(orden.total) }}</span>
                </div>
              </div>
            </div>

            <!-- MÓDULO DE CALIFICACIÓN (BLOQUEADA PERMANENTEMENTE UNA VEZ GUARDADA) -->
            <div v-if="orden.estado === 'Entregado'" class="q-mt-lg q-pa-md bg-amber-1 rounded-borders border-subtle">
              <!-- Calificación ya Guardada (Solo Lectura con Candado) -->
              <div v-if="orden.calificacionGuardada">
                <div class="row items-center justify-between q-mb-xs">
                  <div class="row items-center text-positive text-weight-bolder">
                    <q-icon name="lock" size="18px" class="q-mr-xs" />
                    <span>CALIFICACIÓN GUARDADA PERMANENTEMENTE (BLOQUEADA)</span>
                  </div>
                  <q-badge color="positive">Registrada</q-badge>
                </div>

                <div class="row items-center q-gutter-sm q-mt-xs">
                  <q-rating
                    :model-value="orden.calificacion"
                    size="28px"
                    color="amber-9"
                    icon="star"
                    readonly
                  />
                  <span class="text-subtitle1 text-weight-bolder text-dark">
                    {{ orden.calificacion }} de 5 estrellas
                  </span>
                </div>

                <div v-if="orden.comentarioCalificacion" class="text-body2 text-grey-8 q-mt-sm text-italic">
                  "{{ orden.comentarioCalificacion }}"
                </div>
              </div>

              <!-- Formulario de Calificación Activo (Aún no guardado) -->
              <div v-else>
                <div class="text-subtitle2 text-weight-bolder text-dark q-mb-xs font-heading">
                  ¿CÓMO ESTUVO TU EXPERIENCIA? ¡CALIFICA ESTE PEDIDO!
                </div>
                <div class="text-caption text-grey-8 q-mb-sm">
                  Selecciona tu puntuación. Recuerda que una vez guardada, la calificación no podrá ser editada.
                </div>

                <div class="row items-center q-gutter-md q-mb-sm">
                  <q-rating
                    v-model="orden.calificacion"
                    size="32px"
                    color="amber-9"
                    icon="star"
                    icon-selected="star"
                  />
                  <span class="text-body2 text-weight-bold text-dark">
                    {{ orden.calificacion ? `${orden.calificacion} estrellas` : 'Toca las estrellas para calificar' }}
                  </span>
                </div>

                <q-input
                  v-model="orden.comentarioCalificacion"
                  outlined
                  dense
                  bg-color="white"
                  placeholder="Escribe un comentario opcional sobre el sabor, temperatura o entrega..."
                  class="q-mb-sm"
                />

                <q-btn
                  unelevated
                  class="btn-gold"
                  icon="save"
                  label="GUARDAR CALIFICACIÓN PERMANENTE"
                  @click="guardarCalificacion(orden)"
                />
              </div>
            </div>

            <div v-else class="q-mt-md q-pa-sm bg-grey-2 rounded-borders text-caption text-grey-7 row items-center">
              <q-icon name="info" size="18px" class="q-mr-xs text-amber-9" />
              La opción de calificar se habilitará tan pronto el pedido llegue al estado "Entregado".
            </div>
          </q-card>
        </div>
      </div>
    </q-page-container>

    <!-- MODAL DE DETALLE DE PRODUCTO CON INGREDIENTES Y CANTIDAD -->
    <q-dialog v-model="modalDetalle">
      <q-card v-if="productoSeleccionado" style="width: 550px; max-width: 95vw; border-radius: 16px;">
        <q-img
          :src="productoSeleccionado.imagen"
          :ratio="16/9"
        >
          <div class="absolute-top-right q-ma-sm">
            <q-btn round dense flat icon="close" color="white" v-close-popup />
          </div>
          <div v-if="productoSeleccionado.esRecomendacionChef" class="absolute-bottom-left q-ma-sm chef-badge">
            <q-icon name="restaurant" size="14px" class="q-mr-xs text-gold" />
            RECOMENDACIÓN DEL CHEF
          </div>
        </q-img>

        <q-card-section class="q-pa-lg">
          <div class="row items-center justify-between">
            <div class="text-caption text-weight-bold text-amber-9 text-uppercase">
              {{ productoSeleccionado.categoria }}
            </div>
            <div class="product-price text-h5">
              {{ formatCOP(productoSeleccionado.precio) }}
            </div>
          </div>

          <div class="text-h5 text-weight-bolder text-dark font-heading q-mt-xs">
            {{ productoSeleccionado.nombre }}
          </div>

          <p class="text-grey-8 text-body2 q-mt-sm">
            {{ productoSeleccionado.descripcion }}
          </p>

          <!-- Ingredientes detallados -->
          <div class="q-mt-md q-pa-md bg-grey-1 rounded-borders border-subtle">
            <div class="text-caption text-weight-bolder text-dark font-heading q-mb-xs">
              INGREDIENTES Y PREPARACIÓN:
            </div>
            <div class="text-body2 text-grey-8">
              {{ productoSeleccionado.ingredientes }}
            </div>
          </div>

          <!-- Selector de Cantidad -->
          <div class="row items-center justify-between q-mt-lg">
            <div class="text-subtitle2 text-weight-bold text-dark">
              Cantidad:
            </div>
            <div class="row items-center q-gutter-sm">
              <q-btn
                round
                dense
                unelevated
                color="grey-3"
                text-color="dark"
                icon="remove"
                :disable="cantidadModal <= 1"
                @click="cantidadModal--"
              />
              <span class="text-h6 text-weight-bolder text-dark q-px-sm">{{ cantidadModal }}</span>
              <q-btn
                round
                dense
                unelevated
                color="grey-3"
                text-color="dark"
                icon="add"
                @click="cantidadModal++"
              />
            </div>
          </div>

          <q-separator class="q-my-md" />

          <!-- Botón de Confirmación -->
          <div class="row items-center justify-between">
            <div>
              <div class="text-caption text-grey-6">Subtotal:</div>
              <div class="product-price text-h6">
                {{ formatCOP(productoSeleccionado.precio * cantidadModal) }}
              </div>
            </div>

            <q-btn
              unelevated
              class="btn-gold q-px-lg text-weight-bolder font-heading"
              icon="shopping_bag"
              label="AÑADIR AL PEDIDO"
              v-close-popup
              @click="confirmarDetalleAgregar"
            />
          </div>
        </q-card-section>
      </q-card>
    </q-dialog>

    <!-- DRAWER DEL CARRITO & FORMULARIO DE DESPACHO -->
    <q-drawer
      v-model="drawerCarrito"
      side="right"
      overlay
      bordered
      :width="440"
      class="bg-white text-dark shadow-24"
    >
      <div class="column full-height">
        <!-- Cabecera del Carrito -->
        <div class="bg-dark text-white q-pa-md row items-center justify-between border-subtle">
          <div class="row items-center">
            <q-avatar size="34px" color="amber-8" text-color="dark" class="q-mr-sm">
              <q-icon name="shopping_bag" size="20px" />
            </q-avatar>
            <div>
              <div class="text-subtitle1 text-weight-bolder font-heading">TU PEDIDO</div>
              <div class="text-caption text-gold">{{ contarItemsCarrito() }} productos agregados</div>
            </div>
          </div>
          <q-btn flat round dense icon="close" color="white" @click="drawerCarrito = false" />
        </div>

        <!-- Contenido Scrollable -->
        <div class="col scroll q-pa-md">
          <!-- Carrito Vacío -->
          <div v-if="carrito.length === 0" class="text-center q-pa-xl column flex-center">
            <q-avatar size="64px" color="grey-2" text-color="grey-6" class="q-mb-md">
              <q-icon name="remove_shopping_cart" size="32px" />
            </q-avatar>
            <div class="text-h6 text-weight-bolder text-dark font-heading">
              Tu carrito está vacío
            </div>
            <p class="text-caption text-grey-6 q-mt-xs q-mb-md">
              Agrega deliciosas especialidades de nuestras secciones para comenzar.
            </p>
            <q-btn
              unelevated
              class="btn-gold"
              label="Ver Hamburguesas"
              @click="drawerCarrito = false; cambiarSeccion('hamburguesas')"
            />
          </div>

          <!-- Items en el Carrito -->
          <div v-else>
            <q-list separator>
              <q-item
                v-for="item in carrito"
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
                  <div class="text-subtitle2 text-weight-bolder text-dark font-heading">{{ item.nombre }}</div>
                  <div class="text-caption text-gold text-weight-bold">
                    {{ formatCOP(item.precio) }} c/u
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
                      @click="modificarCantidadCarrito(item.id, -1)"
                    />
                    <span class="text-weight-bolder q-px-xs text-body2">{{ item.cantidad }}</span>
                    <q-btn
                      flat
                      round
                      dense
                      size="sm"
                      icon="add"
                      color="dark"
                      @click="modificarCantidadCarrito(item.id, 1)"
                    />
                    <q-btn
                      flat
                      round
                      dense
                      size="sm"
                      icon="delete_outline"
                      color="grey-6"
                      @click="eliminarDelCarrito(item.id)"
                    />
                  </div>
                  <div class="text-caption text-weight-bolder text-right text-dark q-mt-xs">
                    {{ formatCOP(item.precio * item.cantidad) }}
                  </div>
                </q-item-section>
              </q-item>
            </q-list>

            <q-separator class="q-my-md" />

            <!-- Formulario de Entrega Obligatorio -->
            <div class="text-subtitle2 text-weight-bolder text-dark q-mb-sm font-heading">
              INFORMACIÓN DE ENTREGA (CAMPOS OBLIGATORIOS)
            </div>

            <div class="q-gutter-y-sm">
              <q-input
                v-model="formularioPedido.fecha"
                label="Fecha de la Orden (Automática - No editable)"
                dense
                outlined
                readonly
                disable
                bg-color="grey-2"
              >
                <template v-slot:prepend>
                  <q-icon name="event" color="amber-9" />
                </template>
              </q-input>

              <q-input
                v-model="formularioPedido.cliente"
                label="Nombre Completo *"
                dense
                outlined
                placeholder="Ingresa tu nombre y apellido"
                :error="erroresFormulario.cliente"
                error-message="El nombre completo es obligatorio"
              >
                <template v-slot:prepend>
                  <q-icon name="person" color="grey-7" />
                </template>
              </q-input>

              <q-input
                v-model="formularioPedido.telefono"
                label="Teléfono Celular *"
                dense
                outlined
                placeholder="Ej. 312 345 6789"
                :error="erroresFormulario.telefono"
                error-message="El teléfono celular es obligatorio"
              >
                <template v-slot:prepend>
                  <q-icon name="phone" color="grey-7" />
                </template>
              </q-input>

              <q-input
                v-model="formularioPedido.direccion"
                label="Dirección de Entrega *"
                dense
                outlined
                placeholder="Ej. Calle 85 # 14-25 Apto 401"
                :error="erroresFormulario.direccion"
                error-message="La dirección de entrega es obligatoria"
              >
                <template v-slot:prepend>
                  <q-icon name="home" color="grey-7" />
                </template>
              </q-input>

              <q-input
                v-model="formularioPedido.ciudad"
                label="Ciudad / Sector *"
                dense
                outlined
                placeholder="Ej. Bogotá - Zona Rosa"
                :error="erroresFormulario.ciudad"
                error-message="La ciudad o sector es obligatorio"
              >
                <template v-slot:prepend>
                  <q-icon name="place" color="grey-7" />
                </template>
              </q-input>

              <q-select
                v-model="formularioPedido.metodoPago"
                :options="['Efectivo contra entrega', 'Tarjeta Débito / Crédito', 'Transferencia Nequi / Daviplata']"
                label="Método de Pago *"
                dense
                outlined
              >
                <template v-slot:prepend>
                  <q-icon name="payments" color="grey-7" />
                </template>
              </q-select>

              <q-input
                v-model="formularioPedido.notas"
                label="Observaciones del Pedido (Opcional)"
                dense
                outlined
                type="textarea"
                rows="2"
                placeholder="Ej. Sin cebolla, tocar el timbre..."
              />
            </div>
          </div>
        </div>

        <!-- Pie del Carrito: Totales y Botón de Confirmación -->
        <div v-if="carrito.length > 0" class="bg-grey-1 q-pa-md border-subtle">
          <div class="row items-center justify-between q-mb-xs text-body2 text-grey-8">
            <span>Subtotal:</span>
            <span class="text-weight-bold">{{ formatCOP(obtenerTotalCarrito()) }}</span>
          </div>
          <div class="row items-center justify-between q-mb-xs text-body2 text-grey-8">
            <span>Costo de Domicilio:</span>
            <span class="text-weight-bold text-positive">¡GRATIS!</span>
          </div>
          <q-separator class="q-my-sm" />
          <div class="row items-center justify-between q-mb-md">
            <span class="text-subtitle1 text-weight-bolder text-dark font-heading">TOTAL A PAGAR:</span>
            <span class="product-price text-h5">{{ formatCOP(obtenerTotalCarrito()) }}</span>
          </div>

          <q-btn
            unelevated
            class="btn-gold full-width q-py-sm text-weight-bolder font-heading text-body1"
            icon="check_circle"
            label="CONFIRMAR Y DESPACHAR PEDIDO"
            @click="despacharPedido"
          />

          <div class="text-center text-caption text-grey-6 q-mt-xs">
            Pago seguro al recibir o transferir. Sin anticipos.
          </div>
        </div>
      </div>
    </q-drawer>

    <!-- FOOTER DARK ELEGANTE -->
    <footer class="bf-footer q-py-xl q-px-md q-px-md-xl">
      <div class="max-w-7xl mx-auto">
        <div class="row q-col-gutter-xl justify-between">
          <!-- Columna 1: Marca -->
          <div class="col-12 col-md-4">
            <div class="row items-center q-mb-md">
              <q-avatar size="36px" color="amber-8" text-color="dark" class="q-mr-sm">
                <q-icon name="lunch_dining" size="22px" />
              </q-avatar>
              <span class="text-h6 text-weight-bolder text-white font-heading">
                BURGER <span class="text-gold">FACTORY</span>
              </span>
            </div>
            <p class="text-grey-5 text-body2" style="line-height: 1.6;">
              Parrilla artesanal auténtica, carnes 100% Angus colombianas, masas maduradas a la piedra y los mejores postres. Despachos express directos a tu puerta.
            </p>
            <div class="text-gold font-script text-h6">
              Pasión por la parrilla desde 2016
            </div>
          </div>

          <!-- Columna 2: Secciones del Menú -->
          <div class="col-6 col-sm-4 col-md-2">
            <div class="text-subtitle2 text-weight-bolder text-white q-mb-md font-heading">
              SECCIONES DE COMIDA
            </div>
            <div class="column q-gutter-y-sm text-caption">
              <a href="javascript:void(0)" class="footer-link" @click="cambiarSeccion('hamburguesas')">Hamburguesas (5)</a>
              <a href="javascript:void(0)" class="footer-link" @click="cambiarSeccion('perros')">Perros Calientes (5)</a>
              <a href="javascript:void(0)" class="footer-link" @click="cambiarSeccion('pizzas')">Pizzas a la Piedra (5)</a>
              <a href="javascript:void(0)" class="footer-link" @click="cambiarSeccion('bebidas')">Bebidas y Malteadas (5)</a>
              <a href="javascript:void(0)" class="footer-link" @click="cambiarSeccion('postres')">Postres Caseros (5)</a>
              <a href="javascript:void(0)" class="footer-link" @click="cambiarSeccion('promociones')">Super Combos (5)</a>
            </div>
          </div>

          <!-- Columna 3: Conócenos -->
          <div class="col-6 col-sm-4 col-md-2">
            <div class="text-subtitle2 text-weight-bolder text-white q-mb-md font-heading">
              CONÓCENOS
            </div>
            <div class="column q-gutter-y-sm text-caption">
              <a href="javascript:void(0)" class="footer-link" @click="cambiarSeccion('hamburguesas')">Carta Gastronómica</a>
              <a href="javascript:void(0)" class="footer-link" @click="cambiarSeccion('nosotros')">Nuestra Historia</a>
              <a href="javascript:void(0)" class="footer-link" @click="cambiarSeccion('nosotros')">Equipo de Cocina</a>
              <a href="javascript:void(0)" class="footer-link" @click="cambiarSeccion('nosotros')">Sedes y Horarios</a>
              <a href="javascript:void(0)" class="footer-link" @click="cambiarSeccion('pedidos')">Mis Pedidos en Vivo</a>
            </div>
          </div>

          <!-- Columna 4: Contacto y WhatsApp -->
          <div class="col-12 col-sm-4 col-md-4">
            <div class="text-subtitle2 text-weight-bolder text-white q-mb-md font-heading">
              LÍNEAS DE ATENCIÓN Y DOMICILIOS
            </div>
            <div class="column q-gutter-y-sm text-caption text-grey-4">
              <div class="row items-center">
                <q-icon name="phone" color="amber-8" size="18px" class="q-mr-sm" />
                <span>Central de Pedidos: <strong>{{ contactoInfo.telefono }}</strong></span>
              </div>
              <div class="row items-center">
                <q-icon name="chat" color="positive" size="18px" class="q-mr-sm" />
                <span>WhatsApp: <strong>{{ contactoInfo.whatsapp }}</strong></span>
              </div>
              <div class="row items-center">
                <q-icon name="schedule" color="amber-8" size="18px" class="q-mr-sm" />
                <span>Horario: Dom - Jue 11:30 AM a 10:30 PM | Vie - Sáb hasta 12:00 AM</span>
              </div>
            </div>

            <div class="q-mt-md">
              <q-btn
                unelevated
                dense
                class="btn-whatsapp full-width text-weight-bold"
                icon="chat"
                label="Escríbenos por WhatsApp"
                :href="contactoInfo.whatsappUrl"
                target="_blank"
              />
            </div>
          </div>
        </div>

        <q-separator dark class="q-my-lg opacity-20" />

        <div class="row items-center justify-between text-caption text-grey-6">
          <div>
            © {{ new Date().getFullYear() }} Burger Factory. Menú Digital de Comidas Rápidas. Todos los derechos reservados.
          </div>
          <div class="row items-center q-gutter-md">
            <span>Carne 100% Angus Certificada</span>
            <span>Despacho Rápido y Seguro</span>
          </div>
        </div>
      </div>
    </footer>
  </q-layout>
</template>

<script setup>
// Únicamente ref() según requerimiento estricto (PROHIBIDO: computed, watch, Pinia, Vue Router)
import { ref } from 'vue'
// Persistencia únicamente con useLocalStorage de @vueuse/core
import { useLocalStorage } from '@vueuse/core'
import { useQuasar } from 'quasar'

// Importación de datos estáticos
import {
  CATEGORIAS_CONFIG,
  CATALOGO_PRODUCTOS,
  EQUIPO_TRABAJO,
  SEDES_RESTAURANTE,
  CONTACTO_GENERAL
} from './data.js'

const $q = useQuasar()

// Persistencia de datos con useLocalStorage
const carrito = useLocalStorage('bf_carrito_persisted', [])
const pedidos = useLocalStorage('bf_pedidos_persisted', [
  {
    id: 1042,
    fecha: '15/09/2026, 11:30 am',
    cliente: 'Juan Camilo Pérez',
    telefono: '310 987 6543',
    direccion: 'Carrera 15 # 88-20 Apto 502',
    ciudad: 'Bogotá - Zona Rosa',
    metodoPago: 'Efectivo contra entrega',
    notas: 'Sin cebolla en la Monster Burger por favor.',
    items: [
      { id: 'bf-h2', nombre: 'Monster Factory Burger (Recomendación del Chef)', precio: 32900, cantidad: 1 },
      { id: 'bf-b1', nombre: 'Malteada Belga Chocolate Fudge', precio: 15900, cantidad: 1 }
    ],
    total: 48800,
    estado: 'Enviado',
    calificacion: 0,
    comentarioCalificacion: '',
    calificacionGuardada: false
  }
])

// Se restablece la vista "Inicio" como bienvenida y carta digital
const seccionActiva = useLocalStorage('bf_seccion_activa_left', 'inicio')

// Estados locales con ref()
const drawerLeft = ref(false)
const drawerCarrito = ref(false)
const modalDetalle = ref(false)
const productoSeleccionado = ref(null)
const cantidadModal = ref(1)

const equipoTrabajo = ref(EQUIPO_TRABAJO)
const sedesRestaurante = ref(SEDES_RESTAURANTE)
const contactoInfo = ref(CONTACTO_GENERAL)

const formularioPedido = ref({
  fecha: obtenerFechaActual(),
  cliente: '',
  telefono: '',
  direccion: '',
  ciudad: '',
  metodoPago: 'Efectivo contra entrega',
  notas: ''
})

const erroresFormulario = ref({
  cliente: false,
  telefono: false,
  direccion: false,
  ciudad: false
})

// Funciones normales
function cambiarSeccion(seccion) {
  seccionActiva.value = seccion
  drawerLeft.value = false // El menú se cierra automáticamente al hacer clic en cualquier sección
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

function esCategoriaActiva(seccion) {
  return ['hamburguesas', 'perros', 'pizzas', 'bebidas', 'postres', 'promociones'].includes(seccion)
}

function obtenerTituloSeccionActiva(seccion) {
  switch (seccion) {
    case 'inicio': return 'Inicio - Menú Digital'
    case 'hamburguesas': return 'Sección de Hamburguesas'
    case 'perros': return 'Sección de Perros Calientes'
    case 'pizzas': return 'Sección de Pizzas a la Piedra'
    case 'bebidas': return 'Sección de Bebidas & Malteadas'
    case 'postres': return 'Sección de Postres Caseros'
    case 'promociones': return 'Sección de Promociones & Combos'
    case 'nosotros': return 'Sobre Nosotros & Sedes'
    case 'pedidos': return 'Mis Pedidos & Despacho'
    default: return 'Menú Digital de Comidas Rápidas'
  }
}

function obtenerConfigCategoria(catId) {
  return CATEGORIAS_CONFIG[catId] || CATEGORIAS_CONFIG.hamburguesas
}

function obtenerProductosDeCategoria(catId) {
  return CATALOGO_PRODUCTOS.filter(p => p.categoriaId === catId)
}

function formatCOP(valor) {
  if (typeof valor !== 'number') return '$0'
  return '$' + valor.toLocaleString('es-CO')
}

function getClaseTag(etiqueta) {
  switch (etiqueta) {
    case 'Más pedido': return 'tag-mas-pedido'
    case 'Nuevo': return 'tag-nuevo'
    case 'Picante': return 'tag-picante'
    case 'Vegetariano': return 'tag-vegetariano'
    case 'Super Promo':
    case 'Para 2':
    case 'Familiar': return 'tag-promo'
    default: return 'tag-default'
  }
}

function getColorEtiqueta(etiqueta) {
  switch (etiqueta) {
    case 'Más pedido': return 'amber-9'
    case 'Nuevo': return 'blue-7'
    case 'Picante': return 'deep-orange-7'
    case 'Vegetariano': return 'positive'
    case 'Super Promo': return 'purple-7'
    case 'Para 2': return 'teal-7'
    case 'Familiar': return 'indigo-7'
    case 'Sin Alcohol': return 'cyan-7'
    case 'Caliente': return 'brown-7'
    default: return 'grey-8'
  }
}

function contarItemsCarrito() {
  let count = 0
  for (let i = 0; i < carrito.value.length; i++) {
    count += (carrito.value[i].cantidad || 1)
  }
  return count
}

function obtenerTotalCarrito() {
  let total = 0
  for (let i = 0; i < carrito.value.length; i++) {
    total += ((carrito.value[i].precio || 0) * (carrito.value[i].cantidad || 1))
  }
  return total
}

function agregarAlCarrito(producto, cantidad = 1) {
  const index = carrito.value.findIndex(item => item.id === producto.id)
  if (index !== -1) {
    carrito.value[index].cantidad += cantidad
  } else {
    carrito.value.push({
      id: producto.id,
      nombre: producto.nombre,
      precio: producto.precio,
      imagen: producto.imagen,
      cantidad: cantidad
    })
  }

  $q.notify({
    type: 'positive',
    message: `¡${producto.nombre} añadido a tu pedido!`,
    icon: 'check_circle',
    timeout: 2200,
    position: 'top-right'
  })
}

function modificarCantidadCarrito(id, delta) {
  const index = carrito.value.findIndex(item => item.id === id)
  if (index !== -1) {
    carrito.value[index].cantidad += delta
    if (carrito.value[index].cantidad <= 0) {
      carrito.value.splice(index, 1)
    }
  }
}

function eliminarDelCarrito(id) {
  const index = carrito.value.findIndex(item => item.id === id)
  if (index !== -1) {
    carrito.value.splice(index, 1)
  }
}

function abrirModalDetalle(producto) {
  productoSeleccionado.value = producto
  cantidadModal.value = 1
  modalDetalle.value = true
}

function confirmarDetalleAgregar() {
  if (!productoSeleccionado.value) return
  agregarAlCarrito(productoSeleccionado.value, cantidadModal.value)
}

function obtenerFechaActual() {
  const now = new Date()
  const d = String(now.getDate()).padStart(2, '0')
  const m = String(now.getMonth() + 1).padStart(2, '0')
  const y = now.getFullYear()
  let h = now.getHours()
  const min = String(now.getMinutes()).padStart(2, '0')
  const ampm = h >= 12 ? 'pm' : 'am'
  h = h % 12
  h = h ? h : 12
  return `${d}/${m}/${y}, ${h}:${min} ${ampm}`
}

function despacharPedido() {
  erroresFormulario.value.cliente = !formularioPedido.value.cliente.trim()
  erroresFormulario.value.telefono = !formularioPedido.value.telefono.trim()
  erroresFormulario.value.direccion = !formularioPedido.value.direccion.trim()
  erroresFormulario.value.ciudad = !formularioPedido.value.ciudad.trim()

  if (
    erroresFormulario.value.cliente ||
    erroresFormulario.value.telefono ||
    erroresFormulario.value.direccion ||
    erroresFormulario.value.ciudad
  ) {
    $q.notify({
      type: 'warning',
      message: 'Por favor completa todos los campos obligatorios de entrega.',
      icon: 'warning',
      position: 'top-right',
      timeout: 3000
    })
    return
  }

  formularioPedido.value.fecha = obtenerFechaActual()

  const nuevaOrden = {
    id: Math.floor(1000 + Math.random() * 9000),
    fecha: formularioPedido.value.fecha,
    cliente: formularioPedido.value.cliente.trim(),
    telefono: formularioPedido.value.telefono.trim(),
    direccion: formularioPedido.value.direccion.trim(),
    ciudad: formularioPedido.value.ciudad.trim(),
    metodoPago: formularioPedido.value.metodoPago,
    notas: formularioPedido.value.notas.trim(),
    items: JSON.parse(JSON.stringify(carrito.value)),
    total: obtenerTotalCarrito(),
    estado: 'Recibido',
    calificacion: 0,
    comentarioCalificacion: '',
    calificacionGuardada: false
  }

  // Guardar en pedidos (persiste en useLocalStorage)
  pedidos.value.unshift(nuevaOrden)

  // Limpiar carrito
  carrito.value = []

  // Cerrar drawer y redirigir a mis pedidos
  drawerCarrito.value = false
  cambiarSeccion('pedidos')

  // Notificar
  $q.notify({
    type: 'positive',
    message: `¡Pedido #${nuevaOrden.id} recibido con éxito!`,
    caption: 'Tu orden está en preparación. Puedes hacerle seguimiento en vivo aquí.',
    icon: 'check_circle',
    position: 'top-right',
    timeout: 4500
  })

  // Reiniciar formulario
  formularioPedido.value.cliente = ''
  formularioPedido.value.telefono = ''
  formularioPedido.value.direccion = ''
  formularioPedido.value.ciudad = ''
  formularioPedido.value.notas = ''
}

function getColorEstado(estado) {
  switch (estado) {
    case 'Recibido': return 'amber-8'
    case 'En Preparación': return 'orange-8'
    case 'Enviado': return 'blue-8'
    case 'Entregado': return 'positive'
    default: return 'grey-7'
  }
}

function getClasePaso(estadoActual, paso) {
  const jerarquia = ['Recibido', 'En Preparación', 'Enviado', 'Entregado']
  const indexActual = jerarquia.indexOf(estadoActual)
  const indexPaso = jerarquia.indexOf(paso)

  if (indexPaso < indexActual) return 'completed'
  if (indexPaso === indexActual) return 'active'
  return 'pending'
}

function getColorLinea(estadoActual, nivel) {
  const jerarquia = ['Recibido', 'En Preparación', 'Enviado', 'Entregado']
  const indexActual = jerarquia.indexOf(estadoActual)
  return indexActual >= nivel ? 'amber-8' : 'grey-4'
}

function avanzarEstadoPedido(ordenId) {
  const orden = pedidos.value.find(o => o.id === ordenId)
  if (!orden) return

  const jerarquia = ['Recibido', 'En Preparación', 'Enviado', 'Entregado']
  const index = jerarquia.indexOf(orden.estado)
  if (index < jerarquia.length - 1) {
    orden.estado = jerarquia[index + 1]
    $q.notify({
      type: 'info',
      message: `El pedido #${orden.id} avanzó a etapa: ${orden.estado}`,
      icon: 'sync',
      position: 'top-right'
    })
  }
}

function guardarCalificacion(orden) {
  if (!orden.calificacion || orden.calificacion === 0) {
    $q.notify({
      type: 'warning',
      message: 'Por favor selecciona al menos una estrella para calificar.',
      position: 'top-right'
    })
    return
  }

  // Bloqueo permanente de la calificación
  orden.calificacionGuardada = true

  $q.notify({
    type: 'positive',
    message: `¡Calificación de ${orden.calificacion} estrellas guardada exitosamente!`,
    caption: 'Tu evaluación ha sido registrada y no podrá ser modificada.',
    icon: 'lock',
    position: 'top-right',
    timeout: 3500
  })
}
</script>
