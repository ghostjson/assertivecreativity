import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptor } from './token.interceptor';


export const httpInterceptProvider = [
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true }
]