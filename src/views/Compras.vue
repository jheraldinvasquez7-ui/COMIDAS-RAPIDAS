<template>
  <q-page class="q-pa-md q-pa-md-xl">
    <!-- Header de la sección -->
    <div class="row items-center justify-between q-mb-lg">
      <div>
        <div class="text-overline text-negative text-weight-bolder letter-spacing-2">
          MÓDULO DE ABASTECIMIENTO & PROVEEDORES
        </div>
        <h1 class="text-h4 text-weight-bolder text-dark font-heading q-my-none">
          GESTIÓN DE COMPRAS & MATERIAS PRIMAS
        </h1>
        <p class="text-grey-7 text-body2 q-mt-xs q-mb-none">
          Registro de compras de carne Angus, pan brioche, quesos, insumos, abonos y control de recepción con exportación a PDF.
        </p>
      </div>

      <div class="row q-gutter-sm q-mt-sm q-mt-md-none">
        <q-btn
          outline
          color="negative"
          icon="picture_as_pdf"
          label="Exportar Lista PDF"
          class="text-weight-bold"
          @click="exportarComprasPDF"
        />
        <q-btn
          unelevated
          class="btn-red-primary"
          icon="add_circle"
          label="Nueva Compra"
          @click="abrirModalNuevaCompra"
        />
      </div>
    </div>

    <!-- Métricas Numéricas -->
    <div class="row q-col-gutter-md q-mb-lg">
      <div class="col-12 col-sm-6 col-md-3">
        <q-card class="q-pa-md product-card">
          <div class="row items-center justify-between">
            <div>
              <div class="text-caption text-grey-7 text-weight-bold">TOTAL GASTO EN COMPRAS</div>
              <div class="text-h5 text-weight-bolder text-dark font-heading q-mt-xs">
                {{ formatCOP(totalGastadoCompras) }}
              </div>
            </div>
            <q-avatar size="44px" color="red-1" text-color="negative">
              <q-icon name="shopping_bag" size="24px" />
            </q-avatar>
          </div>
          <div class="text-caption text-grey-6 q-mt-xs">{{ state.purchases.length }} órdenes de compra</div>
        </q-card>
      </div>

      <div class="col-12 col-sm-6 col-md-3">
        <q-card class="q-pa-md product-card">
          <div class="row items-center justify-between">
            <div>
              <div class="text-caption text-grey-7 text-weight-bold">EN ESTADO RECIBIDO</div>
              <div class="text-h5 text-weight-bolder text-negative font-heading q-mt-xs">
                {{ comprasRecibidasCount }}
              </div>
            </div>
            <q-avatar size="44px" color="red-1" text-color="negative">
              <q-icon name="hourglass_empty" size="24px" />
            </q-avatar>
          </div>
          <div class="text-caption text-grey-6 q-mt-xs">Estado inicial obligatorio</div>
        </q-card>
      </div>

      <div class="col-12 col-sm-6 col-md-3">
        <q-card class="q-pa-md product-card">
          <div class="row items-center justify-between">
            <div>
              <div class="text-caption text-grey-7 text-weight-bold">ABONOS REALIZADOS</div>
              <div class="text-h5 text-weight-bolder text-amber-9 font-heading q-mt-xs">
                {{ formatCOP(totalAbonosCompras) }}
              </div>
            </div>
            <q-avatar size="44px" color="amber-1" text-color="amber-9">
              <q-icon name="account_balance_wallet" size="24px" />
            </q-avatar>
          </div>
          <div class="text-caption text-grey-6 q-mt-xs">Anticipos a proveedores</div>
        </q-card>
      </div>

      <div class="col-12 col-sm-6 col-md-3">
        <q-card class="q-pa-md product-card">
          <div class="row items-center justify-between">
            <div>
              <div class="text-caption text-grey-7 text-weight-bold">ENTREGADOS (CERRADOS)</div>
              <div class="text-h5 text-weight-bolder text-positive font-heading q-mt-xs">
                {{ comprasEntregadasCount }}
              </div>
            </div>
            <q-avatar size="44px" color="green-1" text-color="positive">
              <q-icon name="task_alt" size="24px" />
            </q-avatar>
          </div>
          <div class="text-caption text-grey-6 q-mt-xs">Bloqueados para edición/borrado</div>
        </q-card>
      </div>
    </div>

    <!-- Barra de Filtros y Búsqueda -->
    <q-card class="q-pa-md q-mb-lg product-card">
      <div class="row q-col-gutter-md items-center">
        <div class="col-12 col-md-5">
          <q-input
            v-model="filtroBusqueda"
            dense
            outlined
            placeholder="Buscar por proveedor, ID de compra o producto..."
            clearable
          >
            <template v-slot:prepend>
              <q-icon name="search" color="grey-7" />
            </template>
          </q-input>
        </div>

        <div class="col-12 col-sm-6 col-md-4">
          <q-select
            v-model="filtroEstado"
            :options="['Todos los estados', 'Recibido', 'En Preparación', 'En Camino', 'Entregado']"
            dense
            outlined
            label="Filtrar por Estado"
          />
        </div>

        <div class="col-12 col-sm-6 col-md-3">
          <q-select
            v-model="filtroMarca"
            :options="['Todas las marcas', ...opcionesMarcasProveedores]"
            dense
            outlined
            label="Filtrar por Marca / Proveedor"
          />
        </div>
      </div>
    </q-card>

    <!-- Lista de Compras -->
    <q-card class="product-card overflow-hidden">
      <div class="q-pa-md row items-center justify-between bg-grey-2 border-bottom">
        <div class="row items-center">
          <q-icon name="inventory" size="20px" class="q-mr-sm text-negative" />
          <span class="text-subtitle1 text-weight-bolder text-dark font-heading">
            REGISTROS DE COMPRAS E INSUMOS ({{ comprasFiltradas.length }})
          </span>
        </div>
        <span class="text-caption text-grey-7">
          * Los registros en estado <strong>ENTREGADO</strong> quedan protegidos contra edición y eliminación.
        </span>
      </div>

      <div v-if="comprasFiltradas.length === 0" class="text-center q-pa-xl column flex-center">
        <q-icon name="remove_shopping_cart" size="56px" color="grey-4" />
        <div class="text-h6 text-grey-7 q-mt-sm font-heading">No hay registros de compras</div>
        <p class="text-caption text-grey-6">Crea una nueva orden de compra para abastecer la cocina.</p>
        <q-btn class="btn-red-primary q-mt-sm" label="Nueva Compra" @click="abrirModalNuevaCompra" />
      </div>

      <div v-else class="q-pa-md q-gutter-y-md">
        <q-card
          v-for="compra in comprasFiltradas"
          :key="compra.id"
          bordered
          class="q-pa-md"
          :class="{ 'bg-grey-1': compra.estado === 'Entregado' }"
          style="border-radius: 12px;"
        >
          <div class="row items-center justify-between q-mb-sm">
            <div class="row items-center q-gutter-sm">
              <span class="text-h6 text-weight-bolder text-dark font-heading">
                {{ compra.id }}
              </span>
              <q-badge
                :color="getEstadoBadgeColor(compra.estado)"
                class="text-weight-bold q-pa-xs q-px-sm"
              >
                {{ compra.estado.toUpperCase() }}
              </q-badge>
            </div>

            <div class="text-caption text-grey-7">
              <q-icon name="event" class="q-mr-xs text-negative" />
              <strong>Fecha Asignada Automáticamente:</strong> {{ compra.fecha }}
            </div>
          </div>

          <div class="row q-col-gutter-md text-body2 q-mb-sm">
            <div class="col-12 col-md-4">
              <div><strong>Proveedor:</strong> {{ compra.proveedor || 'No especificado' }}</div>
              <div><strong>Categoría:</strong> {{ compra.categoria || 'Insumo General' }}</div>
              <div><strong>Cantidad:</strong> {{ compra.cantidad }} unidades/Kg</div>
            </div>

            <div class="col-12 col-md-4">
              <div>
                <strong>Marca del Proveedor:</strong>
                <q-badge color="grey-8" class="q-ml-xs">{{ compra.marca }}</q-badge>
              </div>
              <div class="q-mt-xs">
                <strong>Modelo / Referencia de Lote:</strong>
                <span class="text-grey-9 q-ml-xs">{{ compra.modelo }}</span>
              </div>
              <div><strong>Método de Pago:</strong> {{ compra.metodoPago }}</div>
            </div>

            <div class="col-12 col-md-4 text-left text-md-right">
              <div class="text-caption text-grey-7">Costo Total Compra</div>
              <div class="text-h6 text-weight-bolder text-negative">
                {{ formatCOP(compra.total) }}
              </div>
              <div v-if="compra.abono > 0" class="text-caption text-grey-8">
                <span class="text-weight-bold text-dark">Abono:</span> {{ formatCOP(compra.abono) }} |
                <span class="text-weight-bold text-negative">Saldo:</span> {{ formatCOP(compra.saldoPendiente) }}
              </div>
            </div>
          </div>

          <div v-if="compra.notas" class="text-caption text-grey-7 text-italic bg-grey-2 q-pa-xs q-px-sm rounded-borders q-mb-sm">
            Nota: {{ compra.notas }}
          </div>

          <!-- Calificación del Proveedor (Solo si estado === Entregado) -->
          <div v-if="compra.estado === 'Entregado'" class="bg-amber-1 q-pa-sm rounded-borders q-mb-sm border-amber">
            <div class="row items-center justify-between">
              <div class="row items-center">
                <q-icon name="grade" color="amber-9" class="q-mr-xs" size="20px" />
                <span class="text-caption text-weight-bolder text-dark">
                  CALIFICACIÓN DEL PROVEEDOR (Habilitada por entrega en bodega):
                </span>
              </div>
              <q-rating
                v-model="compra.calificacion"
                size="22px"
                color="amber-9"
                icon="star_border"
                icon-selected="star"
                @update:model-value="guardarCalificacion(compra)"
              />
            </div>
            <div class="row q-col-gutter-xs q-mt-xs">
              <q-input
                v-model="compra.comentarioCalificacion"
                dense
                outlined
                bg-color="white"
                placeholder="Observaciones de calidad sobre los insumos recibidos..."
                class="col"
              />
              <q-btn
                dense
                color="amber-10"
                icon="check"
                label="Guardar"
                class="q-px-sm text-weight-bold"
                @click="guardarCalificacion(compra)"
              />
            </div>
          </div>

          <!-- Barra de Acciones -->
          <div class="row items-center justify-between q-mt-sm pt-2 border-top">
            <div class="row items-center q-gutter-sm">
              <span class="text-caption text-weight-bold text-dark">Cambiar Estado:</span>
              <q-select
                v-model="compra.estado"
                :options="['Recibido', 'En Preparación', 'En Camino', 'Entregado']"
                dense
                outlined
                :disable="compra.estado === 'Entregado'"
                style="min-width: 160px;"
                @update:model-value="(val) => onCambiarEstado(compra, val)"
              />
              <span v-if="compra.estado === 'Entregado'" class="text-caption text-negative text-weight-medium">
                🔒 Bloqueado: Insumo entregado y cerrado en bodega.
              </span>
            </div>

            <div class="row items-center q-gutter-xs">
              <q-btn
                flat
                round
                dense
                color="dark"
                icon="edit"
                size="sm"
                :disable="compra.estado === 'Entregado'"
                @click="abrirModalEditarCompra(compra)"
              >
                <q-tooltip v-if="compra.estado === 'Entregado'">
                  Bloqueado: La compra ya fue entregada
                </q-tooltip>
                <q-tooltip v-else>Editar Compra</q-tooltip>
              </q-btn>

              <q-btn
                flat
                round
                dense
                color="negative"
                icon="delete"
                size="sm"
                :disable="compra.estado === 'Entregado'"
                @click="solicitarEliminacion(compra)"
              >
                <q-tooltip v-if="compra.estado === 'Entregado'">
                  Bloqueado: La compra ya fue entregada
                </q-tooltip>
                <q-tooltip v-else>Eliminar Compra</q-tooltip>
              </q-btn>
            </div>
          </div>
        </q-card>
      </div>
    </q-card>

    <!-- Modal Formulario de Compra -->
    <q-dialog v-model="modalCompraAbierto" persistent>
      <q-card style="width: 600px; max-width: 95vw; border-radius: 16px;">
        <q-card-section class="row items-center justify-between bg-dark text-white q-py-md">
          <div class="row items-center">
            <q-icon :name="esEdicion ? 'edit' : 'add_business'" size="24px" class="q-mr-sm text-negative" />
            <div>
              <div class="text-h6 text-weight-bolder font-heading">
                {{ esEdicion ? 'EDITAR ORDEN DE COMPRA' : 'REGISTRAR NUEVA COMPRA' }}
              </div>
              <div class="text-caption text-grey-4">
                {{ esEdicion ? `Modificando ${formCompra.id}` : 'Estado inicial: Recibido' }}
              </div>
            </div>
          </div>
          <q-btn flat round dense icon="close" color="white" v-close-popup />
        </q-card-section>

        <q-card-section class="q-pa-md q-gutter-y-sm overflow-auto" style="max-height: 75vh;">
          <!-- Fecha Asignada Automáticamente y NO editable -->
          <q-input
            v-model="formCompra.fecha"
            label="Fecha de la Compra (Automática - No editable)"
            dense
            outlined
            readonly
            disable
            bg-color="grey-2"
          >
            <template v-slot:prepend>
              <q-icon name="event" color="negative" />
            </template>
          </q-input>

          <!-- Proveedor y Categoría (Permiten vacíos según regla) -->
          <div class="row q-col-gutter-sm">
            <div class="col-12 col-sm-6">
              <q-input
                v-model="formCompra.proveedor"
                label="Nombre del Proveedor (Opcional)"
                dense
                outlined
                placeholder="Ej. Distribuidora Carnes Angus"
              />
            </div>
            <div class="col-12 col-sm-6">
              <q-select
                v-model="formCompra.categoria"
                :options="['Carnes & Proteínas', 'Panadería & Harinas', 'Lácteos & Quesos', 'Verduras & Frescos', 'Bebidas & Helados', 'Empaques & Desechables']"
                label="Categoría del Insumo"
                dense
                outlined
              />
            </div>
          </div>

          <!-- MARCA (q-select) y MODELO (campo separado) -->
          <div class="row q-col-gutter-sm">
            <div class="col-12 col-sm-6">
              <q-select
                v-model="formCompra.marca"
                :options="opcionesMarcasProveedores"
                label="Marca / Línea del Proveedor (Select)"
                dense
                outlined
              >
                <template v-slot:prepend>
                  <q-icon name="verified" color="negative" />
                </template>
              </q-select>
            </div>
            <div class="col-12 col-sm-6">
              <q-input
                v-model="formCompra.modelo"
                label="Modelo / Lote de Referencia (Campo Separado)"
                dense
                outlined
                placeholder="Ej. Lote Angus Res 80/20"
              />
            </div>
          </div>

          <div class="row q-col-gutter-sm">
            <div class="col-12 col-sm-4">
              <q-input
                v-model.number="formCompra.cantidad"
                type="number"
                label="Cantidad"
                dense
                outlined
                @update:model-value="calcularTotalCompra"
              />
            </div>
            <div class="col-12 col-sm-4">
              <q-input
                v-model.number="formCompra.precioUnitario"
                type="number"
                label="Precio Unitario"
                dense
                outlined
                prefix="$"
                @update:model-value="calcularTotalCompra"
              />
            </div>
            <div class="col-12 col-sm-4">
              <q-input
                v-model.number="formCompra.total"
                type="number"
                label="Total Compra (COP)"
                dense
                outlined
                prefix="$"
              />
            </div>
          </div>

          <q-select
            v-model="formCompra.metodoPago"
            :options="['Transferencia Bancaria', 'Efectivo', 'Cheque a 30 días', 'Abono / Anticipo']"
            label="Método de Pago"
            dense
            outlined
          />

          <!-- CHECKBOX DE ABONO -->
          <div class="bg-grey-2 q-pa-sm rounded-borders">
            <q-checkbox
              v-model="formCompra.tieneAbono"
              label="¿Se realizó un Abono / Anticipo al proveedor?"
              color="negative"
            />

            <!-- Caja numérica de Abono: APARECE SOLO SI SE MARCA EL CHECK -->
            <div v-if="formCompra.tieneAbono" class="q-mt-xs">
              <q-input
                v-model.number="formCompra.abono"
                type="number"
                label="Valor del Abono al Proveedor (COP)"
                dense
                outlined
                bg-color="white"
                prefix="$"
                :hint="`Saldo pendiente por pagar: ${formatCOP(Math.max(0, (formCompra.total || 0) - (formCompra.abono || 0)))}`"
              />
            </div>
          </div>

          <!-- Estado Inicial (No editable en creación, siempre Recibido) -->
          <div class="row items-center justify-between bg-red-1 q-pa-sm rounded-borders">
            <span class="text-caption text-weight-bold text-dark">
              {{ esEdicion ? 'Estado actual:' : 'Estado Inicial Obligatorio:' }}
            </span>
            <q-badge color="negative" class="text-weight-bold">
              {{ formCompra.estado.toUpperCase() }}
            </q-badge>
          </div>

          <q-input
            v-model="formCompra.notas"
            type="textarea"
            rows="2"
            label="Instrucciones de almacenamiento o bodega (Opcional)"
            dense
            outlined
          />
        </q-card-section>

        <q-card-actions align="right" class="q-pa-md bg-grey-1 border-top">
          <q-btn flat label="Cancelar" color="grey-8" v-close-popup />
          <q-btn
            unelevated
            class="btn-red-primary"
            :label="esEdicion ? 'Guardar Cambios' : 'Registrar Compra'"
            @click="guardarCompra"
          />
        </q-card-actions>
      </q-card>
    </q-dialog>

    <!-- Modal de Confirmación para Eliminar (SIN ALERTAS NATIVAS) -->
    <q-dialog v-model="modalEliminarAbierto">
      <q-card style="min-width: 320px; border-radius: 12px;">
        <q-card-section class="row items-center q-pb-none">
          <q-avatar icon="warning" color="negative" text-color="white" />
          <span class="q-ml-sm text-subtitle1 text-weight-bold text-dark font-heading">
            Confirmar Eliminación de Compra
          </span>
        </q-card-section>

        <q-card-section class="q-pt-sm text-body2 text-grey-8">
          ¿Estás seguro de eliminar la compra <strong>{{ compraAEliminar?.id }}</strong>? Esta acción no se puede deshacer.
        </q-card-section>

        <q-card-actions align="right" class="q-pa-md">
          <q-btn flat label="Cancelar" color="grey-8" v-close-popup />
          <q-btn
            unelevated
            color="negative"
            label="Eliminar"
            @click="ejecutarEliminacionCompra"
            v-close-popup
          />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useQuasar } from 'quasar'
