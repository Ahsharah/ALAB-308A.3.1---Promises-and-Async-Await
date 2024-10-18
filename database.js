export function central(id) {
    const dbMap = {
        1: 'db1', 2: 'db2', 3: 'db1', 4: 'db2', 5: 'db1',
        6: 'db2', 7: 'db1', 8: 'db2', 9: 'db1', 10: 'db2'
    };
    return Promise.resolve(dbMap[id] || 'db1');
}

const db1 = {
    1: { username: 'user1', website: 'website1.com', company: 'Company A' },
    3: { username: 'user3', website: 'website3.com', company: 'Company C' },
    5: { username: 'user5', website: 'website5.com', company: 'Company E' },
    7: { username: 'user7', website: 'website7.com', company: 'Company G' },
    9: { username: 'user9', website: 'website9.com', company: 'Company I' }
};

const db2 = {
    2: { username: 'user2', website: 'website2.com', company: 'Company B' },
    4: { username: 'user4', website: 'website4.com', company: 'Company D' },
    6: { username: 'user6', website: 'website6.com', company: 'Company F' },
    8: { username: 'user8', website: 'website8.com', company: 'Company H' },
    10: { username: 'user10', website: 'website10.com', company: 'Company J' }
};

export const dbs = {
    db1: (id) => Promise.resolve(db1[id]),
    db2: (id) => Promise.resolve(db2[id])
};

export function vault(id) {
    const personalInfo = {
        1: { name: 'John Doe', email: 'john@example.com', address: { street: '123 Main St', city: 'Anytown', zipcode: '12345', geo: { lat: '40.7128', lng: '-74.0060' } }, phone: '1-770-736-8031 x56442' },
        2: { name: 'Jane Smith', email: 'jane@example.com', address: { street: '456 Elm St', city: 'Somewhere', zipcode: '67890', geo: { lat: '34.0522', lng: '-118.2437' } }, phone: '1-463-123-4447' },
        3: { name: 'Bob Johnson', email: 'bob@example.com', address: { street: '789 Oak St', city: 'Elsewhere', zipcode: '54321', geo: { lat: '41.8781', lng: '-87.6298' } }, phone: '1-555-987-6543' },
        4: { name: 'Alice Brown', email: 'alice@example.com', address: { street: '321 Pine St', city: 'Nowhere', zipcode: '13579', geo: { lat: '29.7604', lng: '-95.3698' } }, phone: '1-234-567-8901' },
        5: { name: 'Charlie Wilson', email: 'charlie@example.com', address: { street: '654 Birch St', city: 'Someplace', zipcode: '24680', geo: { lat: '33.7490', lng: '-84.3880' } }, phone: '1-987-654-3210' },
        6: { name: 'Diana Garcia', email: 'diana@example.com', address: { street: '987 Maple St', city: 'Anyville', zipcode: '97531', geo: { lat: '32.7157', lng: '-117.1611' } }, phone: '1-135-792-4680' },
        7: { name: 'Ethan Lee', email: 'ethan@example.com', address: { street: '753 Cedar St', city: 'Othertown', zipcode: '86420', geo: { lat: '39.9526', lng: '-75.1652' } }, phone: '1-246-801-3579' },
        8: { name: 'Fiona Taylor', email: 'fiona@example.com', address: { street: '159 Walnut St', city: 'Elsewhere', zipcode: '75319', geo: { lat: '36.1699', lng: '-115.1398' } }, phone: '1-369-258-1470' },
        9: { name: 'George Martinez', email: 'george@example.com', address: { street: '357 Ash St', city: 'Somewhere', zipcode: '95135', geo: { lat: '42.3601', lng: '-71.0589' } }, phone: '1-580-247-9136' },
        10: { name: 'Hannah Kim', email: 'hannah@example.com', address: { street: '951 Spruce St', city: 'Anyplace', zipcode: '15973', geo: { lat: '37.7749', lng: '-122.4194' } }, phone: '1-802-468-1359' }
    };
    return Promise.resolve(personalInfo[id]);
}