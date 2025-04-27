export interface IssueType {
  id: string;
  name: string;
  defaultImage?: string;
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
  updates?: string[];
  votes: {
    upvotes: number;
    downvotes: number;
  };
  comments: Comment[];
  reportedBy?: string;
}

export interface Comment {
  id: string;
  userId: string;
  text: string;
  timestamp: string;
  username: string;
  userAvatar?: string;
}

export const issueTypes: IssueType[] = [
  { 
    id: '1', 
    name: 'Pothole',
    defaultImage: 'https://bobsbanter.com/wp-content/uploads/2021/11/potholes.jpg'
  },
  { 
    id: '2', 
    name: 'Street Light Outage',
    defaultImage: 'https://5.imimg.com/data5/SELLER/Default/2024/2/382672170/YZ/ZN/AU/2903823/street-light-maintenance-services-500x500.jpg'
  },
  { 
    id: '3', 
    name: 'Garbage Dump',
    defaultImage: 'https://static.toiimg.com/thumb/msid-66857641,width-1280,height-720,resizemode-72/66857641.jpg'
  },
  { 
    id: '4', 
    name: 'Water Logging',
    defaultImage: 'https://www.livemint.com/lm-img/img/2023/06/30/600x338/monsoon_1688086558783_1688086559132.jpg'
  },
  { 
    id: '5', 
    name: 'Broken Sidewalk',
    defaultImage: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ4ugnJ_HEYaSAEYlhBiU6BbFZsynyW5xGKlA&s'
  },
  {
    id: '6',
    name: 'Traffic Signal Issue',
    defaultImage: 'https://www.shutterstock.com/image-photo/broken-traffic-light-signals-showing-600nw-2387991893.jpg'
  },
  {
    id: '7',
    name: 'Road Damage',
    defaultImage: 'https://media.istockphoto.com/id/538686713/photo/cracked-asphalt-after-earthquake.jpg?s=612x612&w=0&k=20&c=SbzwfmL_xf0rgZ4spkJPZ6wD6tR4AzkYEeA5iyg-_u4='
  }
];

