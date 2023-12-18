import * as PlanosServices from "../services/PlanosService"
import { useEffect, useState } from "react";
import { Plano } from "../objects/Planos";

const PricingPage = () => {
  const [planos, setPlanos] = useState<Plano[]>([]);

  useEffect(() => {
    PlanosServices.fetchPlanos().then((data) => {
      setPlanos(data);
    })
  }, []);

  if (planos.length == 0) return;
  console.log(planos)
  return (
    <>
    <h2 className="text-center mb-4 top-text">Nossos Planos</h2>
    <div className="container mt-5">
      <div className="row justify-content-center">
        {planos.map((plano: Plano, index) => (
          <div key={index} className="col-md-3 mb-3">
            <div className="card d-flex flex-column h-100 ">
              <div className="card-body flex-grow-1" style={{ minHeight: '250px', maxHeight: "500px" }}>
                <h5 className="card-title" style={{marginBottom: '4vh'}}>{plano.titulo}</h5>
                <p className="card-text" style={{marginBottom: '5vh'}}>{plano.descricao}</p>
                <h6 className="card-subtitle mb-2 text-muted">R${plano.preco}</h6>
                <a href="#" className="btn btn-primary">
                  Contratar
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
    </>
  );
};

export default PricingPage;
