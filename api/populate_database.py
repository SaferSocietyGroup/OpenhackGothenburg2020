from .app import Product, db


def init_db():
    db.create_all()

    if not Product.query.limit(1).all():
        crisps = Product(barcode='07340005404889', co2equiv=12.0)
        db.session.add(crisps)

        biscuits = Product(barcode='07310521050204', co2equiv=2.0)
        db.session.add(biscuits)

        db.session.commit()

init_db()




