//Stores user data into session storage.
export const storageSave = (key, value) => {
    sessionStorage.setItem(key, JSON.stringify(value))
}

//Reads and returns data from session storage
export const storageRead = key => {
    const data = sessionStorage.getItem(key)
    if (data) {
        return JSON.parse(data)
    }
    return null;
}

//Deletes user from session storage
export const storageDelete = key => {
    sessionStorage.removeItem(key)
}