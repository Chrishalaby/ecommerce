import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';

import {
  HttpBackend,
  HttpClient,
  HttpClientModule,
} from '@angular/common/http';
import { provideClientHydration } from '@angular/platform-browser';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { routes } from './app.routes';

export function TranslateLoaderFactory(httpBackend: HttpBackend) {
  // Note: Using HttpBackend to bypass HttpClient interceptors
  // If you don't need to bypass interceptors, you can use HttpClient instead
  return new TranslateHttpLoader(
    new HttpClient(httpBackend),
    './assets/i18n/',
    '.json'
  );
}
export const provideTranslation = () => ({
  defaultLanguage: 'en',
  loader: {
    provide: TranslateLoader,
    useFactory: TranslateLoaderFactory,
    deps: [HttpBackend],
  },
});
export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideClientHydration(),
    importProvidersFrom([
      HttpClientModule,
      TranslateModule.forRoot(provideTranslation()),
    ]),
  ],
};
