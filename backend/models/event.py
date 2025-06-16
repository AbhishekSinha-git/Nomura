from datetime import datetime
from sqlalchemy import Column, Integer, String, DateTime, Text, ForeignKey, Table, Float, Date, Time, JSON, Boolean
from sqlalchemy.orm import relationship
from database import Base

# Association table for event participants
event_participants = Table(
    'event_participants',
    Base.metadata,
    Column('event_id', Integer, ForeignKey('events.id')),
    Column('user_id', Integer, ForeignKey('users.id'))
)

class Event(Base):
    __tablename__ = 'events'

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String(255), nullable=False)
    description = Column(Text, nullable=False)
    location = Column(String(255), nullable=False)
    latitude = Column(Float, nullable=True)  # Added for map support
    longitude = Column(Float, nullable=True)  # Added for map support
    date = Column(Date, nullable=False)
    time_start = Column(Time, nullable=False)
    time_end = Column(Time, nullable=False)
    city = Column(String(100), nullable=False)
    state = Column(String(100), nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    
    # Relationships
    organizer_id = Column(Integer, ForeignKey('users.id'))
    organizer = relationship("User", back_populates="organized_events")
    participants = relationship("User", secondary=event_participants, back_populates="participated_events")
    waste_logs = relationship('WasteLog', back_populates='event')
    
    # Event details
    what_to_bring = Column(JSON, nullable=False)
    safety_protocols = Column(JSON, nullable=False)
    tags = Column(JSON, nullable=True)
    max_participants = Column(Integer, default=100)
    is_active = Column(Boolean, default=True)

    def __init__(self, title, description, location, date, time_start, time_end, city, state, organizer_id, what_to_bring, safety_protocols, tags, max_participants, is_active, latitude=None, longitude=None):
        self.title = title
        self.description = description
        self.location = location
        self.latitude = latitude
        self.longitude = longitude
        self.date = date
        self.time_start = time_start
        self.time_end = time_end
        self.city = city
        self.state = state
        self.organizer_id = organizer_id
        self.what_to_bring = what_to_bring
        self.safety_protocols = safety_protocols
        self.tags = tags
        self.max_participants = max_participants
        self.is_active = is_active

    def to_dict(self):
        return {
            'id': self.id,
            'title': self.title,
            'description': self.description,
            'location': self.location,
            'latitude': self.latitude,
            'longitude': self.longitude,
            'date': self.date.isoformat(),
            'time_start': self.time_start.isoformat(),
            'time_end': self.time_end.isoformat(),
            'city': self.city,
            'state': self.state,
            'organizer_id': self.organizer_id,
            'what_to_bring': self.what_to_bring,
            'safety_protocols': self.safety_protocols,
            'tags': self.tags,
            'max_participants': self.max_participants,
            'is_active': self.is_active,
            'created_at': self.created_at.isoformat(),
            'updated_at': self.updated_at.isoformat(),
            'volunteer_count': len(self.participants)
        }

class EventRegistration(Base):
    __tablename__ = 'event_registrations'

    id = Column(Integer, primary_key=True, index=True)
    event_id = Column(Integer, ForeignKey('events.id'), nullable=False)
    user_id = Column(Integer, ForeignKey('users.id'), nullable=False)
    status = Column(String(20), nullable=False, default='registered')
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    def __init__(self, event_id, user_id, status='registered'):
        self.event_id = event_id
        self.user_id = user_id
        self.status = status

    def to_dict(self):
        return {
            'id': self.id,
            'event_id': self.event_id,
            'user_id': self.user_id,
            'status': self.status,
            'created_at': self.created_at.isoformat(),
            'updated_at': self.updated_at.isoformat()
        } 