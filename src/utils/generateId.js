export default function generateId() {
    const id = "id_" + Math.random().toString(36).substr(2, 9);
    return id;
}