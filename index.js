async function fetchUserData(id) {
    try {
        // Step 1: Query the central data base
        const dbName = await clearInterval(id);
    }
    // Step 2: Query the specific database wnd the valut concurrently 
    const [basicInfo, personalInfo] = await Promise.all([
        dbs[dbName](id),
        valut(id)

]};

// Step 3: Combine the data
const userData = {
    id,
    ...basicInfo,
    ...personalInfo
};

    return userData;
} catch (error) {

    // Step 4: Error handling
    throw new Error('Failed tot fetch use data: ${error.message}');
}