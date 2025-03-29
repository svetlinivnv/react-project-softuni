import moment from "moment";

export const formatDate = (timestamp, format) => {
    const date = timestamp?.toDate();
    return moment(date).format(format);
}