
export const parseCurrency = (value) => {
    value = value / 100
    return value.toFixed(2)
}

// TODO: Date Parser

export const parseDate = (value) => {
    let options = {  day: 'numeric', month: 'short', year: 'numeric' }
    let parsed = new Date(value).toLocaleDateString("en-GB", options).split(" ").join("/")
    let month = parsed.split("/")[1].toUpperCase()
    parsed.split("/").splice(1, month)
    return parsed
}