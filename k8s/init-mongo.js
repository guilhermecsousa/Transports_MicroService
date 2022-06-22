db.createUser(
    {
        user:"gui",
        pwd:"gui",
        roles: [
            {
                role: "readWrite",
                db: "Tranports"
            }
        ]
    }
);
db.createCollection("Packages");