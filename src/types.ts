import { Tables, TablesInsert } from "./database.types";

export type EntryInsert = TablesInsert<"entries">;
export type Entry = Tables<"entries">;
