#!/usr/bin/env python3
"""
Sanmei Web - Backend Flask API
Provides endpoints for 算命学 (Four Pillars of Destiny) calculations
"""

from flask import Flask, request, jsonify
from flask_cors import CORS
from datetime import datetime
from calculations import SanmeiCalculator
import os

app = Flask(__name__)
CORS(app)

# Initialize calculator
calculator = SanmeiCalculator()

@app.route('/health', methods=['GET'])
def health():
    """Health check endpoint"""
    return jsonify({
        'status': 'ok',
        'timestamp': datetime.now().isoformat()
    })

@app.route('/api/v1/destiny', methods=['POST'])
def calculate_destiny():
    """
    Calculate destiny table for a single person
    Input: { birth_date: "YYYY-MM-DD" }
    Output: { 宿命表, 陰占, 陽占, 十大主星, 宇宙盤, 大運, 年運 }
    """
    try:
        data = request.get_json()
        birth_date_str = data.get('birth_date')

        if not birth_date_str:
            return jsonify({'error': 'birth_date is required'}), 400

        # Parse birth date
        birth_date = datetime.strptime(birth_date_str, '%Y-%m-%d').date()

        # Calculate destiny
        result = calculator.calculate_destiny(birth_date)

        return jsonify(result), 200

    except ValueError as e:
        return jsonify({'error': f'Invalid date format: {str(e)}'}), 400
    except Exception as e:
        return jsonify({'error': f'Calculation error: {str(e)}'}), 500

@app.route('/api/v1/compatibility', methods=['POST'])
def calculate_compatibility():
    """
    Calculate compatibility between two people
    Input: { person1_birth_date: "YYYY-MM-DD", person2_birth_date: "YYYY-MM-DD" }
    Output: { compatibility_score, 相性表, detailed_analysis }
    """
    try:
        data = request.get_json()
        person1_date = data.get('person1_birth_date')
        person2_date = data.get('person2_birth_date')

        if not person1_date or not person2_date:
            return jsonify({'error': 'Both birth_dates are required'}), 400

        # Parse birth dates
        date1 = datetime.strptime(person1_date, '%Y-%m-%d').date()
        date2 = datetime.strptime(person2_date, '%Y-%m-%d').date()

        # Calculate compatibility
        result = calculator.calculate_compatibility(date1, date2)

        return jsonify(result), 200

    except ValueError as e:
        return jsonify({'error': f'Invalid date format: {str(e)}'}), 400
    except Exception as e:
        return jsonify({'error': f'Calculation error: {str(e)}'}), 500

@app.route('/api/v1/debug', methods=['GET'])
def debug_info():
    """Debug endpoint - shows loaded data status"""
    return jsonify({
        'csv_files_loaded': calculator.data_loaded,
        'data_directory': calculator.data_dir,
        'timestamp': datetime.now().isoformat()
    })

if __name__ == '__main__':
    print("🚀 Sanmei Web Backend Starting...")
    print("📊 API Documentation:")
    print("  POST /api/v1/destiny - Calculate destiny table")
    print("  POST /api/v1/compatibility - Calculate compatibility")
    print("  GET  /health - Health check")
    print("  GET  /api/v1/debug - Debug info")

    # Use port 5001 to avoid conflicts with AirTunes on port 5000
    app.run(debug=True, port=5001, host='127.0.0.1')
