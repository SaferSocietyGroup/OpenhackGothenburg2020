from flask import Flask, request
from .database_setup import DATABASE_NAME
from flask_sqlalchemy import SQLAlchemy
from itertools import groupby


app = Flask(__name__)
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
app.config["SQLALCHEMY_DATABASE_URI"] = DATABASE_NAME
db = SQLAlchemy(app)


class Product(db.Model):
    __tablename__ = 'product'

    id = db.Column(db.Integer, primary_key=True)
    barcode = db.Column(db.String(50), nullable=False, index=True, unique=True)
    co2equiv = db.Column(db.Float)


class Category(db.Model):
    __tablename__ = 'category'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(50), nullable=False, index=True, unique=True)
    gain = db.Column(db.Float, nullable=True)


class Vote(db.Model):
    __tablename__ = 'vote'

    id = db.Column(db.Integer, primary_key=True)

    category_id = db.Column(db.Integer, db.ForeignKey('category.id'), nullable=False)
    category = db.relationship('Category', backref=db.backref('votes', lazy=True))

    product_id = db.Column(db.Integer, db.ForeignKey('product.id'), nullable=False)
    product = db.relationship('Product', backref=db.backref('votes', lazy=True))

    user_identifier = db.Column(db.String(50), nullable=False, index=True)


def init_db():
    db.create_all()

    if not Product.query.limit(1).all():
        crisps = Product(barcode='07340005404889', co2equiv=12.0)
        db.session.add(crisps)

        biscuits = Product(barcode='07310521050204', co2equiv=2.0)
        db.session.add(biscuits)

        db.session.commit()

init_db()


@app.route('/v1/ping')
def ping():
    return 'pong'


@app.route('/v1/product')
def get_all_product():
    products = Product.query.all()

    return {'barcodes':  [product.barcode for product in products]}


@app.route('/v1/product/<barcode>')
def get_product(barcode: str):
    product = Product.query.filter_by(barcode=barcode).first()
    if product:
        votes = list([[group[0], list(group[1])] for group in groupby(product.votes, lambda vote: vote.category_id)])
        votes.sort(key=lambda group: len(group[1]), reverse=True)
        confidence = 0.0
        category_name = 'Unknown'
        category_gain = None
        if votes:
            category_id = votes[0][0]
            category = Category.query.filter_by(id=category_id).first()
            category_name = category.name
            category_gain = category.gain

            if len(votes) > 1 and len(votes[0][1]) - len(votes[1][1]) > 10:
                confidence = 1.0
            elif len(votes) > 1:
                confidence = (len(votes[0][1]) - len(votes[1][1]))/10
            else:
                confidence = 0.0

        result = {
            'co2equiv': product.co2equiv,
            'co2equivRecyclingGain': category_gain,
            'category': category_name,
            'confidence': confidence
        }
    else:
        new_product = Product(barcode=barcode)
        db.session.add(new_product)
        db.session.commit()
        result = {
            'co2equiv': None,
            'category': 'Unknown',
            'confidence': 0.0
        }

    return result


@app.route('/v1/recycling/category')
def get_categories():
    categories = Category.query.all()

    return {'categories': [category.name for category in categories]}


@app.route('/v1/recycling/vote', methods=['GET'])
def get_votes():
    votes = Vote.query.all()

    return {'votes': [
        {'product': vote.product.barcode, 'category': vote.category.name} for vote in votes
    ]}


@app.route('/v1/recycling/vote', methods=['POST'])
def place_vote():
    content = request.json
    user_identifier = content['userIdentifier']
    category = Category.query.filter_by(name=content['categoryName']).first()
    product = Product.query.filter_by(barcode=content['barcode']).first()
    vote = (Vote.query.filter_by(user_identifier=user_identifier)
            .filter_by(product_id=product.id)
            .first())

    if not vote:
        new_vote = Vote(category=category, product=product, user_identifier=user_identifier)
        db.session.add(new_vote)
        db.session.commit()

    return ''
