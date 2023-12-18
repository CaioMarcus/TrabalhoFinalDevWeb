import { Link } from 'react-router-dom';
import useCarrinho from '../hooks/useCarrinho';

const CarrinhoPage = () => {
  const carrinho = useCarrinho();

  const isCartEmpty = carrinho.itens.length === 0;

  return (
    <div className="container mt-5">
      <h2 className="mb-4 top-text">Seu Carrinho</h2>
      {isCartEmpty ? (
        <p>Seu carrinho está vazio.</p>
      ) : (
        <>
          <table className="table">
            <thead>
              <tr>
                <th>ID</th>
                {/* Add other headers based on your ItemCarrinho structure */}
              </tr>
            </thead>
            <tbody>
              {carrinho.itens.map((item) => (
                <tr key={item.id}>
                  <td>{item.nome}</td>
                  <td>{item.quantidade}</td>
                  <td>{item.valor}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="mt-3">
            <p>Valor Total: R$ {carrinho.valorTotal.toFixed(2)}</p>
            <Link to="/checkout" className={`btn btn-primary ${isCartEmpty ? 'disabled' : ''}`}>
              Ir para o Checkout
            </Link>
          </div>
        </>
      )}
    </div>
  );
};

export default CarrinhoPage;