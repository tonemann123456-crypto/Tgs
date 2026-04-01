# Security Guidelines

## Environment Variables
- **DATABASE_URL**: PostgreSQL connection string (keep private)
- **JWT_SECRET**: Secret key for token signing (generate a strong random string)
- **ALLOWED_ORIGINS**: Comma-separated list of allowed origins for CORS

## Security Features Implemented

### Input Validation
- Email validation with regex pattern
- Card name length validation (max 200 characters)
- Certificate ID length validation (max 50 characters)

### Database Security
- All queries use parameterized statements (\$1, \$2, etc.)
- SQL injection prevention through parameter binding

### CORS Configuration
- Whitelist allowed origins in environment variables
- Preflight request handling
- Security headers configuration

### Headers
- X-Content-Type-Options: nosniff (prevents MIME sniffing)
- X-Frame-Options: DENY (prevents clickjacking)
- X-XSS-Protection: 1; mode=block (XSS protection)

## Best Practices

1. **Never commit .env files**
   - Use .env.example as template
   - Add .env to .gitignore

2. **Rate Limiting**
   - Consider implementing rate limiting for /api/submit
   - Use packages like express-rate-limit

3. **Authentication**
   - Use JWT tokens for protected routes
   - Implement token refresh mechanism

4. **Logging**
   - Log all submission attempts
   - Monitor scan logs for abuse patterns

5. **Database Maintenance**
   - Regular backups of certs and submissions tables
   - Archive old scan logs periodically

## Reporting Security Issues

If you discover a security vulnerability, please email security@titanslabs.com