from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from models.event import Event, EventRegistration
from models.user import User
from models.waste_log import WasteLog
from app import db
import uuid
from datetime import datetime
from services.llm_service import llm_service
from services.geocoding_service import geocoding_service
import json

events_bp = Blueprint('events', __name__)

@events_bp.route('/events', methods=['GET'])
def get_events():
    """Get all active events"""
    events = Event.query.filter_by(is_active=True).all()
    return jsonify([event.to_dict() for event in events])

@events_bp.route('/events/map-data', methods=['GET'])
def get_map_data():
    """Get map data for all active events"""
    events = Event.query.filter_by(is_active=True).all()
    map_data = []
    
    for event in events:
        # If coordinates are not set, try to geocode the address
        if event.latitude is None or event.longitude is None:
            full_address = f"{event.location}, {event.city}, {event.state}"
            coordinates = geocoding_service.get_coordinates(full_address)
            
            if coordinates:
                event.latitude, event.longitude = coordinates
                db.session.commit()
        
        if event.latitude and event.longitude:
            map_data.append({
                'id': event.id,
                'title': event.title,
                'location': event.location,
                'latitude': event.latitude,
                'longitude': event.longitude,
                'date': event.date.isoformat(),
                'volunteer_count': len(event.participants)
            })
    
    return jsonify(map_data)

@events_bp.route('/events/<int:event_id>', methods=['GET'])
def get_event(event_id):
    """Get a specific event by ID"""
    event = Event.query.get_or_404(event_id)
    return jsonify(event.to_dict())

@events_bp.route('/events', methods=['POST'])
@jwt_required()
def create_event():
    """Create a new event"""
    current_user_id = get_jwt_identity()
    data = request.get_json()

    # Validate required fields
    required_fields = ['title', 'description', 'date', 'time_start', 'time_end', 
                      'location', 'city', 'state', 'what_to_bring', 'safety_protocols']
    for field in required_fields:
        if field not in data:
            return jsonify({'error': f'Missing required field: {field}'}), 400

    # Geocode the address
    full_address = f"{data['location']}, {data['city']}, {data['state']}"
    coordinates = geocoding_service.get_coordinates(full_address)
    latitude, longitude = coordinates if coordinates else (None, None)

    # Create new event
    event = Event(
        title=data['title'],
        description=data['description'],
        date=datetime.fromisoformat(data['date']),
        time_start=datetime.fromisoformat(data['time_start']),
        time_end=datetime.fromisoformat(data['time_end']),
        location=data['location'],
        city=data['city'],
        state=data['state'],
        organizer_id=current_user_id,
        what_to_bring=json.dumps(data['what_to_bring']),
        safety_protocols=json.dumps(data['safety_protocols']),
        tags=json.dumps(data.get('tags', [])),
        max_participants=data.get('max_participants', 100),
        is_active=True,
        latitude=latitude,
        longitude=longitude
    )

    db.session.add(event)
    db.session.commit()

    return jsonify(event.to_dict()), 201

@events_bp.route('/events/<int:event_id>', methods=['PUT'])
@jwt_required()
def update_event(event_id):
    """Update an existing event"""
    current_user_id = get_jwt_identity()
    event = Event.query.get_or_404(event_id)

    # Check if user is the organizer
    if event.organizer_id != current_user_id:
        return jsonify({'error': 'Unauthorized'}), 403

    data = request.get_json()

    # Update fields if provided
    if 'title' in data:
        event.title = data['title']
    if 'description' in data:
        event.description = data['description']
    if 'date' in data:
        event.date = datetime.fromisoformat(data['date'])
    if 'time_start' in data:
        event.time_start = datetime.fromisoformat(data['time_start'])
    if 'time_end' in data:
        event.time_end = datetime.fromisoformat(data['time_end'])
    if 'location' in data:
        event.location = data['location']
    if 'city' in data:
        event.city = data['city']
    if 'state' in data:
        event.state = data['state']
    if 'what_to_bring' in data:
        event.what_to_bring = json.dumps(data['what_to_bring'])
    if 'safety_protocols' in data:
        event.safety_protocols = json.dumps(data['safety_protocols'])
    if 'tags' in data:
        event.tags = json.dumps(data['tags'])
    if 'max_participants' in data:
        event.max_participants = data['max_participants']
    if 'is_active' in data:
        event.is_active = data['is_active']

    db.session.commit()
    return jsonify(event.to_dict())

