import app

app.db.create_all()

crisps = app.Product(barcode='07340005404889', co2equiv=12.0)
app.db.session.add(crisps)

biscuits = app.Product(barcode='07310521050204', co2equiv=2.0)
app.db.session.add(biscuits)

app.db.session.commit()
