from app import db
from datetime import datetime
import uuid

class WasteLog(db.Model):
    __tablename__ = 'waste_logs'

    id = db.Column(db.UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    event_id = db.Column(db.UUID(as_uuid=True), db.ForeignKey('events.id'), nullable=False)
    user_id = db.Column(db.UUID(as_uuid=True), db.ForeignKey('users.id'), nullable=False)
    waste_type = db.Column(db.String(50), nullable=False)
    quantity = db.Column(db.Numeric(10, 2), nullable=False)
    unit = db.Column(db.String(20), nullable=False)
    notes = db.Column(db.Text)
    created_at = db.Column(db.DateTime(timezone=True), default=datetime.utcnow)
    updated_at = db.Column(db.DateTime(timezone=True), default=datetime.utcnow, onupdate=datetime.utcnow)

    def __init__(self, event_id, user_id, waste_type, quantity, unit, notes=None):
        self.event_id = event_id
        self.user_id = user_id
        self.waste_type = waste_type
        self.quantity = quantity
        self.unit = unit
        self.notes = notes

    def to_dict(self):
        return {
            'id': str(self.id),
            'event_id': str(self.event_id),
            'user_id': str(self.user_id),
            'waste_type': self.waste_type,
            'quantity': float(self.quantity),
            'unit': self.unit,
            'notes': self.notes,
            'created_at': self.created_at.isoformat(),
            'updated_at': self.updated_at.isoformat()
        } 