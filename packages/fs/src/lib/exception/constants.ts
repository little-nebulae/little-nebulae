export const FILE_SYSTEM_ERRORS = {
  BUSY: {
    code: "FS_BUSY_ERROR",
    errnoCode: "EBUSY",
  },
  NO_ENTRY: {
    code: "FS_NO_ENTRY_ERROR",
    errnoCode: "ENOENT",
  },
} as const;

export type FileSystemErrorCode =
  (typeof FILE_SYSTEM_ERRORS)[keyof typeof FILE_SYSTEM_ERRORS]["code"];
