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
    QUETSIONS_PER_PAGE = 10
    '''
    @TODO: #? Set up CORS. Allow '*' for origins.
            #? Delete the sample route after completing the TODOs
    '''
    cors = CORS(app, resources={r"/api/*": {"origins": "*"}})
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
        start = (page-1)*QUETSIONS_PER_PAGE
        end = start+QUETSIONS_PER_PAGE
        return selection[start:end]
    '''
    @TODO:
    #? Create an endpoint to handle GET requests
    #? for all available categories.
    '''

    @app.route('/')
    def index():
        return 'ddd'
    
    @app.route('/categories', methods=['GET'])
    def get_request_categories():
        categories_count = Category.query.order_by(Category.id).count()
        if categories_count == 0:
            abort(404)
        return jsonify({
            'categories': get_categories_dict()
        })

    '''
    @TODO:
    #? Create an endpoint to handle GET requests for courses,
    #? including pagination (every 10 courses).
    #? This endpoint should return a list of courses,
    #? number of total courses, current category, categories.

    TEST:
    #? At this point, when you start the application
    #? you should see courses and categories generated,
    #? ten courses per page and
    #? pagination at the bottom of the screen for three pages.
    #? Clicking on the page numbers should update the courses.
    '''
    @app.route('/courses', methods=['GET'])
    def get_paginated_courses():
        categories = Category.query.all()
        courses = Course.query.all()
        print(courses)
        formated_categories = get_categories_dict()
        formated_courses = [q.format() for q in courses]
        display = paginate(request, formated_courses)
        if len(display) == 0:
            abort(404)
        else:
            current_category = '## IMPLEMENT CRRENT CATEGORY ##'
            return jsonify({
                "courses": display,
                "total_courses": len(courses),
                "categories": formated_categories,
                "current_category": current_category
            })
    '''
    @TODO:
    #? Create an endpoint to DELETE course using a course ID.
    TEST:
    #? When you click the trash icon next to a course,
    #? the course will be removed.
    #? This removal will persist in the database and when you refresh the page.
    '''
    @app.route('/courses/<int:course_id>', methods=['DELETE'])
    def delete_course(course_id):

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

    '''
    @TODO:
    #? Create an endpoint to POST a new course,
    #? which will require the course and answer text,
    #? category, and difficulty score.

    #? TEST: When you submit a course on the "Add" tab,
    #? the form will clear and the course will appear
    #? at the end of the last page
    #? of the courses list in the "List" tab.
    '''
    @app.route('/courses', methods=['POST'])
    def create_course():
        body = request.get_json()
        if body:
            id = body.get('id', None)
            course = body.get('course', None)
            answer = body.get('answer', None)
            category = body.get('category', None)
            difficulty = body.get('difficulty', None)
            search = body.get('search', None)
            try:
                if search:
                    return post_search_courses(search)
                else:
                    b = Course(id, course, answer, category, difficulty)
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

    '''
    @TODO:
    #! Create a POST endpoint to get courses based on a search term.
    #! It should return any courses for whom the search term
    #! is a substring of the course.

    #! TEST: Search by any phrase. The courses list will update to include
    #! only course that include that string within their course.
    #! Try using the word "title" to start.
    '''
    def post_search_courses(search):
        """
        Function for searching a course

        Returns:
            json object with the format {
            "success": True,
            "courses": array of courses to display,
            "total_results": integer number of results
        }
        """

        selection = Course.query.filter(
            Course.course.ilike(f'%{search}%')
            )
        formated_selections = [q.format() for q in selection]
        display = paginate(request, formated_selections)
        return jsonify({
            "success": True,
            "courses": display,
            "total_results": len(display)
        })

    '''
    @TODO:
    Create a GET endpoint to get courses based on category.
    TEST: In the "List" tab / main screen, clicking on one of the
    categories in the left column will cause only courses of that
    category to be shown.
    '''

    @app.route('/categories/<int:category_id>/courses', methods=['GET'])
    def get_courses_by_category(category_id):
        if Category.category_exists(category_id):
            qtns = Course.query.filter(
                Course.category == category_id).all()
            formated = [q.format() for q in qtns]
            display = paginate(request, formated)
            return jsonify({
                "success": True,
                "courses": display,
                "total_results": len(qtns)
            })
        else:
            abort(404)

    '''
    @TODO:
    Create a POST endpoint to get courses to play the quiz.
    This endpoint should take category and previous course parameters
    and return a random courses within the given category,
    if provided, and that is not one of the previous courses.

    TEST: In the "Play" tab, after a user selects "All" or a category,
    one course at a time is displayed, the user is allowed to answer
    and shown whether they were correct or not.
    '''

    @app.route('/quizzes', methods=['POST'])
    def start_quiz():
        body = request.get_json()
        if body:
            category = body.get('category', None)
            previous_courses = body.get('previous_courses', None)
            if category:
                # if category is set, filter courses by category
                # and not in tee previouis_courses list
                category_courses = Course.query.filter(
                    Course.category == category,
                    Course.id.notin_(previous_courses)
                    ).all()
            else:
                # just filter by courses not in the previous_courses list
                category_courses = Course.query.filter(
                    Course.id.notin_(previous_courses)
                    ).all()

            # return a random course from the selected list of courses
            random_course = random.choice(category_courses)
            return jsonify({
                    "success": True,
                    "course": random_course.format()
                })
        else:
            abort(404)

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
        body = request.get_json()
        if body:
            try:
                course = Course.query.filter(
                    Course.id == course_id
                    ).one_or_none()
                if course is None:
                    abort(404)
                else:
                    if 'answer' in body:
                        course.answer = str(body.get('answer'))
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
