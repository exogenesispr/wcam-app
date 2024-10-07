import dotenv from 'dotenv'

dotenv.config()

export default function getOAuthToken() {
    const tokenUrl = 'https://oauth.battle.net/token'
    const clientId = process.env.BLIZZARD_CLIENT_ID
    const clientSecret = process.env.BLIZZARD_CLIENT_SECRET
    const auth = Buffer.from(`${clientId}:${clientSecret}`).toString('base64')

    return fetch(tokenUrl, {
        method: 'POST',
        headers: {
            'Authorization': `Basic ${auth}`,
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: 'grant_type=client_credentials',
    })
        .then((res) => res.json())
        .then((data) => {
            console.log('OAuth Token:', data.access_token)
            return data.access_token
        })
        .catch((error) => {
            console.error('Error fetching OAuth token:', error)
        })
}