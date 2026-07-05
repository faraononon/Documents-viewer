import { bootstrapApplication } from '@angular/platform-browser';
import { DocumentsViewer } from './feature/documents-viewer/documents-viewer';
import { config } from './feature/documents-viewer/documents-viewer.config';

bootstrapApplication(DocumentsViewer, config).catch((err) => console.error(err));
