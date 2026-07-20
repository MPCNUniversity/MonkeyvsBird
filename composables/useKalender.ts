export function useKalender() {
  const today = new Date()
  const month = ref(today.getMonth())
  const year = ref(today.getFullYear())

  const days = computed(() => {
    const date = new Date(year.value, month.value, 1)
    const result = []

    while (date.getMonth() === month.value) {
      result.push({
        date: new Date(date),
        label: date.getDate(),
      })
      date.setDate(date.getDate() + 1)
    }

    return result
  })

  function prevMonth() {
    if (month.value === 0) {
      month.value = 11
      year.value--
    } else {
      month.value--
    }
  }

  function nextMonth() {
    if (month.value === 11) {
      month.value = 0
      year.value++
    } else {
      month.value++
    }
  }

  return { month, year, days, prevMonth, nextMonth }
}
