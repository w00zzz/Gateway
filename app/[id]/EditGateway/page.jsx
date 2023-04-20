//aqui editamos la puerta de enlace 

"use client"
import { useState } from "react"
import Link from "next/link";



export default function EditGateway({params}) {
    const {id} = params;//tomaos el valor de la id pasada en la url
    

    const [numeroSerie, setNumeroSerie] =  useState("");//se decalran las variable para poder sacar los datos de formulario
    const [nombre, setNombre] = useState("");
    const [direccionIp, setDireccionIp] = useState("");
    const [validar, setValidar] = useState(false);

    function handleSubmit(e) {//se le pasan la vribales a un objeto para enviarlo a la base de datos 
        e.preventDefault();
        const data = {
            numeroSerie,
            nombre,
            direccionIp,
            validar
        }
        fetch(`http://localhost:3001/api/gateways/${id}`, {
            method: 'PUT',
            cache: 'no-store',
            headers: {
                'Content-Type':'application/json'
            },
            body: JSON.stringify({//se le envai el cuerpo de la peticion con los datos 
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


    const fetchtDevices =  (id ) => {//se hace el fetch para obtener el los dipositivos de la puerta de enlace
        const devicess =  fetch(`http://localhost:3001/api/gateways/${id}`, {cache:'no-store'})
        .then(res => res.json());

        return devicess
    }

    const devices = fetchtDevices(id)
   

    return (//en el form tomamos los datos y cuando sucede el vento onSubmit se le envian a la funcion handleSubmit
    <div id="addEmployeeModal" class="Active">
        <div class="modal-dialog">
            <div class="modal-content">
                
                <form onSubmit={handleSubmit}>
                    <div class="modal-header">
                    
                        <h4 class="modal-title">Editar puerta de enlace</h4>
                        <Link href={`/${id}`}  type="button" class="close" data-dismiss="modal" aria-hidden="true" >
                            &times;
                        </Link>
                       
                    </div>
                    <div class="modal-body">
                        <div class="form-group">
                            <label>Numero de serie</label>
                            <input type="text" value={numeroSerie} class="form-control" onChange={(e) => setNumeroSerie(e.target.value)}  ></input>
                        </div>
                        <div class="form-group">
                            <label>Nombre</label>
                            <input type="text" value={nombre} class="form-control" onChange={(e) => setNombre(e.target.value)}  ></input>
                        </div>
                        <div class="form-group">
                            <label>Direccion Ip</label>
                            <input type="text" class="form-control" value={direccionIp}onChange={(e) => setDireccionIp(e.target.value)} ></input>
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