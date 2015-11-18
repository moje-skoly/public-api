/**
 * These are many of the standard HTTP response codes.
 * Use them wisely. 
 */

// Success codes
export const OK = 200;
export const CREATED = 201;
export const ACCEPTED = 202;
export const PARTINAL_INFORMATION = 203;
export const NO_RESPONSE = 204;

// Redirection codes
export const MOVED = 301;
export const FOUND = 302;
export const METHOD = 303;
export const NOT_MODIFIED = 304; 

// Client error codes
export const BAD_REQUEST = 400;
export const UNAUTHORIZED = 401;
export const PAYMENT_REQUIRED = 402;
export const FORBIDDEN = 403;
export const NOT_FOUND = 404;

// Server error codes
export const INTERNAL_ERROR = 500;
export const NOT_IMPLEMENTED = 501;
export const SERVICE_TEMPORARILY_OVERLOADER = 502;
export const TO_BE_DISCUSSED = 503;