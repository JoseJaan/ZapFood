const lojaController = require('../../controllers/LojaController');
const lojaService = require('../../services/Loja');

jest.mock('../../services/Loja'); // Mocka o service

describe('Loja Controller - obterLoja', () => {
  const mockRequest = (id) => ({
    user: { id },
  });

  const mockResponse = () => {
    const res = {};
    res.status = jest.fn().mockReturnValue(res);
    res.send = jest.fn().mockReturnValue(res);
    return res;
  };

  it('deve retornar os dados da loja quando o ID é válido', async () => {
    const req = mockRequest(1);
    const res = mockResponse();
    const mockLojaData = { id: 1, nome: 'Minha Loja' };

    lojaService.obterLoja.mockResolvedValue(mockLojaData);

    await lojaController.obterLoja(req, res);

    expect(lojaService.obterLoja).toHaveBeenCalledWith(1);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.send).toHaveBeenCalledWith(mockLojaData);
  });

  it('deve retornar erro 400 quando ocorrer uma exceção', async () => {
    const req = mockRequest(1);
    const res = mockResponse();

    lojaService.obterLoja.mockRejectedValue(new Error('Erro ao obter loja'));

    await lojaController.obterLoja(req, res);

    expect(lojaService.obterLoja).toHaveBeenCalledWith(1);
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.send).toHaveBeenCalledWith('Erro ao obter loja');
  });
});
