export default interface INotification {
    id: string,
    img: string,
    url: string,
    date: Date,
    isRead: boolean,
    title: string,
    entityType: string,
    entityId: string,
    type: string
}