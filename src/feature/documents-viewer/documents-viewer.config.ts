import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';

export const config: ApplicationConfig = {
  providers: [provideBrowserGlobalErrorListeners()],
};
