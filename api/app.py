from flask import Flask, abort
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from database_setup import Base, Product, DATABASE_NAME

app = Flask(__name__)
engine = create_engine(DATABASE_NAME)
Base.metadata.bind = engine

DBSession = sessionmaker(bind=engine)
session = DBSession()

@app.route('/v1/ping')
def ping():
    return 'pong'


@app.route('/v1/product/<barcode>')
def product(barcode: str):
    rows = session.query(Product).all()
    match = [row for row in rows if row.barcode == barcode]
    if match:
        return str(match[0].co2equiv)
    else:
        abort(404)
