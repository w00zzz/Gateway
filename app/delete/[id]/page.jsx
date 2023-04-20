"use client"//no elimines esos "useClient" porque sino no te va funcionar fien esto
import Link from "next/link";

const fetchtDeleteGateway = (id) => {
    return fetch(`http://localhost:3001/api/gateways/${id}`, {cache:'no-store', method:'DELETE'})
    .then(res => res.json());
  }

export default function Delete({params}){
    
    const {id} = params;//se optiene la id de la url
    

    async function eliminar(){//se hace un llamao a la funcion de fetch pasandole la ip
        fetchtDeleteGateway(id );
        await new Promise(resolve => setTimeout(resolve, 1000))
        location.href=`/`;
        
    }

    function regresar(){//Esto es solo una funcion para regresar al precionar el boton
        location.href=`/`;
    }
    //aqui solo se muestra una notificacion q se ha elinimado la puerta de enlace
    return(
        <div id="deleteEmployeeModal" class="Activate">
            <div class="modal-dialog">
                <div class="modal-content">
                <form>
                    <div class="modal-header">
                    <h4 class="modal-title">Eliminar Puerta De enlace</h4>
                    <Link href={`/`}  type="button" class="close" data-dismiss="modal" aria-hidden="true" >
                        &times;
                    </Link>
                    </div>
                    <div class="modal-body">
                    <p>Se eliminara esta puerta de enlace</p>
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