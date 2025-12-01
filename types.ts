export interface Review {
  id: number;
  name: string;
  role: string;
  avatar: string;
  content: string;
  rating: number;
}

export interface CarModel {
  id: string;
  name: string;
  image: string;
  price: string;
  category: string;
  features: string[];
}

export interface Feature {
  id: number;
  title: string;
  description: string;
  iconName: string;
}

export interface FaqItem {
  question: string;
  answer: string;
}

export enum ChatSender {
  USER = 'user',
  BOT = 'bot',
  SYSTEM = 'system'
}

export interface ChatMessage {
  id: string;
  sender: ChatSender;
  text: string;
  timestamp: Date;
}