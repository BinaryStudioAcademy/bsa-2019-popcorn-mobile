export default interface INotification {
    id: string,
    userInfo: {
        avatar: string,
        name: string
    },
    type: string,
    date: Date,
    isRead: boolean
}