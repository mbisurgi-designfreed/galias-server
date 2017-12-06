process.env.NODE_ENV = 'test';

const mongoose = require('mongoose');
const chai = require('chai');
const http = require('chai-http');
const server = require('../../index');

const should = chai.should();
const Cliente = mongoose.model('cliente');

chai.use(http);

describe('Clientes', () => {
    beforeEach((done) => {
        Cliente.remove({}, (err) => {
            done();
        });
    });

    describe('/GET clientes', () => {
        it('it should get all clientes', (done) => {
                new Cliente({
                    razonSocial: 'Maximiliano Bisurgi',
                    direccion: {
                        calle: 'Independencia',
                        altura: '185',
                        localidad: 'Monte Grande',
                        codigoPostal: '1842'
                    },
                    diaVisita: 'lunes',
                    diaEntrega: 'miercoles'
                }).save((err, cliente) => {
                    chai.request(server)
                        .get(`/api/cliente/${cliente.id}`)
                        .send(cliente)
                        .end((err, res) => {
                            res.body.should.have.property('razonSocial').eql(cliente.razonSocial);
                            done();
                        });
                });
        });
    });
});