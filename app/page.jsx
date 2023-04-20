"use client"
import Link from "next/link";

const fetchtGateys = () => {//Se hace el fetch al servidor
  return fetch('http://localhost:3001/api/gateways', {cache:'no-store'})//esto de cahe se usa para q no la almacene y los datos sean actualizados
  .then(res => res.json());
}

function Valudar(bool){//para poner si esta validado o no
  if (bool) {
    return "Validado"
  }else{
    return "NO Validado"
  }
}

export default async function Home() {
  const gateways = await fetchtGateys();
  //Esro ya es la estuctira de la pagina en html
  return (
    <div className="main-content">
      <div className="row">
        <div className="col-md-12">
          <div className="table-wrapper">
            <div className="table-title">
              <div className="row">
                <div className="col-sm-6 p-0 d-flex justify-content-lg-start justify-content-center">
                  <h2 className="ml-lg-2">Puertas de enlace</h2>
                </div>
                <div className="col-sm-6 p-0 d-flex justify-content-lg-end justify-content-center">
                  <Link href={`/AddGateway`} className="btn btn-success" data-toggle="modal" >
                    <span>Agregar puerta de enlace</span>
                  </Link>
                </div>
              </div>
            </div>
            <table className="table table-striped table-hover">
              <thead>
                <tr>
                  <th>
                    Id De Serie
                  </th>
                  <th>Nombre</th>
                  <th>Address</th>
                  <th>Validados</th>
                  <th>Dispocitivos</th>
                  <th></th>
                  
                </tr>
              </thead>
              <tbody>
                {gateways.map(gateway => (//se le hace un recorrido para mostar todas las puertas de enlace y en las etiquetas link q esatn porahidebajo
                //en el href se le pasa la ruta con la id para lugo obtenerlda desde url 
                  <tr>
                    <td>
                      {gateway.serial_number}
                    </td>
                    <td>{gateway.name}</td>
                    <td>{gateway.ipv4_address}</td>
                    
                    <td>{Valudar(gateway.address_validation)}</td>
                    <td>
                      {Object.keys(gateway.associated_devices).length}
                    </td>
                    <td>
                      <Link href={`/${gateway.serial_number}`}  className="btn btn-success" data-toggle="modal" >
                        <span>Detalles</span>
                      </Link>
                    </td>
                    <td>
                      <Link href={`/delete/${gateway.serial_number}`}  className="btn btn-danger" data-toggle="modal" >
                        <span>Eliminar</span>
                      </Link>
                    </td>
                  </tr>
                ))}
                  
              </tbody>
            </table>
          </div>    
        </div>
      </div>
    </div>
  )
}
