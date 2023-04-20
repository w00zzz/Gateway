/*
  Warnings:

  - The primary key for the `Gateways` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `serial_number` on the `Gateways` table. The data in that column could be lost. The data in that column will be cast from `String` to `Int`.
  - You are about to alter the column `gatewaysSerial_number` on the `Devices` table. The data in that column could be lost. The data in that column will be cast from `String` to `Int`.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Gateways" (
    "serial_number" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "ipv4_address" TEXT NOT NULL,
    "address_validation" BOOLEAN NOT NULL DEFAULT false
);
INSERT INTO "new_Gateways" ("address_validation", "ipv4_address", "name", "serial_number") SELECT "address_validation", "ipv4_address", "name", "serial_number" FROM "Gateways";
DROP TABLE "Gateways";
ALTER TABLE "new_Gateways" RENAME TO "Gateways";
CREATE UNIQUE INDEX "Gateways_serial_number_key" ON "Gateways"("serial_number");
CREATE UNIQUE INDEX "Gateways_name_key" ON "Gateways"("name");
CREATE UNIQUE INDEX "Gateways_ipv4_address_key" ON "Gateways"("ipv4_address");
CREATE TABLE "new_Devices" (
    "uid" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "vendor" TEXT NOT NULL,
    "date" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "connected" BOOLEAN NOT NULL DEFAULT false,
    "gatewaysSerial_number" INTEGER,
    CONSTRAINT "Devices_gatewaysSerial_number_fkey" FOREIGN KEY ("gatewaysSerial_number") REFERENCES "Gateways" ("serial_number") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Devices" ("connected", "date", "gatewaysSerial_number", "uid", "vendor") SELECT "connected", "date", "gatewaysSerial_number", "uid", "vendor" FROM "Devices";
DROP TABLE "Devices";
ALTER TABLE "new_Devices" RENAME TO "Devices";
CREATE UNIQUE INDEX "Devices_uid_key" ON "Devices"("uid");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
