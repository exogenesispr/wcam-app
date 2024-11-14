export default function getCharacterProfile(wowClient, realm, characterName) {
    return wowClient.wow.character(['profile'], {
        realm: realm,
        name: characterName,
        namespace: 'profile-classic-eu',
    })
        .then((res) => {
            console.log('Full API response: ', res)
            if (res.status === 200) {
                return res.json()
            }

            if (res.status === 400) {
                throw new Error('Token expired')
            }

        })
        .catch(error => {
            console.error('Error fetching character profile:', error.message)
            throw error
        })
}