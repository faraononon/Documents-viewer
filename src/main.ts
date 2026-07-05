import { bootstrapApplication } from '@angular/platform-browser';
import { DocumentsViewer } from './entities/documents-viewer.component';
import { config } from './entities/documents-viewer.config';

bootstrapApplication(DocumentsViewer, config).catch((err) => console.error(err));
