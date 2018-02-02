const clientes = [{
    codigo: 1001,
    razonSocial: 'Maximiliano Bisurgi',
    cuit: '20-33899255-7',
    nombreComercial: 'Maximiliano Bisurgi',
    direccion: {
        calle: 'Independencia',
        altura: '185',
        localidad: 'Monte Grande',
        codigoPostal: '1842',
        geometry: {
            type: 'Point',
            coordinates: [-34.85246, 55.21641]
        }
    },
    telefonos: [{
        tipo: 'Fijo',
        numero: '42959090'
    }],
    clasificacion: 'a',
    condicionPago: 15,
    diaVisita: 'lunes',
    diaEntrega: 'miercoles',
    personasInteres: [{
        tipo: 'Maestro panadero',
        nombre: 'Maximiliano Bisurgi',
        dni: '33899255',
        direccion: {
            calle: 'Independencia',
            altura: '185',
            localidad: 'Monte Grande',
            codigoPostal: '1842',
            geometry: {
                type: 'Point',
                coordinates: [-34.85246, 55.21641]
            }
        }
    }],
    sincronizado: false
}, {
    codigo: 1002,
    razonSocial: 'Matias Bisurgi',
    cuit: '20-16745109-7',
    nombreComercial: 'Panaderia en Familia',
    direccion: {
        calle: 'Ruta 52 km 3,5',
        altura: '249',
        localidad: 'Canning',
        codigoPostal: '1804',
        geometry: {
            type: 'Point',
            coordinates: [-34.85246, 55.21641]
        }
    },
    telefonos: [{
        tipo: 'Fijo',
        numero: '42959090'
    }],
    clasificacion: 'b',
    condicionPago: 15,
    diaVisita: 'martes',
    diaEntrega: 'jueves',
    personasInteres: [{
        tipo: 'Maestro panadero',
        nombre: 'Maximiliano Bisurgi',
        dni: '33899255',
        direccion: {
            calle: 'Independencia',
            altura: '185',
            localidad: 'Monte Grande',
            codigoPostal: '1842',
            geometry: {
                type: 'Point',
                coordinates: [-34.85246, 55.21641]
            }
        }
    }],
    sincronizado: false
}, {
    codigo: 1003,
    razonSocial: 'Maximiliano Bisurgi',
    cuit: '20-33899255-7',
    nombreComercial: 'Maximiliano Bisurgi',
    direccion: {
        calle: 'Independencia',
        altura: '185',
        localidad: 'Monte Grande',
        codigoPostal: '1842',
        geometry: {
            type: 'Point',
            coordinates: [-34.85246, 55.21641]
        }
    },
    telefonos: [{
        tipo: 'Fijo',
        numero: '42959090'
    }],
    clasificacion: 'a',
    condicionPago: 15,
    diaVisita: 'lunes',
    diaEntrega: 'miercoles',
    personasInteres: [{
        tipo: 'Maestro panadero',
        nombre: 'Maximiliano Bisurgi',
        dni: '33899255',
        direccion: {
            calle: 'Independencia',
            altura: '185',
            localidad: 'Monte Grande',
            codigoPostal: '1842',
            geometry: {
                type: 'Point',
                coordinates: [-34.85246, 55.21641]
            }
        }
    }],
    sincronizado: false
}, {
    codigo: 1004,
    razonSocial: 'Maximiliano Bisurgi',
    cuit: '20-33899255-7',
    nombreComercial: 'Maximiliano Bisurgi',
    direccion: {
        calle: 'Independencia',
        altura: '185',
        localidad: 'Monte Grande',
        codigoPostal: '1842',
        geometry: {
            type: 'Point',
            coordinates: [-34.85246, 55.21641]
        }
    },
    telefonos: [{
        tipo: 'Fijo',
        numero: '42959090'
    }],
    clasificacion: 'a',
    condicionPago: 15,
    diaVisita: 'lunes',
    diaEntrega: 'miercoles',
    personasInteres: [{
        tipo: 'Maestro panadero',
        nombre: 'Maximiliano Bisurgi',
        dni: '33899255',
        direccion: {
            calle: 'Independencia',
            altura: '185',
            localidad: 'Monte Grande',
            codigoPostal: '1842',
            geometry: {
                type: 'Point',
                coordinates: [-34.85246, 55.21641]
            }
        }
    }],
    sincronizado: false
}];

const cliente = {
    razonSocial: 'Juan Perez',
    cuit: '20-33899255-7',
    nombreComercial: 'Maximiliano Bisurgi',
    direccion: {
        calle: 'Independencia',
        altura: '185',
        localidad: 'Monte Grande',
        codigoPostal: '1842',
        geometry: {
            type: 'Point',
            coordinates: [-34.85246, 55.21641]
        }
    },
    telefonos: [{
        tipo: 'Fijo',
        numero: '42959090'
    }],
    clasificacion: 'a',
    condicionPago: 15,
    diaVisita: 'lunes',
    diaEntrega: 'miercoles',
    personasInteres: [{
        tipo: 'Maestro panadero',
        nombre: 'Maximiliano Bisurgi',
        dni: '33899255',
        direccion: {
            calle: 'Independencia',
            altura: '185',
            localidad: 'Monte Grande',
            codigoPostal: '1842',
            geometry: {
                type: 'Point',
                coordinates: [-34.85246, 55.21641]
            }
        }
    }],
    sincronizado: false
}

const clienteDefault = {
    razonSocial: 'Carlos Gonzalez',
    direccion: {
        calle: 'Independencia',
        altura: '185',
        localidad: 'Monte Grande',
        codigoPostal: '1842'
    },
    condicionPago: 15,
    diaVisita: 'lunes',
    diaEntrega: 'miercoles'
}

module.exports = {
    clientes,
    cliente,
    clienteDefault
};