async function fetchUserData(id) {
    try {
      // Step 1: Query the central database
      const dbName = await central(id);
      
      // Step 2: Query the specific database and the vault concurrently
      const [basicInfo, personalInfo] = await Promise.all([
        dbs[dbName](id),
        vault(id)
      ]);
      
      // Step 3: Combine the data
      const userData = {
        id,
        ...basicInfo,
        ...personalInfo
      };
      
      return userData;
    } catch (error) {
      // Step 4: Error handling
      throw new Error(`Failed to fetch user data: ${error.message}`);
    }
  }

async function fetchUserData(id) {
    // Input validation
    if (!Number.isInteger(id) || id < 1 || id > 10) {
        throw new Error('Invalid id. Mustbe an integer between 1 and 10.');
    }

    try {
        // Query the central database
        const dbName = await central(id);
        
        // Query the specific database and the vault concurrently 
        const [basicInfo, personalInfo] = await Promise.all([
            dbs[dbName](id).catch(error => {
                throw new Error(`${dbName} database failed: ${error.message}`);
            }),
            vault(id)
          ]);
        }

        // Combine the data
        const userData = {
            id,
            name: personalInfo.name,
            username: basicInfo.username,
            email: personalInfo.email,
            address: personalInfo.address,
            phone: personalInfo.phone,
            website: personalInfo.website,
            company: personalInfo.company,
        };

        