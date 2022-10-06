import { createHeaders } from "."

//Access API URL from .env file
const apiUrl = process.env.REACT_APP_API_URL

//Checks if user exist
const checkForUser = async (username) => {
    try {
        const response = await fetch(`${apiUrl}?username=${username}`)
        if(!response.ok) {
            throw new Error('Could not complete request.')
        }
        const data = await response.json()
        return [ null, data ]

    } catch (error) {
        return [ error.message, [] ]
    }
}

//Creates new user
const createUser = async (username) => {
    try {
        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: createHeaders(),
            body: JSON.stringify({
                username,
                translations:[]
            })
        })
        if(!response.ok) {
            throw new Error('Could not create user with username ' + username)
        }
        const data = await response.json()
        return [ null, data ]

    } catch (error) {
        return [ error.message, [] ]
    }
} 

export const loginUser = async (username) => {
    const [ checkError, user ] = await checkForUser(username)

    //If there is an error with the fetch request this code will execute
    if (checkError !== null) {
        return [ checkError, null ]
    }
    //Checks if user exists in api
    if(user.length > 0) {
        return [ null, user.pop() ]//Using .pop to get the last element in the array
    }

    //If use doesn't exist, run creatUser method
    return createUser(username)

}

