export const ESTADO_PELIS = {
    ACTIVE: 'active',
    COMPLETED: 'completed'
} as const

export const ESTADO_BTNS = {
    [ESTADO_PELIS.ACTIVE]: {
        estado: 'Activas',
        href: `/?filtros=${ESTADO_PELIS.ACTIVE}`
    },
    [ESTADO_PELIS.COMPLETED]: {
        estado: 'Completadas',
        href: `/?filtros=${ESTADO_PELIS.COMPLETED}`
    }
} as const