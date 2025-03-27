export interface PostUserRequest {
    nickname: string;
    gender: string;
    age: number;
}

export interface PutPreferencesRequest {
    minAge?: number,
    maxAge?: number,
}
