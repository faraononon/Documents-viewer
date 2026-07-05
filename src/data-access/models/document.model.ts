export interface DocumentModel {
  name: string;
  pages: DocumentPageModel[];
}

export interface DocumentPageModel {
  number: number;
  imageUrl: string;
  annotations?: string[];
}
