export interface moveItemPayload {
    item: string,
    destination: string
}

export interface moveItemBody {
    user: string,
    prevList: string,
    item: string,
    destination: string
}