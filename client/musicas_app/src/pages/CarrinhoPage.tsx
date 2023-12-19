import { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import useCarrinho from '../hooks/useCarrinho';
import { useAuthStore } from '../hooks/useAuthStore';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons/faArrowRight';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons/faArrowLeft';

const CarrinhoPage = () => {
  const carrinho = useCarrinho();
  const authStore = useAuthStore();
  const navigate = useNavigate();

  useEffect(() => {
    if (!authStore.isAuthenticated) {
      navigate("/login")
    }
  }, [])

  useEffect(() => {
    console.log(carrinho)
  }, [carrinho])

  console.log(carrinho)
  const isCartEmpty = carrinho.produtos.length === 0;
  return (
    <div className="container mt-5">
      <h2 className="mb-4 top-text">Seu Carrinho</h2>
      {isCartEmpty ? (
        <p>Seu carrinho está vazio.</p>
      ) : (
        <>
          <div className='container-fluid'>
            <table className="table table-striped table-bordered">
              <thead>
                <tr className='d-flex'>
                  <th className='col-1'>#</th>
                  <th className='col-7'>Nome</th>
                  <th className='col-2 text-center'>Quantia</th>
                  <th className='col-1 text-center'>Valor</th>
                  <th className='col-1'></th>
                </tr>
              </thead>
              <tbody>
                {carrinho.produtos.map((item, index) => (
                  <tr key={item.id} className='d-flex'>
                    <td className='col-1'>{index}</td>
                    <td className='col-7'>{item.produto.nome}</td>
                    <td className='col-2 text-center'>
                      <button
                        className={`btn ${item.quantidade <= 1 ? 'invisible' : ''}`}
                        onClick={() => carrinho.subtraiDoCarrinho(item.produto.id)}
                      >
                        <FontAwesomeIcon icon={faArrowLeft} />
                      </button>
                      {item.quantidade}
                      <button className="btn" onClick={() => carrinho.adicionaNoCarrinho(item.produto.id)}>
                        <FontAwesomeIcon icon={faArrowRight} />
                      </button>
                    </td>
                    <td className='col-1 text-center'>
                      {item.valor.toLocaleString("pt-BR", {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                        useGrouping: true,
                      })}
                    </td>
                    <td className='col-1 text-center'>
                      <button className="btn btn-danger" onClick={() => carrinho.removeDoCarrinho(item.produto.id)}>
                        <FontAwesomeIcon icon={faTrash} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr className='d-flex'>
                  <th className='col-1'></th>
                  <th className='col-7'></th>
                  <th className='col-2 text-center'>Total:</th>
                  <th className='col-1 text-center'>
                    {carrinho.total.toLocaleString("pt-BR", {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                      useGrouping: true,
                    })}
                  </th>
                  <th className='col-1'></th>
                </tr>
              </tfoot>
            </table>
          </div>
          <div className="mt-3">
            <Link to="/checkout" className={`btn btn-success ${isCartEmpty ? 'disabled' : ''}`}>
              Ir para o Checkout
            </Link>
          </div>
        </>
      )}
    </div>
  );
};

export default CarrinhoPage;