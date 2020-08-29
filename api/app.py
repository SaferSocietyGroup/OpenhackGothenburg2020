from flask import Flask
from database_setup import DATABASE_NAME
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
app.config["SQLALCHEMY_DATABASE_URI"] = DATABASE_NAME
db = SQLAlchemy(app)


class Product(db.Model):
    __tablename__ = 'product'

    id = db.Column(db.Integer, primary_key=True)
    barcode = db.Column(db.String(50), nullable=False, index=True, unique=True)
    co2equiv = db.Column(db.Float)


@app.route('/v1/ping')
def ping():
    return 'pong'


@app.route('/v1/product/<barcode>')
def get_product(barcode: str):
    product = Product.query.filter_by(barcode=barcode).first_or_404()
    return {
        'co2equiv': product.co2equiv,
    }
