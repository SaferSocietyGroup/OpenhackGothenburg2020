# import sys
# #for creating the mapper code
# from sqlalchemy import Column, ForeignKey, Integer, String, Float
#
# #for configuration and class code
# from sqlalchemy.ext.declarative import declarative_base
#
# #for creating foreign key relationship between the tables
# from sqlalchemy.orm import relationship
#
# #for configuration
# from sqlalchemy import create_engine

# #create declarative_base instance
# Base = declarative_base()
#
#
# #we'll add classes here
# class Product(Base):
#     __tablename__ = 'product'
#
#     id = Column(Integer, primary_key=True)
#     barcode = Column(String(50), nullable=False, index=True, unique=True)
#     co2equiv = Column(Float)
#
#
# #creates a create_engine instance at the bottom of the file
DATABASE_NAME = 'sqlite:///products.db'
# engine = create_engine(DATABASE_NAME)
# Base.metadata.create_all(engine)
