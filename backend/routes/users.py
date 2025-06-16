from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from models.user import User
from models.event import Event, EventRegistration
from models.waste_log import WasteLog
from app import db, bcrypt
import uuid

users_bp = Blueprint('users', __name__)

@users_bp.route('/profile', methods=['GET'])
@jwt_required()
def get_profile():
    current_user_id = get_jwt_identity()
    user = User.query.get_or_404(current_user_id)
    
    return jsonify(user.to_dict()), 200

@users_bp.route('/profile', methods=['PUT'])
@jwt_required()
def update_profile():
    current_user_id = get_jwt_identity()
    user = User.query.get_or_404(current_user_id)
    
    data = request.get_json()
    
    try:
        if 'fullName' in data:
            user.full_name = data['fullName']
        if 'email' in data:
            # Check if new email is already taken
            existing_user = User.query.filter_by(email=data['email']).first()
            if existing_user and str(existing_user.id) != current_user_id:
                return jsonify({'error': 'Email already in use'}), 409
            user.email = data['email']
        if 'password' in data:
            user.password_hash = bcrypt.generate_password_hash(data['password']).decode('utf-8')
        
        db.session.commit()
        return jsonify(user.to_dict()), 200
        
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500

@users_bp.route('/events', methods=['GET'])
@jwt_required()
def get_user_events():
    current_user_id = get_jwt_identity()
    user = User.query.get_or_404(current_user_id)
    
    if user.user_type == 'organizer':
        # Get events created by the organizer
        events = Event.query.filter_by(organizer_id=current_user_id).all()
    else:
        # Get events the volunteer is registered for
        registrations = EventRegistration.query.filter_by(user_id=current_user_id).all()
        event_ids = [reg.event_id for reg in registrations]
        events = Event.query.filter(Event.id.in_(event_ids)).all()
    
    return jsonify([event.to_dict() for event in events]), 200

@users_bp.route('/stats', methods=['GET'])
@jwt_required()
def get_user_stats():
    current_user_id = get_jwt_identity()
    user = User.query.get_or_404(current_user_id)
    
    if user.user_type == 'organizer':
        # Get organizer stats
        events_created = Event.query.filter_by(organizer_id=current_user_id).count()
        total_volunteers = db.session.query(EventRegistration).join(
            Event, Event.id == EventRegistration.event_id
        ).filter(Event.organizer_id == current_user_id).count()
        
        return jsonify({
            'eventsCreated': events_created,
            'totalVolunteers': total_volunteers
        }), 200
    else:
        # Get volunteer stats
        events_attended = EventRegistration.query.filter_by(
            user_id=current_user_id,
            status='attended'
        ).count()
        
        waste_logs = WasteLog.query.filter_by(user_id=current_user_id).all()
        total_waste = sum(float(log.quantity) for log in waste_logs)
        
        return jsonify({
            'eventsAttended': events_attended,
            'totalWasteCollected': total_waste,
            'wasteLogs': len(waste_logs)
        }), 200 