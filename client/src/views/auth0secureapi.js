const auth0SecureAPI = async (getAccessTokenSilently, endpoint, body) => {
    let payload;
    try {
        const accessToken = await getAccessTokenSilently({});
        let response;
        if(body) {
            payload = {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(body)
            };
        } else {
            payload = {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                }
            };
        }
        response = await fetch("http://localhost:8000/api/" + endpoint, payload);
        return response.json();
    } catch (e) {
        console.log(e.message);
    }
}

export default auth0SecureAPI;