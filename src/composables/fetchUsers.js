
const fetchUsers = async () => {
    const candidateId = "rT03MZh63OUU8U8"
    const errors = null
    const res = await fetch(`https://cornie-assessment.herokuapp.com/users/${candidateId}`)
    const response_data = await res.json()
    let data = response_data.data
    console.log(data)
    return { errors, data }
}

export { fetchUsers }