
from datetime import datetime
import random, secrets
from model import Package, PackageAdmin, OrderIn
from fastapi import FastAPI, HTTPException, Request
from starlette.middleware import Middleware
from starlette.middleware.cors import CORSMiddleware
#from fastapi.middleware.cors import CORSMiddleware #Cross Origin Resource Shell
import requests

app = FastAPI()

from database import (
    fetch_package_by_TN,
    fetch_package_by_ID,
    fetch_all_packages,
    create_package,
    update_package,
    remove_package
)

origins = ['*']

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials = True,
    allow_methods = ["*"],
    allow_headers = ["*"],
)

# Middleware to confirm the authenticity of the requests through token
# The token 'is received' by José Brás's micro-service 
# The token is validated by Daniel Magueta's micro-service
# To test, if the token is missing, please comment this method
@app.middleware("http")
async def validate(request: Request, call_next):
    url = 'http://danimag-authserver.k3s/validate'
    headers = {'Content-Type':'application/json', 'Authorization':request.headers["Authorization"]}
    #headers = {'Content-Type':'application/json', 'Authorization': 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ0ZXN0ZSIsImV4cCI6MTY1NTYxMDQzMSwiaWF0IjoxNjU1NTc0NDMxfQ.cd8z4E8XK1SVQ2z17S5g9GyG7gksAa5yMZYwOo3TfjI'}
    responseAuth = requests.get(url, headers=headers)

    if responseAuth:
        response = await call_next(request)
        return response
    else:
        raise HTTPException(403, "Wrong token")

# Read root
@app.get("/")
def read_root():
    return {"Ping":"Pong"}

# Create a package
@app.post("/api/package")
async def post_package(package:OrderIn):

    orderID = "TBM"+str(secrets.token_hex(6))
    tracking = str(secrets.randbits(50))
    weight = random.randint(0,200)
    shipping = str(round(int(package.items) * 4.99 * (weight/4),2))+" €"
    weight = str(weight)+" kg"
    status = "Pedido de transporte recebido"
    date = str(datetime.now().strftime("%d/%m/%Y %H:%M:%S"))
   
    dispatch_package = {'client': package.client,
                        'orderID': orderID,
                        'tracking': tracking,
                        'origin': package.origin,
                        'destination' : package.destination,
                        'items' : package.items,
                        'weight' : weight,
                        'shipping' : shipping,
                        'status' : status,
                        'date': date
                        }

    response = await create_package(dispatch_package)
    if response:
        return {'Tracking number': tracking}
    raise HTTPException(400, "Bad request")

# Get all active packages
@app.get("/api/packages")
async def get_all_packages():
    response = await fetch_all_packages()
    if response:
        return response
    raise HTTPException(404, "No packages found")    

# Get package by orderID
@app.get("/api/order={orderID}", response_model=PackageAdmin)
async def get_package_by_id(orderID):
    response = await fetch_package_by_ID(orderID)
    if response:
        return response
    raise HTTPException(404, f"Package {orderID} not found")

# Get package by tracking number
@app.get("/api/package={tracking}", response_model=Package)
async def get_package_by_tn(tracking):
    response = await fetch_package_by_TN(tracking)
    if response:
        return response
    raise HTTPException(404, f"Package {tracking} not found")             

# Edit package info with order ID
@app.put("/api/package={orderID}", response_model=Package)
async def put_package(orderID:str, status:str):
    response = await update_package(orderID, status)
    if response:
        return response
    raise HTTPException(404, f"Package {orderID} not found") 

# Delete package
@app.delete("/api/package={orderID}")
async def delete_package(orderID):
    response = await remove_package(orderID)
    if response:
        return "Succesfully deleted"
    raise HTTPException(404, f"Package {orderID} not found") 
