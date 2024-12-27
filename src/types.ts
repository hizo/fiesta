import { Tables, TablesInsert, TablesUpdate } from "./database.override";

export type Entry = Tables<"entries">;
export type EntryInsert = TablesInsert<"entries">;
export type EntryUpdate = TablesUpdate<"entries">;