export const mockIssues: Issue[] = [
  {
    id: '1',
    title: 'Major Pothole on MG Road',
    description: 'Large pothole near the main intersection causing traffic and damage to vehicles.',
    status: 'Pending',
    reportedOn: '2025-03-15',
    location: {
      street: 'Mahatma Gandhi Road',
      area: 'Fort Area',
      city: 'Mumbai',
      landmark: 'Near Central Bank Building',
      ward: 'Ward 7',
      pinCode: '400001',
      coordinates: {
        lat: 19.0759,
        lng: 72.8776,
      },
    },
    photos: [
      'https://bobsbanter.com/wp-content/uploads/2021/11/potholes.jpg',
    ],
    votes: { upvotes: 0, downvotes: 0 },
    comments: []
  },
  {
    id: '2',
    title: 'Street Light Not Working',
    description: 'Three consecutive street lights are non-functional, creating a dark spot in the residential area.',
    status: 'Progress',
    reportedOn: '2025-03-14',
    location: {
      street: 'Hill Road',
      area: 'Bandra West',
      city: 'Mumbai',
      landmark: 'Near St. Andrews Church',
      ward: 'Ward 2',
      pinCode: '400050',
      coordinates: {
        lat: 19.0543,
        lng: 72.8254,
      },
    },
    photos: [
      'https://5.imimg.com/data5/SELLER/Default/2024/2/382672170/YZ/ZN/AU/2903823/street-light-maintenance-services-500x500.jpg',
    ],
    votes: { upvotes: 0, downvotes: 0 },
    comments: []
  },
  {
    id: '3',
    title: 'Garbage Collection Issue',
    description: 'Regular garbage collection has been missed for the past week, causing accumulation.',
    status: 'Progress',
    reportedOn: '2025-03-13',
    location: {
      street: 'Linking Road',
      area: 'Santacruz',
      city: 'Mumbai',
      landmark: 'Behind Municipal Market',
      ward: 'Ward 3',
      pinCode: '400054',
      coordinates: {
        lat: 19.0854,
        lng: 72.8367,
      },
    },
    photos: [
      'https://static.toiimg.com/thumb/msid-66857641,width-1280,height-720,resizemode-72/66857641.jpg',
    ],
    votes: { upvotes: 0, downvotes: 0 },
    comments: []
  },
  {
    id: '4',
    title: 'Water Logging After Rain',
    description: 'Severe water logging issue after light rain, drainage system needs maintenance.',
    status: 'Resolved',
    reportedOn: '2025-03-10',
    resolvedOn: '2025-03-12',
    location: {
      street: 'SV Road',
      area: 'Andheri West',
      city: 'Mumbai',
      landmark: 'Near Railway Station',
      ward: 'Ward 4',
      pinCode: '400058',
      coordinates: {
        lat: 19.1234,
        lng: 72.8456,
      },
    },
    photos: [
      'https://www.livemint.com/lm-img/img/2023/06/30/600x338/monsoon_1688086558783_1688086559132.jpg',
    ],
    votes: { upvotes: 0, downvotes: 0 },
    comments: []
  },
  {
    id: '5',
    title: 'Broken Sidewalk',
    description: 'Sidewalk has multiple broken tiles and poses risk to pedestrians.',
    status: 'Pending',
    reportedOn: '2025-03-15',
    location: {
      street: 'Turner Road',
      area: 'Bandra West',
      city: 'Mumbai',
      landmark: 'Opposite National College',
      ward: 'Ward 2',
      pinCode: '400050',
      coordinates: {
        lat: 19.0634,
        lng: 72.8367,
      },
    },
    photos: [
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ4ugnJ_HEYaSAEYlhBiU6BbFZsynyW5xGKlA&s',
    ],
    votes: { upvotes: 0, downvotes: 0 },
    comments: []
  },
  {
    id: '6',
    title: 'Damaged Road Divider',
    description: 'Road divider damaged due to recent accident, needs immediate repair.',
    status: 'Progress',
    reportedOn: '2025-03-14',
    location: {
      street: 'Western Express Highway',
      area: 'Borivali East',
      city: 'Mumbai',
      landmark: 'Near Metro Station',
      ward: 'Ward 8',
      pinCode: '400066',
      coordinates: {
        lat: 19.2321,
        lng: 72.8567,
      },
    },
    photos: [
      'https://media.istockphoto.com/id/538686713/photo/cracked-asphalt-after-earthquake.jpg?s=612x612&w=0&k=20&c=SbzwfmL_xf0rgZ4spkJPZ6wD6tR4AzkYEeA5iyg-_u4=',
    ],
    votes: { upvotes: 0, downvotes: 0 },
    comments: []
  },
  {
    id: '7',
    title: 'Traffic Signal Malfunction',
    description: 'Traffic signal at major junction showing incorrect timing causing traffic congestion.',
    status: 'Pending',
    reportedOn: '2025-03-15',
    location: {
      street: 'JP Road',
      area: 'Versova',
      city: 'Mumbai',
      landmark: 'Near Metro Station',
      ward: 'Ward 3',
      pinCode: '400061',
      coordinates: {
        lat: 19.1278,
        lng: 72.8184,
      },
    },
    photos: [
      'https://www.shutterstock.com/image-photo/broken-traffic-light-signals-showing-600nw-2387991893.jpg',
    ],
    votes: { upvotes: 0, downvotes: 0 },
    comments: []
  },
  {
    id: '8',
    title: 'Severe Road Damage',
    description: 'Multiple potholes and cracks on main road causing traffic slowdown.',
    status: 'Progress',
    reportedOn: '2025-03-13',
    location: {
      street: 'Juhu Tara Road',
      area: 'Juhu',
      city: 'Mumbai',
      landmark: 'Near Juhu Beach',
      ward: 'Ward 4',
      pinCode: '400049',
      coordinates: {
        lat: 19.0883,
        lng: 72.8264,
      },
    },
    photos: [
      'https://media.istockphoto.com/id/538686713/photo/cracked-asphalt-after-earthquake.jpg?s=612x612&w=0&k=20&c=SbzwfmL_xf0rgZ4spkJPZ6wD6tR4AzkYEeA5iyg-_u4=',
    ],
    votes: { upvotes: 0, downvotes: 0 },
    comments: []
  },
  {
    id: '9',
    title: 'Street Light Maintenance Required',
    description: 'Multiple street lights flickering and some completely dark on residential street.',
    status: 'Pending',
    reportedOn: '2025-03-15',
    location: {
      street: 'Carter Road',
      area: 'Bandra West',
      city: 'Mumbai',
      landmark: 'Near Joggers Park',
      ward: 'Ward 2',
      pinCode: '400050',
      coordinates: {
        lat: 19.0544,
        lng: 72.8203,
      },
    },
    photos: [
      'https://5.imimg.com/data5/SELLER/Default/2024/2/382672170/YZ/ZN/AU/2903823/street-light-maintenance-services-500x500.jpg',
    ],
    votes: { upvotes: 0, downvotes: 0 },
    comments: []
  },
  {
    id: '10',
    title: 'Garbage Overflow',
    description: 'Garbage bins overflowing near market area causing hygiene issues.',
    status: 'Resolved',
    reportedOn: '2025-03-11',
    resolvedOn: '2025-03-13',
    location: {
      street: 'Lokhandwala Market',
      area: 'Andheri West',
      city: 'Mumbai',
      landmark: 'Near Municipal Market',
      ward: 'Ward 3',
      pinCode: '400053',
      coordinates: {
        lat: 19.1351,
        lng: 72.8146,
      },
    },
    photos: [
      'https://images.pexels.com/photos/2768961/pexels-photo-2768961.jpeg',
    ],
    votes: { upvotes: 0, downvotes: 0 },
    comments: []
  }
];

export const statistics = {
  governmentReports: 250,
  photosUploaded: '5GB',
  reportsSubmitted: 500,
  resolvedIssues: 320,
};

export const wardsList = [
  { id: '1', name: 'Ward 1 ' },
  { id: '2', name: 'Ward 2 ' },
  { id: '3', name: 'Ward 3 ' },
  { id: '4', name: 'Ward 4 ' },
  { id: '5', name: 'Ward 5 ' },
  { id: '6', name: 'Ward 6 ' },
  { id: '7', name: 'Ward 7 ' },
  { id: '8', name: 'Ward 8 ' },
];

export const councilMembers = [
  { id: '1', name: 'Mr. Rajesh Kumar - Ward 1' },
  { id: '2', name: 'Mrs. Priya Sharma - Ward 2' },
  { id: '3', name: 'Mr. Sanjay Patel - Ward 3' },
  { id: '4', name: 'Mrs. Anita Desai - Ward 4' },
  { id: '5', name: 'Mr. Vikram Singh - Ward 5' },
  { id: '6', name: 'Mrs. Meera Rao - Ward 6' },
  { id: '7', name: 'Mr. Arun Verma - Ward 7' },
  { id: '8', name: 'Mrs. Sunita Patil - Ward 8' },
];