-- CreateTable
CREATE TABLE "employee" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR NOT NULL,
    "idadmin" BOOLEAN NOT NULL DEFAULT true,
    "createat" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "roles" TEXT[] DEFAULT ARRAY[]::TEXT[],

    CONSTRAINT "employee_pkey" PRIMARY KEY ("id")
);
