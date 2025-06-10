export function formatDate(date) {
  if (!date) return ''

  const d = new Date(date)
  const day = String(d.getDate()).padStart(2, '0')
  const month = String(d.getMonth() + 1).padStart(2, '0') // 0-based
  const year = d.getFullYear()

  return `${day}.${month}.${year}`
}

export default formatDate
