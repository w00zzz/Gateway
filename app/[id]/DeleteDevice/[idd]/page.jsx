//eliminar el dispositivo

"use client"
import Link from "next/link";

const fetchtDeleteGateway = (id, idd) => {//el fetch para eliminar el dispocitivo
    return fetch(`http://localhost:3001/api/gateways/${id}/device/${idd}`, {cache:'no-store', method:'DELETE'})
    .then(res => res.json());
  }
export default function Delete({params}){
    
    const {id, idd} = params;//se recoge el valor de la id de la puerta de enlace {id}, y del el dispocitivo a eliminar {idd}
    

    async function eliminar(){//se llama a la funcion para eliminar el dispocitivo a traves del fetch
        fetchtDeleteGateway(id, idd);
        await new Promise(resolve => setTimeout(resolve, 1000))
        location.href=`/${id}`;
        
    }

    function regresar(){
        location.href=`/${id}`;
    }

    return(//esto es como una alerta para q se seap q se elimino con exito
        <div id="deleteEmployeeModal" class="Activate">
            <div class="modal-dialog">
                <div class="modal-content">
                <form>
                    <div class="modal-header">
                    <h4 class="modal-title">Eliminar Dispocitivo</h4>
                    <Link href={`/${id}`}  type="button" class="close" data-dismiss="modal" aria-hidden="true" >
                       &times;
                    </Link>
                    </div>
                    <div class="modal-body">
                    <p>Se eliminara este Dispocitivo</p>
                    <p class="text-warning"><small>No podra regresar esta accion</small></p>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-default" data-dismiss="modal" onClick={regresar}>Canselar</button>
                        <button type="button" class="btn btn-danger" data-dismiss="modal" onClick={eliminar} >Eliminar</button>
                    </div>
                </form>
                </div>
            </div>
        </div>
    )
}