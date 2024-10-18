import { central, dbs, vault } from './database.js';

async function fetchUserData(id) {
    if (!Number.isInteger(id) || id < 1 || id > 10) {
        throw new Error('Invalid id. Must be an integer between 1 and 10.');
    }

    try {
        const dbName = await central(id);
        const [basicInfo, personalInfo] = await Promise.all([
            dbs[dbName](id).catch(error => {
                throw new Error(`${dbName} database failed: ${error.message}`);
            }),
            vault(id)
        ]);
        
        const userData = {
            id,
            name: personalInfo.name,
            username: basicInfo.username,
            email: personalInfo.email,
            address: personalInfo.address,
            phone: personalInfo.phone,
            website: basicInfo.website,
            company: basicInfo.company
        };

        const requiredFields = ['id', 'name', 'username', 'email', 'address', 'phone', 'website', 'company'];
        for (const field of requiredFields) {
            if (userData[field] === undefined) {
                throw new Error(`Missing required field: ${field}`);
            }
        }

        if (!userData.address.geo || !userData.address.geo.lat || !userData.address.geo.lng) {
            throw new Error('Missing required nested fields in address.geo');
        }

        return userData;
    } catch (error) {
        throw new Error(`Failed to fetch user data: ${error.message}`);
    }
}

async function testFetchUserData() {
    for (let i = 1; i <= 10; i++) {
        try {
            const user = await fetchUserData(i);
            console.log(`Valid user ${i}:`, user);
        } catch (error) {
            console.error(`Error fetching user ${i}:`, error.message);
        }
    }

    try {
        await fetchUserData(11);
    } catch (error) {
        console.error('Error with invalid ID:', error.message);
    }

    try {
        await fetchUserData('abc');
    } catch (error) {
        console.error('Error with invalid data type:', error.message);
    }
}

testFetchUserData();