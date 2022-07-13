export type PhotoType = {
    small: string
    large: string
}
export type UserType = {
    id: number
    name: string
    status: string
    photos: PhotoType
    followed: boolean
}