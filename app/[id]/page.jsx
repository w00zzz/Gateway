import Link from "next/link";
//aqui se mostraran los dispocitivos de la puerta de enlace pasada por la url
const fetchtDevices = (id ) => {//se hace el fetch para obtener el los dipositivos de la puerta de enlace
    return fetch(`http://localhost:3001/api/gateways/${id}`, {cache:'no-store'})
    .then(res => res.json());
}


function Valudar(bool){//para mostrar si esta en linea o no 
    if (bool) {
      return "En linea"
    }else{
      return "Fuera de linea"
    }
}


export default async function Id({params}){
    const {id} = params//recogemos la id del puerto de enlace pasada por la url

    const devices = await fetchtDevices(id);//llammos a la funcion fetch pasandole id por parametros


    return (//cuerpo del html con la funcion map para recorer el objeto devuelto por la funcion fetch
        <div class="main-content">
            <div class="row">
                <div class="col-md-12">
                    <Link href={`/`}  type="button" class="close" data-dismiss="modal" aria-hidden="true" >
                        &times;
                    </Link>
                    <br></br>
                    <div class="table-wrapper">
                        <div class="table-title">
                            <div class="row">
                                <div class="col-sm-6 p-0 d-flex justify-content-lg-start justify-content-center">
                                <h2 class="ml-lg-2">Dispocitivos de la puerta de enlace de:      {devices.name}</h2>
                                </div>
                                
                                <div class="col-sm-6 p-0 d-flex justify-content-lg-end justify-content-center">
                                <Link href={`/${id}/AddDevices`} class="btn btn-success" data-toggle="modal" >
                                    <span>Agregar dispocitivos a esta puerta de enlace</span>
                                </Link>
                                
                                </div>
                            </div>
                        </div>
                        <br></br>
                        <Link href={`/${id}/EditGateway`} class="btn btn-success" data-toggle="modal" >
                            <span>Editar puerta de enlace</span>
                        </Link>
                        <br></br>
                        <br></br>
                        <table class="table table-striped table-hover">
                            <thead>
                                <tr>
                                <th>
                                    Uid
                                </th>
                                <th>Proveedor</th>
                                <th>Fecha</th>
                                <th>Estado</th>
                                <th></th>
                                <th></th>
                                <th>Acciones</th>
                                <th>Acciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                {devices.associated_devices.map(device => (
                                <tr>
                                    <td>
                                    {device.uid}
                                    </td>
                                    <td>{device.vendor}</td>
                                    <td>{device.date}</td>
                                    <td>{Valudar(device.connected)}</td>
                                    <td></td>
                                    <td></td>
                                    <td>
                                        <Link href={`/${id}/Devices/${device.uid}`}  class="btn btn-success" data-toggle="modal" >
                                            <span>Editar</span>
                                        </Link>
                                        
                                    </td>
                                    <td>
                                        <Link href={`/${id}/DeleteDevice/${device.uid}`}  class="btn btn-danger" data-toggle="modal" >
                                            <span>Eliminar</span>
                                        </Link>
                                    </td>
                                    <td></td>
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