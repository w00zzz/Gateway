//aqui se editan los dispositivos 

"use client"
import { useState } from "react"
import Link from "next/link";

export default function AddDevices({params}) {
    const {id, ids} = params;//sacamos la id de las puertas de enlace {id}, y las de los dispocitivos {ids}
    const [vendor, setVendor] =  useState("");//se decalran las variables para sacar del form con el useState de react
    const [connected, setConnected] = useState(false);

    function handleSubmit(e) {//recogemos el valor de las variales en el evento onSubmit
        e.preventDefault();
        const data = {
            vendor,
            connected
        }
        fetch(`http://localhost:3001/api/gateways/${id}/device/${ids}`, {
            method: 'PUT',
            cache: 'no-store',
            headers: {
                'Content-Type':'application/json'
            },
            body: JSON.stringify({//se pasa la informacion en el cuerpo de la peticion 
                "vendor": String(data.vendor),
                "connected":Boolean(data.connected)
            })
        })
    }

    async function regresar(){//la funcion para regresar luego de haber hecho fetch a al servidor 
        await new Promise(resolve => setTimeout(resolve, 1000))
        location.href=`/${id}`;
    }
    


    return (//se recogen los datos en el form y se le pasan ala funcion handleSubmit un el evento onSubmit
    <div id="addEmployeeModal" class="Active">
        <div class="modal-dialog">
            <div class="modal-content">
                <form onSubmit={handleSubmit}>
                    <div class="modal-header">
                        <h4 class="modal-title">Editar Dispocitivos</h4>
                        <Link href={`/${id}`}  type="button" class="close" data-dismiss="modal" aria-hidden="true" >
                            &times;
                        </Link>
                       
                    </div>
                    <div class="modal-body">
                        <div class="form-group">
                            <label>Proveedor</label>
                            <input type="text" value={vendor} id="vendor" name="vendor" class="form-control" onChange={(e) => setVendor(e.target.value)}required></input>
                        </div>
                        <div class="form-check form-switch">
                            <input type="checkbox" class="form-check-input" checked={connected} onChange={(e) => setConnected(e.target.value)}></input>
                            <label class="form-check-label" for="flexSwitchCheckDefault" >Conectado</label>
                        </div>
                    </div>
                    <div class="modal-footer">
                        
                        <button type="submit" class="btn btn-success" onClick={regresar} >Agregar</button>
                        
                        
                    </div>
                </form>
            </div>
        </div>
    </div>
    )
}