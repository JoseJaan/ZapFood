const enderecoController = require('../../controllers/EnderecoController');
const enderecoService = require('../../services/Endereco');

jest.mock('../../services/Endereco'); // Mocka o service

describe('Endereco Controller - listarEnderecos', () => {
  const mockRequest = (userId, error = null) => ({
    user: { id: userId },
    query: { error },
  });

  const mockResponse = () => {
    const res = {};
    res.render = jest.fn();
    res.status = jest.fn().mockReturnValue(res);
    res.send = jest.fn().mockReturnValue(res);
    return res;
  };

  it('deve renderizar a página de endereços com os dados corretos', async () => {
    const req = mockRequest(1); // Simula um usuário com ID 1
    const res = mockResponse();

    const mockClienteData = { id: 1, nome: 'Cliente Teste' };
    const mockEnderecos = [
      { id: 1, rua: 'Rua A', cidade: 'Cidade A' },
      { id: 2, rua: 'Rua B', cidade: 'Cidade B' },
    ];

    enderecoService.obterUsuario.mockResolvedValue(mockClienteData);
    enderecoService.listarEnderecos.mockResolvedValue(mockEnderecos);

    await enderecoController.listarEnderecos(req, res);

    expect(enderecoService.obterUsuario).toHaveBeenCalledWith(1);
    expect(enderecoService.listarEnderecos).toHaveBeenCalledWith(1);
    expect(res.render).toHaveBeenCalledWith('endereco', {
      enderecos: mockEnderecos,
      cliente: mockClienteData,
      error: null,
    });
  });

  it('deve lidar com erros ao listar endereços e retornar status 500', async () => {
    const req = mockRequest(1); // Simula um usuário com ID 1
    const res = mockResponse();

    enderecoService.obterUsuario.mockResolvedValue({ id: 1, nome: 'Cliente Teste' });
    enderecoService.listarEnderecos.mockRejectedValue(new Error('Erro ao listar endereços'));

    await enderecoController.listarEnderecos(req, res);

    expect(enderecoService.obterUsuario).toHaveBeenCalledWith(1);
    expect(enderecoService.listarEnderecos).toHaveBeenCalledWith(1);
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.send).toHaveBeenCalledWith('Erro ao listar enderecos.');
  });

  it('deve passar a mensagem de erro para a página ao renderizar', async () => {
    const req = mockRequest(1, 'Mensagem de erro'); // Inclui o query error
    const res = mockResponse();

    const mockClienteData = { id: 1, nome: 'Cliente Teste' };
    const mockEnderecos = [
      { id: 1, rua: 'Rua A', cidade: 'Cidade A' },
      { id: 2, rua: 'Rua B', cidade: 'Cidade B' },
    ];

    enderecoService.obterUsuario.mockResolvedValue(mockClienteData);
    enderecoService.listarEnderecos.mockResolvedValue(mockEnderecos);

    await enderecoController.listarEnderecos(req, res);

    expect(enderecoService.obterUsuario).toHaveBeenCalledWith(1);
    expect(enderecoService.listarEnderecos).toHaveBeenCalledWith(1);
    expect(res.render).toHaveBeenCalledWith('endereco', {
      enderecos: mockEnderecos,
      cliente: mockClienteData,
      error: 'Mensagem de erro',
    });
  });
});
