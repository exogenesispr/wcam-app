export default function getCharacterProfile(wowClient, realm, characterName) {
    return wowClient.wow.character(['profile'], {
        realm: realm,
        name: characterName,
        namespace: 'profile-classic-eu',
    })
        .then(res => {
            console.log('Character Data is: ', res.data)
            return res.data
        })
        .catch(error => {
            console.error('Error fetching character profile:', error)
            throw error
        })
}