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
