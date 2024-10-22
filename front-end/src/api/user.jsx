import api from './api'

//6 funções

// user = {name, email, password}
// user = {name, email, password}

export const createUser = async (user) => {
    const response = await api.post('api/v1/user', user)
    return response.data
}

export const createUserAdmin = async (user) => {
    const response = await api.post('api/v1/user/admin', user)
    return response.data
}

export const updateUser = async (id, user) => {
    const response = await api.put(`api/v1/user/${id}`, user)
    return response.data
}

export const updateUserAdmin = async (id, user) => {
    const response = await api.put(`api/v1/user/${id}`, user)
    return response.data
}

export const deleteUser = async (id) => {}

export const deleteUserAdmin = async (id) => {
    return api.delete(`/api/v1/user/${id}`)
}

export const getUserByid = async (id) => {
    const response = await api.put(`api/v1/user/${id}`, user)
    return response.data
}
export const getUsers = async () => {
    const response = await api.put(`api/v1/user/`)
    return response.data
}
export const loginUser = async (email, password) => {
    const response = await api.post(`api/v1/user/login`,{ email, senha:password})
    console.log(response)
    return response.data
}