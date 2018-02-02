const mongoose = require('mongoose');
const request = require('supertest');
const expect = require('expect');

const server = require('../../index');
const Cliente = mongoose.model('cliente');

;
const cliente = require('../fixtures/clientes').cliente;
const clienteDefault = require('../fixtures/clientes').clienteDefault;

let clientes = [];

beforeEach((done) => {
    Cliente.remove({}, (err) => {
        if (err) {
            done(err);
        }

        Cliente.insertMany(require('../fixtures/clientes').clientes)
            .then((docs) => {
                clientes = docs;
                done();
            })
            .catch((err) => {
                done(err);
            });
    });
});

describe('Clientes Controller', () => {
    describe('GET /api/cliente/codigo/:codigo', () => {
        it('should get a cliente by codigo', async () => {
            const res = await request(server).get(`/api/cliente/codigo/${clientes[0].codigo}`);

            expect(res.status).toBe(200);
            expect(res.body.codigo).toBe(clientes[0].codigo);
        });
    });

    describe('GET /api/cliente/list', () => {
        it('should get all clientes with pagination', async () => {
            const page = 1;

            const res = await request(server).get(`/api/cliente/list?page=${page}`);
            
            expect(res.status).toBe(200);
            expect(res.body.clientes.length).toBe(4);
            expect(res.body.pages).toBe(1);
        });
    });

    describe('POST /api/cliente/new', () => {
        it('should add a new cliente with given values', async () => {
            const res = await request(server).post('/api/cliente/new').send(cliente);

            expect(res.status).toBe(201);
            expect(res.body._id).toBeA('string');
            expect(res.body).toInclude({ razonSocial: cliente.razonSocial, direccion: cliente.direccion });
        });

        it('should add a new cliente with default values', async () => {
            const res = await request(server).post('/api/cliente/new').send(clienteDefault);
            
            expect(res.status).toBe(201);
            expect(res.body._id).toBeA('string');
            expect(res.body).toInclude({ razonSocial: clienteDefault.razonSocial, clasificacion: 'c', sincronizado: false });
            expect(res.body.telefonos).toEqual([]);
            expect(res.body.sucursales).toEqual([]);
            expect(res.body.personasInteres).toEqual([]);
        });

        it('should generate a new codigo adding + 1', async () => {
            const res = await request(server).post('/api/cliente/new').send(cliente);

            expect(res.status).toBe(201);
            expect(res.body.codigo).toBe(1005);
        });
    });
});