
from model import Package

import motor.motor_asyncio #MongoDB driver

#client = motor.motor_asyncio.AsyncIOMotorClient('mongodb+srv://egs:teste123@newcluster.twi50.mongodb.net/test')
#client = motor.motor_asyncio.AsyncIOMotorClient('mongodb://localhost:27017')
#client = motor.motor_asyncio.AsyncIOMotorClient('mongodb://gui:gui@mongodb-service:27017')
client = motor.motor_asyncio.AsyncIOMotorClient('mongodb://gui:gui@deliveries-mongodb-service:27017')

database = client.Transports

packages_collection = database.Packages

# Create a package
async def create_package(package):
    document = package
    result = await packages_collection.insert_one(document)
    return document

# Get package by tracking number
async def fetch_package_by_TN(id):
    document = await packages_collection.find_one({"tracking":id})
    return document

# Get package by order ID
async def fetch_package_by_ID(id):
    document = await packages_collection.find_one({"orderID":id})
    return document

# Get all active packages
async def fetch_all_packages():
    packages = []
    cursor = packages_collection.find({})
    async for document in cursor:
        packages.append(Package(**document))
    return packages    

# Edit package info with order ID
async def update_package(id, status):
    await packages_collection.update_one({"orderID":id}, {"$set": {"status":status}})
    document = await packages_collection.find_one({"orderID":id})
    return document

# Delete package
async def remove_package(id):
    await packages_collection.delete_one({"orderID":id})
    return True
