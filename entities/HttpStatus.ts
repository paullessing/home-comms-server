export default class HttpStatus {
    constructor(private _statusCode: number, private _description: string) {}

    get statusCode(): number { return this._statusCode }
    get description(): string { return this._description }

    static CONTINUE: HttpStatus = new HttpStatus(100, "Continue");
    static SWITCHING_PROTOCOLS: HttpStatus = new HttpStatus(101, "Switching Protocols");
    static PROCESSING: HttpStatus = new HttpStatus(102, "Processing");
    static OK: HttpStatus = new HttpStatus(200, "OK");
    static CREATED: HttpStatus = new HttpStatus(201, "Created");
    static ACCEPTED: HttpStatus = new HttpStatus(202, "Accepted");
    static NON_AUTHORITATIVE_INFORMATION: HttpStatus = new HttpStatus(203, "Non Authoritative Information");
    static NO_CONTENT: HttpStatus = new HttpStatus(204, "No Content");
    static RESET_CONTENT: HttpStatus = new HttpStatus(205, "Reset Content");
    static PARTIAL_CONTENT: HttpStatus = new HttpStatus(206, "Partial Content");
    static MULTI_STATUS: HttpStatus = new HttpStatus(207, "Multi-Status");
    static MULTIPLE_CHOICES: HttpStatus = new HttpStatus(300, "Multiple Choices");
    static MOVED_PERMANENTLY: HttpStatus = new HttpStatus(301, "Moved Permanently");
    static MOVED_TEMPORARILY: HttpStatus = new HttpStatus(302, "Moved Temporarily");
    static SEE_OTHER: HttpStatus = new HttpStatus(303, "See Other");
    static NOT_MODIFIED: HttpStatus = new HttpStatus(304, "Not Modified");
    static USE_PROXY: HttpStatus = new HttpStatus(305, "Use Proxy");
    static TEMPORARY_REDIRECT: HttpStatus = new HttpStatus(307, "Temporary Redirect");
    static BAD_REQUEST: HttpStatus = new HttpStatus(400, "Bad Request");
    static UNAUTHORIZED: HttpStatus = new HttpStatus(401, "Unauthorized");
    static PAYMENT_REQUIRED: HttpStatus = new HttpStatus(402, "Payment Required");
    static FORBIDDEN: HttpStatus = new HttpStatus(403, "Forbidden");
    static NOT_FOUND: HttpStatus = new HttpStatus(404, "Not Found");
    static METHOD_NOT_ALLOWED: HttpStatus = new HttpStatus(405, "Method Not Allowed");
    static NOT_ACCEPTABLE: HttpStatus = new HttpStatus(406, "Not Acceptable");
    static PROXY_AUTHENTICATION_REQUIRED: HttpStatus = new HttpStatus(407, "Proxy Authentication Required");
    static REQUEST_TIMEOUT: HttpStatus = new HttpStatus(408, "Request Timeout");
    static CONFLICT: HttpStatus = new HttpStatus(409, "Conflict");
    static GONE: HttpStatus = new HttpStatus(410, "Gone");
    static LENGTH_REQUIRED: HttpStatus = new HttpStatus(411, "Length Required");
    static PRECONDITION_FAILED: HttpStatus = new HttpStatus(412, "Precondition Failed");
    static REQUEST_TOO_LONG: HttpStatus = new HttpStatus(413, "Request Entity Too Large");
    static REQUEST_URI_TOO_LONG: HttpStatus = new HttpStatus(414, "Request-URI Too Long");
    static UNSUPPORTED_MEDIA_TYPE: HttpStatus = new HttpStatus(415, "Unsupported Media Type");
    static REQUESTED_RANGE_NOT_SATISFIABLE: HttpStatus = new HttpStatus(416, "Requested Range Not Satisfiable");
    static EXPECTATION_FAILED: HttpStatus = new HttpStatus(417, "Expectation Failed");
    static INSUFFICIENT_SPACE_ON_RESOURCE: HttpStatus = new HttpStatus(419, "Insufficient Space on Resource");
    static METHOD_FAILURE: HttpStatus = new HttpStatus(420, "Method Failure");
    static UNPROCESSABLE_ENTITY: HttpStatus = new HttpStatus(422, "Unprocessable Entity");
    static LOCKED: HttpStatus = new HttpStatus(423, "Locked");
    static FAILED_DEPENDENCY: HttpStatus = new HttpStatus(424, "Failed Dependency");
    static PRECONDITION_REQUIRED: HttpStatus = new HttpStatus(428, "Precondition Required");
    static TOO_MANY_REQUESTS: HttpStatus = new HttpStatus(429, "Too Many Requests");
    static REQUEST_HEADER_FIELDS_TOO_LARGE: HttpStatus = new HttpStatus(431, "Request Header Fields Too Large");
    static INTERNAL_SERVER_ERROR: HttpStatus = new HttpStatus(500, "Server Error");
    static NOT_IMPLEMENTED: HttpStatus = new HttpStatus(501, "Not Implemented");
    static BAD_GATEWAY: HttpStatus = new HttpStatus(502, "Bad Gateway");
    static SERVICE_UNAVAILABLE: HttpStatus = new HttpStatus(503, "Service Unavailable");
    static GATEWAY_TIMEOUT: HttpStatus = new HttpStatus(504, "Gateway Timeout");
    static HTTP_VERSION_NOT_SUPPORTED: HttpStatus = new HttpStatus(505, "HTTP Version Not Supported");
    static INSUFFICIENT_STORAGE: HttpStatus = new HttpStatus(507, "Insufficient Storage");
    static NETWORK_AUTHENTICATION_REQUIRED: HttpStatus = new HttpStatus(511, "Network Authentication Required");
}
