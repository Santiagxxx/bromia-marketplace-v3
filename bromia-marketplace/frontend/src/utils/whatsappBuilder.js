import { formatCOP } from './formatters'

export function buildWhatsAppOrderUrl({
  whatsappNumber,
  orderNumber,
  items,
  customerName,
  customerPhone,
  deliveryMode,
  deliveryDateText,
  timeSlotText,
  address,
  neighborhood,
  city,
  generalNote,
  paymentMethod,
  paymentStatus,
  deliveryFee,
  total
}) {
  const cleanPhone = String(whatsappNumber || '573001234567').replace(/\D/g, '')

  const lines = [
    `🍫 *¡Hola Bromia! Pedido web ${orderNumber ? '#' + orderNumber : ''}*`,
    ''
  ]

  if (customerName && customerName.trim()) {
    lines.push(`👤 *Cliente:* ${customerName.trim()}`)
  }
  if (customerPhone && customerPhone.trim()) {
    lines.push(`📞 *Teléfono:* ${customerPhone.trim()}`)
  }

  lines.push('')
  lines.push('📅 *PROGRAMACIÓN DE ENTREGA:*')
  lines.push(`• *Fecha:* ${deliveryDateText || 'Próximo día disponible'}`)
  if (timeSlotText) {
    lines.push(`• *Franja Horaria:* ${timeSlotText}`)
  }
  lines.push(`• *Modalidad:* ${deliveryMode === 'domicilio' ? '🛵 Domicilio a tu puerta' : '🛍️ Recoger en taller Bromia'}`)

  if (deliveryMode === 'domicilio' && address && address.trim()) {
    const locInfo = [address.trim(), neighborhood?.trim(), city?.trim()].filter(Boolean).join(', ')
    lines.push(`• *Dirección:* ${locInfo}`)
  }

  lines.push('')
  lines.push('🧁 *ANTOJOS SELECCIONADOS:*')
  items.forEach((item, index) => {
    const subtotal = formatCOP(item.price * item.quantity)
    const flavorTxt = item.selectedFlavor ? ` (${item.selectedFlavor})` : ''
    lines.push(`${index + 1}. *${item.quantity}x* ${item.name}${flavorTxt} — ${subtotal}`)
  })

  lines.push('')
  lines.push('💳 *DETALLE DEL PAGO:*')
  if (deliveryFee && deliveryFee > 0) {
    lines.push(`• *Envío:* ${formatCOP(deliveryFee)}`)
  }
  lines.push(`• *Total a pagar:* ${formatCOP(total)}`)
  lines.push(`• *Método:* ${paymentMethod || 'Por acordar'}`)
  if (paymentStatus) {
    lines.push(`• *Estado:* ${paymentStatus}`)
  }

  if (generalNote && generalNote.trim()) {
    lines.push('')
    lines.push(`💌 *Dedicatoria / Nota especial:*`)
    lines.push(`"${generalNote.trim()}"`)
  }

  lines.push('')
  lines.push('✨ *¡Quedo atento a la confirmación de mi pedido!*')

  const encodedText = encodeURIComponent(lines.join('\n'))
  return `https://wa.me/${cleanPhone}?text=${encodedText}`
}
