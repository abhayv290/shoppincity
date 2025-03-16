import { User, Role, Order } from "@prisma/client";
export type SafeUser = {
    id: string;
    email: string | null;
    name: string | null;
    image: string | null;
    role: Role;
    createdAt: string;
    updatedAt: string;
    emailVerified: string | null;
    order: Order[] | []

};