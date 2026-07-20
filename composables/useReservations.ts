// Reservatie interface
interface Reservation {
  id: string
  dateStart: Date
  dateEnd: Date
  resource: string
  location: string
  vehicle: string
  createdAt: Date
}

// Mock data
const resources = [
  { id: '1', name: '📚 Projectormaterial', icon: '📚' },
  { id: '2', name: '🎤 Microfoon Setup', icon: '🎤' },
  { id: '3', name: '💻 Laptopstation', icon: '💻' },
  { id: '4', name: '📊 Whiteboard Suite', icon: '📊' },
  { id: '5', name: '🎬 Camera Equipment', icon: '🎬' },
]

const locations = [
  { id: '1', name: '🏢 Kantoor Amsterdam', address: 'Kalverstraat 192' },
  { id: '2', name: '🏭 Productie Rotterdam', address: 'Maashaven 1' },
  { id: '3', name: '🎓 Training Centrum Utrecht', address: 'Domplein 11' },
  { id: '4', name: '🏪 Showroom Haarlem', address: 'Gedempte Oude Gracht 1' },
]

const vehicles = [
  { id: '1', name: '🚗 Tesla Model 3', type: 'Auto' },
  { id: '2', name: '🚙 BMW X5', type: 'SUV' },
  { id: '3', name: '🚛 Mercedes Sprinter', type: 'Busje' },
  { id: '4', name: '🚐 VW Transporter', type: 'Busje' },
  { id: '5', name: '🏍️ Vespa Scooter', type: 'Scooter' },
]

// Reactive reservations store
const reservationsStore = reactive<Reservation[]>([])

export const useReservations = () => {
  // Get reservaties voor een datum
  const getReservationsForDate = (date: Date): Reservation[] => {
    const dateString = date.toISOString().split('T')[0]
    return reservationsStore.filter(r => {
      const startString = r.dateStart.toISOString().split('T')[0]
      const endString = r.dateEnd.toISOString().split('T')[0]
      return dateString >= startString && dateString <= endString
    })
  }

  // Check Of dag geboekt is
  const isDateBooked = (date: Date): boolean => {
    return getReservationsForDate(date).length > 0
  }

  // Voeg reservatie toe
  const addReservation = (data: {
    dateStart: Date
    dateEnd: Date
    resource: string
    location: string
    vehicle: string
  }) => {
    const reservation: Reservation = {
      id: Date.now().toString(),
      ...data,
      createdAt: new Date(),
    }
    reservationsStore.push(reservation)
    return reservation
  }

  // Verwijder reservatie
  const deleteReservation = (id: string) => {
    const idx = reservationsStore.findIndex(r => r.id === id)
    if (idx !== -1) {
      reservationsStore.splice(idx, 1)
    }
  }

  // Get alle reservaties
  const getReservations = () => computed(() => reservationsStore)

  return {
    // Data
    resources,
    locations,
    vehicles,
    reservationsStore,

    // Methods
    getReservationsForDate,
    isDateBooked,
    addReservation,
    deleteReservation,
    getReservations,
  }
}
