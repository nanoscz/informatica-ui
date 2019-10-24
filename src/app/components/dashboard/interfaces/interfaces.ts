export interface Solicituds {
  solicituds: Array<Solicitud>,
  count: number
}

export interface Solicitud {
  cite: string,
  estado: number,
  referencia: string,
  remitente: Remitente,
  ruta: number
  user: User
}

export interface Remitente {
  cargo: string,
  id?: number,
  nombre: string,
  servicio: string
}

export interface User {
  credentialsExpired: boolean,
  credentialsExpiredAt?: Date
  email: string,
  enabled: Boolean,
  expired: Boolean,
  expiresAt: Date,
  id?: number,
  lastLogin: Date
  locked: false
  password?: string
  roles: string
  username: string
}