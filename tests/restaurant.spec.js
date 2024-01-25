const createMenu = require('../src/restaurant');

describe('10 - Implemente a função `createMenu`, bem como seus casos de teste', () => {
  const menu = createMenu({ food: { coxinha: 3.90, sanduiche: 9.90 }, drinks: { agua: 3.90, cerveja: 6.90 } });
  it('Verifica se a função `createMenu` tem o comportamento esperado', () => {
    expect(createMenu({})).toHaveProperty('fetchMenu');
  });

  // 1- Escreva dois testes, um que verifica se a função createMenu() retorna um objeto que possui a chave fetchMenu e outro verificando se o valor da chave fetchMenu do objeto retornado pela função createMenu() é uma função.
  it('Retorna um objeto que possui a chave fetchMenu', () => {
    expect(typeof createMenu({}).fetchMenu).toBe('function');
  });

  // 2 - Escreva um teste que verifica se o objeto retornado pela função createMenu({ food: {}, drinks: {} }).fetchMenu() retorna um objeto cujas chaves são somente food e drinks.
  it('O objeto retornado por createMenu retorna um objeto cujas chaves são somente food e drinks', () => {
    expect(createMenu({}).fetchMenu()).toHaveProperty('food');
    expect(createMenu({}).fetchMenu()).toHaveProperty('drinks');
  });

  // 3 - Escreva um teste que verifica se o menu passado pra função createMenu() é idêntico ao menu recuperado pela função createMenu({ food: {}, drinks: {} }).fetchMenu().
  it('O menu passado para createMenu é idêntico ao menu retornado por fetchMenu()', () => {
    expect(menu.fetchMenu().food).toEqual(menu.fetchMenu().food);
    expect(menu.fetchMenu().drinks).toEqual(menu.fetchMenu().drinks);
  });

  // 5 - Escreva um teste que verifica se a propriedade consumption do objeto retornado pela função createMenu({ food: {}, drinks: {} }), após a criação do menu, retorna um array vazio.

  it('Teste que verifica se a propriedade consumption, retorna um array vazio', () => {
    expect(menu.consumption).toEqual([]);
  });

  // Testa se order adiciona item
  it('Testa se order adiciona item', () => {
    menu.order('coxinha');
    expect(menu.consumption).toEqual(['coxinha']);
  });

  // A chave order testa mensagem "Item indisponível" para item não existente[
  it('A chave order testa mensagem "Item indisponível" para item não existente', () => {
    const menu = createMenu({ food: { coxinha: 3.90, sanduiche: 9.90 }, drinks: { agua: 3.90, cerveja: 6.90 } });
    expect(menu.order('arroz')).toBe('Item indisponível');
    expect(menu.consumption).toEqual([]);
  });

  // 9 - Escreva um teste que verifica se, ao adicionar três pedidos em sequência, dentre bebidas e comidas, o array consumption contém os itens pedidos.
  it('Teste que verifica se, ao adicionar três pedidos em sequência, o array consumption contém os itens pedidos', () => {
    menu.order('coxinha');
    menu.order('sanduiche');
    menu.order('cerveja');
    expect(menu.consumption).toEqual(['coxinha', 'coxinha', 'sanduiche', 'cerveja']);
  });

  // 10 - Escreva um teste que verifica se a função order aceita que pedidos repetidos sejam acrescidos a consumption
  it('Teste que verifica se a função order aceita que pedidos repetidos sejam acrescidos a consumption', () => {
    menu.order('sanduiche');
    menu.order('sanduiche');
    expect(menu.consumption).toEqual(['coxinha', 'coxinha', 'sanduiche', 'cerveja', 'sanduiche', 'sanduiche']);
  });

  // 11 -Escreva um teste que verifica que, ao chamar a função pay() que será uma propriedade do objeto retornado pela função createMenu, deve retornar a soma dos preços de tudo que foi pedido, conforme registrado em consumption. A propriedade pay tem como valor uma função.
  it('Teste deve retornar a soma dos preços de tudo que foi pedido', () => {
    expect(menu.pay()).toBeCloseTo(48.84, 2); // 15 + 10% = 16.5
  });
});
