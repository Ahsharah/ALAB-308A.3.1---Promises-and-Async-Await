async function fetchUserData(id) {
    // The input validation
    if (!Number.isInteger(id) || id < 1 || id > 10) {
        throw new Error('Invalid id. Must be an integer between 1 and 10.');
    }

    try {
        // Request the central database
        const dbName = await central(id);
        
        // Request the specific database and the vault concurrently 
        const [basicInfo, personalInfo] = await Promise.all([
            dbs[dbName](id).catch(error => {
                throw new Error(`${dbName} database failed: ${error.message}`);
            }),
            vault(id)
        ]);
        
        // Combine the data
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

        // Ensure all required fields are present
        const requiredFields = ['id', 'name', 'username', 'email', 'address', 'phone', 'website', 'company'];
        for (const field of requiredFields) {
            if (userData[field] === undefined) {
                throw new Error(`Missing required field: ${field}`);
            }
        }

        // Ensure nested fields are present
        if (!userData.address.geo || !userData.address.geo.lat || !userData.address.geo.lng) {
            throw new Error('Missing required nested fields in address.geo');
        }

        return userData;
    } catch (error) {
        throw new Error(`Failed to fetch user data: ${error.message}`);
    }
}

// Test Function
async function testFetchUserData() {
    try {
        // Test with valid ID
        const user1 = await fetchUserData(1);
        console.log('Valid user:', user1);
        
        // Test with invalid ID (out of range)
        await fetchUserData(11);   
    } catch (error) {
        console.error('Error:', error.message);
    }

    // Test with invalid data type
    try {
        await fetchUserData('abc');
    } catch (error) {
        console.error('Error with invalid data type:', error.message);
    }
}

testFetchUserData();