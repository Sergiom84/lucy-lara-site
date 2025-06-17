import { 
  users, type User, type InsertUser,
  type Booking, type InsertBooking,
  type Service, type InsertService,
  type Testimonial, type InsertTestimonial
} from "@shared/schema";

// modify the interface with any CRUD methods
// you might need

export interface IStorage {
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  createBooking(booking: InsertBooking): Promise<Booking>;
  getServices(): Promise<Service[]>;
  getTestimonials(): Promise<Testimonial[]>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private bookings: Map<number, Booking>;
  private services: Service[];
  private testimonials: Testimonial[];
  private currentUserId: number;
  private currentBookingId: number;

  constructor() {
    this.users = new Map();
    this.bookings = new Map();
    this.currentUserId = 1;
    this.currentBookingId = 1;
    
    // Initialize services data
    this.services = [
      {
        id: 1,
        name: "Renovación profunda - higiene facial completa",
        description: "Tratamiento completo de higiene facial con exfoliación profunda",
        price: "75€",
        duration: "90 minutos",
        category: "facial"
      },
      {
        id: 2,
        name: "Renovación de cristal - higiene facial con microdermoabrasión",
        description: "Higiene facial avanzada con técnica de microdermoabrasión",
        price: "85€",
        duration: "100 minutos",
        category: "facial"
      },
      {
        id: 3,
        name: "Micropigmentación - Cejas",
        description: "Micropigmentación profesional para cejas",
        price: "350€",
        duration: "2-3 horas",
        category: "micropigmentacion"
      }
    ];
    
    // Initialize testimonials data
    this.testimonials = [
      {
        id: 1,
        name: "María García",
        content: "Excelente servicio, muy profesional y resultados increíbles",
        rating: 5,
        service: "Higiene facial"
      },
      {
        id: 2,
        name: "Carmen López",
        content: "El mejor centro de estética de Madrid, sin duda",
        rating: 5,
        service: "Micropigmentación"
      }
    ];
  }

  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentUserId++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async createBooking(insertBooking: InsertBooking): Promise<Booking> {
    const id = this.currentBookingId++;
    const booking: Booking = { 
      ...insertBooking, 
      id,
      processed: false,
      createdAt: new Date()
    };
    this.bookings.set(id, booking);
    return booking;
  }

  async getServices(): Promise<Service[]> {
    return this.services;
  }

  async getTestimonials(): Promise<Testimonial[]> {
    return this.testimonials;
  }
}

export const storage = new MemStorage();