@events_bp.route('/events/<int:event_id>/join', methods=['POST'])
@jwt_required()
def join_event(event_id):
    """Join an event"""
    current_user_id = get_jwt_identity()
    event = Event.query.get_or_404(event_id)

    # Check if event is active
    if not event.is_active:
        return jsonify({'error': 'Event is not active'}), 400

    # Check if user is already a participant
    if current_user_id in [p.id for p in event.participants]:
        return jsonify({'error': 'Already registered for this event'}), 400

    # Check if event is full
    if len(event.participants) >= event.max_participants:
        return jsonify({'error': 'Event is full'}), 400

    # Add user to participants
    event.participants.append(current_user_id)
    db.session.commit()

    return jsonify({'message': 'Successfully joined event'})

@events_bp.route('/events/<int:event_id>/leave', methods=['POST'])
@jwt_required()
def leave_event(event_id):
    """Leave an event"""
    current_user_id = get_jwt_identity()
    event = Event.query.get_or_404(event_id)

    # Check if user is a participant
    if current_user_id not in [p.id for p in event.participants]:
        return jsonify({'error': 'Not registered for this event'}), 400

    # Remove user from participants
    event.participants.remove(current_user_id)
    db.session.commit()

    return jsonify({'message': 'Successfully left event'})

@events_bp.route('/events/<int:event_id>', methods=['DELETE'])
@jwt_required()
def delete_event(event_id):
    """Delete an event (soft delete)"""
    current_user_id = get_jwt_identity()
    event = Event.query.get_or_404(event_id)

    # Check if user is the organizer
    if event.organizer_id != current_user_id:
        return jsonify({'error': 'Unauthorized'}), 403

    # Soft delete by setting is_active to False
    event.is_active = False
    db.session.commit()

    return jsonify({'message': 'Event deleted successfully'})

@events_bp.route('/<uuid:event_id>/generate-post', methods=['POST'])
@jwt_required()
def generate_social_post(event_id):
    current_user_id = get_jwt_identity()
    event = Event.query.get_or_404(event_id)
    
    if str(event.organizer_id) != current_user_id:
        return jsonify({'error': 'Only the event organizer can generate posts'}), 403
    
    # Get event analytics
    volunteer_count = len(event.registrations)
    waste_logs = WasteLog.query.filter_by(event_id=event_id).all()
    total_waste = sum(float(log.quantity) for log in waste_logs)
    
    # Construct prompt for LLM
    prompt = f"""Generate an engaging social media post for a beach cleanup event with the following details:
    Event: {event.title}
    Location: {event.location}
    Date: {event.date}
    Time: {event.time_start} to {event.time_end}
    Volunteers: {volunteer_count}
    Total Waste Collected: {total_waste} kg
    
    The post should be engaging, highlight the impact, and encourage more participation.
    Keep it under 280 characters for Twitter compatibility."""
    
    system_prompt = "You are a social media expert helping to create engaging posts for environmental events."
    
    try:
        generated_post = llm_service.generate_text(
            prompt=prompt,
            system_prompt=system_prompt,
            temperature=0.7,
            max_tokens=200
        )
        
        return jsonify({
            'post': generated_post
        }), 200
        
    except Exception as e:
        return jsonify({'error': f'Failed to generate post: {str(e)}'}), 500

@events_bp.route('/<uuid:event_id>/ask-ecobot', methods=['POST'])
@jwt_required()
def ask_ecobot(event_id):
    current_user_id = get_jwt_identity()
    event = Event.query.get_or_404(event_id)
    
    data = request.get_json()
    if 'question' not in data:
        return jsonify({'error': 'Question is required'}), 400
    
    # Construct context-aware prompt
    context = f"""Event Context:
    Title: {event.title}
    Description: {event.description}
    Location: {event.location}
    Date: {event.date}
    Time: {event.time_start} to {event.time_end}
    What to Bring: {', '.join(json.loads(event.what_to_bring))}
    Safety Protocols: {', '.join(json.loads(event.safety_protocols))}
    
    User Question: {data['question']}
    
    Please answer the question based ONLY on the provided event context. If the question cannot be answered using the context, say so."""
    
    system_prompt = "You are EcoBot, an AI assistant that helps volunteers with event-related questions. Only use the provided context to answer questions."
    
    try:
        answer = llm_service.generate_text(
            prompt=context,
            system_prompt=system_prompt,
            temperature=0.3,  # Lower temperature for more focused answers
            max_tokens=500
        )
        
        return jsonify({
            'answer': answer
        }), 200
        
    except Exception as e:
        return jsonify({'error': f'Failed to get answer: {str(e)}'}), 500 