import mongoose from 'mongoose';

const IssueSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please provide a title'],
    maxlength: [100, 'Title cannot be more than 100 characters']
  },
  description: {
    type: String,
    required: [true, 'Please provide a description'],
    maxlength: [1000, 'Description cannot be more than 1000 characters']
  },
  status: {
    type: String,
    enum: ['Pending', 'Progress', 'Resolved'],
    default: 'Pending'
  },
  reportedOn: {
    type: Date,
    default: Date.now
  },
  resolvedOn: {
    type: Date
  },
  location: {
    street: {
      type: String,
      required: [true, 'Please provide a street name']
    },
    area: {
      type: String,
      required: [true, 'Please provide an area']
    },
    city: String,
    landmark: String,
    ward: {
      type: String,
      required: [true, 'Please provide a ward']
    },
    pinCode: String,
    coordinates: {
      lat: Number,
      lng: Number
    }
  },
  photos: [{
    type: String,
    validate: {
      validator: function(v: string) {
        return v.startsWith('http://') || v.startsWith('https://');
      },
      message: 'Photo URL must be valid'
    }
  }],
  updates: [String],
  votes: {
    upvotes: {
      type: Number,
      default: 0
    },
    downvotes: {
      type: Number,
      default: 0
    }
  },
  comments: [{
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    text: {
      type: String,
      required: true
    },
    timestamp: {
      type: Date,
      default: Date.now
    },
    username: String,
    userAvatar: String
  }],
  reportedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
}, {
  timestamps: true
});

export default mongoose.models.Issue || mongoose.model('Issue', IssueSchema);