import {
  state,
  formatCOP,
  getNowFormatted,
  exportTableToPDF
} from '../store.js'

const $q = useQuasar()

const opcionesMarcasProveedores = [
  'Carnes Angus del Llano',
  'Panadería La Espiga Real',
  'Lácteos Suizos del Valle',
  'Avícola Santandereana SAS',
  'Agrícola Sabana Fresca',
  'Distribuidora Salsas & Especias'
]

const filtroBusqueda = ref('')
const filtroEstado = ref('Todos los estados')
const filtroMarca = ref('Todas las marcas')

const modalCompraAbierto = ref(false)
const modalEliminarAbierto = ref(false)
const esEdicion = ref(false)
const compraAEliminar = ref(null)

const formCompra = ref({
  id: '',
  fecha: getNowFormatted(),
  proveedor: '',
  marca: 'Carnes Angus del Llano',
  modelo: 'Lote Carne Res 80/20',
  categoria: 'Carnes & Proteínas',
  cantidad: 20,
  precioUnitario: 30000,
  total: 600000,
  metodoPago: 'Efectivo',
  tieneAbono: false,
  abono: 0,
  estado: 'Recibido',
  calificacion: 0,
  comentarioCalificacion: '',
  notas: ''
})

const totalGastadoCompras = computed(() => {
  return state.purchases.reduce((acc, c) => acc + (Number(c.total) || 0), 0)
})

