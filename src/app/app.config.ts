import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';

import { REDUCER_PROVIDER, getInitialState, reducerToken } from '@AppStore';
import {
  HttpClient,
  HttpClientModule,
  provideHttpClient,
  withFetch,
} from '@angular/common/http';
import { provideClientHydration } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { provideStore } from '@ngrx/store';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { routes } from './app.routes';
import { MultiTranslateLoader } from './shared/loaders/multi-translate.loader';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideClientHydration(),
    provideHttpClient(withFetch()),
    importProvidersFrom([
      HttpClientModule,
      TranslateModule.forRoot({
        loader: {
          provide: TranslateLoader,
          useFactory: (httpClient: HttpClient) =>
            new MultiTranslateLoader(httpClient),
          deps: [HttpClient],
        },
      }),
      BrowserAnimationsModule,
    ]),
    provideStore(reducerToken, { initialState: getInitialState }),
    REDUCER_PROVIDER,
  ],
};
