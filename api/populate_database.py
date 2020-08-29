from api.app import Product, Category, db

CATEGORIES = ['Glass', 'Metals', 'Paper', 'Plastics', 'Textiles']


def add_categories():
    for category_name in CATEGORIES:
        category = Category(name=category_name)
        db.session.add(category)
    db.session.commit()


def add_products():
    crisps = Product(barcode='07340005404889', co2equiv=12.0)
    db.session.add(crisps)

    biscuits = Product(barcode='07310521050204', co2equiv=2.0)
    db.session.add(biscuits)

    db.session.commit()


db.drop_all()
db.create_all()
add_categories()
add_products()
