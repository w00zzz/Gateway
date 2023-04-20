///agregar discpocitios a un apuerta de enlace


"use client"
import { useState } from "react"
import Link from "next/link";

export default function AddDevices({params}) {
    const {id} = params;//recogemos el valor de la id pasado por la url
    const [vendor, setVendor] =  useState("");//variavles para recoger los datos del los form con el useState de react
    const [connected, setConnected] = useState(false);

    function handleSubmit(e) {//funcion q va a escuchar por si sicede un evento submit en el form
        e.preventDefault();
        const data = {//pasamos los valores de las variables a un objeto para enviarlo luego en el fetch
            vendor,
            connected
        }
        fetch(`http://localhost:3001/api/gateways/${id}/device`, {//fetch para enviar los datos 
            method: 'POST',//se decalra el metodo con el a se va a hacer el fetch
            cache: 'no-store',//le decimos q no guarde esto en la cache
            headers: {
                'Content-Type':'application/json'
            },
            body: JSON.stringify({//el cuerpo de la peticion q sera envaindo en el fetch
                "vendor": String(data.vendor),
                "connected":Boolean(data.connected)
            })
        })
    }

    async function regresar(){//la funcion para regresar luego de haber hecho fetch a al servidor 
        await new Promise(resolve => setTimeout(resolve, 1000))
        location.href=`/${id}`;
    }


    return (//formulario para recoger los datos del dispocitivo son solo dos datos porque ya los otro el los asigan automatico
    <div id="addEmployeeModal" class="Active">
        <div class="modal-dialog">
            <div class="modal-content">
                <form onSubmit={handleSubmit}>
                    <div class="modal-header">
                        <h4 class="modal-title">Agregar Dispocitivos</h4>
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