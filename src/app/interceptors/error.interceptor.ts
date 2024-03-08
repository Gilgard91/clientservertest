import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, catchError, of } from "rxjs";
import { ErrorService } from "../error.service";

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
    constructor(private errorSrv: ErrorService){}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        console.log(req);
        return next.handle(req).pipe(
            catchError((err:HttpErrorResponse) => {
                this.errorSrv.setError(err.error.message)
                return of(err.error)
            })
        )
    }

    
}