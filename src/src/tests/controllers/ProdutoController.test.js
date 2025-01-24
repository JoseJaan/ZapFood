const produtoController = require('../../controllers/ProdutoController');
const produtoService = require('../../services/Produto');

jest.mock('../../services/Produto'); // Mocka o serviço

describe('Produto Controller - excluirProduto', () => {
  const mockRequest = (id, lojaId) => ({
    params: { id },
    user: { id: lojaId },
  });

  const mockResponse = () => {
    const res = {};
    res.status = jest.fn().mockReturnValue(res);
    res.send = jest.fn().mockReturnValue(res);
    return res;
  };

  it('deve excluir o produto com sucesso e retornar status 200', async () => {
    const req = mockRequest('123', '1'); // Simula ID do produto e ID da loja
    const res = mockResponse();

    produtoService.excluirProduto.mockResolvedValue(true);

    await produtoController.excluirProduto(req, res);

    expect(produtoService.excluirProduto).toHaveBeenCalledWith('123', '1');
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.send).toHaveBeenCalledWith('Produto excluido com sucesso');
  });

  it('deve retornar status 403 quando o produto não for encontrado ou acesso for negado', async () => {
    const req = mockRequest('123', '1'); // Simula ID do produto e ID da loja
    const res = mockResponse();

    produtoService.excluirProduto.mockResolvedValue(false);

    await produtoController.excluirProduto(req, res);

    expect(produtoService.excluirProduto).toHaveBeenCalledWith('123', '1');
    expect(res.status).toHaveBeenCalledWith(403);
    expect(res.send).toHaveBeenCalledWith('Acesso negado ou produto não encontrado.');
  });

  it('deve retornar status 400 quando ocorrer um erro durante a exclusão', async () => {
    const req = mockRequest('123', '1'); // Simula ID do produto e ID da loja
    const res = mockResponse();

    produtoService.excluirProduto.mockRejectedValue(new Error('Erro ao excluir produto'));

    await produtoController.excluirProduto(req, res);

    expect(produtoService.excluirProduto).toHaveBeenCalledWith('123', '1');
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.send).toHaveBeenCalledWith('Erro ao excluir produto');
  });
});
