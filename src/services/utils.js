function makeId(length=5){
    return Math.random().toString(36).substr(2, length<3?3:length);
}

export default {
    makeId
}
