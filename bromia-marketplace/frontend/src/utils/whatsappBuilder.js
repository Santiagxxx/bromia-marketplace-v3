import { formatCOP } from './formatters'

export function buildWhatsAppOrderUrl({ whatsappNumber, items, customerName, deliveryMode, address, generalNote, total }) {
  const cleanPhone = String(whatsappNumber || '573001234567').replace(/\D/g, '')

  const lines = [
    '🍫 *¡Hola Bromia! Quiero hacer un pedido desde la web:*',
    ''
  ]

  if (customerName && customerName.trim()) {
    lines.push(`👤 *Nombre:* ${customerName.trim()}`)
  }

  lines.push(`🛵 *Entrega:* ${deliveryMode === 'domicilio' ? 'Domicilio' : 'Recoger en punto'}`)

  if (deliveryMode === 'domicilio' && address && address.trim()) {
    lines.push(`📍 *Dirección:* ${address.trim()}`)
  }

  lines.push('')
  lines.push('🧁 *Detalle del pedido:*')

  items.forEach((item, index) => {
    const subtotal = formatCOP(item.price * item.quantity)
    const flavorTxt = item.selectedFlavor ? ` (${item.selectedFlavor})` : ''
    lines.push(`${index + 1}. *${item.quantity}x* ${item.name}${flavorTxt} — ${subtotal}`)
  })

  lines.push('')
  lines.push(`💰 *Total estimado:* ${formatCOP(total)}`)

  if (generalNote && generalNote.trim()) {
    lines.push(`💌 *Nota / Dedicatoria:* ${generalNote.trim()}`)
  }

  lines.push('')
  lines.push('¿Me confirmas disponibilidad y datos de transferencia? ✨')

  const encodedText = encodeURIComponent(lines.join('\n'))
  return `https://wa.me/${cleanPhone}?text=${encodedText}`
}
