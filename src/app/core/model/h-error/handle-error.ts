export interface HandleError {
    code: 'EMAIL_TAKEN' | 'VALIDATION_ERROR'
    | 'SERVER_DOWN' | 'UNAUTHORIZED' | 'NOT_FOUND' | 'UNKNOWN_ERROR';
    details?: {
        email?: string;
        password?: string;
    };
}
//el back manda el error, seteamos el codigo en .code, en caso de errores
//de validacion le mandamos los details(email,password), luego en cada .ts se hace el manejo del error 