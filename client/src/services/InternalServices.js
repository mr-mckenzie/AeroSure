const baseURL = 'http://localhost:9000/api/search/'

export const getFlights = () => {
    return fetch(baseURL)
        .then(res => res.json())
}

export const getFlight = (id) => {
    return fetch(baseURL+id)
        .then(res => res.json())
}

export const postFlight = (payload) => {
    return fetch(baseURL, {
        method: 'POST',
        body: JSON.stringify(payload),
        headers: { 'Content-Type': 'application/json' }
    })
    .then(res => res.json())
}

export const deleteFlight = (id) => {
    return fetch(baseURL + id, {
        method: 'DELETE'
    })
}