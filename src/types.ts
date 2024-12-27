import { Tables, TablesInsert, TablesUpdate } from "./database.override";

export type Entry = Tables<"entries">;
export type EntryInsert = TablesInsert<"entries">;
export type EntryUpdate = TablesUpdate<"entries">;

export enum SRS_STAGE {
  APPRENTICE_1 = 1,
  APPRENTICE_2 = 2,
  APPRENTICE_3 = 3,
  APPRENTICE_4 = 4,
  GURU_1 = 5,
  GURU_2 = 6,
  MASTER = 7,
  ENLIGHTENED = 8,
  BURNED = -1,
}
