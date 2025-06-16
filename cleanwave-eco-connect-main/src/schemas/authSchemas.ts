
import { z } from 'zod';

export const loginSchema = z.object({
  email: z.string()
    .min(1, 'Email is required')
    .email('Please enter a valid email address'),
  password: z.string()
    .min(6, 'Password must be at least 6 characters long')
    .max(100, 'Password is too long')
});

export const signupSchema = z.object({
  fullName: z.string()
    .min(2, 'Full name must be at least 2 characters')
    .max(50, 'Full name is too long')
    .regex(/^[a-zA-Z\s]+$/, 'Full name can only contain letters and spaces'),
  email: z.string()
    .min(1, 'Email is required')
    .email('Please enter a valid email address'),
  password: z.string()
    .min(6, 'Password must be at least 6 characters long')
    .max(100, 'Password is too long')
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/, 'Password must contain at least one uppercase letter, one lowercase letter, and one number'),
  userType: z.enum(['volunteer', 'organizer'], {
    required_error: 'Please select a user type'
  })
});

export const eventSchema = z.object({
  title: z.string()
    .min(5, 'Event title must be at least 5 characters')
    .max(100, 'Event title is too long'),
  description: z.string()
    .min(20, 'Description must be at least 20 characters')
    .max(1000, 'Description is too long'),
  location: z.string()
    .min(5, 'Location must be at least 5 characters')
    .max(100, 'Location is too long'),
  date: z.date({
    required_error: 'Please select a date'
  }),
  time: z.string()
    .min(1, 'Please select a time')
    .regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, 'Please enter a valid time format')
});

export type LoginFormData = z.infer<typeof loginSchema>;
export type SignupFormData = z.infer<typeof signupSchema>;
export type EventFormData = z.infer<typeof eventSchema>;
