export interface IPsychologistFilters {
  sex: string;
  ageFrom: number;
  ageTo: number;
  subjectId: number;
  profSpeciality: string;
  rating: string;
  isCertified: string | boolean;
  ratingFrom: string | undefined;
  ratingTo: string | undefined;
  [key: string]: string | number | boolean | undefined;
}

export interface IPsychologistsPagination {
  offset: number;
  limit: number;
}

export interface IPsychologistData {
  profSpeciality: number
  isCertified: boolean
  userId: string
  name: string
  rating: number
  onlineStatus: number
  lastActivityTime: string
  photoUrl: string
  defaultSubjectName: string
  sex: number
  birthDate: string
  age: number
  subjectsCount: number
  isFavorite: boolean
  hasVideo: boolean
}

export interface ISubject {
  id: number
  name: string
  sequence: number
}
