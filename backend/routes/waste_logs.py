from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from models.waste_log import WasteLog
from models.event import Event, EventRegistration
from models.user import User
from app import db
import uuid

waste_logs_bp = Blueprint('waste_logs', __name__)

@waste_logs_bp.route('/event/<uuid:event_id>', methods=['GET'])
@jwt_required()
def get_event_waste_logs(event_id):
    current_user_id = get_jwt_identity()
    user = User.query.get(current_user_id)
    
    # Check if user is either the event organizer or a registered volunteer
    event = Event.query.get_or_404(event_id)
    is_organizer = str(event.organizer_id) == current_user_id
    is_volunteer = EventRegistration.query.filter_by(
        event_id=event_id,
        user_id=current_user_id
    ).first() is not None
    
    if not (is_organizer or is_volunteer):
        return jsonify({'error': 'Not authorized to view waste logs for this event'}), 403
    
    waste_logs = WasteLog.query.filter_by(event_id=event_id).all()
    return jsonify([log.to_dict() for log in waste_logs]), 200

@waste_logs_bp.route('/event/<uuid:event_id>', methods=['POST'])
@jwt_required()
def create_waste_log(event_id):
    current_user_id = get_jwt_identity()
    user = User.query.get(current_user_id)
    
    if user.user_type != 'volunteer':
        return jsonify({'error': 'Only volunteers can log waste'}), 403
    
    # Check if user is registered for the event
    registration = EventRegistration.query.filter_by(
        event_id=event_id,
        user_id=current_user_id
    ).first()
    
    if not registration:
        return jsonify({'error': 'Must be registered for the event to log waste'}), 403
    
    data = request.get_json()
    required_fields = ['wasteType', 'quantity', 'unit']
    if not all(field in data for field in required_fields):
        return jsonify({'error': 'Missing required fields'}), 400
    
    try:
        waste_log = WasteLog(
            event_id=event_id,
            user_id=current_user_id,
            waste_type=data['wasteType'],
            quantity=data['quantity'],
            unit=data['unit'],
            notes=data.get('notes')
        )
        db.session.add(waste_log)
        db.session.commit()
        
        return jsonify(waste_log.to_dict()), 201
        
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500

@waste_logs_bp.route('/<uuid:log_id>', methods=['PUT'])
@jwt_required()
def update_waste_log(log_id):
    current_user_id = get_jwt_identity()
    waste_log = WasteLog.query.get_or_404(log_id)
    
    if str(waste_log.user_id) != current_user_id:
        return jsonify({'error': 'Can only update your own waste logs'}), 403
    
    data = request.get_json()
    
    try:
        if 'wasteType' in data:
            waste_log.waste_type = data['wasteType']
        if 'quantity' in data:
            waste_log.quantity = data['quantity']
        if 'unit' in data:
            waste_log.unit = data['unit']
        if 'notes' in data:
            waste_log.notes = data['notes']
        
        db.session.commit()
        return jsonify(waste_log.to_dict()), 200
        
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500

@waste_logs_bp.route('/<uuid:log_id>', methods=['DELETE'])
@jwt_required()
def delete_waste_log(log_id):
    current_user_id = get_jwt_identity()
    waste_log = WasteLog.query.get_or_404(log_id)
    
    if str(waste_log.user_id) != current_user_id:
        return jsonify({'error': 'Can only delete your own waste logs'}), 403
    
    try:
        db.session.delete(waste_log)
        db.session.commit()
        return jsonify({'message': 'Waste log deleted successfully'}), 200
        
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500

@waste_logs_bp.route('/event/<uuid:event_id>/analytics', methods=['GET'])
@jwt_required()
def get_event_waste_analytics(event_id):
    current_user_id = get_jwt_identity()
    event = Event.query.get_or_404(event_id)
    
    if str(event.organizer_id) != current_user_id:
        return jsonify({'error': 'Only event organizers can view analytics'}), 403
    
    waste_logs = WasteLog.query.filter_by(event_id=event_id).all()
    
    # Calculate analytics
    total_waste = sum(float(log.quantity) for log in waste_logs)
    waste_by_type = {}
    for log in waste_logs:
        if log.waste_type not in waste_by_type:
            waste_by_type[log.waste_type] = 0
        waste_by_type[log.waste_type] += float(log.quantity)
    
    return jsonify({
        'totalWaste': total_waste,
        'wasteByType': waste_by_type,
        'totalLogs': len(waste_logs)
    }), 200 
 