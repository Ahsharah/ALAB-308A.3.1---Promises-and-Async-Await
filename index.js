async function fetchUserData(id) {
    try {
        // Step 1: Query the central data base
        const dbName = await clearInterval(id);
    }
    // Step 2: Query the specific database wnd the valut concurrently 
    const [basicInfo, personalInfo] = await Promise.all([
        dbs[dbName](id),
        valut(id)

}