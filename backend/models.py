import os
from flask.json import jsonify
from sqlalchemy import Column, String, Integer, create_engine
from flask_sqlalchemy import SQLAlchemy
import json

database_name = "courses"
database_path = "postgresql://postgres:1111@{}/{}".format('localhost:5432', database_name)

db = SQLAlchemy()

'''
setup_db(app)
    binds a flask application and a SQLAlchemy service
'''
def setup_db(app, database_path=database_path):
    app.config["SQLALCHEMY_DATABASE_URI"] = database_path
    app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
    db.app = app
    db.init_app(app)
    print(database_path)
    db.create_all()

'''
Course

'''
class Course(db.Model):  
  __tablename__ = 'courses'

  id = Column(Integer, primary_key=True)
  course_name = Column(String)
  category = Column(String)

  def __init__(self, id, course_name, category):
    self.id = id
    self.course_name = course_name
    self.category = category
    
  def get_items():
        courses = db.session.query(Course).order_by(db.desc(Course.id)).all()
        # return {c.id: c.course_name for c in courses}
        return courses

  def insert(self):
      try:
        db.session.add(self)
        db.session.commit()
      except:
        db.session.rollback()
          
  def update(self):
      try:
        db.session.commit()
      except:
        db.session.rollback()

  def delete(self):
    try:
      db.session.delete(self)
      db.session.commit()
    except:
      db.session.rollback()

  def format(self):
    return {
      'id': self.id,
      'course_name': self.course_name,
      'category': self.category,
    }

'''
Category

'''
class Category(db.Model):  
  __tablename__ = 'categories'

  id = Column(Integer, primary_key=True)
  type = Column(String)

  def __init__(self, type):
    self.type = type
    
  def insert(self):
    try:
      db.session.add(self)
      db.session.commit()
    except:
      db.session.rollback()
          
  def update(self):
      try:
        db.session.commit()
      except:
        db.session.rollback()

  def delete(self):
    try:
      db.session.delete(self)
      db.session.commit()
    except:
      db.session.rollback()

  def format(self):
        return {
      'id': self.id,
      'type': self.type
    }
  def pformat(self):
    return {
      str(self.id): self.type
    }
  def category_exists(cat_id):
      
    exists = db.session.query(Category.id).filter_by(id=cat_id).first() is not None
    return (exists)