const totalAbonosCompras = computed(() => {
  return state.purchases.reduce((acc, c) => acc + (Number(c.abono) || 0), 0)
})

const comprasRecibidasCount = computed(() => {
  return state.purchases.filter(c => c.estado === 'Recibido').length
})

const comprasEntregadasCount = computed(() => {
  return state.purchases.filter(c => c.estado === 'Entregado').length
})

const comprasFiltradas = computed(() => {
  return state.purchases.filter(c => {
    if (filtroEstado.value !== 'Todos los estados' && c.estado !== filtroEstado.value) {
      return false
    }
    if (filtroMarca.value !== 'Todas las marcas' && c.marca !== filtroMarca.value) {
      return false
    }
    if (filtroBusqueda.value) {
      const q = filtroBusqueda.value.toLowerCase()
      const matchId = c.id?.toLowerCase().includes(q)
      const matchProv = c.proveedor?.toLowerCase().includes(q)
      const matchMod = c.modelo?.toLowerCase().includes(q)
      const matchCat = c.categoria?.toLowerCase().includes(q)
      if (!matchId && !matchProv && !matchMod && !matchCat) return false
    }
    return true
  })
})

function calcularTotalCompra() {
  formCompra.value.total = (Number(formCompra.value.cantidad) || 0) * (Number(formCompra.value.precioUnitario) || 0)
}

