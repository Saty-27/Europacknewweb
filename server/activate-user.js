const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');

// Load environment variables
dotenv.config({ path: path.join(__dirname, '.env') });

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/europack';

const emailToActivate = process.argv[2] || 'Dhanik@ChairpersonEuropack';

async function activateUser() {
  try {
    console.log(`Connecting to MongoDB at: ${MONGO_URI}...`);
    await mongoose.connect(MONGO_URI);
    console.log('MongoDB Connected successfully!');

    // Find the user collection directly to bypass Mongoose Schema issues if any
    const db = mongoose.connection.db;
    const usersCollection = db.collection('users');

    const user = await usersCollection.findOne({ email: emailToActivate });

    if (!user) {
      // Try case-insensitive search
      const userAlt = await usersCollection.findOne({ email: new RegExp(`^${emailToActivate}$`, 'i') });
      if (userAlt) {
        const result = await usersCollection.updateOne(
          { _id: userAlt._id },
          { $set: { status: 'active' } }
        );
        console.log(`✅ Success: Found user matching '${userAlt.email}' (case-insensitive). Status updated to 'active'.`);
        process.exit(0);
      } else {
        console.log(`❌ Error: User with email '${emailToActivate}' not found in the database.`);
        
        // Let's print out all users so they know what emails exist
        const allUsers = await usersCollection.find({}, { projection: { email: 1, status: 1 } }).toArray();
        console.log('\nAvailable users in database:');
        allUsers.forEach(u => console.log(`- ${u.email} (Status: ${u.status})`));
        process.exit(1);
      }
    }

    const result = await usersCollection.updateOne(
      { _id: user._id },
      { $set: { status: 'active' } }
    );

    console.log(`✅ Success: User '${emailToActivate}' status updated to 'active'.`);
    process.exit(0);
  } catch (err) {
    console.error('❌ Database connection/update failed:', err);
    process.exit(1);
  }
}

activateUser();
