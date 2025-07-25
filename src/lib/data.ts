export interface User {
  id: number;
  name: string;
  age: number;
  location: string;
  bio: string;
  interests: string[];
  photos: string[];
}

export interface Message {
  id: number;
  senderId: number;
  text: string;
  timestamp: string;
}

export interface Conversation {
  id: number;
  userId: number;
  messages: Message[];
}

export const mockUsers: User[] = [
  {
    id: 1,
    name: 'Alex',
    age: 28,
    location: 'San Francisco, CA',
    bio: 'Software engineer by day, aspiring chef by night. I love hiking with my dog, exploring new coffee shops, and debating about sci-fi movies.',
    interests: ['Hiking', 'Cooking', 'Coffee', 'Sci-Fi', 'Dogs'],
    photos: [
      'https://placehold.co/600x800/F08080/FFFFFF',
      'https://placehold.co/600x800/E6E6FA/333333',
    ],
  },
  {
    id: 2,
    name: 'Brenda',
    age: 26,
    location: 'San Francisco, CA',
    bio: 'Graphic designer with a passion for travel and photography. My weekends are for art museums, trying new food trucks, and watercolor painting.',
    interests: ['Travel', 'Photography', 'Art', 'Foodie', 'Painting'],
    photos: ['https://placehold.co/600x800/F5F5DC/333333'],
  },
  {
    id: 3,
    name: 'Charlie',
    age: 31,
    location: 'Oakland, CA',
    bio: 'Musician and rock climbing enthusiast. If I\'m not at the climbing gym, I\'m probably at a concert or writing new songs.',
    interests: ['Music', 'Rock Climbing', 'Concerts', 'Guitar'],
    photos: ['https://placehold.co/600x800/E6E6FA/333333'],
  },
  {
    id: 4,
    name: 'Diana',
    age: 29,
    location: 'Berkeley, CA',
    bio: 'PhD student in literature. I love getting lost in a good book, long-distance running, and tending to my many houseplants. Also a huge fan of board games!',
    interests: ['Reading', 'Running', 'Plants', 'Board Games', 'Coffee'],
    photos: ['https://placehold.co/600x800/F08080/FFFFFF'],
  },
  {
    id: 5,
    name: 'Ethan',
    age: 27,
    location: 'San Jose, CA',
    bio: 'Startup founder. I spend a lot of time working, but I make time for surfing, playing volleyball, and weekend trips.',
    interests: ['Startups', 'Surfing', 'Volleyball', 'Travel'],
    photos: ['https://placehold.co/600x800/F5F5DC/333333'],
  },
];

export const mockConversations: Conversation[] = [
    {
        id: 1,
        userId: 2, // Brenda
        messages: [
            { id: 1, senderId: 0, text: "Hey Brenda! I see you're into photography. What's your favorite thing to shoot?", timestamp: '10:00 AM' },
            { id: 2, senderId: 2, text: "Hi! I love street photography the most. The city has so much character. What about you?", timestamp: '10:01 AM' },
        ],
    },
    {
        id: 2,
        userId: 4, // Diana
        messages: [
             { id: 1, senderId: 0, text: "A fellow book lover! I'm sold. What are you reading right now?", timestamp: 'Yesterday' },
             { id: 2, senderId: 4, text: "Haha! I'm re-reading Dune before the next movie comes out. It's even better the second time!", timestamp: 'Yesterday' },
        ]
    }
];

export const currentUser = {
    id: 0,
    name: 'You',
    age: 27,
    location: 'San Francisco, CA',
    bio: 'Just a person looking for their other half. I enjoy long walks on the beach, cliché movie lines, and pineapple on pizza.',
    interests: ['Coding', 'Dogs', 'Pizza', 'Movies'],
    photos: ['https://placehold.co/400x400']
}
