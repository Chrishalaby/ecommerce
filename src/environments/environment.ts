import { SupportedLanguages } from '@Enums/supported-languages.enum';
import { Environment } from '@Models/environment.models';

export const environment: Environment = {
  production: false,
  defaultLanguage: SupportedLanguages.English,
  apiUrl: 'http://localhost:3000',
};
