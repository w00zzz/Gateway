"use client"
import { useState } from "react"
import Link from "next/link";
import { resolve } from "path";
//Aqui se agregaran los usuarios 
export default function AddGateway() {
    const [numeroSerie, setNumeroSerie] =  useState("");//declaramos las variables para sacalrlas del form 
    const [nombre, setNombre] = useState("");
    const [direccionIp, setDireccionIp] = useState("");
    const [validar, setValidar] = useState(false);

    function handleSubmit(e) {//atraves del evento submit recojemos los valores de las variables y se los pasamos al fetch para enbiarlos a la base de datos 
        e.preventDefault();
        const data = {
            numeroSerie,
            nombre,
            direccionIp,
            validar
        }
        fetch('http://localhost:3001/api/gateways', {
            method: 'POST',
            cache: 'no-store',
            headers: {
                'Content-Type':'application/json'
            },
            body: JSON.stringify({//en el cuerpo de la peticion enviamos lso datos al servidor 
                "serial_number": String(data.numeroSerie),
                "name": String(data.nombre),
                "ipv4_address":String(data.direccionIp),
                "address_validation":Boolean(data.validar)
            })
        })
    }

    async function regresar(){//la funcion para regresar luego de haber hecho fetch a al servidor 
        await new Promise(resolve => setTimeout(resolve, 1000))
        location.href='/';
    }


    return (//el cuerpo de del html con el form q va a recoger los datos 
    <div id="addEmployeeModal" class="Active">
        <div class="modal-dialog">
            <div class="modal-content">
                <form onSubmit={handleSubmit}>
                    <div class="modal-header">
                        <h4 class="modal-title">Agregar puerta de enlace</h4>
                        <Link href={`/`}  type="button" class="close" data-dismiss="modal" aria-hidden="true" >
                            &times;
                        </Link>
                       
                    </div>
                    <div class="modal-body">
                        <div class="form-group">
                            <label>Numero de serie</label>
                            <input type="text" value={numeroSerie} class="form-control" onChange={(e) => setNumeroSerie(e.target.value)}required></input>
                        </div>
                        <div class="form-group">
                            <label>Nombre</label>
                            <input type="text" value={nombre} class="form-control" onChange={(e) => setNombre(e.target.value)} required></input>
                        </div>
                        <div class="form-group">
                            <label>Direccion Ip</label>
                            <input type="text" class="form-control" value={direccionIp} onChange={(e) => setDireccionIp(e.target.value)} required></input>
                        </div>
                        <div class="form-check form-switch">
                            <input type="checkbox" class="form-check-input" checked={validar} onChange={(e) => setValidar(e.target.value)}></input>
                            <label class="form-check-label" for="flexSwitchCheckDefault" >Validar</label>
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