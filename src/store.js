import { computed, reactive } from 'vue'

const savedCart = localStorage.getItem('burger-bite-cart')
localStorage.removeItem('burger-bite-orders')

export const state = reactive({
  cart: savedCart ? JSON.parse(savedCart) : [],
  orders: [],
  isCartDrawerOpen: false,
  isOrdersModalOpen: false
})

export const cartCount = computed(() => state.cart.reduce((total, item) => total + item.cantidad, 0))
export const cartTotal = computed(() => state.cart.reduce((total, item) => total + item.precio * item.cantidad, 0))

export function formatCOP(value) {
  return new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', maximumFractionDigits: 0 }).format(value || 0)
}

function saveCart() { localStorage.setItem('burger-bite-cart', JSON.stringify(state.cart)) }
function saveOrders() { localStorage.setItem('burger-bite-orders', JSON.stringify(state.orders)) }

export function addToCart(product, quantity = 1, notes = '') {
  const existing = state.cart.find((item) => item.id === product.id && item.notes === notes)
  if (existing) existing.cantidad += quantity
  else state.cart.push({ id: product.id, nombre: product.nombre, precio: product.precio, imagen: product.imagen, cantidad: quantity, notes })
  saveCart()
}

export function updateCartQuantity(productId, change) {
  const item = state.cart.find((cartItem) => cartItem.id === productId)
  if (!item) return
  item.cantidad += change
  if (item.cantidad <= 0) removeFromCart(productId)
  else saveCart()
}

export function removeFromCart(productId) {
  state.cart = state.cart.filter((item) => item.id !== productId)
  saveCart()
}

export function clearCart() {
  state.cart = []
  saveCart()
}

export function getNowFormatted() {
  return new Intl.DateTimeFormat('es-CO', { dateStyle: 'short', timeStyle: 'short' }).format(new Date())
}

export function createOrderFromCart(details) {
  const total = cartTotal.value
  const abono = Math.min(Number(details.abono) || 0, total)
  const order = {
    id: Date.now().toString().slice(-6), fecha: getNowFormatted(), ...details, abono,
    saldoPendiente: total - abono, total, estado: 'Recibido', calificacion: 0,
    comentarioCalificacion: '', items: state.cart.map((item) => ({ ...item }))
  }
  state.orders.unshift(order)
  state.cart = []
  saveCart(); saveOrders()
  return order
}

export function deleteOrder(orderId) {
  const order = state.orders.find((item) => item.id === orderId)
  if (!order || order.estado === 'Entregado') return false
  state.orders = state.orders.filter((item) => item.id !== orderId)
  saveOrders()
  return true
}

export function exportOrderToPDF(order) {
  const text = [`Burger Bite - Pedido #${order.id}`, `Fecha: ${order.fecha}`, `Cliente: ${order.cliente}`, `Total: ${formatCOP(order.total)}`, '', ...order.items.map((item) => `${item.cantidad}x ${item.nombre} - ${formatCOP(item.precio * item.cantidad)}`)].join('\n')
  const url = URL.createObjectURL(new Blob([text], { type: 'text/plain;charset=utf-8' }))
  const link = document.createElement('a')
  link.href = url; link.download = `pedido-${order.id}.txt`; link.click(); URL.revokeObjectURL(url)
  return true
}

export function exportTableToPDF(title, columns, rows, filename) {
  const lines = [title, '', columns.join(' | '), ...rows.map((row) => row.join(' | '))]
  const url = URL.createObjectURL(new Blob([lines.join('\n')], { type: 'text/plain;charset=utf-8' }))
  const link = document.createElement('a')
  link.href = url; link.download = filename.replace(/\.pdf$/i, '.txt'); link.click(); URL.revokeObjectURL(url)
  return true
}