function getEstadoBadgeColor(estado) {
  switch (estado) {
    case 'Recibido': return 'negative'
    case 'En Preparación': return 'amber-9'
    case 'En Camino': return 'blue-8'
    case 'Entregado': return 'positive'
    default: return 'grey-7'
  }
}

function abrirModalNuevaCompra() {
  esEdicion.value = false
  formCompra.value = {
    id: `CMP-${Math.floor(1000 + Math.random() * 9000)}`,
    fecha: getNowFormatted(), // Fecha asignada automáticamente no editable
    proveedor: '',
    marca: 'Carnes Angus del Llano',
    modelo: 'Lote Especial Insumos',
    categoria: 'Carnes & Proteínas',
    cantidad: 10,
    precioUnitario: 25000,
    total: 250000,
    metodoPago: 'Efectivo',
    tieneAbono: false,
    abono: 0,
    estado: 'Recibido', // Estado inicial obligatorio
    calificacion: 0,
    comentarioCalificacion: '',
    notas: ''
  }
  modalCompraAbierto.value = true
}

function abrirModalEditarCompra(compra) {
  if (compra.estado === 'Entregado') {
    $q.notify({
      type: 'negative',
      message: 'Bloqueado: Un registro en estado ENTREGADO no se puede editar.',
      icon: 'lock'
    })
    return
  }

  esEdicion.value = true
  formCompra.value = {
    ...compra,
    tieneAbono: (compra.abono || 0) > 0
  }
  modalCompraAbierto.value = true
}

