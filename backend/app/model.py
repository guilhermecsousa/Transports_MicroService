
from pydantic import BaseModel, EmailStr, Field # pydantic helps autocreate json schemas from model

class Package(BaseModel):
    client : str
    tracking : str
    origin : str
    destination : str
    items : str
    weight : str
    shipping : str
    status : str

class PackageAdmin(Package):
    orderID : str

class OrderIn(BaseModel):
    client : str
    origin: str
    destination : str
    items : str