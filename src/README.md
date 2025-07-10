# Resilient Email Sending Service

This project implements a resilient email-sending service using Node.js and Express. It supports retry logic, fallback providers, idempotency, rate limiting, and status tracking.

## Features

- ✅ Retry with exponential backoff
- ✅ Fallback to backup provider
- ✅ Rate limiting
- ✅ Idempotency using email ID
- ✅ Circuit breaker (bonus)
- ✅ Status tracking (sent, failed, duplicate, etc.)

## Tech Stack

- Node.js
- Express
- Jest (for testing)

## How to Run

```bash
npm install
npm start
