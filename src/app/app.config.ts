import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';
import { environment } from '../environments/environment';
import { mockInterceptor } from './services/http/mock.interceptor';

export const appConfig: ApplicationConfig = {
	providers: [
		provideZoneChangeDetection({ eventCoalescing: true }),
		provideRouter(routes),
		// モックモードが有効な場合はモックインターセプターを使用
		environment.useMockData
			? provideHttpClient(withInterceptors([mockInterceptor]))
			: provideHttpClient(),
		provideAnimations(),
	],
};
