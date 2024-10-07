export default function getCharacterData(realm, characterName, token) {
    const apiUrl = `https://eu.api.blizzard.com/profile/wow/character/${realm}/${characterName}`

    return fetch(`${apiUrl}?namespace=profile-classic-us&locale=en_US`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`
        },
    })
        .then((res) => res.json())
        .then((data) => {
            console.log('Character Data:', data)
            return data
        })
        .catch((error) => {
            console.error('Error fetching character data:', error)
        })
}