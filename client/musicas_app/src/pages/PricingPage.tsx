import React from 'react';

const PricingPage = () => {
  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Nossos Planos</h2>
      <div className="row">
        {/* Card 1 */}
        <div className="col-md-4 mb-4">
          <div className="card d-flex flex-column h-100">
            <div className="card-body flex-grow-1" style={{ minHeight: '300px' }}>
              <h5 className="card-title">Plano Básico</h5>
              <p className="card-text">Descrição do Plano Básico.</p>
              <h6 className="card-subtitle mb-2 text-muted">R$19.99/mês</h6>
              <a href="#" className="btn btn-primary">
                Contratar
              </a>
            </div>
          </div>
        </div>

        {/* Card 2 */}
        <div className="col-md-4 mb-4">
          <div className="card d-flex flex-column h-100">
            <div className="card-body flex-grow-1" style={{ minHeight: '300px' }}>
              <h5 className="card-title">Plano Padrão</h5>
              <p className="card-text">Descrição do Plano Padrão.</p>
              <h6 className="card-subtitle mb-2 text-muted">R$29.99/mês</h6>
              <a href="#" className="btn btn-primary">
                Contratar
              </a>
            </div>
          </div>
        </div>

        {/* Card 3 */}
        <div className="col-md-4 mb-4">
          <div className="card d-flex flex-column h-100">
            <div className="card-body flex-grow-1" style={{ minHeight: '300px' }}>
              <h5 className="card-title">Plano Premium</h5>
              <p className="card-text">Descrição do Plano Premium.</p>
              <h6 className="card-subtitle mb-2 text-muted">R$49.99/mês</h6>
              <a href="#" className="btn btn-primary">
                Contratar
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PricingPage;
