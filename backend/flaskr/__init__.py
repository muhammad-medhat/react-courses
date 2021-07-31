import os
from flask import Flask, request, abort, jsonify
from flask.json import dump
from sqlalchemy.sql.expression import select
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
import random
from models import setup_db, Course, Category


def create_app(test_config=None):
    # create and configure the app
    app = Flask(__name__)
    setup_db(app)
    PER_PAGE = 300
    '''
    @TODO: #? Set up CORS. Allow '*' for origins.
            #? Delete the sample route after completing the TODOs
    '''
    # cors = CORS(app, resources={r"/api/*": {"origins": "*"}})
    cors = CORS(app)
    '''
    @TODO:#? Use the after_request decorator to set Access-Control-Allow
    '''
    @app.after_request
    def after_request(response):
        response.headers.add( 
            'Access-Control-Allow-Headers',
            'Content-Type,Authorization, true')
        response.headers.add(
            'Access-Control-Allow-Methods',
            'GET, PATCH, POST, DELETE, OPTIONS')
        return response

    def get_categories_dict():
        selection = Category.query.order_by(Category.id).all()
        return {cat.id: cat.type for cat in selection}

    def paginate(req, selection):
        """
        Paginate the obtained results
        Args:
            req ([request]): [name of the sent request]
            selection ([dictionary]): [the whole results ]

        Returns:
            [dictionary]: [a slice from the whole results]
        """
        page = req.args.get('page', 1, type=int)
        start = (page-1) * PER_PAGE
        end = start + PER_PAGE
        return selection[start:end]


    @app.route('/')
    def index():
        # Course.get_items()
        return '<h1>Courses App</h1>'
    
    @app.route('/categories', methods=['GET'])
    def get_request_categories():
        categories_count = Category.query.order_by(Category.id).count()
        if categories_count == 0:
            abort(404)
        return jsonify({
            'categories': get_categories_dict()
        })


    @app.route('/courses', methods=['GET'])
    def get_paginated_courses():        
        courses = Course.get_items()     
        formated_courses = [q.format() for q in courses]
        # print(request)
        # print(len(formated_courses))
        display = paginate(request, formated_courses)
        # display = formated_courses
        if len(display) == 0:
            abort(404)
        else:
            current_category = '## IMPLEMENT CRRENT CATEGORY ##'
            return jsonify({
                'count': len(display),
                "courses": display
            })


    @app.route('/courses/<int:course_id>', methods=['DELETE'])
    def delete_course(course_id):
        print(f'==========  DELETE {course_id} ===================')

        try:
            q = Course.query.filter(Course.id == course_id).one_or_none()
            if q is None:
                abort(404)
            else:
                q.delete()
                return jsonify({
                    'success': True
                })
        except:
            abort(404)

 
    @app.route('/courses', methods=['POST'])
    def create_course():
        body = request.get_json()
        if body:
            id = body.get('id', None)
            course_name = body.get('course_name', None)
            category = body.get('category', None)
            search = body.get('search', None)
            try:
                    b = Course(id, course_name, category)
                    b.insert()
                    return jsonify({
                        'success': True,
                        'total_courses': len(Course.query.all()),
                        'body': b.format()
                    })
            except:
                abort(404)
        else:
            abort(400)

    @app.route('/courses/<int:course_id>', methods=['GET'])
    def get_specific_course(course_id):
        course = Course.query.filter(
            Course.id == course_id
            ).one_or_none()
        if course is None:
            abort(404)
        else:
            return jsonify({
                'course': course.format(),
                'success': True
            })

    @app.route('/courses/<int:course_id>', methods=['PATCH', 'PUT'])
    def modify_course_answer(course_id):
        print(f'========patch {course_id} ===========')
        print(request)
        body = request.get_json()
        print( body)
        if body:
            try:
                course = Course.query.filter(
                    Course.id == course_id
                    ).one_or_none()
                if course is None:
                    abort(404)
                else:
                    # abort(400)
                    if 'course_name' in body:
                        course.course_name = str(body.get('course_name'))
                        course.update()
                        return jsonify({
                            "course": course.format(),
                            'success': True
                        })
                    else:
                        abort(400)
            except:
                abort(404)
        else:
            abort(400)

    '''
    @TODO:
    #? Create error handlers for all expected errors
    #? including 404 and 422.
    #* 400, 405 and 500 added
    '''
    @app.errorhandler(400)
    def bad_request(error):
        return jsonify({
            'success': False,
            'message': 'Bad Request'
        }), 400

    @app.errorhandler(404)
    def not_found(error):
        return jsonify({
            'success': False,
            'message': 'Not Found'
        }), 404

    @app.errorhandler(405)
    def method_not_allowed(error):
        return jsonify({
            'success': False,
            'message': 'Method not allowed'
        }), 405

    @app.errorhandler(422)
    def unprocssable(error):
        return jsonify({
            'success': False,
            'message': 'Unprocessable Entity'
        }), 422

    @app.errorhandler(500)
    def unprocssable(error):
        return jsonify({
            'success': False,
            'message': 'Internal Server Error'
        }), 500
    return app