function guardarCompra() {
  const abonoVal = formCompra.value.tieneAbono ? Number(formCompra.value.abono || 0) : 0
  const totalVal = Number(formCompra.value.total || 0)
  const saldo = Math.max(0, totalVal - abonoVal)

  if (esEdicion.value) {
    const idx = state.purchases.findIndex(c => c.id === formCompra.value.id)
    if (idx !== -1) {
      if (state.purchases[idx].estado === 'Entregado') {
        $q.notify({
          type: 'negative',
          message: 'No se puede editar: el pedido ya está ENTREGADO.',
          icon: 'lock'
        })
        modalCompraAbierto.value = false
        return
      }
      state.purchases[idx] = {
        ...state.purchases[idx],
        proveedor: formCompra.value.proveedor || 'Proveedor Varios',
        marca: formCompra.value.marca,
        modelo: formCompra.value.modelo || 'Estándar',
        categoria: formCompra.value.categoria,
        cantidad: Number(formCompra.value.cantidad || 1),
        precioUnitario: Number(formCompra.value.precioUnitario || 0),
        total: totalVal,
        metodoPago: formCompra.value.metodoPago,
        abono: abonoVal,
        saldoPendiente: saldo,
        notas: formCompra.value.notas || ''
      }
      $q.notify({
        type: 'positive',
        message: `Compra ${formCompra.value.id} actualizada con éxito`,
        icon: 'check_circle'
      })
    }
  } else {
    const nueva = {
      id: formCompra.value.id,
      fecha: formCompra.value.fecha,
      proveedor: formCompra.value.proveedor || 'Proveedor General',
      marca: formCompra.value.marca,
      modelo: formCompra.value.modelo || 'Lote Estándar',
      categoria: formCompra.value.categoria,
      cantidad: Number(formCompra.value.cantidad || 1),
      precioUnitario: Number(formCompra.value.precioUnitario || 0),
      total: totalVal,
      metodoPago: formCompra.value.metodoPago,
      abono: abonoVal,
      saldoPendiente: saldo,
      estado: 'Recibido', // Estado inicial obligatorio
      calificacion: 0,
      comentarioCalificacion: '',
      notas: formCompra.value.notas || ''
    }
    state.purchases.unshift(nueva)
    $q.notify({
      type: 'positive',
      message: `¡Compra ${nueva.id} registrada en estado RECIBIDO!`,
      icon: 'check_circle'
    })
  }

  modalCompraAbierto.value = false
}

