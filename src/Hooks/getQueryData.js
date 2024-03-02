import React from 'react'

const getQueryData = async(queryString, setQResponse) => {
    console.log("Query String: ", queryString)
    const response = await fetch(`https://project-crs-server-1.onrender.com/api/v1/form/cet/${queryString}`)
    const data = await response.json();

    console.log(data);
}

export default getQueryData