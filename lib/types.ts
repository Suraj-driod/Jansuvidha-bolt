export interface Comment {
  id: string;
  userId: string;
  text: string;
  timestamp: string;
  username: string;
  userAvatar?: string;
}

export interface Issue {
  id: string;
  title: string;
  description: string;
  status: 'Pending' | 'Progress' | 'Resolved';
  reportedOn: string;
  resolvedOn?: string;
  location: {
    street: string;
    area: string;
    city: string;
    landmark?: string;
    ward: string;
    pinCode: string;
    coordinates: {
      lat: number;
      lng: number;
    };
  };
  photos: string[];
  votes: {
    upvotes: number;
    downvotes: number;
  };
  comments: Comment[];
}