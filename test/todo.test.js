import chaiModule from 'chai';
import chaiHttpModule from 'chai-http';
import { expect } from 'chai';
import app from '../src/app.js';

const chai = chaiModule.default;
const chaiHttp = chaiHttpModule.default;

chai.use(chaiHttp);

describe('Todo API', () => {
  it('should fetch all todos', async () => {
    const res = await chai.request(app).get('/api/todos');
    expect(res).to.have.status(200);
    expect(res.body).to.be.an('array');
  });
});
