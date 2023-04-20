-- CreateTable
CREATE TABLE "Gateways" (
    "serial_number" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "ipv4_address" TEXT NOT NULL,
    "address_validation" BOOLEAN NOT NULL DEFAULT false
);

-- CreateTable
CREATE TABLE "Devices" (
    "uid" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "vendor" TEXT NOT NULL,
    "date" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "connected" BOOLEAN NOT NULL DEFAULT false,
    "gatewaysSerial_number" TEXT,
    CONSTRAINT "Devices_gatewaysSerial_number_fkey" FOREIGN KEY ("gatewaysSerial_number") REFERENCES "Gateways" ("serial_number") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "Gateways_serial_number_key" ON "Gateways"("serial_number");

-- CreateIndex
CREATE UNIQUE INDEX "Gateways_name_key" ON "Gateways"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Gateways_ipv4_address_key" ON "Gateways"("ipv4_address");

-- CreateIndex
CREATE UNIQUE INDEX "Devices_uid_key" ON "Devices"("uid");
