import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../src/app.js'; // must use .js when using ESM

chai.use(chaiHttp);
const expect = chai.expect;

describe('Todo API', () => {
  it('should fetch all todos', async () => {
    const res = await chai.request(app).get('/api/todos');
    expect(res).to.have.status(200);
  });
});

