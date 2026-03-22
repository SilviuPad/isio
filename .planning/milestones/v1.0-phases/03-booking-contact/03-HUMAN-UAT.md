---
status: partial
phase: 03-booking-contact
source: [03-VERIFICATION.md]
started: 2026-03-22
updated: 2026-03-22
---

## Current Test

[awaiting human testing]

## Tests

### 1. Submit contact form on /contact/ (RO) and verify admin receives email
expected: Admin inbox receives a formatted HTML email with name, email, service, and message fields from the visitor
result: [pending]

### 2. Submit contact form on /en/contact/ (EN) and verify email arrives in English
expected: Same as above, success message reads: 'Message sent! We'll get back to you within 24 hours.'
result: [pending]

### 3. Visit /contact/ and /en/contact/ and confirm Cal.com widget loads inline
expected: Month-view calendar renders inside the glass-card container with dark theme; no redirect to cal.eu
result: [pending]

### 4. Verify booking creates event on admin's Google Calendar
expected: After selecting a slot and completing the booking flow, the event appears on the admin's Google Calendar with visitor details
result: [pending]

### 5. Test contact form and Cal.com embed at 375px mobile viewport
expected: Contact form stacks single column, Cal.com embed is responsive, success/error messages are readable
result: [pending]

### 6. Verify Turnstile spam protection blocks invalid tokens
expected: Submitting without valid Turnstile token returns 403 error and error message displays inline
result: [pending]

## Summary

total: 6
passed: 0
issues: 0
pending: 6
skipped: 0
blocked: 0

## Gaps
