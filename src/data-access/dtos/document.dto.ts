export interface DocumentDto {
  name: string;
  pages: DocumentPageDto[];
}

export interface DocumentPageDto {
  number: number;
  imageUrl: string;
  annotations?: string[];
}