function onCambiarEstado(compra, nuevoEstado) {
  if (nuevoEstado === 'Entregado') {
    $q.notify({
      type: 'positive',
      message: `¡Compra ${compra.id} marcada como ENTREGADA!`,
      caption: 'El registro queda bloqueado. Se habilitó la calificación del proveedor.',
      icon: 'verified',
      timeout: 3500
    })
  } else {
    $q.notify({
      type: 'info',
      message: `Estado de la compra actualizado a: ${nuevoEstado}`,
      icon: 'sync'
    })
  }
}

function guardarCalificacion(compra) {
  $q.notify({
    type: 'positive',
    message: `Calificación de proveedor registrada: ${compra.calificacion} estrellas`,
    icon: 'star',
    timeout: 2500
  })
}

function solicitarEliminacion(compra) {
  if (compra.estado === 'Entregado') {
    $q.notify({
      type: 'negative',
      message: 'Bloqueado: Un registro en estado ENTREGADO no se puede eliminar.',
      icon: 'lock'
    })
    return
  }
  compraAEliminar.value = compra
  modalEliminarAbierto.value = true
}

function ejecutarEliminacionCompra() {
  if (!compraAEliminar.value) return
  const idx = state.purchases.findIndex(c => c.id === compraAEliminar.value.id)
  if (idx !== -1) {
    if (state.purchases[idx].estado === 'Entregado') {
      $q.notify({
        type: 'negative',
        message: 'No se puede eliminar: la compra ya fue entregada.',
        icon: 'lock'
      })
      return
    }
    state.purchases.splice(idx, 1)
    $q.notify({
      type: 'positive',
      message: `Compra eliminada con éxito`,
      icon: 'delete'
    })
  }
  compraAEliminar.value = null
}

function exportarComprasPDF() {
  const columnas = ['ID Compra', 'Fecha', 'Proveedor', 'Marca', 'Modelo / Lote', 'Total', 'Abono', 'Saldo', 'Estado']
  const filas = comprasFiltradas.value.map(c => [
    c.id,
    c.fecha,
    c.proveedor || 'General',
    c.marca,
    c.modelo,
    formatCOP(c.total),
    formatCOP(c.abono || 0),
    formatCOP(c.saldoPendiente || 0),
    c.estado
  ])

  const exito = exportTableToPDF('REPORTE GENERAL DE COMPRAS E INSUMOS', columnas, filas, 'Compras_BurgerBite.pdf')
  if (exito) {
    $q.notify({
      type: 'positive',
      message: 'Lista de compras exportada a PDF correctamente',
      icon: 'picture_as_pdf'
    })
  } else {
    $q.notify({
      type: 'negative',
      message: 'Error al exportar compras a PDF',
      icon: 'error'
    })
  }
}
</script>
