const express = require('express');
const router = express.Router();
const cors = require('cors');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();


router.use(cors());
router.use(express.json());

/////////////////////////////////////////////////////////////////////

async function getAllGateways(){
    return await prisma.gateways.findMany({
        include: {
            associated_devices: true,
        }
    });
}
///////////////////////
async function getAllGatewaysHandler(req, res) {
    const gateways = await getAllGateways(); 
    res.json(gateways);
}

router.get('/gateways', getAllGatewaysHandler);

/////////////////////////////////////////////////////////

async function getGateway(gateway_id) {
    return await prisma.gateways.findUnique({
        where: { serial_number: String(gateway_id) },
        include: {
          associated_devices: true,
        }
    });
}
///////////////////////
async function getGatewayHandler(req, res) {
    const { gateway_id } = req.params;
    const gateways = await getGateway(gateway_id);
    res.json(gateways);    
}
router.get('/gateways/:gateway_id', getGatewayHandler);

//////////////////////////////////////////////////////////

async function postGatewayCreate(serial_number, name, ipv4_address, address_validation) {
    return await prisma.gateways.create({
        data: { 
            serial_number, 
            name, 
            ipv4_address, 
            address_validation
        }
    });    
}
///////////////////////
async function postGatewayHandler(req, res) {
    const { serial_number, name, ipv4_address, address_validation} = req.body;
    const regexIPv4 = /^((25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
    const existingGateway = await prisma.gateways.findUnique({
        where: {
            ipv4_address: ipv4_address
        }
    });
    if (!regexIPv4.test(ipv4_address)){
        res.status(400).json({ error: 'ip invalida' })
    }else if (existingGateway) {
        res.status(400).json({ message: "Ya existe la IP" });
    }else {
        const gateways = await postGatewayCreate(serial_number, name, ipv4_address, address_validation); 
        res.json(gateways);
    }
}
router.post('/gateways', postGatewayHandler);

///////////////////////////////////////////////////////////
async function postDeviceCreate( vendor, connected, gateway_id) {
    return await prisma.devices.create({
        data: { 
            //uid,
            vendor,
            connected,
            Gateways: { 
                connect: {
                    serial_number: String(gateway_id)
                }
           }
        },
    });
}
///////////////////////
async function postDeviceHandler(req, res) {
    const { gateway_id } = req.params;
    const { vendor, connected } = req.body;
    const device = await postDeviceCreate( vendor, connected, gateway_id);
    res.json(device);
}
router.post('/gateways/:gateway_id/device', postDeviceHandler);

////////////////////////////////////////////////////////////////////

async function putGatewayUpdate(serial_number, name, ipv4_address, address_validation, gateway_id) {
    return await prisma.gateways.update({
        where: { serial_number: String(gateway_id) },
        data: {
            serial_number, 
            name, 
            ipv4_address, 
            address_validation
        }
    });
}
///////////////////////
async function putGatewayHandler(req, res){
    const { gateway_id } = req.params;
    const { serial_number, name, ipv4_address, address_validation, associated_devices } = req.body;
    const regexIPv4 = /^((25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
    const existingGateway = await prisma.gateways.findUnique({
        where: {
            ipv4_address: ipv4_address
        }
    });
    if (!regexIPv4.test(ipv4_address)){
        res.status(400).json({ error: 'ip invalida' })
    }else if (existingGateway) {
        res.status(400).json({ message: "Ya existe la IP" });
    }else {
        const gateways = await postGatewayCreate(serial_number, name, ipv4_address, address_validation); 
        res.json(gateways);
    }
    const gateways = await putGatewayUpdate(serial_number, name, ipv4_address, address_validation, gateway_id);
    res.json(gateways);
}
router.put('/gateways/:gateway_id', putGatewayHandler);

//////////////////////////////////////////////////////////////////////////

async function putDeviceUpdate(uid, vendor, connected, device_id) {
    return await prisma.devices.update({
        where: { uid: parseInt(device_id) },
        data: { 
            uid,
            vendor,
            connected
        }
    });
}
///////////////////////
async function putDeviceHandler(req, res){
    const { device_id } = req.params;
    const { uid, vendor, connected } = req.body;
    const device = await putDeviceUpdate(uid, vendor, connected, device_id);
    res.json(device);
}
router.put('/gateways/:gateway_id/device/:device_id', putDeviceHandler);

////////////////////////////////////////////////////////////////////////////

async function deleteGateway(gateway_id) {
    const devicesList = await prisma.gateways.findUnique({
        where: { 
            serial_number: String(gateway_id)
        },
        include: {
            associated_devices: true,
        }
    });
    for (const device of devicesList.associated_devices){
        await prisma.devices.delete({
            where: { 
                uid: parseInt(device.uid),
            }
        });
    }
    return await prisma.gateways.delete({
        where: { 
            serial_number: String(gateway_id)
        },
    });
}
///////////////////////
async function deleteGatewayHandler(req, res) {
    const { gateway_id } = req.params;
    const gateway = await deleteGateway(gateway_id);
    res.json(gateway);
}
router.delete('/gateways/:gateway_id', deleteGatewayHandler);

//////////////////////////////////////////////////////////////////////////////

async function deleteDevice(device_id,) {
    return await prisma.devices.delete({
        where: { 
            uid: parseInt(device_id)
        }
    });
}
///////////////////////
async function deleteDeviceHandler(req, res){
    const { device_id } = req.params;
    const device = await deleteDevice(device_id);
    res.json(device);
}
router.delete('/gateways/:gateway_id/device/:device_id', deleteDeviceHandler);
//////////////////////////////////////////////////////////////////////////////
module.exports = router;
