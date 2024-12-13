import { z } from "zod";

// Enum validations
const RoleEnum = z.enum(["SUPERUSER", "ADMIN", "MEMBER"]);
const FileTypeEnum = z.enum(["PROFILE", "BOOK"]);

// User Validation Schemas
const createUserSchema = z.object({
  username: z.string().min(1, "Username is required").max(50),
  password: z.string().min(8, "Password must be at least 8 characters long"),
  firstName: z.string().optional(),
  lastName: z.string().optional(),
  email: z.string().email("Invalid email address"),
  role: RoleEnum,
  verified: z.boolean().optional(),
});

const updateUserSchema = z.object({
  username: z.string().min(1).max(50).optional(),
  password: z.string().min(8).optional(),
  firstName: z.string().optional(),
  lastName: z.string().optional(),
  email: z.string().email().optional(),
  role: RoleEnum.optional(),
  verified: z.boolean().optional(),
});

// Book Validation Schemas
const createBookSchema = z.object({
  title: z.string().min(1, "Title is required").max(255),
  author: z.string().min(1, "Author is required").max(100),
  genre: z.string().optional(),
  description: z.string().optional(),
  isbn: z.string().optional(),
  publicationYear: z.number().int().optional(),
  available: z.boolean().optional(),
});

const updateBookSchema = z.object({
  title: z.string().min(1).max(255).optional(),
  author: z.string().min(1).max(100).optional(),
  genre: z.string().optional(),
  description: z.string().optional(),
  isbn: z.string().optional(),
  publicationYear: z.number().int().optional(),
  available: z.boolean().optional(),
});

// Borrowing Validation Schemas
const createBorrowingSchema = z.object({
  userId: z.number().int(),
  bookId: z.number().int(),
  borrowDate: z.date().optional(),
  dueDate: z.date(),
  returnDate: z.date().optional(),
});

const updateBorrowingSchema = z.object({
  borrowDate: z.date().optional(),
  dueDate: z.date().optional(),
  returnDate: z.date().optional(),
});

// Image Validation Schemas
const createImageSchema = z.object({
  fileUrl: z.string().url("Invalid URL"),
  fileType: FileTypeEnum,
  userId: z.number().int().optional(),
  bookId: z.number().int().optional(),
});

const updateImageSchema = z.object({
  fileUrl: z.string().url().optional(),
  fileType: FileTypeEnum.optional(),
  userId: z.number().int().optional(),
  bookId: z.number().int().optional(),
});

// Export schemas
export {
  createUserSchema,
  updateUserSchema,
  createBookSchema,
  updateBookSchema,
  createBorrowingSchema,
  updateBorrowingSchema,
  createImageSchema,
  updateImageSchema,
};
