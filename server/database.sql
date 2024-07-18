    CREATE DATABASE stackapp;

    CREATE TABLE stacks(
        uuid UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
        title VARCHAR(50),
        description VARCHAR(255),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE items(
        item_id SERIAL PRIMARY KEY,
        stack_uuid UUID REFERENCES stacks(uuid) ON DELETE CASCADE,
        item_type VARCHAR(255),
        content TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );

    

  